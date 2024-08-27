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
} from "@chakra-ui/react";

interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  date: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransactionType, setNewTransactionType] = useState<
    "income" | "expense"
  >("income");
  const [newTransactionAmount, setNewTransactionAmount] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isModalCentered = useBreakpointValue({ base: true, md: false });

  const handleAddTransaction = () => {
    if (!newTransactionAmount) return;

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: newTransactionType,
      amount: parseFloat(newTransactionAmount),
      date: new Date().toLocaleDateString(),
    };

    setTransactions([...transactions, newTransaction]);
    setNewTransactionAmount("");
    onClose();
  };

  return (
    <Box ml={"250px"} p={8} flex="1">
      <Heading mb={6}>Dashboard</Heading>

      <Button colorScheme="teal" onClick={onOpen} mb={6} maxW="300px" w="100%">
        Add Transaction
      </Button>

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
            <Text>{transaction.amount.toFixed(2)}€</Text>
            <Text>{transaction.date}</Text>
          </HStack>
        ))}
        {transactions.length === 0 && (
          <Text>No transactions yet. Start by adding one.</Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={isModalCentered}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalBody>
            <RadioGroup
              onChange={(value: "income" | "expense") =>
                setNewTransactionType(value)
              }
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
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Back
            </Button>
            <Button colorScheme="blue" onClick={handleAddTransaction}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;
