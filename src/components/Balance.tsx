import React from "react";
import { HStack, Text } from "@chakra-ui/react";

interface BalanceProps {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const Balance: React.FC<BalanceProps> = ({
  totalIncome,
  totalExpenses,
  totalBalance,
}) => {
  return (
    <HStack justifyContent="space-between" mb={6}>
      <Text fontSize="lg" fontWeight="bold" color="green.500">
        Income: {totalIncome.toFixed(2)}€
      </Text>
      <Text fontSize="lg" fontWeight="bold" color="red.500">
        Expenses: {totalExpenses.toFixed(2)}€
      </Text>
      <Text
        fontSize="xl"
        fontWeight="bold"
        color={totalBalance >= 0 ? "green.500" : "red.500"}
      >
        Total Balance: {totalBalance.toFixed(2)}€
      </Text>
    </HStack>
  );
};

export default Balance;
