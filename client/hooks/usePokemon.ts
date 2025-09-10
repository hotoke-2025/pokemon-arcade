import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getPokemon } from '../apis/pokemon.ts'

export function usePokemon() {
  const query = useQuery({ queryKey: ['pokemon'], queryFn: getPokemon })
  return {
    ...query,
  }
}

export function usePokemonMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })

  return mutation
}
