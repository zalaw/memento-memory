import { useEffect } from "react";
import { Timeline, Text, Stack, Title } from "@mantine/core";
import { useGame } from "../contexts/GameContext";

export function Changelog() {
  const { end } = useGame();

  const data = [
    {
      title: "v0.4.0",
      lis: ["Added stats"],
      date: "10/05/2023",
    },
    {
      title: "v0.3.0",
      lis: ["Added flip effect"],
      date: "06/05/2023",
    },
    {
      title: "v0.2.1",
      lis: ["Fixed flickering effect when grid updates", "Code refactoring"],
      date: "02/05/2023",
    },
    {
      title: "v0.2.0",
      lis: ["Added changelog", "Added standard layout", "Added option to choose values (numbers, letters, emojis)"],
      date: "01/05/2023",
    },
    {
      title: "v0.1.0",
      lis: ["Initial release"],
      date: "30/04/2023",
    },
  ];

  useEffect(() => {
    end();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <Title className="text">Changelog</Title>
      <Timeline active={100} bulletSize={20} lineWidth={3}>
        {data.map((item, index) => (
          <Timeline.Item key={index} title={item.title} lineVariant="dashed">
            <Stack mt={20} pb={20}>
              <Text color="dimmed" size="md">
                <ul className="list text">
                  {item.lis.map((li, idx) => (
                    <li key={`li-${idx}`}>{li}</li>
                  ))}
                </ul>
              </Text>
              <Text className="text" color="dimmed" size="sm">
                {item.date}
              </Text>
            </Stack>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  );
}
