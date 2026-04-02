import { Link } from 'react-router-dom';

/** Title row for the cart page with a link back to browsing. */
export default function CartPageHeader() {
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
      <h1 className="h2 mb-0 text-body-emphasis text-nowrap">Shopping cart</h1>
      <Link
        to="/books"
        className="btn btn-secondary btn-sm text-white text-nowrap"
      >
        Continue shopping
      </Link>
    </div>
  );
}
