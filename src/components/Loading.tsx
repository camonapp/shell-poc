export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4 bg-bg text-muted">
      <div className="w-10 h-10 rounded-full border-[3px] border-primary/20 border-t-primary animate-spin" />
      <span className="text-sm">Cargando...</span>
    </div>
  )
}
