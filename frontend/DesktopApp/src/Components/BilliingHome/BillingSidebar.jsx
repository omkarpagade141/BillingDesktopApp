import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function BillingSidebar({ cartItems, onQuantityChange, onRemoveFromCart, onClearCart }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
  };

  const handleQuantityChange = (productId, quantity) => {
    onQuantityChange(productId, quantity);
  };

  return (
    <div className="billing-sidebar p-2">
      <div className="mb-4">
        <h4>Current Orders</h4>
        <div className="container">
          <div className="row border-bottom mb-2 font-weight-bold">
            <div className="col-2">Image</div>
            <div className="col-3">Name</div>
            <div className="col-3">Quantity</div>
            <div className="col-2">Price</div>
            <div className="col-2">Action</div>
          </div>
          {cartItems.map(item => (
            <div className="row mb-2" key={item.id}>
              <div className="col-2 d-flex align-items-center">
                <img src={item.image} alt={item.title} className="img-thumbnail" style={{ width: '30px', height: '30px' }} />
              </div>
              <div className="col-3 d-flex align-items-center">
                {item.title}
              </div>
              <div className="col-3 d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 0))}
                    style={{ width: '30px' }}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    style={{ width: '28px' }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center">
                {item.price}
              </div>
              <div className="col-2 d-flex align-items-center">
                <button className="btn btn-sm btn-outline-danger" onClick={() => onRemoveFromCart(item.id)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BillingSidebar;
