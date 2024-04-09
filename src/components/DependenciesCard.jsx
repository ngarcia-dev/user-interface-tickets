import { Link } from "react-router-dom";

import { Card, Heading, Text, Flex, Badge, Button } from "@radix-ui/themes";
import { EyeOpenIcon } from "@radix-ui/react-icons";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function DependenciesCard({ dependency }) {
  return (
    <Card className="hover:opacity-70">
      <Flex justify="between" align="center">
        <Heading>{dependency.name}</Heading>
        <Flex gap="3">
          <Link to={`/dependencies/${dependency.id}`}>
            <Button variant="outline" className="hover:cursor-pointer">
              <EyeOpenIcon />
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Text>{dependency.description}</Text>
      <Flex justify="between" my="2">
        <Badge size="3" color="green">
          Sectores Internos
        </Badge>
      </Flex>
      <Flex justify="between">
        {dependency.internalSec.map((i) => (
          <Badge key={i.id}>{i.name}</Badge>
        ))}
      </Flex>
    </Card>
  );
}

export default DependenciesCard;
