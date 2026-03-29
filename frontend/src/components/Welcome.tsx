import { Link } from 'react-router-dom';

import { useCart } from '../context/useCart';

/**
 * Site header on the books page: title and cart link with a badge for total units.
 */
export default function Welcome() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="border-bottom border-secondary-subtle py-4 mb-3">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <h1 className="display-5 fw-semibold mb-0 text-body-emphasis">
          Book Store
        </h1>
        <Link
          to="/cart"
          className="btn btn-outline-primary position-relative text-nowrap"
        >
          Cart
          {itemCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
