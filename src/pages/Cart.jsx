import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <span className="font-semibold">{product.name}</span> x {product.quantity}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">${(product.price * product.quantity).toLocaleString()} CLP</span>
                  <button 
                    onClick={() => removeFromCart(product.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right">
            <h3 className="text-xl font-bold">Total: ${total.toLocaleString()} CLP</h3>
            <button 
              onClick={clearCart} 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
