import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Stats from "./pages/Stats";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" ml="250px" p={4}>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/stats" Component={Stats} />
          <Route path="/accounts" Component={Accounts} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
