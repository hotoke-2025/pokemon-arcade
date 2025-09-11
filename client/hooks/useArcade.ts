import { useQuery } from '@tanstack/react-query'
import request from 'superagent'

import type { Arcade } from '../../models/Arcade.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export default function useArcade() {
  return useQuery({
    queryKey: ['arcade'],
    queryFn: async () => {
      const res = await request.get(`${rootURL}/arcade`)
      if (res.ok) {
        return res.body as { arcade: Arcade[] }
      }

      throw new Error(res.text)
    },
  })
}
