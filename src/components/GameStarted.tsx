import { Button, Flex } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { Stopwatch } from "./Stopwatch";

export function GameStarted() {
  const { end } = useGame();

  return (
    <Flex align={"center"} justify={"space-between"}>
      <Stopwatch />
      <Button color="red" onClick={end}>
        End
      </Button>
    </Flex>
  );
}
