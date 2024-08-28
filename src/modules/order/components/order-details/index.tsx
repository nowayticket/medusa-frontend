import { Order } from "@medusajs/medusa";
import { Text } from "@medusajs/ui";

type OrderDetailsProps = {
  order: Order;
  showStatus?: boolean;
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ");
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-500";
      case "completed":
        return "text-green-500";
      case "archived":
        return "text-gray-500";
      case "canceled":
        return "text-red-500";
      case "requires_action":
        return "text-orange-500";
      default:
        return "text-ui-fg-subtle";
    }
  };

  const getFulfillmentStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "not_fulfilled":
        return "text-red-500";
      case "fulfilled":
        return "text-green-500";
      case "partially_fulfilled":
        return "text-yellow-500";
      case "shipped":
        return "text-blue-500";
      case "partially_shipped":
        return "text-purple-500";
      case "canceled":
        return "text-gray-500";
      case "returned":
        return "text-red-500";
      case "partially_returned":
        return "text-yellow-500";
      case "requires_action":
        return "text-orange-500";
      default:
        return "text-ui-fg-subtle";
    }
  };

  const getPaymentStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "captured":
        return "text-green-500";
      case "awaiting":
        return "text-yellow-500";
      case "not_paid":
        return "text-red-500";
      case "refunded":
        return "text-blue-500";
      case "partially_refunded":
        return "text-purple-500";
      case "canceled":
        return "text-gray-500";
      case "requires_action":
        return "text-orange-500";
      default:
        return "text-ui-fg-subtle";
    }
  };

  return (
    <div>
      <Text>
        We have sent the order confirmation details to{" "}
        <span className="text-ui-fg-medium-plus font-semibold" data-testid="order-email">
          {order.email}
        </span>
        .
      </Text>
      <Text className="mt-2">
        Order date: <span data-testid="order-date">{new Date(order.created_at).toDateString()}</span>
      </Text>
      <Text className="mt-2 text-ui-fg-interactive">
        Order number: <span data-testid="order-id">{order.display_id}</span>
      </Text>

      <div className="flex items-center text-compact-small gap-x-4 mt-4">
        {showStatus && (
          <>
            <Text>
              Order status:{" "}
              <span className={getStatusStyle(order.status)} data-testid="order-status">
                {formatStatus(order.status)}
              </span>
            </Text>
            <Text>
              Fulfillment status:{" "}
              <span className={getFulfillmentStatusStyle(order.fulfillment_status)} data-testid="order-fulfillment-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Payment status:{" "}
              <span className={getPaymentStatusStyle(order.payment_status)} data-testid="order-payment-status">
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
