import * as React from "react"
import { shortHash } from "../../../modules/utils"
import { ServerProps } from "../ServerProps.types"

const ArchipelagoServer = React.memo((props: ServerProps) => {
  const { onClickShowStatus, status } = props
  return (
    <div
      className={"archipelago " + props.health.toLowerCase()}
      onClick={() => onClickShowStatus("archipelago")}
    >
      <b>Archipelago v{status.comms!.version}</b>
      <div>Hash: {shortHash(status.comms!.commitHash)}</div>
    </div>
  )
})

export { ArchipelagoServer }
