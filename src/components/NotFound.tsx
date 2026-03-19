import { Link } from 'react-router-dom'
import { Button } from './ui/button'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center animate-slide-up">
        <div className="space-y-4 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground">
            Não foi possível encontrar o recurso solicitado
          </p>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
