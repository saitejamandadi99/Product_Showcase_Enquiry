import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // enquiry form states
  const [showForm, setShowForm] = useState(false);
  const [ename, setEName] = useState("");
  const [eemail, setEEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const getProduct = async () => {
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/products/${id}`;
      const res = await axios.get(url);
      setProduct(res.data.product);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch product");
    }
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleSubmitEnquiry = async () => {
    if (!ename || !eemail || !message) {
      setFormError("All fields are required");
      setFormSuccess("");
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/enquiries`;

      await axios.post(url, {
        name: ename,
        email: eemail,
        message,
        product_id: product.id,
      });

      setFormSuccess("Enquiry sent successfully!");
      setFormError("");
      setShowForm(false);
      setEName("");
      setEEmail("");
      setMessage("");
    } catch (err) {
      setFormError("Failed to send enquiry");
      setFormSuccess("");
    }
  };

  if (loading) return <h3 className="loading">Loading...</h3>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return null;

  return (
    <div className="product-details-container">
      <div className="product-left">
        <img src={product.image} alt={product.name} className="product-img" />
      </div>

      <div className="product-right">
        <h2>{product.name}</h2>
        <p className="price">₹{product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="desc">{product.description}</p>

        <button
          className="enquiry-btn"
          onClick={() => setShowForm(true)}
        >
          Enquire Now
        </button>
      </div>

      {/* Enquiry Modal */}
      {showForm && (
        <div className="enquiry-modal">
          <div className="enquiry-box">
            <h3>Send Enquiry</h3>

            {formError && <p className="error">{formError}</p>}
            {formSuccess && <p className="success">{formSuccess}</p>}

            <input
              type="text"
              placeholder="Your Name"
              value={ename}
              onChange={(e) => setEName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email"
              value={eemail}
              onChange={(e) => setEEmail(e.target.value)}
            />

            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button className="send-btn" onClick={handleSubmitEnquiry}>
              Submit
            </button>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
