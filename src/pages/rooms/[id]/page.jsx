import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { Header } from "@/components/header"
import { Copy, Settings, Calendar, Users, Edit, Crown, Trash2, ArrowLeft } from "lucide-react"
import { getGroupDetail, getGroupMembers, deleteGroup } from "@/api/group"
import { getRequirements, createRequirement, updateRequirement } from "@/api/requirements"
import { LoadingAnimation } from "@/components/loading-animation"
export default function RoomDetailPage() {
  const navigate = useNavigate()
  const { id: roomId } = useParams()

  const [room, setRoom] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [requirements, setRequirements] = useState([])
  const [opinionText, setOpinionText] = useState("")
  const [reqForm, setReqForm] = useState({
    style: '',
    lodgingCriteria: '',
    lodgingType: '',
    mealBudget: '',
    eatingHabit: '',
    distance: '',
    plusRequirement: '',
  })
  const [editingId, setEditingId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const currentUserId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // 1단계: 그룹 정보만 먼저 확인하여 hasPlan 여부를 즉시 판단
        const roomData = await getGroupDetail(roomId)
        if (roomData?.hasPlan) {
          // 중간 UI를 거치지 않고 확정 페이지로 즉시 이동
          navigate(`/rooms/${roomId}/confirmed`, { replace: true })
          return
        }
        // 2단계: 나머지 데이터 로드 (멤버/요구사항)
        const [membersResponse, reqRes] = await Promise.all([
          getGroupMembers(roomId),
          getRequirements(roomId)
        ])
        setRoom({ ...roomData, members: membersResponse.Members })
        setRequirements(reqRes.requirements || [])
      } catch (error) {
        console.error("데이터 로딩 실패 : ", error)
        alert("존재하지 않는 방이거나 오류가 발생했습니다.")
        navigate("/rooms")
      } finally {
        setIsLoading(false)
      }
    }
    if (roomId) fetchData()
  }, [roomId, navigate])

  // 여행 스타일 캐싱: 사용자/방 단위로 최근 입력값을 저장/복원
  const styleCacheKey = `reqStyle:${roomId}:${currentUserId}`
  useEffect(() => {
    if (!roomId || !currentUserId) return
    const cached = localStorage.getItem(styleCacheKey)
    if (cached && !reqForm.style) {
      setReqForm((f) => ({ ...f, style: cached }))
    }
  }, [roomId, currentUserId])

  useEffect(() => {
    if (!roomId || !currentUserId) return
    // 입력 변화 시 즉시 캐싱
    localStorage.setItem(styleCacheKey, reqForm.style || '')
  }, [reqForm.style, roomId, currentUserId])

  const handleSaveRequirement = async () => {
    try {
      const payload = {
        style: reqForm.style,
        lodgingCriteria: reqForm.lodgingCriteria,
        lodgingType: reqForm.lodgingType,
        mealBudget: reqForm.mealBudget,
        eatingHabit: reqForm.eatingHabit,
        distance: reqForm.distance,
        plusRequirement: reqForm.plusRequirement || opinionText.trim(),
      }
      const hasAny = Object.values(payload).some(v => (v || '').trim() !== '')
      if (!hasAny) { alert('최소 한 항목은 입력해주세요'); return }
      if (editingId) {
        await updateRequirement(roomId, editingId, payload)
        setRequirements(prev => prev.map(r => r.requirementId === editingId ? { ...r, ...payload } : r))
      } else {
        const res = await createRequirement(roomId, payload)
        const me = room.members.find(m => String(m.userId) === String(currentUserId))
        // 서버는 구조화된 요구사항 객체를 반환
        const created = Array.isArray(res) ? res[res.length - 1] : res
        setRequirements(prev => [...prev, {
          requirementId: created?.requirementId || created?.requirement_id || res?.requirementId,
          nickname: created?.nickname || me?.nickname || '나',
          userId: created?.userId || me?.userId || currentUserId,
          style: created?.style || payload.style || '',
          lodgingCriteria: created?.lodgingCriteria || created?.lodging_criteria || payload.lodgingCriteria || '',
          lodgingType: created?.lodgingType || created?.lodging_type || payload.lodgingType || '',
          mealBudget: created?.mealBudget || created?.meal_budget || payload.mealBudget || '',
          eatingHabit: created?.eatingHabit || created?.eating_habit || payload.eatingHabit || '',
          distance: created?.distance || payload.distance || '',
          plusRequirement: created?.plusRequirement || created?.plus_requirement || payload.plusRequirement || opinionText.trim(),
        }])
      }
      // 서버 상태와 동기화: 즉시 최신 요구사항 재조회하여 표시 불일치 방지
      try {
        const fresh = await getRequirements(roomId)
        setRequirements(fresh.requirements || [])
      } catch {}
      setOpinionText('')
      setReqForm({
        style: '', lodgingCriteria: '', lodgingType: '',
        mealBudget: '', eatingHabit: '', distance: '', plusRequirement: ''
      })
      setEditingId(null)
      setIsDialogOpen(false)
    } catch (e) {
      alert(e.message || '저장 실패')
    }
  }

  const inviteLink = `https://gachigaja.com/invite/${roomId}`

  const copyInviteLink = () => {
    const currentUrl = `https://gachigaja.com/invite/${roomId}`
    navigator.clipboard.writeText(currentUrl)
    alert("링크가 복사되었습니다!")
  }

  const handleGenerateTrip = async () => {
    const myInfo = room?.members?.find(m => m.userId === currentUserId)
    if (myInfo?.role !== 'LEADER') {
      alert("방장만 여행을 생성할 수 있습니다.")
      return
    }
    try {
      setIsGenerating(true)
      // 후보 생성 트리거 (POST) 후 방으로 유지
      const { generateCandidates } = await import("@/api/candidates")
      await generateCandidates(roomId)
      // 그룹 정보를 다시 조회하여 버튼 상태 반영
      const updated = await getGroupDetail(roomId)
      setRoom(prev => ({ ...(prev||{}), ...updated }))
    } catch (e) {
      alert(e.message || '여행 후보 생성 중 오류가 발생했습니다')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGoVote = () => {
    navigate(`/rooms/${roomId}/plans`)
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner label="여행 정보를 불러오는 중..." size={44} />
    </div>
  );

  const today = new Date()
  const deadline = new Date(room.rDeadline)
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))

  const isLeader = room.members?.find(m => m.userId === currentUserId)?.role === 'LEADER'

  return (
    <div className="min-h-screen bg-background">
      {isGenerating && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <LoadingAnimation />
        </div>
      )}
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/rooms")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            여행 목록으로 돌아가기
          </button>
          {/* Title and Edit Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <h1 className="text-3xl font-bold text-foreground">{room.title}</h1>
            {isLeader && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/rooms/${roomId}/edit`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  여행 정보 수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground border-border hover:bg-red-600 hover:text-white"
                  onClick={async () => {
                    if (!confirm('정말 이 모임을 삭제하시겠습니까? 삭제 후 되돌릴 수 없습니다.')) return
                    try {
                      await deleteGroup(roomId)
                      alert('모임이 삭제되었습니다')
                      navigate('/rooms')
                    } catch (e) {
                      alert(e.message || '모임 삭제 중 오류가 발생했습니다')
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> 모임 삭제
                </Button>
              </div>
            )}           
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    멤버 의견
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(room.members || []).map((member) => {
                    const memberOpinion = requirements.find(r => String(r.userId) === String(member.userId))
                    const hasContent = memberOpinion && (
                      (memberOpinion.style && memberOpinion.style.trim() !== '') ||
                      (memberOpinion.schedule && String(memberOpinion.schedule).trim() !== '') ||
                      (memberOpinion.lodgingCriteria || memberOpinion.lodging_criteria) ||
                      (memberOpinion.lodgingType || memberOpinion.lodging_type) ||
                      (memberOpinion.mealBudget || memberOpinion.meal_budget) ||
                      (memberOpinion.eatingHabit || memberOpinion.eating_habit) ||
                      (memberOpinion.distance && String(memberOpinion.distance).trim() !== '') ||
                      (memberOpinion.plusRequirement || memberOpinion.plus_requirement)
                    )
                    const isCurrentUser = member.userId === currentUserId
                    const isHost = member.role === 'LEADER'

                    return (
                      <div key={member.userId} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                              {member.nickname[0]}
                            </div>
                            <span className="font-semibold text-foreground">{member.nickname}</span>
                            {isHost && (
                              <Badge variant="secondary" className="text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                호스트
                              </Badge>
                            )}
                            {isCurrentUser && <Badge variant="secondary">나</Badge>}
                          </div>
                          {isCurrentUser && (
                            <Dialog open={isDialogOpen} onOpenChange={(open)=>{ if(!open){ setEditingId(null); setOpinionText(''); setReqForm({ style: '', schedule: '', lodgingCriteria: '', lodgingType: '', mealBudget: '', eatingHabit: '', distance: '', plusRequirement: '' }); } setIsDialogOpen(open) }}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => {
                                  setEditingId(memberOpinion?.requirementId || null)
                                  const m = memberOpinion || {}
                                  setReqForm({
                                    style: m.style || '',
                                    lodgingCriteria: m.lodgingCriteria || m.lodging_criteria || '',
                                    lodgingType: m.lodgingType || m.lodging_type || '',
                                    mealBudget: m.mealBudget || m.meal_budget || '',
                                    eatingHabit: m.eatingHabit || m.eating_habit || '',
                                    distance: m.distance || '',
                                    plusRequirement: m.plusRequirement || m.plus_requirement || ''
                                  })
                                  setOpinionText(m.plusRequirement || m.plus_requirement || '')
                                }}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>의견 {memberOpinion ? '수정' : '추가'}하기</DialogTitle>
                                  <DialogDescription>원하는 여행 스타일/의견을 작성해주세요</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="style">여행 스타일</Label>
                                      <Input id="style" value={reqForm.style} onChange={(e)=>setReqForm(f=>({...f, style: e.target.value}))} placeholder="예: 맛집 탐방/휴양/아침형" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="lodgingCriteria">숙소 기준</Label>
                                      <Input id="lodgingCriteria" value={reqForm.lodgingCriteria} onChange={(e)=>setReqForm(f=>({...f, lodgingCriteria: e.target.value}))} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="lodgingType">숙소 종류</Label>
                                      <Input id="lodgingType" value={reqForm.lodgingType} onChange={(e)=>setReqForm(f=>({...f, lodgingType: e.target.value}))} placeholder="예: 호텔" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="mealBudget">식사 예산</Label>
                                      <select id="mealBudget" className="w-full border rounded-md h-9 px-3" value={reqForm.mealBudget} onChange={(e)=>setReqForm(f=>({...f, mealBudget: e.target.value}))}>
                                        <option value="">선택</option>
                                        <option value="저가">저가</option>
                                        <option value="중간가">중간가</option>
                                        <option value="고가">고가</option>
                                      </select>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="eatingHabit">식습관</Label>
                                      <Input id="eatingHabit" value={reqForm.eatingHabit} onChange={(e)=>setReqForm(f=>({...f, eatingHabit: e.target.value}))} />
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="distance">이동 거리</Label>
                                      <Input id="distance" value={reqForm.distance} onChange={(e)=>setReqForm(f=>({...f, distance: e.target.value}))} />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="plusRequirement">기타 요구 사항</Label>
                                    <Textarea id="plusRequirement" placeholder="자유롭게 추가 요구 사항을 작성해주세요..." value={reqForm.plusRequirement} onChange={(e)=>setReqForm(f=>({...f, plusRequirement: e.target.value}))} rows={4} />
                                  </div>
                                  <Button className="w-full" onClick={handleSaveRequirement}>저장</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                        {hasContent ? (
                          <div className="space-y-1 text-sm text-muted-foreground">
                            {(memberOpinion.style) && (<p>여행 스타일: {memberOpinion.style}</p>)}
                            {(memberOpinion.schedule) && (<p>일정 구성: {memberOpinion.schedule}</p>)}
                            {(memberOpinion.lodgingCriteria || memberOpinion.lodging_criteria) && (<p>숙소 기준: {memberOpinion.lodgingCriteria || memberOpinion.lodging_criteria}</p>)}
                            {(memberOpinion.lodgingType || memberOpinion.lodging_type) && (<p>숙소 종류: {memberOpinion.lodgingType || memberOpinion.lodging_type}</p>)}
                            {(memberOpinion.mealBudget || memberOpinion.meal_budget) && (<p>식사 예산: {memberOpinion.mealBudget || memberOpinion.meal_budget}</p>)}
                            {(memberOpinion.eatingHabit || memberOpinion.eating_habit) && (<p>식습관: {memberOpinion.eatingHabit || memberOpinion.eating_habit}</p>)}
                            {(memberOpinion.distance) && (<p>이동 거리: {memberOpinion.distance}</p>)}
                            {(memberOpinion.plusRequirement || memberOpinion.plus_requirement) && (<p className="whitespace-pre-line">기타: {memberOpinion.plusRequirement || memberOpinion.plus_requirement}</p>)}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">{isCurrentUser ? '의견을 작성해주세요' : '의견이 없습니다.'}</p>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">초대 링크</Label>
                    <div className="flex gap-2">
                      <Input value={inviteLink} readOnly className="text-sm" />
                      <Button size="icon" variant="outline" onClick={copyInviteLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>마감까지 {daysRemaining}일 남음</span>
                    </div>
                    {room?.hasCandidatePlan ? (
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        size="lg"
                        onClick={handleGoVote}
                      >
                        투표하러 가기
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        size="lg"
                        onClick={handleGenerateTrip}
                        disabled={isGenerating}
                      >
                        {isGenerating ? '여행 생성중...' : '여행 생성하기'}
                      </Button>
                    )}

                    {/* 삭제 버튼은 상단 편집 버튼 옆으로 이동 */}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">여행 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">목적지</span>
                    <span className="font-medium text-foreground">{room.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">일정</span>
                    <span className="font-medium text-foreground">
                      {room.period}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">인원</span>
                    <span className="font-medium text-foreground">{room.members?.length || 0}명</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
