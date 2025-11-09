

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, ThumbsUp, Calendar, RefreshCw, Check } from "lucide-react"
import { Link, useNavigate, useSearchParams, useParams } from "react-router-dom"
import { LoadingAnimation } from "@/components/loading-animation"

export default function PlansPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { id } = useParams()
  const isInitialGeneration = searchParams.get("generating") === "true"

  const [selectedPlan, setSelectedPlan] = useState("plan1")
  const [votes, setVotes] = useState({ plan1: 2, plan2: 1 })
  const [userVote, setUserVote] = useState(null)
  const [isGenerating, setIsGenerating] = useState(isInitialGeneration)

  const daysRemaining = 3

  useEffect(() => {
    if (isInitialGeneration) {
      const timer = setTimeout(() => {
        setIsGenerating(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInitialGeneration])

  const plans = {
    plan1: {
      id: "plan1",
      name: "계획 A",
      description: "자연과 휴양을 중심으로 한 여유로운 일정",
      reasoning:
        "멤버들의 의견을 종합한 결과, 자연 경관을 즐기면서 휴식을 취하고 맛집 투어를 병행하는 일정이 가장 적합합니다. 액티비티는 적절히 배치하여 지루하지 않도록 구성했습니다.",
      schedule: [
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
      ],
    },
    plan2: {
      id: "plan2",
      name: "계획 B",
      description: "액티비티와 관광을 중심으로 한 활동적인 일정",
      reasoning:
        "활동적인 여행을 선호하는 의견과 사진 촬영 명소를 원하는 의견을 반영하여, 다양한 액티비티와 포토존을 포함한 일정으로 구성했습니다. 맛집도 적절히 배치했습니다.",
      schedule: [
        {
          day: 1,
          date: "2024.12.20 (금)",
          activities: [
            { time: "09:00", location: "김포공항 출발", transport: "비행기" },
            { time: "10:30", location: "제주공항 도착", transport: "렌터카" },
            { time: "12:00", location: "제주 맛집 (점심)", transport: "자동차" },
            { time: "14:00", location: "ATV 체험", transport: "자동차" },
            { time: "16:30", location: "카페 쿠폰", transport: "자동차" },
            { time: "18:30", location: "숙소 체크인", transport: "자동차" },
            { time: "19:30", location: "흑돼지 맛집 (저녁)", transport: "도보" },
          ],
        },
        {
          day: 2,
          date: "2024.12.21 (토)",
          activities: [
            { time: "09:00", location: "호텔 조식", transport: "-" },
            { time: "10:00", location: "패러글라이딩", transport: "자동차" },
            { time: "13:00", location: "해산물 맛집 (점심)", transport: "자동차" },
            { time: "15:00", location: "천지연폭포", transport: "자동차" },
            { time: "17:00", location: "정방폭포", transport: "자동차" },
            { time: "19:00", location: "중문 관광단지", transport: "자동차" },
          ],
        },
        {
          day: 3,
          date: "2024.12.22 (일)",
          activities: [
            { time: "09:00", location: "호텔 조식", transport: "-" },
            { time: "10:00", location: "승마 체험", transport: "자동차" },
            { time: "12:30", location: "고기국수 (점심)", transport: "자동차" },
            { time: "14:00", location: "만장굴", transport: "자동차" },
            { time: "16:30", location: "김녕미로공원", transport: "자동차" },
            { time: "18:30", location: "동문시장", transport: "자동차" },
            { time: "20:00", location: "숙소 휴식", transport: "자동차" },
          ],
        },
        {
          day: 4,
          date: "2024.12.23 (월)",
          activities: [
            { time: "09:00", location: "체크아웃", transport: "-" },
            { time: "10:00", location: "협재해수욕장", transport: "자동차" },
            { time: "12:00", location: "올레국수 (점심)", transport: "자동차" },
            { time: "14:00", location: "제주공항", transport: "자동차" },
            { time: "15:30", location: "제주공항 출발", transport: "비행기" },
            { time: "17:00", location: "김포공항 도착", transport: "-" },
          ],
        },
      ],
    },
  }

  const handleVote = (planId) => {
    if (userVote === planId) {
      setUserVote(null)
      setVotes((prev) => ({ ...prev, [planId]: prev[planId] - 1 }))
    } else {
      if (userVote) {
        setVotes((prev) => ({ ...prev, [userVote]: prev[userVote] - 1 }))
      }
      setUserVote(planId)
      setVotes((prev) => ({ ...prev, [planId]: prev[planId] + 1 }))
    }
  }

  const handleRegenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  const handleConfirm = () => {
    const winningPlan = votes.plan1 > votes.plan2 ? "plan1" : "plan2"
    navigate(`/rooms/${id}/confirmed?plan=${winningPlan}`)
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">제주도 가족 여행 계획</h1>
            <p className="text-muted-foreground">두 가지 계획 중 마음에 드는 것에 투표해주세요</p>
          </div>

          {isGenerating ? (
            <LoadingAnimation />
          ) : (
            <>
              <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 h-auto p-1">
                  <TabsTrigger
                    value="plan1"
                    className="relative text-base font-semibold py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    계획 A
                    <Badge variant="secondary" className="ml-2 font-medium">
                      {votes.plan1}표
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="plan2"
                    className="relative text-base font-semibold py-2 px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    계획 B
                    <Badge variant="secondary" className="ml-2 font-medium">
                      {votes.plan2}표
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                {Object.values(plans).map((plan) => (
                  <TabsContent key={plan.id} value={plan.id} className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                          <div>
                            <CardTitle>{plan.name}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                          </div>
                          <Button
                            variant={userVote === plan.id ? "default" : "outline"}
                            onClick={() => handleVote(plan.id)}
                            className="w-full sm:w-auto"
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            {userVote === plan.id ? "투표 취소" : "투표하기"}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Schedule */}
                        {plan.schedule.map((day) => (
                          <div key={day.day} className="border border-border rounded-lg p-4">
                            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-primary" />
                              Day {day.day} - {day.date}
                            </h3>
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
                          </div>
                        ))}

                        {/* AI Reasoning */}
                        <Card className="bg-muted">
                          <CardHeader>
                            <CardTitle className="text-base">이 계획을 선택한 이유</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground leading-relaxed">{plan.reasoning}</p>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Action Buttons */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>투표 마감까지 {daysRemaining}일 남음</span>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        onClick={handleRegenerate}
                        className="flex-1 sm:flex-none bg-transparent"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        계획 재생성
                      </Button>
                      <Button onClick={handleConfirm} className="flex-1 sm:flex-none">
                        <Check className="h-4 w-4 mr-2" />
                        계획 확정
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
