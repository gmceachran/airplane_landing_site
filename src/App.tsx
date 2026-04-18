import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/HomePage";
import { PartsPlaceholderPage } from "@/pages/PartsPlaceholderPage";

export default function App() {
  const basename =
    import.meta.env.BASE_URL === "/"
      ? undefined
      : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/parts" element={<PartsPlaceholderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
