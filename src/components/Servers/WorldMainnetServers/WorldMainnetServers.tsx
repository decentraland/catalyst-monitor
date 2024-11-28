import * as React from "react"
import { useCallback, useState } from "react"
import { WorldsServerMonitor } from "../../ServerMonitor/WorldsServerMonitor"

const worldsMainnetServers = ["https://worlds-content-server.decentraland.org"]

const WorldMainnetServers = React.memo(() => {
  const [totalWorldsUsers, setTotalWorldsUsers] = useState(0)
  const sumWorldsUsers = useCallback((usersCount = 0) => {
    setTotalWorldsUsers((prev) => prev + usersCount)
  }, [])
  return (
    <div>
      <div className="node-set">
        {worldsMainnetServers.map((server, key) => {
          return (
            <WorldsServerMonitor
              key={key}
              address={server}
              expectedEthNetwork="mainnet"
              contributeUsers={(usersCount) => sumWorldsUsers(usersCount)}
            />
          )
        })}
      </div>
      <div className="total-productive-users">
        Total Worlds Users: {totalWorldsUsers}
      </div>
    </div>
  )
})

export { WorldMainnetServers }
