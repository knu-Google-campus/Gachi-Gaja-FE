

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { getGroupDetail, updateGroup } from "@/api/group"

export default function EditRoomPage() {
  const navigate = useNavigate()
  const params = useParams()
  const roomId = params.id

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    startingPlace: "",
    endingPlace: "",
    startDate: "",
    endDate: "",
    transportation: "plane",
    budget: "",
    deadline: "",
  })

  // n박 m일 계산 함수
  const calculatePeriod = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}박 ${diffDays + 1}일`;
  }

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGroupDetail(roomId)
        setFormData(prev => ({
          ...prev,
          name: data.title,
          destination: data.region,
          startingPlace: data.startingPlace || prev.startingPlace,
          endingPlace: data.endingPlace || prev.endingPlace,
          // period parsing not implemented (n박 m일)
          transportation: data.transportation,
          budget: data.budget,
          deadline: data.rDeadline,
          startDate: data.startingDay || prev.startDate,
          endDate: data.endingDay || prev.endDate
        }))
      } catch (e) {
        alert(e.message || '그룹 정보를 불러오지 못했습니다')
        navigate('/rooms')
      }
    }
    if (roomId) load()
  }, [roomId, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title: formData.name,
        region: formData.destination,
        startingPlace: formData.startingPlace,
        endingPlace: formData.endingPlace,
        transportation: formData.transportation,
        period: calculatePeriod(formData.startDate, formData.endDate),
        budget: parseInt(formData.budget) || 0,
        rDeadline: formData.deadline,
        startingDay: formData.startDate,
        endingDay: formData.endDate
      }
      await updateGroup(roomId, payload)
      navigate(`/rooms/${roomId}`)
    } catch (e) {
      alert(e.message || '수정 실패')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(`/rooms/${roomId}`)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          여행 방으로 돌아가기
        </button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>여행 정보 수정</CardTitle>
            <CardDescription>여행의 기본 정보를 수정할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">여행 이름 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              

              <div className="space-y-2">
                <Label htmlFor="destination">목적지 *</Label>
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startingPlace">여행 시작지 *</Label>
                <Input
                  id="startingPlace"
                  value={formData.startingPlace}
                  onChange={(e) => setFormData({ ...formData, startingPlace: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endingPlace">여행 도착지 *</Label>
                <Input
                  id="endingPlace"
                  value={formData.endingPlace}
                  onChange={(e) => setFormData({ ...formData, endingPlace: e.target.value })}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">출발 일자 *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">종료 일자 *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transportation">교통 수단 *</Label>
                <Input
                  id="transportation"
                  placeholder="예: 렌터카, 기차, 버스"
                  value={formData.transportation}
                  onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">1인당 예상 경비 (원) *</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>

              

              <div className="space-y-2">
                <Label htmlFor="deadline">의견 수집 마감일 *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>

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
