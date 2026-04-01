import { Link } from 'react-router-dom';

import { useCart } from '../context/useCart';

/**
 * Site header: title; Admin and Cart grouped on the right (cart shows unit badge).
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
        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <Link to="/admin" className="btn btn-outline-secondary text-nowrap">
            Admin
          </Link>
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
      </div>
    </header>
  );
}
