import { useState } from "react"
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
import { mockRooms, currentUserId } from "@/lib/mock-data" // Added currentUserId import

export default function RoomsPage() {
  const [joinLink, setJoinLink] = useState("")
  const navigate = useNavigate()

  const plannedTrips = mockRooms.filter((room) => room.status === "planned")
  const completedTrips = mockRooms.filter((room) => room.status === "completed")

  const handleJoinRoom = () => {
    if (!joinLink) return

    // 1) /rooms/:id 패턴에서 id 추출 시도
    let id = joinLink.match(/\/rooms\/([^\/?#]+)/)?.[1]

    // 2) 숫자로 된 어떤 ID라도 추출 시도 (예: .../123)
    if (!id) {
      id = joinLink.match(/(\d+)/)?.[1]
    }

    if (id) {
      navigate(`/rooms/${id}`)
      return
    }

    // 3) /invite/:code 형태일 때는 백엔드가 없으므로 임시 매핑: 첫 번째 방으로 이동
    const inviteCode = joinLink.match(/\/invite\/([^\/?#]+)/)?.[1]
    if (inviteCode) {
      const fallbackId = plannedTrips?.[0]?.id || completedTrips?.[0]?.id || '1'
      navigate(`/rooms/${fallbackId}`)
      return
    }

    // 4) 유효하지 않은 링크
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

        {/* Planned Trips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">계획된 여행</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plannedTrips.map((trip) => (
              <Card
                key={trip.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/rooms/${trip.id}`)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage || "/placeholder.svg"}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Plane className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg text-foreground">{trip.name}</h3>
                    {trip.hostId === currentUserId && (
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        호스트
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {trip.startDate} - {trip.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{trip.memberCount}명</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Completed Trips */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">다녀온 여행</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedTrips.map((trip) => (
              <Card
                key={trip.id}
                className="hover:shadow-lg transition-shadow cursor-pointer opacity-80"
                onClick={() => navigate(`/rooms/${trip.id}/confirmed`)}
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage || "/placeholder.svg"}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Plane className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-lg text-foreground">{trip.name}</h3>
                    {trip.hostId === currentUserId && (
                      <Badge variant="secondary" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        호스트
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {trip.startDate} - {trip.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{trip.memberCount}명</span>
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
