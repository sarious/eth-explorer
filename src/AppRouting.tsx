import { Route, Routes } from "react-router-dom";
import { BlockPage } from "./pages/BlockPage";

export function AppRouting() {
  return (
    <Routes>
      <Route index element={<>Main page</>} />
      <Route path="blocks/:blockNumber" element={<BlockPage />} />
      <Route path="transactions/:txHash" element={<>Transaction info</>} />
      <Route path="addresses/:address" element={<>Addresses info</>} />
    </Routes>
  );
}
