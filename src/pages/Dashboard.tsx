import React, { useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  HStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Radio,
  RadioGroup,
  useDisclosure,
  useBreakpointValue,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransactionType, setNewTransactionType] = useState<
    "income" | "expense"
  >("income");
  const [newTransactionAmount, setNewTransactionAmount] = useState<string>("");
  const [newTransactionCategory, setNewTransactionCategory] =
    useState<string>("");
  const [categoryPicker, setCategoryPicker] = useState<boolean>(false);
  const [editingTransactionId, setEditingTransactionId] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isModalCentered = useBreakpointValue({ base: true, md: false });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalBalance = totalIncome - totalExpenses;
  const incomeCategories = [
    "Salary",
    "Freelance",
    "Petty cash",
    "Gifts",
    "Bonus",
    "Investments",
    "Other",
  ];
  const expenseCategories = [
    "Rent",
    "Food",
    "Bills",
    "Social life",
    "Transport",
    "Car",
    "Gas",
    "Subscriptions",
    "Household",
    "Apparel",
    "Gift",
    "Investments",
    "Other",
  ];

  const handleAddTransaction = () => {
    if (!newTransactionAmount || !newTransactionCategory) return;

    const newTransaction: Transaction = {
      id: editingTransactionId ? editingTransactionId : transactions.length + 1,
      type: newTransactionType,
      amount: parseFloat(newTransactionAmount),
      category: newTransactionCategory,
      date: new Date().toLocaleDateString(),
    }; if (editingTransactionId) {
      
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
    setNewTransactionType(transaction.type);
    setNewTransactionAmount(transaction.amount.toString());
    setNewTransactionCategory(transaction.category);
    setCategoryPicker(false);
    onOpen(); 
  };

  const resetForm = () => {
    setNewTransactionAmount("");
    setNewTransactionCategory("");
    setEditingTransactionId(null);
  };

  const handleCategoryClick = (category: string) => {
    setNewTransactionCategory(category);
    setCategoryPicker(false); 
  };

  return (
    <Box ml={"250px"} p={8} flex="1">
      <Heading mb={6}>Dashboard</Heading>

      <Button colorScheme="teal" onClick={onOpen} mb={6} maxW="300px" w="100%">
        Add Transaction
      </Button>

      <VStack spacing={4} align="stretch" mb={6}>
        <HStack justifyContent="space-between">
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
            <Button onClick={() => handleEditTransaction(transaction)}  size="sm">
              <EditIcon />
            </Button>
          </HStack>
        ))}
        {transactions.length === 0 && (
          <Text>No transactions yet. Start by adding one.</Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={isModalCentered}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingTransactionId ? "Edit Transaction" : "Add New Transaction"}</ModalHeader>
          <ModalBody>
            <RadioGroup
              onChange={(value: "income" | "expense") => setNewTransactionType(value)}
              value={newTransactionType}
              mb={4}
            >
              <HStack spacing={4}>
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </HStack>
            </RadioGroup>
            <Input
              placeholder="Enter amount"
              value={newTransactionAmount}
              onChange={(e) => setNewTransactionAmount(e.target.value)}
              type="number"
              mb={4}
            />

            <Text mb={2}>Category:</Text>
            <Input
              placeholder="Select Category"
              value={newTransactionCategory}
              readOnly
              onClick={() => setCategoryPicker(!categoryPicker)}
              mb={4}
              cursor="pointer"
            />

            {categoryPicker && (
              <ButtonGroup flexWrap="wrap" justifyContent="center" mb={4}>
                {(newTransactionType === "income" ? incomeCategories : expenseCategories).map(
                  (category) => (
                    <Button
                      key={category}
                      colorScheme={newTransactionCategory === category ? "teal" : "gray"}
                      onClick={() => handleCategoryClick(category)}
                      m={1}
                    >
                      {category}
                    </Button>
                  )
                )}
              </ButtonGroup>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button colorScheme="blue" onClick={handleAddTransaction}>
              {editingTransactionId ? "Save Changes" : "Save"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
