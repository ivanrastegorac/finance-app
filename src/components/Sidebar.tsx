import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Link,
  VStack,
  Spacer,
  Text,
  Button,
} from "@chakra-ui/react";
import { FiHome, FiLogOut, FiBarChart2, FiUsers } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      h="100vh"
      w="250px"
      bg="black"
      color="white"
      p={4}
      boxShadow="lg"
    >
      <Flex direction="column" h="100%" align="center">
        <Flex mb={8} align="center">
          <Avatar
            name="User Name"
            src="https://bit.ly/broken-link"
            size="sm"
            mr={4}
          />
          <Heading as="h1" size="md">
            Finance App
          </Heading>
        </Flex>
        <VStack spacing={4} align="center" w="full">
          <Box w="full">
            <Link
              as={RouterLink}
              to="/"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "blue.300", color: "white" }}
              p={2}
              borderRadius="md"
            >
              <FiHome style={{ marginRight: "8px" }} />
              <Text>Home</Text>
            </Link>
          </Box>
          <Box w="full">
            <Link
              as={RouterLink}
              to="/stats"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "blue.300", color: "white" }}
              p={2}
              borderRadius="md"
            >
              <FiBarChart2 style={{ marginRight: "8px" }} />
              <Text>Stats</Text>
            </Link>
          </Box>
          <Box w="full">
            <Link
              as={RouterLink}
              to="/accounts"
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ bg: "blue.300", color: "white" }}
              p={2}
              borderRadius="md"
            >
              <FiUsers style={{ marginRight: "8px" }} />
              <Text>Accounts</Text>
            </Link>
          </Box>
        </VStack>
        <Spacer />
        <Button
          variant="ghost"
          colorScheme="red"
          onClick={() => console.log("Sign out clicked")}
          mt="auto"
        >
          <FiLogOut />
          <Text ml={2}>Logout</Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default Sidebar;
