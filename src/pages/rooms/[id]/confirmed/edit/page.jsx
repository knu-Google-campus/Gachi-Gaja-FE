

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plane, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function EditConfirmedPlanPage() {
  const navigate = useNavigate()
  const { id = "1" } = useParams()
  const [schedule, setSchedule] = useState([
    {
      day: 1,
      date: "2024.12.20 (금)",
      activities: [
        { time: "09:00", location: "김포공항 출발", transport: "비행기" },
        { time: "10:30", location: "제주공항 도착", transport: "렌터카" },
        { time: "12:00", location: "올레국수 (점심)", transport: "도보" },
      ],
    },
  ])

  const addActivity = (dayIndex) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities.push({ time: "", location: "", transport: "" })
    setSchedule(newSchedule)
  }

  const removeActivity = (dayIndex, activityIndex) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities.splice(activityIndex, 1)
    setSchedule(newSchedule)
  }

  const updateActivity = (dayIndex, activityIndex, field, value) => {
    const newSchedule = [...schedule]
    newSchedule[dayIndex].activities[activityIndex][field] = value
    setSchedule(newSchedule)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/rooms/${id}/confirmed`)
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
        <Link
          to={`/rooms/${id}/confirmed`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          확정된 계획으로 돌아가기
        </Link>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>여행 계획 수정</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {schedule.map((day, dayIndex) => (
                <Card key={dayIndex}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Day {day.day} - {day.date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activityIndex} className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-3 space-y-2">
                          <Label htmlFor={`time-${dayIndex}-${activityIndex}`}>시간</Label>
                          <Input
                            id={`time-${dayIndex}-${activityIndex}`}
                            type="time"
                            value={activity.time}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "time", e.target.value)}
                          />
                        </div>
                        <div className="col-span-4 space-y-2">
                          <Label htmlFor={`location-${dayIndex}-${activityIndex}`}>장소</Label>
                          <Input
                            id={`location-${dayIndex}-${activityIndex}`}
                            value={activity.location}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "location", e.target.value)}
                          />
                        </div>
                        <div className="col-span-4 space-y-2">
                          <Label htmlFor={`transport-${dayIndex}-${activityIndex}`}>이동수단</Label>
                          <Input
                            id={`transport-${dayIndex}-${activityIndex}`}
                            value={activity.transport}
                            onChange={(e) => updateActivity(dayIndex, activityIndex, "transport", e.target.value)}
                          />
                        </div>
                        <div className="col-span-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeActivity(dayIndex, activityIndex)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => addActivity(dayIndex)}>
                      <Plus className="h-4 w-4 mr-2" />
                      일정 추가
                    </Button>
                  </CardContent>
                </Card>
              ))}

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => navigate(-1)}>
                  취소
                </Button>
                <Button type="submit" className="flex-1">
                  저장
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
