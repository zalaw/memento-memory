import { Text } from "@mantine/core";
import { useStopwatch } from "react-timer-hook";

export function Stopwatch() {
  const { seconds, minutes } = useStopwatch({ autoStart: true });

  return (
    <Text fw={700} fz={24}>
      <span>{String(minutes).padStart(2, "0")}</span>:<span>{String(seconds).padStart(2, "0")}</span>
    </Text>
  );
}
