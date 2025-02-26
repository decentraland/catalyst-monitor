import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import {
  About,
  FailedDeployments,
  StatusContent,
} from "@dcl/catalyst-api-specs/lib/client"
import { getHealthLabel } from "../../modules/utils"
import { ArchipelagoServer } from "../Servers/ArchipelagoServer/ArchipelagoServer"
import { ContentServer } from "../Servers/ContentServer/ContentServer"
import { LambdasServer } from "../Servers/LambdasServer/LambdasServer"
import { ServerMonitorProps, State } from "./ServerMonitor.types"

const ServerMonitor = React.memo((props: ServerMonitorProps) => {
  const { address, expectedEthNetwork, contributeUsers } = props

  const [state, setState] = useState<State>({
    about: undefined,
    usersInServer: 0,
  })

  useEffect(() => {
    const getNodeStatus = async () => {
      if (
        address !== "https://realm-provider.decentraland.org/main" &&
        address !== "https://realm-provider-ea.decentraland.org/main"
      ) {
        getContentFailedDeployments()
      }

      const res = await fetch(`${address}/about`)
      const about: About = await res.json()

      const usersInServer = about.comms?.usersCount ? about.comms.usersCount : 0

      console.log(" > address > ", address)
      console.log(" > usersInServer > ", usersInServer)

      setState((prev) => ({
        ...prev,
        about,
        usersInServer,
      }))
      contributeUsers(usersInServer)
    }

    const getContentFailedDeployments = () => {
      fetch(`${address}/content/failed-deployments`)
        .then((res) => res.json())
        .then((data: FailedDeployments) =>
          setState((prev) => ({ ...prev, contentFailedDeployments: data }))
        )
        .catch(console.error)
    }

    getNodeStatus()
  }, [])

  const [, setStatusModal] = useState<
    | {
        statusContent: StatusContent
        extra?: { name: string; data?: FailedDeployments }[]
      }
    | false
  >(false)

  const handleShowStatus = useCallback(
    async (
      server: string,
      extra?: { name: string; data?: FailedDeployments }[]
    ) => {
      if (!state.about) {
        return
      }
      const statusUrl = `${address}/${server}/status`
      const status: StatusContent = await fetch(statusUrl).then((r) => r.json())
      setStatusModal({ statusContent: status, extra })
    },
    [state.about]
  )

  let title = address

  let isHttps = false
  if (address.startsWith("https://")) {
    title = address.substring("https://".length)
    isHttps = true
  }

  if (!state.about) {
    return (
      <div
        className={
          (expectedEthNetwork === "mainnet" ? "node-prd" : "node-dev") +
          (isHttps ? "" : " node-wrong") +
          " " +
          getHealthLabel(false).toLowerCase()
        }
      >
        <div className="node-title">{title}</div>
      </div>
    )
  }

  const globalHealth = getHealthLabel(state.about.healthy)
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
      <div className="server-node-users">
        # {state.about.configurations.realmName}: {state.usersInServer}
      </div>
      <ContentServer
        status={state.about}
        address={address}
        failedDeployments={state.contentFailedDeployments}
        expectedEthNetwork={expectedEthNetwork}
        realm={state.about.configurations.realmName}
        health={getHealthLabel(state.about.content.healthy)}
        onClickShowStatus={handleShowStatus}
      />

      <LambdasServer
        status={state.about}
        address={address}
        realm={state.about.configurations.realmName}
        health={getHealthLabel(state.about.lambdas.healthy)}
        onClickShowStatus={handleShowStatus}
      />
      {state.about.comms && (
        <ArchipelagoServer
          status={state.about}
          address={address}
          health={getHealthLabel(state.about.comms.healthy)}
          onClickShowStatus={handleShowStatus}
        />
      )}
    </div>
  )
})

export { ServerMonitor }
