import * as React from "react"
import { useCallback, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Typography } from "decentraland-ui2"
import { WorldsServerMonitor } from "../../ServerMonitor/WorldsServerMonitor"
import {
  ServersContainer,
  ServersSummary,
  ServersWrapper,
} from "../Servers.styled"

const worldsMainnetServers = ["https://worlds-content-server.decentraland.org"]

const WorldMainnetServers = React.memo(() => {
  const [totalWorldsUsers, setTotalWorldsUsers] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [serversCounted, setServersCounted] = useState(new Set<string>())

  const sumWorldsUsers = useCallback((server: string, usersCount = 0) => {
    setServersCounted((prevServers) => {
      if (!prevServers.has(server)) {
        setTotalWorldsUsers((prev) => prev + usersCount)
        return new Set(prevServers).add(server)
      }
      return prevServers
    })
  }, [])

  return (
    <ServersContainer defaultExpanded>
      <ServersSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="WorldMainnetServers-content"
        id="WorldMainnetServers-header"
      >
        <Typography variant="body1">
          Total Worlds Users: {totalWorldsUsers}
        </Typography>
      </ServersSummary>
      <ServersWrapper>
        {worldsMainnetServers.map((server, key) => (
          <WorldsServerMonitor
            key={key}
            address={server}
            expectedEthNetwork="mainnet"
            contributeUsers={(usersCount) => sumWorldsUsers(server, usersCount)}
          />
        ))}
      </ServersWrapper>
    </ServersContainer>
  )
})

export { WorldMainnetServers }
