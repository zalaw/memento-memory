import { Button, Flex } from "@mantine/core";
import { useGame } from "../contexts/GameContext";
import { Stopwatch } from "./Stopwatch";

export function GameStarted() {
  const { end } = useGame();

  return (
    <Flex h={61} align={"end"} justify={"space-between"}>
      <Stopwatch />
      <Button className="text" color="red" onClick={end}>
        End
      </Button>
    </Flex>
  );
}
