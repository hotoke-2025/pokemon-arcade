import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { fetchPokemonById, addPokedex, deletePokedex, AddPokedexInput } from '../apis/pokemon.ts'
  import { useAuth0 } from '@auth0/auth0-react';

async function fetchPokedex() {
  const res = await fetch('/api/v1/pokedex')
  if (!res.ok) throw new Error('Failed to fetch pokedex')
  const data = await res.json()
  return data.pokemons
}

export function usePokedex() {
  const query = useQuery({
    queryKey: ['pokedex'],
    queryFn: fetchPokedex,
  })
  return {
    ...query,
    isLoadingProperties: query.isLoading,
    isErrorProperties: query.isError,
  }
}

export function usePokemonById(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id),
  })
}

export function usePokedexMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokedex'] })
    },
  })
  return mutation
}

export function useAddPokemon() {
  const { token } = useAuth0()
  return usePokedexMutation((pokemon: AddPokedexInput) => {
    return addPokedex(pokemon, token);
 });
}

export function useDeletePokemon() {
  return usePokedexMutation(deletePokedex)
}