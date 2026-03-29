import { useMemo } from 'react';

import { useCart } from '../context/useCart';

export default function CartSummaryCard() {
  const { cartItems } = useCart();

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const formatted = (n: number) =>
    n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-body-secondary py-3">
        <h2 className="h6 mb-0 text-body-emphasis">Order summary</h2>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between small text-body-secondary mb-2">
          <span>Subtotal</span>
          <span>{formatted(subtotal)}</span>
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between fw-semibold mb-4">
          <span>Total</span>
          <span>{formatted(subtotal)}</span>
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
