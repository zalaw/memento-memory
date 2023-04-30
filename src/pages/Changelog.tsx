import { useEffect } from "react";
import { Timeline, Text, Stack } from "@mantine/core";
import { useGame } from "../contexts/GameContext";

export function Changelog() {
  const { end } = useGame();

  useEffect(() => {
    end();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Timeline active={1} bulletSize={20} lineWidth={3}>
      <Timeline.Item title="v0.2.0" lineVariant="dashed">
        <Stack mt={20} pb={20}>
          <Text color="dimmed" size="md">
            <ul className="list">
              <li>Added changelog</li>
              <li>Added standard layout</li>
              <li>Added option to choose values (numbers, letters, emojis)</li>
            </ul>
          </Text>
          <Text color="dimmed" size="sm">
            01/05/2023
          </Text>
        </Stack>
      </Timeline.Item>

      <Timeline.Item title="v0.1.0" lineVariant="dashed">
        <Stack mt={20} pb={20}>
          <Text color="dimmed" size="md">
            <ul className="list">
              <li>Initial release</li>
            </ul>
          </Text>
          <Text color="dimmed" size="sm">
            30/04/2023
          </Text>
        </Stack>
      </Timeline.Item>
    </Timeline>
  );
}
