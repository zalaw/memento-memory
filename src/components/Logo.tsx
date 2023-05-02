import { Flex, Image, Stack, Text } from "@mantine/core";

export function Logo() {
  return (
    <Flex gap={10} align={"center"}>
      <Image maw={36} src={"/img/logo.png"} alt="Logo" />
      <Stack spacing={0}>
        <Text className="text">Memento</Text>
        <Text className="text">Memory</Text>
      </Stack>
    </Flex>
  );
}
