import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const CartList = ({ items }) => {

  if (!items || items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.cartItemId}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartList;