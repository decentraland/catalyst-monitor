import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
  lightTheme,
} from "decentraland-ui2"
import { Servers } from "./components/Servers/Servers"

import "../old/style.css"
const App = () => {
  return (
    <CssVarsProvider theme={lightTheme}>
      <CssBaseline />
      <Servers />
    </CssVarsProvider>
  )
}

export { App }
