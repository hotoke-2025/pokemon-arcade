import {
  useQuery,
  // useMutation,
  // useQueryClient,
  // MutationFunction,
} from '@tanstack/react-query'

// Code from coins-5000 - to edit and use when fetching data on the player in the backend:
// import { getPlayerSprite } from '../apis/player.ts'

// export function usePlayerSprite() {
//   const query = useQuery({ queryKey: ['playerSprite'], queryFn: getPlayerSprite })
//   return {
//     ...query,
//   }
// }