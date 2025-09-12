import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { fetchPokemonById, addPokedex, deletePokedex } from '../apis/pokemon.ts'

export function usePokedex() {
  // unsure if fetchPokemonById needs a parameter
  const query = useQuery({ queryKey: ['pokemon'], queryFn: () => fetchPokemonById })
  return {
    ...query,
    isLoadingProperties: query.isLoading,
    isErrorProperties: query.isError,
  }
}

export function usePokedexMutation<TData = unknown, TVariables = unknown>(
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

export function useAddPokemon() {
  return usePokedexMutation(addPokedex)
}

export function useDeletePokemon() {
  return usePokedexMutation(deletePokedex)
}