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
  const sumWorldsUsers = useCallback((_server: string, usersCount = 0) => {
    setTotalWorldsUsers((prev) => prev + usersCount)
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
