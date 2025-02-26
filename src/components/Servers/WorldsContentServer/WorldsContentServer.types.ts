import { ContentStatus } from "../../ServerMonitor/WorldServerMonitor.types"

type WorldsContentServerProps = {
  status?: ContentStatus
  address: string
  health: string
}

export type { WorldsContentServerProps }
