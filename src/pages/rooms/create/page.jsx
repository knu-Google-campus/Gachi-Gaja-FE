

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"

export default function CreateRoomPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    companions: "",
    destination: "",
    startDate: "",
    endDate: "",
    transportation: "",
    budget: "",
    accommodationType: "single",
    deadline: "",
  })

  // n박 m일로 날짜를 변환하는 함수
  const calculatePeriod = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays}박 ${diffTime + 1}일`;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // 임시로 랜덤 ID 생성 (실제로는 API 응답 사용)
    const newId = Math.floor(Math.random() * 1000).toString()
    navigate(`/rooms/${newId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/rooms")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          여행 목록으로 돌아가기
        </button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>새 여행 만들기</CardTitle>
            <CardDescription>여행의 기본 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">여행 이름 *</Label>
                <Input
                  id="name"
                  placeholder="예: 제주도 가족 여행"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companions">누구와 가나요? *</Label>
                <Input
                  id="companions"
                  placeholder="예: 가족, 친구, 동료"
                  value={formData.companions}
                  onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">목적지 *</Label>
                <Input
                  id="destination"
                  placeholder="예: 제주도"
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
                    <SelectValue placeholder="교통 수단을 선택하세요" />
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
                  placeholder="예: 500000"
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

              <Button type="submit" className="w-full" size="lg">
                여행 방 만들기
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
