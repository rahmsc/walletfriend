import { ThemeProvider } from "styled-components";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={{}}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
