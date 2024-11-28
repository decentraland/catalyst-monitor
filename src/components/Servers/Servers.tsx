import { Navbar } from "decentraland-ui2"
import { DAOMainnetServers } from "./DAOMainnetServers/DAOMainnetServers"
import { ExtraServers } from "./ExtraServers/ExtraServers"
import { WorldMainnetServers } from "./WorldMainnetServers/WorldMainnetServers"
import { MainContainer } from "./Servers.styled"

const Servers = () => {
  return (
    <>
      <Navbar activePage="" />
      <MainContainer>
        <DAOMainnetServers />
        <WorldMainnetServers />
        <ExtraServers />
      </MainContainer>
    </>
  )
}

export { Servers }
