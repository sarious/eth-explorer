import { Route, Routes } from "react-router-dom";
import { BlockDetailsPage } from "./pages/BlockDetailsPage";
import { AddressDetailsPage } from "./pages/AddressDetailsPage";
import { BlockTransactionsPage } from "./pages/BlockTransactionsPage";
import { TransactionDetailsPage } from "./pages/TransactionDetailsPage";

export function AppRouting() {
  return (
    <Routes>
      <Route index element={<>Main page</>} />
      <Route
        path="blocks/:blockHashOrBlockTag"
        element={<BlockDetailsPage />}
      />
      <Route
        path="blocks/:blockHashOrBlockTag/transactions"
        element={<BlockTransactionsPage />}
      />
      <Route path="transactions/:txHash" element={<TransactionDetailsPage />} />
      <Route path="addresses/:address" element={<AddressDetailsPage />} />
    </Routes>
  );
}
