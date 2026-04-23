import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

try {
  createRoot(container).render(<App />);
} catch {
  const legacyReactDOM = ReactDOM as typeof ReactDOM & {
    render?: (element: React.ReactNode, target: Element | DocumentFragment | null) => void;
  };

  if (typeof legacyReactDOM.render === "function") {
    legacyReactDOM.render(<App />, container);
  } else {
    throw new Error("No compatible React DOM render API found");
  }
}
