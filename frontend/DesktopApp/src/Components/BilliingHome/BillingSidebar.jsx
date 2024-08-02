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
            <div className="row mb-2" key={item.prodId}>
              <div className="col-2 d-flex align-items-center">
                <img src={`/myapi/api/images?imageName=${item.prodImageUrl}`} alt={item.title} className="img-thumbnail" style={{ width: '40px', height: '40px' }} />
              </div>
              <div className="col-3 d-flex align-items-center">
                {item.prodName}
              </div>
              <div className="col-3 d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleQuantityChange(item.prodId, Math.max(item.quantity - 1, 0))}
                    style={{ width: '25px' }}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleQuantityChange(item.prodId, item.quantity + 1)}
                    style={{ width: '25px' }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-2 d-flex align-items-center">
                {item.prodPrice}
              </div>
              <div className="col-2 d-flex align-items-center">
                <button className="btn btn-sm btn-outline-danger" onClick={() => onRemoveFromCart(item.prodId)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BillingSidebar;
