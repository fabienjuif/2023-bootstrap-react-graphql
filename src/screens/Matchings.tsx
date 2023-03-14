import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useBricksStore } from "../stores";

export function Matchings() {
  const store = useBricksStore();

  return (
    <Container>
      <Text>Just an example to show react-router in action</Text>

      <Center>
        <Stack>
          <Center>
            <HStack>
              <Button onClick={store.inc} colorScheme="green">
                Add
              </Button>
              <Button onClick={store.dec} variant="outline">
                Remove
              </Button>
            </HStack>
          </Center>
        </Stack>
      </Center>
      <Text>Grid with store</Text>
      <SimpleGrid columns={2} spacing={10}>
        {Array.from({ length: store.bricks }).map((_, index) => (
          <Box bg="tomato" height="2em" key={index}>
            {index}
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
