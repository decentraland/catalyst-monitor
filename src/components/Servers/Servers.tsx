import { DAOMainnetServers } from "./DAOMainnetServers/DAOMainnetServers"
import { ExtraServers } from "./ExtraServers/ExtraServers"
import { WorldMainnetServers } from "./WorldMainnetServers/WorldMainnetServers"

const Servers = () => {
  return (
    <div>
      <DAOMainnetServers />
      <WorldMainnetServers />
      <ExtraServers />
    </div>
  )
}

export { Servers }
