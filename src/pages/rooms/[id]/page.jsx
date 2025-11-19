

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Copy, Settings, Calendar, Users, Edit, Crown } from "lucide-react" // Added Crown icon
import { mockRooms, mockOpinions, currentUserId } from "@/lib/mock-data" // Added currentUserId import
import { getGroupInfo } from "@/api/group"

export default function RoomDetailPage() {
  const navigate = useNavigate()
  const { id: roomId } = useParams()

  const [room, setRoom] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [opinions, setOpinions] = useState([])
  
  const [opinion, setOpinion] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // 현재 로그인한 유저 ID
  const currentUserId = localStorage.getItem("userId")

  // 방 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getGroupInfo(roomId);
        setRoom(data);
        setOpinions([]);
        console.log("방 정보 로딩 완료 : ", data); // 디버깅용 코드

      } catch (error) {
        console.error("방 정보 로딩 실패 : ", error);
        alert("존재하지 않는 방이거나 오류가 발생했습니다.");
        navigate("/rooms")

      } finally {
        setIsLoading(false);
      }
    };

    if (roomId) {
      fetchData();
    }
  }, [roomId, navigate]);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  const handleSaveOpinion = () => {
    setIsDialogOpen(false)
  }

  const inviteLink = `https://gachigaja.com/invite/${roomId}`

  const copyInviteLink = () => {
    const currentUrl = `https://gachigaja.com/invite/${roomId}`
    navigator.clipboard.writeText(currentUrl)
    alert("링크가 복사되었습니다!")
  }

  const handleGenerateTrip = () => {
    if (room?.leaderID !== currentUserId) {
      alert("방장만 여행을 생성할 수 있습니다.")
      return
    }
    navigate(`/rooms/${roomId}/plans?generating=true`)
  }

  // 페이지 로딩중일때 보여줄 화면
  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p>여행 정보를 불러오는 중...</p>
    </div>
  );

  const today = new Date()
  const deadline = new Date(room.rDeadline)
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))

  const keywords = ["휴식", "활동적", "자연", "관광지", "맛집", "쇼핑", "문화체험", "사진", "모험", "스포츠"]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Title and Edit Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <h1 className="text-3xl font-bold text-foreground">{room.title}</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/rooms/${roomId}/edit`)}
              className="w-full sm:w-auto"
            >
              <Settings className="h-4 w-4 mr-2" />
              여행 정보 수정
            </Button>
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
                    const memberOpinion = opinions.find((o) => o.userId === member.id)
                    const isCurrentUser = member.id === currentUserId
                    const isHost = member.id === room.hostId // Check if member is host

                    return (
                      <div key={member.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                              {member.name[0]}
                            </div>
                            <span className="font-semibold text-foreground">{member.name}</span>
                            {isHost && (
                              <Badge variant="secondary" className="text-xs">
                                <Crown className="h-3 w-3 mr-1" />
                                호스트
                              </Badge>
                            )}
                            {isCurrentUser && <Badge variant="secondary">나</Badge>}
                          </div>
                          {isCurrentUser && (
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>의견 {memberOpinion ? "수정" : "추가"}하기</DialogTitle>
                                  <DialogDescription>당신이 원하는 여행 스타일을 적어주세요</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 pt-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="opinion">여행 스타일</Label>
                                    <Textarea
                                      id="opinion"
                                      placeholder="원하는 여행 스타일을 자유롭게 작성해주세요..."
                                      value={opinion}
                                      onChange={(e) => setOpinion(e.target.value)}
                                      rows={5}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>키워드 (선택사항)</Label>
                                    <div className="flex flex-wrap gap-2">
                                      {keywords.map((keyword) => (
                                        <Badge
                                          key={keyword}
                                          variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                                          className="cursor-pointer"
                                          onClick={() => toggleKeyword(keyword)}
                                        >
                                          {keyword}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <Button className="w-full" onClick={handleSaveOpinion}>
                                    저장
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                        {memberOpinion ? (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">{memberOpinion.preferences}</p>
                            {memberOpinion.keywords && memberOpinion.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {memberOpinion.keywords.map((keyword) => (
                                  <Badge key={keyword} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            {isCurrentUser ? "의견을 추가해주세요" : "아직 의견을 작성하지 않았습니다"}
                          </p>
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
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                      onClick={handleGenerateTrip}
                    >
                      여행 생성하기
                    </Button>
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
                    <span className="font-medium text-foreground">{room.memberCount}명</span>
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
