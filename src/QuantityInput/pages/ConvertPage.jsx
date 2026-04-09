import { useState } from "react";
import { callApi, getMeasurementType } from "../../api";
import { QuantityInput, UnitSelect, ResultCard } from "../../getMeasurementType/components/shared";

export default function ConvertPage() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [targetUnit, setTargetUnit] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!value || !unit || !targetUnit) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const body = {
        value: parseFloat(value),
        unit,
        measurementType: getMeasurementType(unit),
      };
      const data = await callApi(`/convert/${targetUnit}`, "POST", body);
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Convert</h2>
      <QuantityInput
        value={value}
        unit={unit}
        onValueChange={setValue}
        onUnitChange={setUnit}
        label="From"
      />
      <UnitSelect value={targetUnit} onChange={setTargetUnit} label="To unit" />
      <button className="btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Converting…" : "Convert"}
      </button>
      <ResultCard result={result} error={error} />
    </div>
  );
}
