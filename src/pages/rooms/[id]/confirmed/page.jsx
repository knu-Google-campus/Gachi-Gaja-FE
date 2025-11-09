

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plane, Copy, Calendar, ChevronDown, ChevronUp, Edit, Users, Crown } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export default function ConfirmedPlanPage() {
  const { id } = useParams()
  const [expandedDays, setExpandedDays] = useState([1, 2, 3, 4])
  const inviteLink = "https://gachigaja.com/invite/abc123"

  const hostId = 1

  const members = [
    { id: 1, name: "홍길동" },
    { id: 2, name: "김철수" },
    { id: 3, name: "이영희" },
    { id: 4, name: "박민수" },
  ]

  const schedule = [
    {
      day: 1,
      date: "2024.12.20 (금)",
      activities: [
        { time: "09:00", location: "김포공항 출발", transport: "비행기" },
        { time: "10:30", location: "제주공항 도착", transport: "렌터카" },
        { time: "12:00", location: "올레국수 (점심)", transport: "도보" },
        { time: "14:00", location: "성산일출봉", transport: "자동차" },
        { time: "16:30", location: "섭지코지", transport: "자동차" },
        { time: "18:30", location: "숙소 체크인", transport: "자동차" },
        { time: "19:30", location: "해산물 맛집 (저녁)", transport: "도보" },
      ],
    },
    {
      day: 2,
      date: "2024.12.21 (토)",
      activities: [
        { time: "09:00", location: "호텔 조식", transport: "-" },
        { time: "10:30", location: "한라산 둘레길", transport: "자동차" },
        { time: "13:00", location: "흑돼지 맛집 (점심)", transport: "자동차" },
        { time: "15:00", location: "카멜리아힐", transport: "자동차" },
        { time: "17:30", location: "중문해수욕장 산책", transport: "자동차" },
        { time: "19:00", location: "숙소 휴식", transport: "자동차" },
      ],
    },
    {
      day: 3,
      date: "2024.12.22 (일)",
      activities: [
        { time: "09:00", location: "호텔 조식", transport: "-" },
        { time: "10:30", location: "우도 페리", transport: "자동차+배" },
        { time: "11:00", location: "우도 자전거 투어", transport: "자전거" },
        { time: "14:00", location: "우도 해산물 (점심)", transport: "도보" },
        { time: "16:00", location: "제주 본섬 복귀", transport: "배+자동차" },
        { time: "18:00", location: "동문시장", transport: "자동차" },
        { time: "20:00", location: "숙소 휴식", transport: "자동차" },
      ],
    },
    {
      day: 4,
      date: "2024.12.23 (월)",
      activities: [
        { time: "09:00", location: "체크아웃", transport: "-" },
        { time: "10:00", location: "협재해수욕장", transport: "자동차" },
        { time: "12:00", location: "고기국수 (점심)", transport: "자동차" },
        { time: "14:00", location: "제주공항", transport: "자동차" },
        { time: "15:30", location: "제주공항 출발", transport: "비행기" },
        { time: "17:00", location: "김포공항 도착", transport: "-" },
      ],
    },
  ]

  const toggleDay = (day) => {
    setExpandedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <Badge className="mb-2">확정됨</Badge>
              <h1 className="text-3xl font-bold text-foreground">제주도 가족 여행</h1>
            </div>
            <Link to={`/rooms/${id}/confirmed/edit`} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                계획 수정
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    여행 일정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {schedule.map((day) => (
                    <Collapsible
                      key={day.day}
                      open={expandedDays.includes(day.day)}
                      onOpenChange={() => toggleDay(day.day)}
                    >
                      <Card>
                        <CollapsibleTrigger className="w-full">
                          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="text-left">
                                <h3 className="font-semibold text-foreground">Day {day.day}</h3>
                                <p className="text-sm text-muted-foreground">{day.date}</p>
                              </div>
                              {expandedDays.includes(day.day) ? (
                                <ChevronUp className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              {day.activities.map((activity, idx) => (
                                <div key={idx} className="flex gap-4 text-sm">
                                  <span className="text-muted-foreground font-medium w-16">{activity.time}</span>
                                  <div className="flex-1">
                                    <span className="text-foreground">{activity.location}</span>
                                    <span className="text-muted-foreground ml-2">({activity.transport})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
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
                      <div key={member.id} className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {member.name[0]}
                        </div>
                        <span className="text-sm text-foreground">{member.name}</span>
                        {member.id === hostId && (
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
                    <span className="font-medium text-foreground">제주도</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">일정</span>
                    <span className="font-medium text-foreground">2024.12.20 - 12.23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">인원</span>
                    <span className="font-medium text-foreground">4명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">예산</span>
                    <span className="font-medium text-foreground">500,000원/인</span>
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
