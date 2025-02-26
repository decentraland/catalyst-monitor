import * as React from "react"
import { shortHash } from "../../../modules/utils"
import { WorldsContentServerProps } from "./WorldsContentServer.types"

const WorldsContentServer = React.memo((props: WorldsContentServerProps) => {
  const { status, health } = props
  return (
    <div className={"content " + health.toLowerCase()}>
      <b>World Content Server</b>
      <br />
      {status && <div>Hash: {shortHash(status.commitHash)}</div>}
      <div style={{ paddingLeft: "10px" }}>
        {" "}
        {status && `Deployed DCL worlds: ${status.worldsCount.dcl}`}
      </div>
      <div style={{ paddingLeft: "10px" }}>
        {" "}
        {status && `Deployed ENS worlds: ${status.worldsCount.ens}`}
      </div>
    </div>
  )
})

export { WorldsContentServer }
