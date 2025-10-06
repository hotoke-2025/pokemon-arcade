import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routes } from './routes.tsx'


const queryClient = new QueryClient()
const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('app') as HTMLElement)

root.render(
  <Auth0Provider
    domain="mako-nixon-25.au.auth0.com"
    clientId="uhu7X6fXsJnSduCjchoU8NuAOPCk0VY6"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://pokemon-arcade/api"
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Auth0Provider>,
)

// // POST BOOTCAMP STRETCHES // //

// Delete unused comments and code - Aeron ✅
// Update ReadMe - Aeron ✅
// Confirm if ### Auth0 section of Readme is correct - Annie
// Fix typescript errors - Kaylin
// Fix the sign in and audio boxes - Aeron
// Refactor code wherever possible 
// Pokemon arcade logo - fix size change between pages
// Pokedex nicknames change name in pokemon column 
// Device compatibility adjustments
// Accessibility adjustments

// Big stretch:

// Auth0 - user can signup with email
// Animate side mons - slowly scrolling vertically or bouncing off sides of screens
// Female character - use usePlayerSprite.ts (animations, gender selection in database, screen to choose gender in signup)
// Additional battle scene stuff
// Smarter/faster AI ffor tic-tac-johto - Annie