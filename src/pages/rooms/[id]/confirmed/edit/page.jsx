
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plane, ArrowLeft, Plus, Trash2 } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getFinalPlans, updatePlan, addNewPlan, deletePlan } from "@/api/plans"
import { toast } from "react-toastify"
 

export default function EditConfirmedPlanPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [plans, setPlans] = useState([]) // API planList 기반
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deletedPlanIds, setDeletedPlanIds] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await getFinalPlans(id)
        const list = Array.isArray(res?.planList) ? res.planList : []
        setPlans(list.map(p => ({ ...p, _isNew: false })))
      } catch (e) {
        setError(e.message || '최종 계획을 불러오는 중 오류가 발생했습니다')
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const addActivity = () => {
    setPlans(prev => ([
      ...prev,
      {
        planId: undefined,
        startingTime: "",
        endingTime: "",
        location: "",
        info: "",
        transportation: "",
        cost: "",
        _isNew: true
      }
    ]))
  }

  const removeActivity = (index) => {
    setPlans(prev => {
      const removing = prev[index]
      if (removing?.planId) {
        setDeletedPlanIds(ids => [...ids, removing.planId])
      }
      return prev.filter((_, i) => i !== index)
    })
  }

  const updateActivity = (index, field, value) => {
    setPlans(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // 삭제 요청 (여러 개 가능)
      for (const delId of deletedPlanIds) {
        await deletePlan(id, delId)
      }
      for (const p of plans) {
        const body = {
          startingTime: p.startingTime,
          endingTime: p.endingTime,
          location: p.location,
          info: p.info,
          transportation: p.transportation,
          cost: p.cost,
        }
        if (p._isNew) {
          await addNewPlan(id, body)
        } else if (p.planId) {
          await updatePlan(id, p.planId, body)
        }
      }
      navigate(`/rooms/${id}/confirmed`)
    } catch (err) {
      toast.error(err.message || '저장 중 오류가 발생했습니다')
    }
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
        {loading && (
          <div className="min-h-[120px] flex items-center justify-center">
            <Spinner label="계획 수정 정보를 불러오는 중..." size={40} />
          </div>
        )}
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
              <Card>
                <CardContent className="space-y-4 pt-6">
                  {plans.map((p, index) => (
                    <div key={p.planId || index} className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-3 space-y-2">
                        <Label>시작 시간</Label>
                        <Input type="datetime-local" value={p.startingTime} onChange={(e) => updateActivity(index, 'startingTime', e.target.value)} />
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>종료 시간</Label>
                        <Input type="datetime-local" value={p.endingTime} onChange={(e) => updateActivity(index, 'endingTime', e.target.value)} />
                      </div>
                      <div className="col-span-3 space-y-2">
                        <Label>장소</Label>
                        <Input value={p.location} onChange={(e) => updateActivity(index, 'location', e.target.value)} />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label>이동수단</Label>
                        <Input value={p.transportation} onChange={(e) => updateActivity(index, 'transportation', e.target.value)} />
                      </div>
                      <div className="col-span-12 space-y-2">
                        <Label>설명</Label>
                        <Input value={p.info} onChange={(e) => updateActivity(index, 'info', e.target.value)} />
                      </div>
                      <div className="col-span-3 sm:col-span-2 space-y-2">
                        <Label>비용</Label>
                        <Input type="number" value={p.cost} onChange={(e) => updateActivity(index, 'cost', e.target.value)} />
                      </div>
                      <div className="col-span-12 flex justify-end">
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeActivity(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addActivity}>
                    <Plus className="h-4 w-4 mr-2" />
                    일정 추가
                  </Button>
                </CardContent>
              </Card>

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
