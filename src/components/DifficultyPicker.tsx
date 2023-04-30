import { Flex, Select, Button } from "@mantine/core";
import { useGame } from "../contexts/GameContext";

export function DifficultyPicker() {
  const { length, setDifficulty, start } = useGame();

  return (
    <Flex align="end" gap={20}>
      <Select
        w={"100%"}
        label="Select difficulty"
        value={length.toString()}
        onChange={e => setDifficulty(Number(e))}
        data={[
          { value: "8", label: "😄 Easy" }, // 2x4
          { value: "16", label: "😊 Medium" }, // 4x4
          { value: "24", label: "😳 Hard" }, // 4x6
          { value: "36", label: "👽 Insane" }, // 6x6
          { value: "48", label: "💀 Babajee" }, // 8x6
        ]}
      />
      <Button onClick={start}>Start</Button>
    </Flex>
  );
}
