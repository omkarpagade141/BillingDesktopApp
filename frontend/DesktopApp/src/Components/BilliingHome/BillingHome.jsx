import React, { useState } from "react";
import BillingSidebar from "./BillingSidebar";
import "./Billinghome.css";

function BillingHome() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState("No Discount");
  const [tax, setTax] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const products = [
    {
      id: 1,
      title: "Veg Pizza",
      price: "12",
      category: "Veg",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Burger",
      price: "899",
      category: "Non-Veg",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "veg-Burger",
      price: "299",
      category: "Veg",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Tandoori",
      price: "599",
      category: "Chicken",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "fries",
      price: "99",
      category: "Veg",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      title: "chiken-pizza",
      price: "598",
      category: "Non-Veg",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      title: "combo-veg",
      price: "499",
      category: "Veg",
      image: "https://via.placeholder.com/150",
    },
    // ... other products
  ];

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All Category" ||
        product.category === selectedCategory) &&
      (searchQuery === "" || product.title.toLowerCase().includes(searchQuery))
    );
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const calculateTotal = () => {
    let subtotal = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price.replace("$", "")) * item.quantity,
      0
    );
    let discountAmount = 0;
    if (discount === "10% Off") discountAmount = subtotal * 0.1;
    if (discount === "20% Off") discountAmount = subtotal * 0.2;
    if (discount === "30% Off") discountAmount = subtotal * 0.3;
    const total = subtotal - discountAmount + tax + serviceCharge;
    return total.toFixed(2);
  };

  return (
    <div className="billing-home d-flex flex-column min-vh-50">
      <div className="content d-flex flex-grow-1" style={{ maxHeight:'80vh'}}>
        <div className="left flex-grow-1 d-flex flex-column">
          <div className="top-btn d-flex align-items-center mb-4">
            <div className="dropdown flex-shrink-1 mr-3" style={{ flexBasis: "35%" }}>
              <button
                className="dropdown-toggle btn btn-light w-100 text-bg-light p-2"
                onClick={toggleDropdown}
              >
                {selectedCategory}
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu show w-100">
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("All Category")}
                  >
                    All Category
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("Veg")}
                  >
                    Veg
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("Non-Veg")}
                  >
                    Non-Veg
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCategorySelect("Chicken")}
                  >
                    Chicken
                  </button>
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="product-list-container " style={{ maxHeight: "calc(90vh - 100px)" }}>
            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                  <div className="card h-70">
                    <div
                      onClick={() => handleAddToCart(product)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.title}
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title mb-0">{product.title}</h6>
                      <p className="card-text mb-0">{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right flex-shrink-0" style={{ width: "400px",overflowY: "auto" }}>
          <BillingSidebar
            cartItems={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
          />
        </div>
      </div>


      <footer className="footer d-flex justify-content-between align-items-center p-2">
        <div className="form-container d-flex align-items-center">
          <div className="form-group mb-0 mr-2">
            <label htmlFor="discount" className="form-label">Discount</label>
            <select
              className="form-control form-control-sm"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option>No Discount</option>
              <option>10% Off</option>
              <option>20% Off</option>
              <option>30% Off</option>
            </select>
          </div>
          <div className="form-group mb-0 mr-2">
            <label htmlFor="tax" className="form-label">Tax</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="tax"
              value={tax}
              onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
              placeholder="Tax (0%)"
            />
          </div>
          <div className="form-group mb-0 mr-2">
            <label htmlFor="serviceCharge" className="form-label">Service Charge</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="serviceCharge"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(parseFloat(e.target.value) || 0)}
              placeholder="Service Charge"
            />
          </div>
          <div className="form-group mb-0 mr-2">
            <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
            <select
              className="form-control form-control-sm"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option>Cash</option>
              <option>Wallet</option>
              <option>Card Payment</option>
              <option>Bar Code / QR Code Scan</option>
              <option>Net Banking</option>
              <option>Online Payment</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="summary">
          <strong>Total:</strong> ${calculateTotal()}
        </div>
        <div className="buttons d-flex gap-2">
          <button className="btn btn-danger btn-sm" onClick={handleClearCart}>
            Clear All
          </button>
          <button className="btn btn-dark btn-sm">Place Order</button>
        </div>
      </footer>
    </div>
  );
}

export default BillingHome;
