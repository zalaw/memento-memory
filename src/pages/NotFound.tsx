import { Button, Flex, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export function NotFound() {
  return (
    <Flex gap={"xl"} direction={"column"} justify={"center"}>
      <SimpleGrid cols={3} spacing={6} verticalSpacing={6}>
        <Card key={"not-found-card1"} card={{ id: "111", flipped: true, found: true, value: "4" }} />
        <Card key={"not-found-card2"} card={{ id: "222", flipped: true, found: false, value: "0" }} />
        <Card key={"not-found-card3"} card={{ id: "333", flipped: true, found: true, value: "4" }} />
      </SimpleGrid>
      <Title className="title-text" ta={"center"}>
        Something is not right...
      </Title>
      <Text className="text" ta="center" color="dimmed">
        Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
        another URL.
      </Text>
      <Button className="text" component={Link} to="/">
        Let's go home
      </Button>
    </Flex>
  );
}
