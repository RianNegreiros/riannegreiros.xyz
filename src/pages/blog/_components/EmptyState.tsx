interface EmptyStateProps {
  searchQuery?: string
}

export default function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-lg text-muted-foreground">
        {searchQuery
          ? 'Nenhum post encontrado para sua busca.'
          : 'Nenhum post encontrado.'}
      </p>
    </div>
  )
}
