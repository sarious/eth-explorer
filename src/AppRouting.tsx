import { Route, Routes } from "react-router-dom";
import { BlockDetailsPage } from "./pages/BlockDetailsPage";
import { AddressDetailsPage } from "./pages/AddressDetailsPage";

export function AppRouting() {
  return (
    <Routes>
      <Route index element={<>Main page</>} />
      <Route path="blocks/:blockNumber" element={<BlockDetailsPage />} />
      <Route path="transactions/:txHash" element={<>Transaction info</>} />
      <Route path="addresses/:address" element={<AddressDetailsPage />} />
    </Routes>
  );
}
