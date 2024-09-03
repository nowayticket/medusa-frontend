import { Heading } from "@medusajs/ui";
import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";
import { cookies } from "next/headers";
import { getCart } from "@lib/data";

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value;

  if (!cartId) {
    return null;
  }

  const cart = await getCart(cartId).then((cart) => cart);

  if (!cart) {
    return null;
  }

  const total = (cart.total ?? 0) / 100;

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      <div className="w-full bg-white flex flex-col">
        <Divider className="my-6 small:hidden" />
        <Heading
          level="h2"
          className="flex flex-row text-3xl-regular items-baseline"
        >
          In your Cart
        </Heading>
        <Divider className="my-6" />
        <CartTotals data={cart} />
        <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
        <div className="mt-6">
  <p></p> {/* Отображение суммы заказа */}
  <form id="generate-payment-form" action="https://chillsamurai.shop/generate_link" method="POST">
    <input type="hidden" name="amount" value={total.toFixed(2)} />
    <button type="submit" id="generate-payment-button"></button>

  </form>
</div>

      </div>
    </div>
  );
};

export default CheckoutSummary;
