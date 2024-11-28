type WorldStatus = {
  worldName: string
  users: number
}

type CommsStatus = {
  adapterType: string
  statusUrl: string
  commitHash?: string
  users: number
  rooms: number
  details?: WorldStatus[]
  timestamp: number
}

type ContentStatus = {
  commitHash: string
  worldsCount: { ens: number; dcl: number }
}

type StatusResponse = {
  content: ContentStatus
  comms: CommsStatus
}

type State = {
  comms?: CommsStatus
  content?: ContentStatus
  health: { comms: string; content: string }
}

export type { CommsStatus, ContentStatus, StatusResponse, State }
