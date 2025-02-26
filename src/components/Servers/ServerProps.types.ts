import { About, FailedDeployments } from "@dcl/catalyst-api-specs/lib/client"

type ServerProps = {
  status: About
  address: string
  failedDeployments?: FailedDeployments
  expectedEthNetwork?: string
  realm?: string
  health: string
  onClickShowStatus: (
    server: string,
    extra?: { name: string; data?: FailedDeployments }[]
  ) => void
}

export type { ServerProps }
