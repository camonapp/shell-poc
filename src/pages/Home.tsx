import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Shell POC</h1>
      <p className="text-sm text-muted">Abrí la experience con un outcome por query</p>
      <div className="flex gap-4">
        <Link
          to="/experience?outcome=success"
          className="px-6 py-3 bg-success text-white rounded-lg font-semibold no-underline"
        >
          Test Éxito
        </Link>
        <Link
          to="/experience?outcome=error"
          className="px-6 py-3 bg-error text-white rounded-lg font-semibold no-underline"
        >
          Test Error
        </Link>
      </div>
    </div>
  )
}
