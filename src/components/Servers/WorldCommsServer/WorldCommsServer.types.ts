import { CommsStatus } from "../../ServerMonitor/WorldServerMonitor.types"

type WorldsCommsServerProps = {
  status?: CommsStatus
  health: string
}

export type { WorldsCommsServerProps }
