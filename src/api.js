const API_BASE = "/quantity";
 
export async function callApi(endpoint, method = "POST", body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, opts);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
 
export const UNITS = {
  LENGTH: ["METER", "CENTIMETER", "INCH", "FOOT"],
  WEIGHT: ["KILOGRAM", "GRAM"],
  VOLUME: ["LITER", "MILLILITER"],
  TEMPERATURE: ["CELSIUS", "FAHRENHEIT"],
};
 
export function getMeasurementType(unit) {
  for (const [type, units] of Object.entries(UNITS)) {
    if (units.includes(unit?.toUpperCase())) return type;
  }
  return "";
}