import * as React from "react"
import { useCallback, useState } from "react"
import { ServerMonitor } from "../../ServerMonitor/ServerMonitor"
import { WorldsServerMonitor } from "../../ServerMonitor/WorldsServerMonitor"

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
  const [totalSepoliaWorldsUsers, setTotalSepoliaWorldsUsers] = useState(0)
  const [totalSepoliaDevUsers, setTotalSepoliaDevUsers] = useState(0)
  const [totalNonDAOMainnetUsers, setTotalNonDAOMainnetUsers] = useState(0)
  // const [syncCheck, setSyncCheck] = useState(undefined)

  const sumSepoliaWorldsUsers = useCallback((usersCount = 0) => {
    setTotalSepoliaWorldsUsers((prev) => prev + usersCount)
  }, [])

  const sumNonDAOMainnetUsers = useCallback((usersCount = 0) => {
    setTotalNonDAOMainnetUsers((prev) => prev + usersCount)
  }, [])

  const sumSepoliaDevUsers = useCallback((usersCount = 0) => {
    setTotalSepoliaDevUsers((prev) => prev + usersCount)
  }, [])

  const currentUrl = window.location.href.toString()
  if (currentUrl.indexOf("includeDevServers") >= 0) {
    return (
      <div>
        <div className="node-set">
          {nonDAOMainnetServers.map((server, key) => {
            return (
              <ServerMonitor
                key={key}
                address={server}
                expectedEthNetwork="mainnet"
                contributeUsers={(usersCount) =>
                  sumNonDAOMainnetUsers(usersCount)
                }
              />
            )
          })}
        </div>
        <div className="total-productive-users">
          Total Users: {totalNonDAOMainnetUsers}
        </div>

        <div className="node-set">
          {zoneSepoliaServers.map((server, key) => {
            return (
              <ServerMonitor
                key={key}
                address={server}
                expectedEthNetwork="sepolia"
                contributeUsers={(usersCount) => sumSepoliaDevUsers(usersCount)}
              />
            )
          })}
        </div>
        <div className="total-dev-users">
          Total Users (Sepolia): {totalSepoliaDevUsers}
        </div>

        <div>
          <div className="node-set">
            {worldsSepoliaServers.map((server, key) => {
              return (
                <WorldsServerMonitor
                  key={key}
                  address={server}
                  expectedEthNetwork="sepolia"
                  contributeUsers={(usersCount) =>
                    sumSepoliaWorldsUsers(usersCount)
                  }
                />
              )
            })}
          </div>
          <div className="total-dev-users">
            Total Worlds Users: {totalSepoliaWorldsUsers}
          </div>
        </div>
      </div>
    )
  } else {
    return <div />
  }
})

export { ExtraServers }
