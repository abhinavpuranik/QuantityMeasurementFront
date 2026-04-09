import { useState, useEffect } from "react";
import { callApi } from "../../api";
import "./HistoryPage.css";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    callApi("/history", "GET")
      .then(setHistory)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="page">
        <p className="loading-text">Loading history…</p>
      </div>
    );

  if (error)
    return (
      <div className="page">
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="page">
      <h2 className="page-title">History</h2>
      {history.length === 0 ? (
        <p className="empty-text">No operations recorded yet.</p>
      ) : (
        <div className="history-list">
          {[...history].reverse().map((item) => (
            <div key={item.id} className="history-row">
              <div className="history-header">
                <span className="badge">{item.operation}</span>
                <span className="history-meta">
                  #{item.id} · {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="history-content">
                <span className="history-input">
                  {item.thisValue} {item.thisUnit}
                  {item.thatUnit ? ` · ${item.thatValue} ${item.thatUnit}` : ""}
                </span>
                {!item.isError ? (
                  <span className="history-result">
                    {item.resultString ||
                      `${item.resultValue?.toFixed(4).replace(/\.?0+$/, "")} ${item.resultUnit || ""}`}
                  </span>
                ) : (
                  <span className="history-error">
                    {item.errorMessage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
