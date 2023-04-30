import { Flex, Stack } from "@mantine/core";
import { useGame } from "./contexts/GameContext";
import { DifficultyPicker } from "./components/DifficultyPicker";
import { GameStarted } from "./components/GameStarted";
import { GameFinished } from "./components/GameFinished";
import { GameGrid } from "./components/GameGrid";

function App() {
  const { gameStatus } = useGame();

  return (
    <Flex align={"center"} justify={"center"} mih={"100%"} p={20}>
      <Stack miw={300} maw={600} w={"100%"} spacing={"lg"}>
        {gameStatus === "not-started" ? (
          <DifficultyPicker />
        ) : gameStatus === "started" ? (
          <GameStarted />
        ) : (
          <GameFinished />
        )}
        <GameGrid />
      </Stack>
    </Flex>
  );
}

export default App;
