import { Flex, Select, Button } from "@mantine/core";
import { useGame } from "../contexts/GameContext";

export function GameNotStarted() {
  const { length, values, setLength, setValues, start } = useGame();

  return (
    <Flex align="end" gap={"sm"}>
      <Select
        size={"xs"}
        w={"100%"}
        label="Select difficulty"
        value={length.toString()}
        onChange={e => setLength(Number(e))}
        data={[
          { value: "8", label: "😄 Easy" }, // 2x4
          { value: "16", label: "😊 Medium" }, // 4x4
          { value: "24", label: "😳 Hard" }, // 4x6
          { value: "36", label: "👽 Insane" }, // 6x6
          { value: "48", label: "💀 Babajee" }, // 8x6
        ]}
      />

      <Select
        size={"xs"}
        w={"100%"}
        label="Values"
        value={values}
        onChange={e => setValues(e as "numbers" | "letters" | "emojis")}
        data={[
          { value: "numbers", label: "Numbers" },
          { value: "letters", label: "Letters" },
          { value: "emojis", label: "Emojis" }, // 4x6
        ]}
      />
      <Button size={"xs"} onClick={start}>
        Start
      </Button>
    </Flex>
  );
}
