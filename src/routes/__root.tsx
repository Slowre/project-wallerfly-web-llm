import Header from '@/components/Header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import TanstackQueryLayout from '../integrations/tanstack-query/layout'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1 p-16">
        <Outlet />
        <TanstackQueryLayout />
      </div>
    </div>
    // <>
    //   <Outlet />
    //   <TanStackRouterDevtools />
    // </>
  ),
})
