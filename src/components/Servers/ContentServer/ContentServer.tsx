import * as React from "react"
import { shortHash } from "../../../modules/utils"
import { ServerProps } from "../ServerProps.types"

const ContentServer = React.memo((props: ServerProps) => {
  const { status, failedDeployments, realm, health, onClickShowStatus } = props
  if (realm === "main") {
    return <div></div>
  }
  return (
    <div
      className={"content " + health.toLowerCase()}
      onClick={() =>
        onClickShowStatus("content", [
          { name: "Failed Deployments", data: failedDeployments },
        ])
      }
    >
      <b>Content v{status.content.version}</b>
      <br />
      <b>State: {status.content.synchronizationStatus || "Unknown"}</b>
      <br />
      <div>Hash: {shortHash(status.content.commitHash)}</div>
      <div>
        Failed:{" "}
        {Array.isArray(failedDeployments)
          ? failedDeployments.length
          : failedDeployments}
      </div>
    </div>
  )
})

export { ContentServer }
