import { useCart } from '../context/useCart';

export default function CartItemsPanel() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="card shadow-sm border-0">
        <div className="card-header bg-body-secondary py-3">
          <h2 className="h6 mb-0 text-body-emphasis">Items</h2>
        </div>
        <div className="card-body">
          <p className="text-body-secondary mb-0">
            Your cart is empty. Add books from the book list to see them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-body-secondary py-3">
        <h2 className="h6 mb-0 text-body-emphasis">Items</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Title</th>
                <th className="text-end text-nowrap">Price</th>
                <th className="text-end">Qty</th>
                <th className="text-end">Line</th>
                <th className="text-end text-nowrap">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td className="text-end">
                    {item.price.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                  <td className="text-end">{item.quantity}</td>
                  <td className="text-end">
                    {(item.price * item.quantity).toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(item)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
