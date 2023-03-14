import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useLang, useLocales } from "use-locales";
import { useQuery } from "urql";
import { Link, LinkButton, Logo, LogoSize, useVersion } from "../components";

export function Home() {
  const version = useVersion();
  const [count, setCount] = useState(1);
  const onAddClicked = useCallback(
    () => setCount((old) => Math.min(6, old + 1)),
    []
  );
  const onRemoveClicked = useCallback(
    () => setCount((old) => Math.max(1, old - 1)),
    []
  );

  const lang = useLang();
  const messages = useLocales<{ welcome: string }>("home");

  // TODO: use genQL to have this Skill type
  const [{ fetching, data }] = useQuery<{
    skills: { id: string; name: string; value: number }[];
  }>({
    query: /* GraphQL */ `
      query GetSkill {
        skills {
          id
          name
          value
        }
      }
    `,
  });

  return (
    <Container>
      <Stack>
        <Center>
          <Stack>
            <Logo size={LogoSize.L} margin="2em" />
            <Stack>
              <Text textAlign="center">
                {messages.welcome} (lang: {lang})
              </Text>
              <Text textAlign="center">Version: {version}</Text>
            </Stack>
            <Center>
              <HStack>
                <Button onClick={onAddClicked} colorScheme="green">
                  Add
                </Button>
                <Button onClick={onRemoveClicked} variant="outline">
                  Remove
                </Button>
              </HStack>
            </Center>
          </Stack>
        </Center>

        <SimpleGrid columns={2} spacing={10}>
          {Array.from({ length: count }).map((_, index) => (
            <Box bg="tomato" height="2em" key={index}>
              {index}
            </Box>
          ))}
        </SimpleGrid>
      </Stack>

      <Stack marginTop="2em">
        <Heading size="md">Links examples</Heading>
        <Stack>
          <Heading size="sm">Internal links (to /matchings screen)</Heading>
          <Center>
            <HStack>
              <Link textAlign="center" to="/matchings">
                Link
              </Link>
              <LinkButton to="/matchings">Button</LinkButton>
            </HStack>
          </Center>

          <Heading size="sm">External links</Heading>
          <Center>
            <HStack>
              <Link href="http://google.fr" isExternal>
                Link
              </Link>
              <LinkButton href="http://google.fr" isExternal variant="outline">
                Button
              </LinkButton>
            </HStack>
          </Center>
        </Stack>
      </Stack>

      <SimpleGrid columns={3} spacing="0.5em">
        {data?.skills.map((skill) => (
          <Card key={skill.id}>
            <CardHeader>
              <Heading size="sm">{skill.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{skill.value}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
