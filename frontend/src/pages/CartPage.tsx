import CartItemsPanel from '../components/CartItemsPanel';
import CartPageHeader from '../components/CartPageHeader';
import CartSummaryCard from '../components/CartSummaryCard';

export default function CartPage() {
  return (
    <div className="container py-4">
      <CartPageHeader />
      <div className="row g-4">
        <div className="col-lg-8">
          <CartItemsPanel />
        </div>
        <div className="col-lg-4">
          <CartSummaryCard />
        </div>
      </div>
    </div>
  );
}
