import {
//  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
//import request from 'superagent'

// const rootURL = new URL(`/api/v1`, document.baseURI)

// export default function usePokemon(day: string) {
//   function getRandomMonId(min: number, max: number): number {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }
//   const monId = getRandomMonId(1,1025)
//   return useQuery({
//     queryFn: async () => {
//       const res = await request.get(`${rootURL}/game1/${monId}`)
//       return res.body
//     },

//     queryKey: ['pokemon', day],
//   })
// }

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
