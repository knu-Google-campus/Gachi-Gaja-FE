import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { acceptInvite } from "@/api/invites"

export default function InviteAcceptPage() {
  const navigate = useNavigate()
  const { id: groupId } = useParams()

  useEffect(() => {
    const run = async () => {
      try {
        if (!groupId) return navigate("/")
        await acceptInvite(groupId)
        navigate(`/rooms/${groupId}`)
      } catch (e) {
        alert(e.message || "초대 수락 실패")
        navigate("/")
      }
    }
    run()
  }, [groupId, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border-4 border-border border-t-primary rounded-full w-10 h-10" style={{ animation: "spin 1s linear infinite" }} />
      <span className="sr-only">처리 중...</span>
    </div>
  )
}
