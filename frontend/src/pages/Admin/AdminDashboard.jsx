import { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const url = `${process.env.REACT_APP_API_URL}/api/enquiries`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEnquiries(res.data.enquiries || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch enquiries");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {loading && <p>Loading enquiries...</p>}
      {error && <p className="error">{error}</p>}

      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Product ID</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {enquiries.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.message}</td>
                <td>{e.product_id}</td>
                <td>{e.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
