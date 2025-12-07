import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import { createGroup } from "@/api/group"
import { toast } from "react-toastify"

export default function CreateRoomPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    startingPlace: "",
    endingPlace: "",
    startDate: "",
    endDate: "",
    transportation: "",
    budget: "",
    deadline: "",
  })

  // n박 m일로 날짜를 변환하는 함수
  const calculatePeriod = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays}박 ${diffDays + 1}일`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 날짜 유효성 가드
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const today = new Date()
      // normalize today to date-only
      today.setHours(0,0,0,0)
      if (isNaN(start) || isNaN(end)) { toast.warn('출발/종료 일자를 올바르게 입력해주세요'); return }
      if (start > end) { toast.warn('출발 일자는 종료 일자보다 이후일 수 없습니다'); return }
      const dl = new Date(formData.deadline)
      if (isNaN(dl)) { toast.warn('의견 수집 마감일을 올바르게 입력해주세요'); return }
      dl.setHours(0,0,0,0)
      if (dl < today) { toast.warn('의견 수집 마감일은 오늘보다 이전일 수 없습니다'); return }
      // 교통 수단 필수 선택 가드
      if (!formData.transportation) { toast.warn('교통 수단을 선택해주세요'); return }
      const payload = {
        title: formData.name,
        region: formData.region,
        startingPlace: formData.startingPlace,
        endingPlace: formData.endingPlace,
        transportation: formData.transportation,
        period: calculatePeriod(formData.startDate, formData.endDate),
        budget: parseInt(formData.budget),
        rDeadline: formData.deadline,
        startingDay: formData.startDate,
        endingDay: formData.endDate
      };

      const response = await createGroup(payload);

      navigate(`/rooms/${response.groupId}`);

    } catch (error) {
      console.error("그룹 생성 실패 : ", error);
      toast.error(error.response?.data?.message || "여행 방 생성 중 오류가 발생했습니다.");
    }
  };

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
                <Label htmlFor="region">여행지 *</Label>
                <Input
                  id="region"
                  placeholder="예: 제주도"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startingPlace">여행 시작지 *</Label>
                <Input
                  id="startingPlace"
                  placeholder="예: 김포공항"
                  value={formData.startingPlace}
                  onChange={(e) => setFormData({ ...formData, startingPlace: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endingPlace">여행 도착지 *</Label>
                <Input
                  id="endingPlace"
                  placeholder="예: 제주공항"
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
                  placeholder="예: 500000"
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
