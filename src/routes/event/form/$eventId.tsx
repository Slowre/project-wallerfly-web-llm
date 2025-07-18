import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/event/form/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {eventId} =Route.useParams()
  return <div>Hello "/event/form/$eventId"! {eventId}</div>
}
