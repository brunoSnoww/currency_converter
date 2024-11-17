import { Flex, Text, Button } from "@radix-ui/themes";
import * as Icon from "@radix-ui/react-icons";

export const EmptyState = ({ onAction }: { onAction?: () => void }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    gap="6"
    style={{
      textAlign: "center",
      padding: "2rem",
      color: "#6b7280",
    }}
  >
    <Flex
      align="center"
      justify="center"
      style={{
        width: "72px",
        height: "72px",
        backgroundColor: "#f3f4f6",
        borderRadius: "50%",
      }}
    >
      <Icon.InputIcon style={{ fontSize: "36px", color: "#9ca3af" }} />
    </Flex>
    <Text size="3" style={{ maxWidth: "28rem", color: "#6b7280" }}>
      It looks like you haven't entered any amount yet. Please enter a value to
      see the results.
    </Text>
    {onAction && (
      <Button size="3" variant="solid" onClick={onAction}>
        Enter Amount
      </Button>
    )}
  </Flex>
);
