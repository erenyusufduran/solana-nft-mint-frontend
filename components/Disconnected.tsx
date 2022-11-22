import { FC, MouseEventHandler, useCallback } from "react";
import { Button, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Disconnected: FC = () => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    if (event.defaultPrevented) {
      return;
    }
  }, []);

  return (
    <Container>
      <VStack spacing={20}></VStack>
    </Container>
  );
};

export default Disconnected;
