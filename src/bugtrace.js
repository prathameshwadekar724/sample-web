
const response = await fetch(`${BUGTRACE_API}/api/ingest`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(payload)
});

const contentType = response.headers.get("content-type") || "";

if (!contentType.includes("application/json")) {
  const text = await response.text();

  throw new Error(
    `BugTrace returned non-JSON response (HTTP ${response.status}): ${
      text.slice(0, 150)
    }`
  );
}

const result = await response.json();

if (!response.ok || result.success === false) {
  throw new Error(
    result.message || `BugTrace HTTP ${response.status}`
  );
}
