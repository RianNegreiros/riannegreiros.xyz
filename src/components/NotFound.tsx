import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { MotionDiv } from "./MotionComponents";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 text-center"
      >
        <MotionDiv
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Página não encontrada
          </h2>
          <p className="text-muted-foreground">
            Não foi possível encontrar o recurso solicitado
          </p>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild className="w-full sm:w-auto">
            <Link to="/">Voltar ao início</Link>
          </Button>
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}
