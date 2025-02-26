import * as React from "react"
import { shortHash } from "../../../modules/utils"
import { WorldsCommsServerProps } from "./WorldCommsServer.types"

const WorldsCommsServer = React.memo((props: WorldsCommsServerProps) => {
  const { health, status } = props
  return (
    <div className={"comms " + health.toLowerCase()}>
      {status ? (
        <div>
          <div>
            <b>
              Comms:{" "}
              {status.adapterType === "ws-room"
                ? "WS Room Service"
                : status.adapterType === "livekit"
                  ? "LiveKit"
                  : "Unknown"}
            </b>
          </div>
          <div>Hash: {shortHash(status.commitHash)}</div>
          <div style={{ paddingLeft: "10px" }}>
            Active users: <b>{status.users}</b>
          </div>
          <div style={{ paddingLeft: "10px" }}>
            Inhabited worlds: <b>{status.rooms}</b>
          </div>
        </div>
      ) : null}
    </div>
  )
})

export { WorldsCommsServer }
