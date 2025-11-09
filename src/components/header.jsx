

import { Plane, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <Plane className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">같이가자</span>
        </button>

        <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-2">
          <LogOut className="h-4 w-4" />
          로그아웃
        </Button>
      </div>
    </header>
  )
}
