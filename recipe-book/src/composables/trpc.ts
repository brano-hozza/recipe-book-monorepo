import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../../recipe-book-api/src/router'

export function useTrpc() {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: import.meta.env.VITE_TRPC_URL as string
      })
    ]
  })
  return { trpc }
}
