import React from "react";
import { HStack, Text, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

interface TransactionProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

const Transaction: React.FC<TransactionProps> = ({ transaction, onEdit }) => (
  <HStack
    key={transaction.id}
    w="full"
    justifyContent="space-between"
    p={4}
    bg="gray.100"
    borderRadius="md"
  >
    <Text
      fontWeight="bold"
      color={transaction.type === "income" ? "green.500" : "red.500"}
    >
      {transaction.type.toUpperCase()}
    </Text>
    <Text>{transaction.category}</Text>
    <Text>{transaction.amount.toFixed(2)}€</Text>
    <Text>{transaction.date}</Text>
    <Button onClick={() => onEdit(transaction)} size="sm">
      <EditIcon />
    </Button>
  </HStack>
);

export default Transaction;
