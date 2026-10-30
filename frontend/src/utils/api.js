// src/utils/api.js
const API_BASE = (import.meta.env.VITE_API_BASE || "/api").replace(/\/+$/, "");
const DIRECT_BACKEND = (import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api").replace(/\/+$/, "");
const DEFAULT_TIMEOUT = 20000; // 20s

async function http(
  path,
  { method = "GET", json, formData, headers = {}, timeout = DEFAULT_TIMEOUT, signal, credentials } = {}
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const makeRequest = (url) =>
    fetch(url, {
      method,
      headers: {
        ...(json ? { "content-type": "application/json" } : {}),
        Accept: "application/json",
        ...headers,
      },
      body: formData ? formData : json ? JSON.stringify(json) : undefined,
      signal: signal ?? controller.signal,
      credentials: credentials ?? "same-origin",
    });

  try {
    let res;
    try {
      res = await makeRequest(`${API_BASE}${path}`);
    } catch (netErr) {
      if (API_BASE !== DIRECT_BACKEND && !signal?.aborted) {
        try {
          res = await makeRequest(`${DIRECT_BACKEND}${path}`);
        } catch {
          throw netErr;
        }
      } else {
        throw netErr;
      }
    }

    const ct = res.headers.get("content-type") || "";
    const data = ct.includes("application/json") ? await res.json() : await res.text();

    if (!res.ok) {
      const message = typeof data === "string" ? data : data?.error || res.statusText;
      const err = new Error(message);
      err.status = res.status;
      err.details = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

/* ==================== API calls (named exports) ==================== */

// Dashboard / Recommendations
export function fetchRecommendations(payload) {
  // POST /api/recommendations
  return http("/recommendations", { method: "POST", json: payload });
}

// Disease detect (file upload)
export function detectDisease(file) {
  // POST /api/detect  (multipart/form-data)
  const fd = new FormData();
  fd.append("image", file);
  return http("/detect", { method: "POST", formData: fd });
}

// Market prices forecast
export function marketForecast(body) {
  // POST /api/markets/forecast
  return http("/markets/forecast", { method: "POST", json: body });
}
// Backwards-compatible alias some pages may import
export function fetchMarketPrices(params = {}) {
  const { commodity = "tomato", mandi = "pune", horizon_days = 7 } = params;
  return marketForecast({ commodity, mandi, horizon_days });
}

export function fetchMandis() {
  return http("/markets/mandis");
}

export function fetchCommodities() {
  return http("/markets/commodities");
}

// Weather
export function weatherForecast({ lat, lon, days = 7 }) {
  const q = new URLSearchParams({ lat: String(lat), lon: String(lon), days: String(days) });
  return http(`/weather/forecast?${q.toString()}`);
}

// Chat / Assistant
export function chatWithBot(arg1, arg2) {
  let message, lang, image, context;
  if (typeof arg1 === "object" && arg1 !== null) {
    ({ message, lang = "mr", image, context = {} } = arg1);
  } else {
    message = arg1;
    lang = arg2 || "mr";
    context = {};
  }
  if (image) {
    const fd = new FormData();
    fd.append("message", message);
    fd.append("lang", lang);
    fd.append("image", image);
    Object.entries(context).forEach(([k, v]) => fd.append(k, String(v)));
    return http("/chat", { method: "POST", formData: fd });
  }
  return http("/chat", { method: "POST", json: { message, lang, ...context } });
}

/* ===== Fields CRUD for /app/fields ===== */
export function listFields() {
  return http("/fields");
}
export function createField(payload) {
  return http("/fields", { method: "POST", json: payload });
}
export function getField(id) {
  return http(`/fields/${id}`);
}
export function updateField(id, patch) {
  return http(`/fields/${id}`, { method: "PATCH", json: patch });
}
export function deleteField(id) {
  return http(`/fields/${id}`, { method: "DELETE" });
}

/* ===== Convenience helper (optional) ===== */
export const api = {
  get: (path, opts) => http(path, { method: "GET", ...(opts || {}) }),
  post: (path, body) =>
    body instanceof FormData
      ? http(path, { method: "POST", formData: body })
      : http(path, { method: "POST", json: body }),
  patch: (path, body) => http(path, { method: "PATCH", json: body }),
  delete: (path) => http(path, { method: "DELETE" }),
};

export default api;
