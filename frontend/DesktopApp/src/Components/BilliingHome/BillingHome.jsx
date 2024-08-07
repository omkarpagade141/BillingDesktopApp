import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from 'react-bootstrap';
import BillingSidebar from "./BillingSidebar";
import "./Billinghome.css";
import axios from "axios";

function BillingHome() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount,setDiscountAmount]=useState(0)
  const [taxPercent, setTaxPercent] = useState(0);
  const [taxAmount,setTaxAmount]=useState(0)
  const [serviceCharge, setServiceCharge] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchProducts = async () => {
    const response = await axios.get('/myapi/api/product/allproducts');
    setProducts(response.data);
    console.log(response.data);
  };

  const fetchCategories = async () => {
    const response = await axios.get('/myapi/api/category/allcategories');
    setAllCategories(response.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All Category" ||
        product.category.cateName === selectedCategory) &&
      (searchQuery === "" || product.prodName.toLowerCase().includes(searchQuery))
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
      const existingItem = prevItems.find((item) => item.prodId === product.prodId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.prodId === product.prodId
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
          item.prodId === productId ? { ...item, quantity: quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.prodId !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  useEffect(()=>{
    calculateTotal()
  },[ totalAmount,cartItems,taxPercent,discountPercent,serviceCharge,setTaxPercent,taxAmount,discountAmount])

  const calculateTotal = () => {
    
    let subtotal = cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.prodPrice) * item.quantity,
      0
    );
    setTotalAmount(subtotal)
    setDiscountAmount((subtotal*discountPercent)/100);
    setTaxAmount((subtotal*taxPercent)/100);
     
    setGrandTotal(subtotal - discountAmount + taxAmount + serviceCharge);
  };

  return (
    <div className="billing-home d-flex flex-column min-vh-50">
      <div className="content d-flex flex-grow-1" style={{ maxHeight: '80vh' }}>
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
                  {allCategories.map((category, index) => (
                    <button
                      key={index}
                      className="dropdown-item"
                      onClick={() => handleCategorySelect(category.cateName)}
                    >
                      {category.cateName}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-grow-1">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Product"
                  aria-label="Search"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="product-list-container">
            {filteredProducts.map(product => (
              <Card className="card" key={product.prodId} onClick={() => handleAddToCart(product)}>
                <Card.Img
                  variant="top"
                  src={`/myapi/api/images?imageName=${product.prodImageUrl}`}
                  className="card-img"
                />
                <Card.Body className="d-flex flex-column cardBodyInTheProduct">
                  <Card.Title className="mb-2 textInTheCard text-center">{product.prodName}</Card.Title>
                  <Card.Text className="textInTheCard text-center">{product.prodPrice}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
        <div className="right flex-shrink-0" style={{ width: "470px", overflowY: "auto" }}>
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
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
            >
              <option value={0 }>No Discount</option>
              <option value={10}>10% Off</option>
              <option value={20}>20% Off</option>
              <option value={30}>30% Off</option>
            </select>
          </div>
          <div className="form-group mb-0 mr-2">
            <label htmlFor="tax" className="form-label">Tax</label>
            <input
              type="number"
              className="form-control form-control-sm"
              id="tax"
              value={taxPercent}
              onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
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
          <strong>Total:</strong> {grandTotal.toFixed(2)}
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
