
import { useEffect } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    // 1. Generate an uncaught TypeError
    setTimeout(() => {
      const user = null;
      console.log(user.name);
    }, 500);

    // 2. Generate an uncaught ReferenceError
    setTimeout(() => {
      console.log(bugTraceUndefinedVariable);
    }, 1000);

    // 3. Generate an unhandled promise rejection
    setTimeout(() => {
      Promise.reject(
        new Error("BugTrace test: unhandled promise rejection")
      );
    }, 1500);

    // 4. Generate a failed API request
    fetch("/api/bugtrace-nonexistent-endpoint")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API failed: HTTP ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("BugTrace API failure:", error);
      });

    // 5. Generate a missing image request
    const image = new Image();
    image.src = "/bugtrace-image-that-does-not-exist.png";

    image.onerror = () => {
      console.error("BugTrace test: image failed to load");
    };
  }, []);

  return (
    <main className="page">
      <nav className="navbar">
        <a className="brand" href="/">
          BugTrace Demo
        </a>
        <span className="badge">Automated Error Test</span>
      </nav>

      <section className="hero">
        <span className="eyebrow">WEBSITE HEALTH TEST</span>

        <h1>Automated Website Failure Test</h1>

        <p>
          This website automatically generates controlled JavaScript,
          promise, API, and resource-loading errors when the page loads.
          No interaction is required.
        </p>

        <div className="status">
          <span className="status-dot" />
          Test page loaded. Errors are generated automatically.
        </div>

        <div className="info">
          <h2>Test scenarios</h2>
          <ul>
            <li>Uncaught TypeError</li>
            <li>Uncaught ReferenceError</li>
            <li>Unhandled promise rejection</li>
            <li>Failed API request</li>
            <li>Missing image resource</li>
          </ul>
        </div>
      </section>

      <footer>
        BugTrace development test website · Intentional errors
      </footer>
    </main>
  );
}
