import { UNITS } from "../../api";
import "./shared.css";

export function ResultCard({ result, error }) {
  if (error) {
    return (
      <div className="result-card">
        <p className="result-error-title">Error</p>
        <p className="result-error-text">{error}</p>
      </div>
    );
  }
  if (!result) return null;

  return (
    <div className="result-card">
      <p className="result-title">
        Result
      </p>
      {result.error ? (
        <p className="result-error-title">{result.errorMessage}</p>
      ) : result.resultString ? (
        <p className="result-value">{result.resultString}</p>
      ) : (
        <p className="result-value">
          {typeof result.resultValue === "number"
            ? result.resultValue.toFixed(4).replace(/\.?0+$/, "")
            : result.resultValue}{" "}
          <span className="result-unit">
            {result.resultUnit}
          </span>
        </p>
      )}
      {result.operation && <span className="badge" style={{ marginTop: 12, display: "inline-block" }}>{result.operation}</span>}
    </div>
  );
}

export function UnitSelect({ value, onChange, label }) {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="select">
        <option value="">Select unit</option>
        <option value="METER">Meter</option>
        <option value="CENTIMETER">Centimeter</option>
        <option value="INCH">Inch</option>
        <option value="FOOT">Foot</option>
        <option value="KILOGRAM">Kilogram</option>
        <option value="GRAM">Gram</option>
        <option value="LITER">Liter</option>
        <option value="MILLILITER">Milliliter</option>
        <option value="CELSIUS">Celsius</option>
        <option value="FAHRENHEIT">Fahrenheit</option>
      </select>
    </div>
  );
}

export function QuantityInput({ value, unit, onValueChange, onUnitChange, label }) {
  return (
    <div className="q-row">
      <div className="field">
        {label && <label className="label">{label}</label>}
        <input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="Enter value"
          className="input"
        />
      </div>
      <UnitSelect value={unit} onChange={onUnitChange} label={label ? "\u00a0" : ""} />
    </div>
  );
}
