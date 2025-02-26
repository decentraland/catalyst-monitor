import * as React from "react"
import { useCallback, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Typography } from "decentraland-ui2"
import { ServerMonitor } from "../../ServerMonitor/ServerMonitor"
import { WorldsServerMonitor } from "../../ServerMonitor/WorldsServerMonitor"
import {
  ServersContainer,
  ServersSummary,
  ServersWrapper,
} from "../Servers.styled"

const nonDAOMainnetServers = [
  "https://peer-testing.decentraland.org",
  "https://peer-testing-2.decentraland.org",
  "https://peer-testing-3.decentraland.org",
]

const zoneSepoliaServers = [
  "https://peer.decentraland.zone",
  "https://peer-ue-2.decentraland.zone",
  "https://peer-ap1.decentraland.zone",
  "https://realm-provider.decentraland.zone/main",
]

const worldsSepoliaServers = ["https://worlds-content-server.decentraland.zone"]

const ExtraServers = React.memo(() => {
  const [totalNonDAOMainnetUsers, setTotalNonDAOMainnetUsers] = useState(0)
  const [totalSepoliaDevUsers, setTotalSepoliaDevUsers] = useState(0)
  const [totalSepoliaWorldsUsers, setTotalSepoliaWorldsUsers] = useState(0)
  const [, setServersCounted] = useState(new Set<string>())

  const sumUsers = useCallback(
    (
      server: string,
      usersCount: number,
      setter: React.Dispatch<React.SetStateAction<number>>
    ) => {
      const validUsersCount = Number(usersCount) || 0 // Asegurarse de que usersCount sea un número
      setServersCounted((prevServers: Set<string>) => {
        if (!prevServers.has(server)) {
          setter((prev) => prev + validUsersCount)
          return new Set(prevServers).add(server)
        }
        return prevServers
      })
    },
    []
  )

  const currentUrl = window.location.href.toString()

  if (currentUrl.indexOf("includeDevServers") >= 0) {
    return (
      <ServersContainer defaultExpanded>
        <ServersSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="ExtraServers-content"
          id="ExtraServers-header"
        >
          <Typography variant="body1">
            Total Users:{" "}
            {totalNonDAOMainnetUsers +
              totalSepoliaDevUsers +
              totalSepoliaWorldsUsers}
          </Typography>
        </ServersSummary>
        <ServersWrapper>
          {nonDAOMainnetServers.map((server, key) => (
            <ServerMonitor
              key={key}
              address={server}
              expectedEthNetwork="mainnet"
              contributeUsers={(usersCount) =>
                sumUsers(server, usersCount, setTotalNonDAOMainnetUsers)
              }
            />
          ))}
        </ServersWrapper>
        <ServersWrapper>
          {zoneSepoliaServers.map((server, key) => (
            <ServerMonitor
              key={key}
              address={server}
              expectedEthNetwork="sepolia"
              contributeUsers={(usersCount) =>
                sumUsers(server, usersCount, setTotalSepoliaDevUsers)
              }
            />
          ))}
        </ServersWrapper>
        <ServersWrapper>
          {worldsSepoliaServers.map((server, key) => (
            <WorldsServerMonitor
              key={key}
              address={server}
              expectedEthNetwork="sepolia"
              contributeUsers={(usersCount) =>
                sumUsers(server, usersCount, setTotalSepoliaWorldsUsers)
              }
            />
          ))}
        </ServersWrapper>
      </ServersContainer>
    )
  } else {
    return <div />
  }
})

export { ExtraServers }
