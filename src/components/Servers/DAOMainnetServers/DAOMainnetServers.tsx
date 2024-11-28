import * as React from "react"
import { useCallback, useState } from "react"
import { ServerMonitor } from "../../ServerMonitor/ServerMonitor"

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
  const sumProductiveUsers = useCallback((usersCount = 0) => {
    setTotalProductiveUsers((prev) => prev + usersCount)
  }, [])

  return (
    <div>
      <div className="node-set">
        {DAOMainnetServersUrls.map((server, key) => {
          return (
            <ServerMonitor
              key={key}
              address={server}
              expectedEthNetwork="mainnet"
              contributeUsers={(usersCount) => sumProductiveUsers(usersCount)}
            />
          )
        })}
      </div>
      <div className="total-productive-users">
        Total Users: {totalProductiveUsers}
      </div>
    </div>
  )
})

export { DAOMainnetServers }
