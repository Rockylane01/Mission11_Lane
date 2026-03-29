import { Link } from 'react-router-dom';

import { useCart } from '../context/useCart';
import { formatUsd } from '../utils/formatUsd';

/**
 * Snapshot of the cart on the book list page: line count, copy count, and totals.
 */
export default function BookListCartSummary() {
  const { cartItems } = useCart();

  const lineCount = cartItems.length;
  const copyCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (lineCount === 0) {
    return (
      <div className="alert alert-light border border-secondary-subtle mb-3 mb-md-4 py-2 px-3 small text-body-secondary">
        Your cart is empty. Add books from the list below.
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 mb-3 mb-md-4">
      <div className="card-header bg-body-secondary py-2 py-md-3 d-flex flex-wrap align-items-center justify-content-between gap-2">
        <h2 className="h6 mb-0 text-body-emphasis">Cart summary</h2>
        <Link to="/cart" className="btn btn-sm btn-outline-primary text-nowrap">
          View cart
        </Link>
      </div>
      <div className="card-body py-3">
        <div className="row g-3 g-md-4 row-cols-1 row-cols-sm-2 row-cols-lg-4 small">
          <div className="col">
            <div className="text-body-secondary text-uppercase fw-semibold mb-1">
              Titles
            </div>
            <div className="fs-5 fw-semibold text-body-emphasis">
              {lineCount}
            </div>
            <div className="text-muted">distinct books</div>
          </div>
          <div className="col">
            <div className="text-body-secondary text-uppercase fw-semibold mb-1">
              Copies
            </div>
            <div className="fs-5 fw-semibold text-body-emphasis">
              {copyCount}
            </div>
            <div className="text-muted">total quantity</div>
          </div>
          <div className="col">
            <div className="text-body-secondary text-uppercase fw-semibold mb-1">
              Subtotal
            </div>
            <div className="fs-5 fw-semibold text-body-emphasis">
              {formatUsd(subtotal)}
            </div>
          </div>
          <div className="col">
            <div className="text-body-secondary text-uppercase fw-semibold mb-1">
              Total
            </div>
            <div className="fs-5 fw-semibold text-body-emphasis">
              {formatUsd(subtotal)}
            </div>
            <div className="text-muted">before checkout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
