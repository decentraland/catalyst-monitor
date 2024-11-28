import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { WorldsCommsServer } from "../Servers/WorldCommsServer/WorldCommsServer"
import { WorldsContentServer } from "../Servers/WorldsContentServer/WorldsContentServer"
import { ServerMonitorProps } from "./ServerMonitor.types"
import { State, StatusResponse } from "./WorldServerMonitor.types"

const WorldsServerMonitor = React.memo((props: ServerMonitorProps) => {
  const { address, expectedEthNetwork, contributeUsers } = props

  const [state, setState] = useState<State | false>()

  useEffect(() => {
    const getWorldsNodeStatus = async () => {
      try {
        await fetch(`${address}/status`)
          .then((data) => data.json())
          .then(async (data: StatusResponse) => {
            if (data.comms.adapterType === "ws-room" && data.comms.statusUrl) {
              await fetch(data.comms.statusUrl)
                .then((data) => data.json())
                .catch(() => {
                  setState({
                    content: {
                      commitHash: data.content.commitHash,
                      worldsCount:
                        typeof data.content.worldsCount === "number"
                          ? { ens: 0, dcl: data.content.worldsCount }
                          : data.content.worldsCount,
                    },
                    comms: data.comms,
                    health: {
                      content: "Healthy",
                      comms: "Down",
                    },
                  })
                })
            } else {
              setState({
                content: {
                  commitHash: data.content.commitHash,
                  worldsCount:
                    typeof data.content.worldsCount === "number"
                      ? { ens: 0, dcl: data.content.worldsCount }
                      : data.content.worldsCount,
                },
                comms: data.comms,
                health: {
                  content: "Healthy",
                  comms: "Healthy",
                },
              })
            }

            contributeUsers(data.comms.users)
          })
          .catch(() => {
            setState({
              health: {
                content: "Down",
                comms: "Down",
              },
            })
          })
      } catch (err) {
        console.error(err)
      }
    }
    getWorldsNodeStatus()
  }, [])

  const getGlobalHealth = useCallback(() => {
    if (!state) return "Unknown"

    const healths = Object.values(state.health)
    if (healths.includes("Down")) return "Down"
    if (healths.includes("Unhealthy")) return "Unhealthy"
    return "Healthy"
  }, [state])

  const getHealth = useCallback(
    (server: "content" | "comms") => {
      return (state && state.health && state.health[server]) || "Unknown"
    },
    [state]
  )

  let title = address
  let isHttps = false
  if (address.startsWith("https://")) {
    title = address.substring("https://".length)
    isHttps = true
  }
  const globalHealth = getGlobalHealth()

  return (
    <div
      className={
        (expectedEthNetwork === "mainnet" ? "node-prd" : "node-dev") +
        (isHttps ? "" : " node-wrong") +
        " " +
        globalHealth.toLowerCase()
      }
    >
      <div className="node-title">{title}</div>
      {state && state.comms && (
        <div className="server-node-users"># {state.comms.users}</div>
      )}
      {state && (
        <WorldsContentServer
          status={state.content}
          address={address}
          health={getHealth("content")}
        />
      )}
      {state && (
        <WorldsCommsServer status={state.comms} health={getHealth("comms")} />
      )}
    </div>
  )
})

export { WorldsServerMonitor }
