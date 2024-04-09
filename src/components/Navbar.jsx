import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Flex, Box, Button, Badge, Heading, Grid } from "@radix-ui/themes";
import { ExitIcon, AvatarIcon } from "@radix-ui/react-icons";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav>
      <Flex
        my="4"
        px="5"
        align="center"
        justify="between"
        style={{
          backgroundColor: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Link to={isAuthenticated ? "/tickets" : "/login"}>
          <Heading>Ticket Manager</Heading>
        </Link>
        <Grid columns={{ initial: "1" }} width="auto">
          <Flex gap="4" my="6" wrap="wrap">
            {isAuthenticated ? (
              <>
                <Flex align="center">
                  <Box>
                    <Link to="/profile">
                      <Badge
                        className="hover:cursor-pointer"
                        size={{ initial: "1", sm: "3" }}
                      >
                        <AvatarIcon /> {user.username}
                      </Badge>
                    </Link>
                  </Box>
                </Flex>
                <Box>
                  <Link to="/dependencies">
                    <Button
                      className="hover:cursor-pointer"
                      size={{ initial: "1", sm: "2" }}
                    >
                      Dependencies
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Link to="/add-ticket">
                    <Button
                      className="hover:cursor-pointer"
                      size={{ initial: "1", sm: "2" }}
                    >
                      Add Ticket
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Link
                    to="/"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <Button
                      className="hover:cursor-pointer"
                      color="red"
                      size={{ initial: "1", sm: "2" }}
                    >
                      <ExitIcon />
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Flex>
        </Grid>
      </Flex>
    </nav>
  );
}

export default Navbar;
