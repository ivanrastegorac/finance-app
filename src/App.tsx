import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Stats from "./pages/Stats";
import Accounts from "./pages/Accounts";
import BudgetPlanner from "./pages/BudgetPlanner";

function App() {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flex="1" p={4}>
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/stats" Component={Stats} />
          <Route path="/accounts" Component={Accounts} />
          <Route path="/budget-planner" Component={BudgetPlanner} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
