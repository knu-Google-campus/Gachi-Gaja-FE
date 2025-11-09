

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import { mockRooms } from "@/lib/mock-data"

export default function EditRoomPage() {
  const navigate = useNavigate()
  const params = useParams()
  const roomId = params.id

  const room = mockRooms.find((r) => r.id === roomId) || mockRooms[0]

  const [formData, setFormData] = useState({
    name: room.name,
    companions: "가족",
    destination: room.destination,
    startDate: room.startDate,
    endDate: room.endDate,
    transportation: "plane",
    budget: "500000",
    accommodationType: "single",
    deadline: room.opinionDeadline,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/rooms/${roomId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.push(`/rooms/${roomId}`)}
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
                <Label htmlFor="companions">누구와 가나요? *</Label>
                <Input
                  id="companions"
                  value={formData.companions}
                  onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
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
                <Select
                  value={formData.transportation}
                  onValueChange={(value) => setFormData({ ...formData, transportation: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">자동차</SelectItem>
                    <SelectItem value="train">기차</SelectItem>
                    <SelectItem value="bus">버스</SelectItem>
                    <SelectItem value="plane">비행기</SelectItem>
                    <SelectItem value="mixed">혼합</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="accommodationType">숙소 타입 *</Label>
                <Select
                  value={formData.accommodationType}
                  onValueChange={(value) => setFormData({ ...formData, accommodationType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">단일 숙소</SelectItem>
                    <SelectItem value="multiple">다중 숙소</SelectItem>
                  </SelectContent>
                </Select>
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
