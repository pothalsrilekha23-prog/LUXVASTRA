import { useNavigate } from "react-router-dom";
// import "../styles/dashboard.css";

const banner =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600";

export default function VendorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/vendor-login");
  };

  return (
    <div
      className="dashboard"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        color: "#fff",
      }}
    >
      <aside
        className="sidebar"
        style={{
          width: "220px",
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginBottom: "30px" }}>LUXVASTRA</h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={sidebarItem}>Overview</li>
            <li style={sidebarItem}>My Products</li>
            <li style={sidebarItem}>Orders</li>
            <li style={sidebarItem}>Earnings</li>
          </ul>
        </div>

        <div
          onClick={handleLogout}
          style={{
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </div>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "40px",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "15px" }}>
          VENDOR DASHBOARD
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "600px" }}>
          Manage your products, track orders, and monitor your sales performance.
        </p>
      </main>
    </div>
  );
}

const sidebarItem = {
  padding: "10px 0",
  cursor: "pointer",
  fontSize: "16px",
};