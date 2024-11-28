import { About, FailedDeployments } from "@dcl/catalyst-api-specs/lib/client"

type ServerMonitorProps = {
  address: string
  expectedEthNetwork: string
  contributeUsers: (users: number) => void
}

type State = {
  about?: About
  contentFailedDeployments?: FailedDeployments
  usersInServer: number
}

export type { ServerMonitorProps, State }
