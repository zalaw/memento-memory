import { Card, Text, Button, Flex } from "@mantine/core";
import { useGame } from "../contexts/GameContext";

export function GameFinished() {
  const { end, secondsPassed } = useGame();

  return (
    <Card>
      <Flex align={"center"} justify={"space-between"}>
        <Text>Completed in {secondsPassed} seconds</Text>
        <Button onClick={end}>Play again</Button>
      </Flex>
    </Card>
  );
}
