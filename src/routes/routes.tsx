import App from "@/App";
import { Route, Routes } from "react-router";

export function RouteList() {
  return (
    <Routes>
      <Route index element={<App />} />
      <Route path=":id" element={<App />} />
    </Routes>
  );
}
