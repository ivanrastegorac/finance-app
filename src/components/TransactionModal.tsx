import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Radio,
  RadioGroup,
  Text,
  HStack,
} from "@chakra-ui/react";
import CategoryPicker from "./CategoryPicker";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTransactionId: number | null;
  newTransactionType: "income" | "expense";
  newTransactionAmount: string;
  newTransactionCategory: string;
  setNewTransactionType: (type: "income" | "expense") => void;
  setNewTransactionAmount: (amount: string) => void;
  setNewTransactionCategory: (category: string) => void;
  categoryPicker: boolean;
  setCategoryPicker: (picker: boolean) => void;
  handleCategoryClick: (category: string) => void;
  handleAddTransaction: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  editingTransactionId,
  newTransactionType,
  newTransactionAmount,
  newTransactionCategory,
  setNewTransactionType,
  setNewTransactionAmount,
  categoryPicker,
  setCategoryPicker,
  handleCategoryClick,
  handleAddTransaction,
}) => {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editingTransactionId ? "Edit Transaction" : "Add New Transaction"}
        </ModalHeader>
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
            <CategoryPicker
              categories={
                newTransactionType === "income"
                  ? incomeCategories
                  : expenseCategories
              }
              selectedCategory={newTransactionCategory}
              onCategoryClick={handleCategoryClick}
            />
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
  );
};

export default TransactionModal;
