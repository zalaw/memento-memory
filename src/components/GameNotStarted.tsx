import { Flex, Select, Button } from "@mantine/core";
import { difficulties } from "../utils";
import { useGame } from "../contexts/GameContext";

export function GameNotStarted() {
  const { length, values, setLength, setValues, start } = useGame();

  return (
    <Flex align="end" gap={"sm"}>
      <Select
        className="text"
        w={"100%"}
        label="Select difficulty"
        value={length.toString()}
        onChange={e => setLength(Number(e))}
        data={Object.entries(difficulties).map(([value, { label }]) => ({
          value,
          label,
        }))}
      />

      <Select
        className="text"
        w={"100%"}
        label="Values"
        value={values}
        onChange={e => setValues(e as "numbers" | "letters" | "emojis")}
        data={[
          { value: "numbers", label: "Numbers" },
          { value: "letters", label: "Letters" },
          { value: "emojis", label: "Emojis" },
        ]}
      />
      <Button className="text" onClick={start}>
        Start
      </Button>
    </Flex>
  );
}
