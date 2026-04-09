import { useState } from "react";
import { callApi, getMeasurementType } from "../../api";
import { QuantityInput, ResultCard } from "../../getMeasurementType/components/shared";

export default function ComparePage() {
  const [a, setA] = useState({ value: "", unit: "" });
  const [b, setB] = useState({ value: "", unit: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const body = [
        { value: parseFloat(a.value), unit: a.unit, measurementType: getMeasurementType(a.unit) },
        { value: parseFloat(b.value), unit: b.unit, measurementType: getMeasurementType(b.unit) },
      ];
      const data = await callApi("/compare", "POST", body);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Compare</h2>
      <QuantityInput
        value={a.value}
        unit={a.unit}
        onValueChange={(v) => setA({ ...a, value: v })}
        onUnitChange={(u) => setA({ ...a, unit: u })}
        label="First quantity"
      />
      <QuantityInput
        value={b.value}
        unit={b.unit}
        onValueChange={(v) => setB({ ...b, value: v })}
        onUnitChange={(u) => setB({ ...b, unit: u })}
        label="Second quantity"
      />
      <button className="btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Comparing…" : "Compare"}
      </button>
      <ResultCard result={result} error={error} />
    </div>
  );
}
