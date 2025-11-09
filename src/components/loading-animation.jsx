import { Plane, Map, Users } from "lucide-react"

export function LoadingAnimation() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[80vh] px-10 py-10"
      style={{ animation: "fadeIn 0.6s ease-out" }}
    >
      <div className="flex gap-10 mb-10">
        <div
          className="text-5xl text-primary"
          style={{
            animation: "float 2s ease-in-out infinite",
            animationDelay: "0s",
          }}
        >
          <Plane className="h-12 w-12" />
        </div>
        <div
          className="text-5xl text-primary"
          style={{
            animation: "float 2s ease-in-out infinite",
            animationDelay: "0.2s",
          }}
        >
          <Map className="h-12 w-12" />
        </div>
        <div
          className="text-5xl text-primary"
          style={{
            animation: "float 2s ease-in-out infinite",
            animationDelay: "0.4s",
          }}
        >
          <Users className="h-12 w-12" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-4 text-center">AI가 여행 계획을 생성하고 있습니다</h2>
      <p className="text-base text-muted-foreground text-center mb-8">
        그룹의 선호도를 바탕으로 최적의 일정을 만들고 있어요
      </p>
      <div
        className="border-4 border-border border-t-primary rounded-full w-12 h-12"
        style={{ animation: "spin 1s linear infinite" }}
      />
    </div>
  )
}
