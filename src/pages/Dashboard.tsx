import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import TransactionModal from "../components/TransactionModal";
import Balance from "../components/Balance";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formState, setFormState] = useState({
    type: "income" as "income" | "expense",
    amount: "",
    category: "",
  });
  const [categoryPicker, setCategoryPicker] = useState<boolean>(false);
  const [editingTransactionId, setEditingTransactionId] = useState<
    number | null
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const handleAddTransaction = () => {
    if (
      !formState.amount ||
      !formState.category ||
      isNaN(parseFloat(formState.amount))
    )
      return;

    const newTransaction: Transaction = {
      id: editingTransactionId ? editingTransactionId : transactions.length + 1,
      type: formState.type,
      amount: parseFloat(formState.amount),
      category: formState.category,
      date: new Date().toLocaleDateString(),
    };

    if (editingTransactionId) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === editingTransactionId ? newTransaction : transaction
        )
      );
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    resetForm();
    onClose();
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransactionId(transaction.id);
    setFormState({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
    });
    setCategoryPicker(false);
    onOpen();
  };

  const resetForm = () => {
    setFormState({ type: "income", amount: "", category: "" });
    setEditingTransactionId(null);
  };

  const handleCategoryClick = (category: string) => {
    setFormState((prev) => ({ ...prev, category }));
    setCategoryPicker(false);
  };

  return (
    <Box ml={"250px"} p={8} flex="1">
      <Heading mb={6}>Dashboard</Heading>

      <Button colorScheme="teal" onClick={onOpen} mb={6} maxW="300px" w="100%">
        Add Transaction
      </Button>

      <VStack spacing={4} align="stretch" mb={6}>
        <Balance
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          totalBalance={totalBalance}
        />
      </VStack>

      <VStack spacing={4} align="flex-start" w="full">
        {transactions.map((transaction) => (
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
            <Button
              onClick={() => handleEditTransaction(transaction)}
              size="sm"
            >
              <EditIcon />
            </Button>
          </HStack>
        ))}
        {transactions.length === 0 && (
          <Text>No transactions yet. Start by adding one.</Text>
        )}
      </VStack>

      <TransactionModal
        isOpen={isOpen}
        onClose={onClose}
        editingTransactionId={editingTransactionId}
        newTransactionType={formState.type}
        newTransactionAmount={formState.amount}
        newTransactionCategory={formState.category}
        setNewTransactionType={(type) =>
          setFormState((prev) => ({ ...prev, type }))
        }
        setNewTransactionAmount={(amount) =>
          setFormState((prev) => ({ ...prev, amount }))
        }
        setNewTransactionCategory={(category) =>
          setFormState((prev) => ({ ...prev, category }))
        }
        categoryPicker={categoryPicker}
        setCategoryPicker={setCategoryPicker}
        handleCategoryClick={handleCategoryClick}
        handleAddTransaction={handleAddTransaction}
      />
    </Box>
  );
};

export default Dashboard;
