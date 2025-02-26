import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  styled,
} from "decentraland-ui2"

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  margin: "80px auto",
})

const ServersContainer = styled(Accordion)({
  width: "100%",
})

const ServersSummary = styled(AccordionSummary)({
  backgroundColor: "#9ec1ff",
})

const ServersWrapper = styled(AccordionDetails)({
  display: "flex",
  flexWrap: "wrap",
})

export { MainContainer, ServersContainer, ServersSummary, ServersWrapper }
