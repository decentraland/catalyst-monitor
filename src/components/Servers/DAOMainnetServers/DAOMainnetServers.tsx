import * as React from "react"
import { useCallback, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Typography } from "decentraland-ui2"
import { ServerMonitor } from "../../ServerMonitor/ServerMonitor"
import {
  ServersContainer,
  ServersSummary,
  ServersWrapper,
} from "../Servers.styled"

const DAOMainnetServersUrls = [
  "https://peer-ec1.decentraland.org",
  "https://peer-ec2.decentraland.org",
  "https://peer-wc1.decentraland.org",
  "https://peer-eu1.decentraland.org",
  "https://peer-ap1.decentraland.org",
  "https://interconnected.online",
  "https://peer.decentral.io",
  "https://peer.melonwave.com",
  "https://peer.kyllian.me",
  "https://peer.uadevops.com",
  "https://peer.dclnodes.io",
  "https://realm-provider.decentraland.org/main",
  "https://realm-provider-ea.decentraland.org/main",
]

const DAOMainnetServers = React.memo(() => {
  const [totalProductiveUsers, setTotalProductiveUsers] = useState(0)
  const [, setServersCounted] = useState(new Set<string>())

  const sumProductiveUsers = useCallback((server: string, usersCount = 0) => {
    setServersCounted((prevServers: Set<string>) => {
      if (!prevServers.has(server)) {
        setTotalProductiveUsers((prev) => prev + usersCount)
        return new Set(prevServers).add(server)
      }
      return prevServers
    })
  }, [])

  return (
    <ServersContainer defaultExpanded>
      <ServersSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="DAOMainnetServers-content"
        id="DAOMainnetServers-header"
      >
        <Typography variant="body1">
          Total Users: {totalProductiveUsers}
        </Typography>
      </ServersSummary>
      <ServersWrapper>
        {DAOMainnetServersUrls.map((server, key) => (
          <ServerMonitor
            key={key}
            address={server}
            expectedEthNetwork="mainnet"
            contributeUsers={(usersCount) =>
              sumProductiveUsers(server, usersCount)
            }
          />
        ))}
      </ServersWrapper>
    </ServersContainer>
  )
})

export { DAOMainnetServers }
