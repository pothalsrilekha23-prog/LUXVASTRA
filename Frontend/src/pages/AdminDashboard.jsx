import { useNavigate } from "react-router-dom";
import { useState } from "react";

const banner =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [catalogOpen, setCatalogOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
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
            <li style={sidebarItem}>Products</li>
            <li style={sidebarItem} onClick={() => setCatalogOpen(!catalogOpen)}>
              Catalog Management
            </li>

            {catalogOpen && (
              <ul style={{ listStyle: "none", paddingLeft: "15px", fontSize: "14px" }}>
                <li style={sidebarItem} onClick={() => navigate("/admin/categories")}>
                  Categories
                </li>

                <li style={sidebarItem} onClick={() => navigate("/admin/attributes")}>
                  Attributes
                </li>

                <li style={sidebarItem} onClick={() => navigate("/admin/approve-products")}>
                  Approve / Reject Products
                </li>

                <li style={sidebarItem} onClick={() => navigate("/admin/featured-products")}>
                  Featured Products
                </li>

                <li style={sidebarItem} onClick={() => navigate("/admin/brands")}>
                  Brand Management
                </li>
              </ul>
            )}
            <li style={sidebarItem}>Orders</li>
            <li style={sidebarItem}>Analytics</li>
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
          ADMIN DASHBOARD
        </h1>
        <p style={{ fontSize: "18px", maxWidth: "600px" }}>
          Manage your products, orders, and luxury collections efficiently.
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