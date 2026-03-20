import { Button } from './ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="animate-slide-up w-full max-w-md space-y-8 text-center">
        <div
          className="animate-scale-in space-y-4"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <h1 className="text-primary text-8xl font-bold">404</h1>
          <h2 className="text-foreground text-2xl font-semibold">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground">
            Não foi possível encontrar o recurso solicitado
          </p>
        </div>

        <div
          className="animate-fade-in"
          style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <Button asChild className="w-full sm:w-auto">
            <a href="/">Voltar ao início</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
