import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge" // Added Badge import
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Plane, Plus, LogIn, Calendar, MapPin, Users, Crown } from "lucide-react" // Added Crown icon
import { getMyGroups } from "@/api/group"

const currentUserId = localStorage.getItem('userId')

export default function RoomsPage() {
  const [joinLink, setJoinLink] = useState("")
  const navigate = useNavigate()

  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const data = await getMyGroups()
        if (data.exists) setGroups(data.groupList)
        else setGroups([])
      } catch (e) {
        setError(e.message || '그룹 목록을 불러오지 못했습니다')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleJoinRoom = () => {
    if (!joinLink) return

    // 1) /rooms/:id 패턴에서 id 추출 시도
    let id = joinLink.match(/\/rooms\/([^\/?#]+)/)?.[1]

    // 2) 숫자로 된 어떤 ID라도 추출 시도 (예: .../123)
    if (!id) {
      id = joinLink.match(/(\d+)/)?.[1]
    }

    if (id) return navigate(`/rooms/${id}`)
    const inviteCode = joinLink.match(/\/invite\/([^\/?#]+)/)?.[1]
    if (inviteCode && groups.length) return navigate(`/rooms/${groups[0].groupId}`)
    window.alert('유효한 초대 링크를 입력해주세요.')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="sm:flex-1" size="lg" onClick={() => navigate("/rooms/create")}>
            <Plus className="h-5 w-5 mr-2" />방 생성하기
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="sm:flex-1 bg-transparent" size="lg">
                <LogIn className="h-5 w-5 mr-2" />방 참가하기
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>방 참가하기</DialogTitle>
                <DialogDescription>초대 링크를 입력하여 여행 방에 참가하세요</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="invite-link">초대 링크</Label>
                  <Input
                    id="invite-link"
                    placeholder="https://gachigaja.com/invite/..."
                    value={joinLink}
                    onChange={(e) => setJoinLink(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleJoinRoom}>
                  참가하기
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">내 여행 그룹</h2>
          {loading && <p className="text-sm text-muted-foreground">불러오는 중...</p>}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {!loading && !error && groups.length === 0 && (
            <p className="text-sm text-muted-foreground">가입된 그룹이 없습니다. 새로 생성하거나 초대 링크로 참여하세요.</p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((g) => (
              <Card
                key={g.groupId}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/rooms/${g.groupId}`)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <Plane className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg text-foreground">{g.title}</h3>
                    {g.role === 'LEADER' && (
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        호스트
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{g.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{g.period}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
