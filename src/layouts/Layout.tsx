import { AppShell, Button, Flex, Header, Stack, Container } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";

export function Layout() {
  return (
    <AppShell
      header={
        <Header height={70} py="xs" px={"md"} w={"100%"}>
          <Flex align={"center"} justify={"space-between"}>
            <Link to="/">
              <Logo />
            </Link>

            <Button className="text" variant="subtle" component={Link} to={"/changelog"}>
              Changelog
            </Button>
          </Flex>
        </Header>
      }
      styles={theme => ({
        main: { backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container size={600} p={0}>
        <Stack spacing={"sm"}>
          <Outlet />
        </Stack>
      </Container>
    </AppShell>
  );
}
