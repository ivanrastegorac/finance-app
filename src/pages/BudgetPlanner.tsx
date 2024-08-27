import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

const BudgetPlanner: React.FC = () => {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleAddBudget = () => {
    console.log({ budgetName, budgetAmount });
    setBudgetName("");
    setBudgetAmount("");
  };

  return (
    <Box>
      <Heading mb={8}>Add New Budget</Heading>
      <FormControl id="budget-name" mb={4}>
        <FormLabel>Budget Name</FormLabel>
        <Input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="Enter budget name"
        />
      </FormControl>
      <FormControl id="budget-amount" mb={4}>
        <FormLabel>Budget Amount</FormLabel>
        <Input
          type="number"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          placeholder="Enter budget amount"
        />
      </FormControl>
      <Button colorScheme="blue" onClick={handleAddBudget}>
        Add Budget
      </Button>
    </Box>
  );
};

export default BudgetPlanner;
