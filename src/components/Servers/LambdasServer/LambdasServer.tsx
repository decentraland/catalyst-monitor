import * as React from "react"
import { shortHash } from "../../../modules/utils"
import { ServerProps } from "../ServerProps.types"

const LambdasServer = React.memo((props: ServerProps) => {
  const { status, realm, health, onClickShowStatus } = props
  if (realm === "main") {
    return <div></div>
  }
  return (
    <div
      className={"lambdas " + health.toLowerCase()}
      onClick={() => onClickShowStatus("lambdas")}
    >
      <b>Lambdas v{status.lambdas.version}</b>
      <div>Hash: {shortHash(status.lambdas.commitHash)}</div>
    </div>
  )
})

export { LambdasServer }
