import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from "lucide-react"

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate("/rooms")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute transform"
          style={{
            top: "40%",
            left: "-100px",
            animation: "flyAcross 30s linear infinite",
          }}
        >
          <img
            src="/images/design-mode/7893979.png"
            alt="airplane"
            style={{
              width: "100px",
              height: "100px",
              opacity: 0.25,
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">같이가자</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 md:py-24 flex-1 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center md:text-left" style={{ animation: "fadeInLeft 0.8s ease-out" }}>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                함께 만드는
                <br />
                우리의 여행
              </h1>
              <p className="text-xl text-muted-foreground">모두의 의견을 한 곳에</p>
            </div>

            <div className="space-y-3 text-muted-foreground max-w-md mx-auto md:mx-0">
              <p>✓ 의견 수집부터 일정 생성까지 자동화</p>
              <p>✓ 투표로 결정하는 민주적인 여행</p>
              <p>✓ 모든 정보를 한눈에 관리</p>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <Card
            className="w-full max-w-md mx-auto shadow-lg"
            style={{ animation: "fadeInRight 0.8s ease-out 0.2s backwards" }}
          >
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">{isLogin ? "로그인" : "회원가입"}</CardTitle>
              <CardDescription className="text-base">
                {isLogin ? "여행을 시작하세요" : "새로운 여행을 시작하세요"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" placeholder="홍길동" className="h-11" />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" placeholder="example@email.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="h-11" />
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" className="h-11" />
                  </div>
                )}
                <Button type="submit" className="w-full h-11 text-base">
                  {isLogin ? "로그인" : "회원가입"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline cursor-pointer">
                  {isLogin ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer
        className="border-t border-border mt-auto relative z-10"
        style={{ animation: "fadeInUp 0.8s ease-out 0.4s backwards" }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">© 2025 같이가자. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
