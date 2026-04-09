import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./common.css";
import "./App.css";
import ConvertPage from "./QuantityInput/pages/ConvertPage";
import ComparePage from "./QuantityInput/pages/ComparePage";
import AddPage from "./QuantityInput/pages/AddPage";
import SubtractPage from "./QuantityInput/pages/SubtractPage";
import DividePage from "./QuantityInput/pages/DividePage";
import HistoryPage from "./QuantityInput/pages/HistoryPage";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <nav className="app-nav">
          <span className="app-logo">Quantity</span>
          <div className="nav-links">
            <Link to="/convert" className="nav-link">Convert</Link>
            <Link to="/compare" className="nav-link">Compare</Link>
            <Link to="/add" className="nav-link">Add</Link>
            <Link to="/subtract" className="nav-link">Subtract</Link>
            <Link to="/divide" className="nav-link">Divide</Link>
            <Link to="/history" className="nav-link">History</Link>
          </div>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<ConvertPage />} />
            <Route path="/convert" element={<ConvertPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/subtract" element={<SubtractPage />} />
            <Route path="/divide" element={<DividePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
