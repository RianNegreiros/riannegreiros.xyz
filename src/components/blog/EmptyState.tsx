interface EmptyStateProps {
  searchQuery?: string
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="py-8 text-center">
      <p className="text-muted-foreground text-lg">
        {searchQuery
          ? 'Nenhum post encontrado para sua busca.'
          : 'Nenhum post encontrado.'}
      </p>
    </div>
  )
}
