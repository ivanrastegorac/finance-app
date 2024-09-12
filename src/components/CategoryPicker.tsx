import React from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface CategoryPickerProps {
    categories: string[];
    selectedCategory: string;
    onCategoryClick: (category: string) => void;
  }
  
  const CategoryPicker: React.FC<CategoryPickerProps> = ({
    categories,
    selectedCategory,
    onCategoryClick,
  }) => (
    <ButtonGroup flexWrap="wrap" justifyContent="center" mb={4}>
      {categories.map((category) => (
        <Button
          key={category}
          colorScheme={selectedCategory === category ? "teal" : "gray"}
          onClick={() => onCategoryClick(category)}
          m={1}
        >
          {category}
        </Button>
      ))}
    </ButtonGroup>
  );
  
  export default CategoryPicker;