import { useCart } from '../context/useCart';
import { formatUsd } from '../utils/formatUsd';

/**
 * Right column on the cart page: subtotal/total (same until tax/shipping exist).
 * Checkout stays disabled until a payment flow is wired up.
 */
export default function CartSummaryCard() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-body-secondary py-3">
        <h2 className="h6 mb-0 text-body-emphasis">Order summary</h2>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between small text-body-secondary mb-2">
          <span>Subtotal</span>
          <span>{formatUsd(subtotal)}</span>
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between fw-semibold mb-4">
          <span>Total</span>
          <span>{formatUsd(subtotal)}</span>
        </div>
        <button type="button" className="btn btn-primary w-100" disabled>
          Checkout
        </button>
        <p className="text-muted small mt-3 mb-0 text-center">
          Checkout is not connected yet.
        </p>
      </div>
    </div>
  );
}
