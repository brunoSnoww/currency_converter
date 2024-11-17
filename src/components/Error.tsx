import { useRouteError, useParams } from "react-router-dom";
import { Flex, Heading, Text } from "@radix-ui/themes";
import * as Icon from "@radix-ui/react-icons";

export const CurrencyErrorBoundary = () => {
  const error = useRouteError() as { response: { status: number } };
  const { currency } = useParams();

  const Error = () =>
    error?.response?.status === 404 ? (
      <>
        <Icon.ExclamationTriangleIcon
          style={{ fontSize: "48px", color: "#ff6b6b" }}
        />
        <Heading size="4">Currency Not Available</Heading>
        <Text size="3">
          Sorry, the currency <strong>{currency?.toUpperCase()}</strong> is not
          available at the moment.
        </Text>
      </>
    ) : (
      <>
        <Icon.CrossCircledIcon style={{ fontSize: "48px", color: "#ff6b6b" }} />
        <Heading size="4">Something Went Wrong</Heading>
        <Text size="3">
          We encountered an error while processing your request.
        </Text>
      </>
    );

  return (
    <Flex direction="column" align="center" justify="center" gap="4">
      <Error />
    </Flex>
  );
};
