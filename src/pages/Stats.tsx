import { useEffect } from "react";
import { Box, Button, Card, Divider, Flex, Grid, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaTrophy } from "react-icons/fa";
import { useGame } from "../contexts/GameContext";
import { difficulties } from "../utils";

export function Stats() {
  const [opened, { open, close }] = useDisclosure(false);

  const { end, resetStats, stats } = useGame();

  const tropyColors = ["#ffd700", "#c0c0c0", "#cd7f32"];
  const topFivePlaceholder = Array.from({ length: 5 });

  const handleResetStats = () => {
    resetStats();
    close();
  };

  useEffect(() => {
    end();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Stack p="lg">
          <Title order={3} className="text">
            Are you sure you want to reset the stats?
          </Title>
          <Flex gap={"md"}>
            <Button w={"100%"} className="text" color="red" onClick={handleResetStats}>
              Reset
            </Button>
            <Button w={"100%"} className="text" variant="default" onClick={close}>
              Cancel
            </Button>
          </Flex>
        </Stack>
      </Modal>

      <Flex align={"center"} justify={"space-between"}>
        <Title className="text">Stats</Title>
        <Button className="text" color="red" onClick={open}>
          Reset
        </Button>
      </Flex>
      <Grid gutter={"xs"} grow>
        {Object.entries(difficulties).map(([value, { label }]) => (
          <Grid.Col key={value} miw={150} span={4}>
            <Card>
              <Title className="text" order={4} mb={"sm"}>
                {label}
              </Title>

              {topFivePlaceholder.map((_, index) => (
                <div key={index}>
                  <Box p={2}>
                    <Flex justify={"space-between"} align={"center"}>
                      {index < 3 ? <FaTrophy color={tropyColors[index]} /> : <Text className="text">{index + 1}</Text>}
                      {stats[Number(value)][index] ? (
                        <Text className="text" fw={700}>
                          {stats[Number(value)][index]}
                        </Text>
                      ) : (
                        <Text className="text" color="dimmed">
                          N/A
                        </Text>
                      )}
                    </Flex>
                  </Box>
                  {index < topFivePlaceholder.length - 1 && <Divider />}
                </div>
              ))}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
