import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plane, Copy, Calendar, Edit, Users, Crown, ArrowLeft } from "lucide-react"
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom"
import { getGroupDetail, getGroupMembers, deleteGroup } from "@/api/group"
import { getFinalPlans } from "@/api/plans"
 

export default function ConfirmedPlanPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [inviteLink, setInviteLink] = useState("")
  const [room, setRoom] = useState(null)
  const [members, setMembers] = useState([])
  const [finalPlans, setFinalPlans] = useState([])
  const [isLeader, setIsLeader] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatDateTime = (dt) => {
    if (!dt) return '-'
    try {
      // ISO 문자열 또는 날짜로 들어오는 경우 처리
      const d = typeof dt === 'string' ? new Date(dt) : dt
      if (isNaN(d)) return dt
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      return `${y}-${m}-${day} ${hh}:${mm}`
    } catch {
      return dt
    }
  }

  const formatDate = (dt) => {
    if (!dt) return '-'
    const d = typeof dt === 'string' ? new Date(dt) : dt
    if (isNaN(d)) return dt
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const weekday = ['일','월','화','수','목','금','토'][d.getDay()]
    return `${y}.${m}.${day} (${weekday})`
  }

  const formatTime = (dt) => {
    if (!dt) return '-'
    const d = typeof dt === 'string' ? new Date(dt) : dt
    if (isNaN(d)) return dt
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        const [roomData, membersRes, finalRes] = await Promise.all([
          getGroupDetail(id),
          getGroupMembers(id),
          getFinalPlans(id)
        ])
        setRoom(roomData)
        setMembers(membersRes?.Members || [])
        setIsLeader(Boolean(finalRes?.isLeader))
        // 백엔드 응답 키: planList
        setFinalPlans(Array.isArray(finalRes?.planList) ? finalRes.planList : [])
        setInviteLink(`https://gachigaja.com/invite/${id}`)
      } catch (e) {
        setError(e.message || '확정 계획을 불러오는 중 오류가 발생했습니다')
      } finally {
        setLoading(false)
      }
    }
    if (id) run()
  }, [id, searchParams])

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner label="확정 계획을 불러오는 중..." size={44} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/rooms" className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">같이가자</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate("/rooms")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            여행 목록으로 돌아가기
          </button>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <Badge className="mb-2">확정됨</Badge>
              <h1 className="text-3xl font-bold text-foreground">{room?.title || '여행 계획'}</h1>
            </div>
            {isLeader && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link to={`/rooms/${id}/confirmed/edit`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    계획 수정
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-transparent text-muted-foreground border-border hover:bg-red-600 hover:text-white"
                  onClick={async () => {
                    if (!confirm('정말 이 모임을 삭제하시겠습니까? 삭제 후 되돌릴 수 없습니다.')) return
                    try {
                      await deleteGroup(id)
                      alert('모임이 삭제되었습니다')
                      navigate('/rooms')
                    } catch (e) {
                      alert(e.message || '모임 삭제 중 오류가 발생했습니다')
                    }
                  }}
                >
                  모임 삭제
                </Button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    확정된 계획
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {error ? (
                    <p className="text-sm text-destructive">{error}</p>
                  ) : finalPlans.length ? (
                    (() => {
                      // 날짜별 그룹핑
                      const byDay = finalPlans.reduce((acc, p) => {
                        const key = (typeof p.startingTime === 'string' ? p.startingTime.split('T')[0] : new Date(p.startingTime).toISOString().split('T')[0])
                        acc[key] = acc[key] || []
                        acc[key].push(p)
                        return acc
                      }, {})
                      const sortedDays = Object.keys(byDay).sort()
                      return (
                        <div className="space-y-6">
                          {sortedDays.map((dayKey, idx) => (
                            <div key={dayKey} className="border border-border rounded-lg">
                              <div className="border-b border-border p-3 flex items-center justify-between bg-muted/30">
                                <div>
                                  <p className="text-xs text-muted-foreground">Day {idx + 1}</p>
                                  <p className="text-lg font-semibold text-foreground">{formatDate(dayKey)}</p>
                                </div>
                              </div>
                              <div className="p-3 space-y-3">
                                {byDay[dayKey]
                                  .sort((a,b)=>new Date(a.startingTime)-new Date(b.startingTime))
                                  .map((p)=> (
                                    <div key={p.planId} className="grid grid-cols-[80px_1fr] gap-4 items-start">
                                      <div className="text-sm font-semibold text-foreground">{formatTime(p.startingTime)}</div>
                                      <div className="space-y-1">
                                        <div className="text-sm text-foreground whitespace-pre-line">{p.info}</div>
                                        <div className="text-xs text-muted-foreground">
                                          {p.location ? `${p.location}` : ''}
                                          {p.transportation ? ` (${p.transportation})` : ''}
                                          {p.cost ? ` · 비용 ${p.cost}` : ''}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )
                    })()
                  ) : (
                    <p className="text-sm text-muted-foreground">확정된 계획이 아직 없습니다.</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    멤버
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div key={member.userId} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {member.nickname?.[0] || '멤'}
                        </div>
                        <span className="text-sm text-foreground">{member.nickname}</span>
                        {member.role === 'LEADER' && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Crown className="h-3 w-3" />
                            호스트
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">초대 링크</p>
                    <div className="flex gap-2">
                      <Input value={inviteLink} readOnly className="text-sm" />
                      <Button size="icon" variant="outline" onClick={copyInviteLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
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
                    <span className="font-medium text-foreground">{room?.region || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">일정</span>
                    <span className="font-medium text-foreground">{room?.period || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">인원</span>
                    <span className="font-medium text-foreground">{members.length}명</span>
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
