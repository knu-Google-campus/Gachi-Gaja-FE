export function Spinner({ label = '불러오는 중...', size = 40, className = '' }) {
  const borderSize = Math.max(4, Math.round(size / 10))
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${borderSize}px`,
    animation: 'spin 1s linear infinite'
  }
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="rounded-full border-border border-t-primary"
        style={style}
      />
      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  )
}