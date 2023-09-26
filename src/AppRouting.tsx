import { Navigate, Route, Routes } from "react-router-dom";
import { BlockDetailsPage } from "./pages/BlockDetailsPage";
import { AddressDetailsPage } from "./pages/AddressDetailsPage";
import { BlockTransactionsPage } from "./pages/BlockTransactionsPage";
import { TransactionDetailsPage } from "./pages/TransactionDetailsPage";
import { MainPage } from "./pages/MainPage";
import { NftByAddressPage } from "./pages/NftByAddressPage";
import { NftDetailsPage } from "./pages/NftDetailsPage";

export function AppRouting() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route
        path="blocks/:blockHashOrBlockTag"
        element={<BlockDetailsPage />}
      />
      <Route
        path="blocks/:blockHashOrBlockTag/transactions"
        element={<BlockTransactionsPage />}
      />
      <Route path="transactions/:txHash" element={<TransactionDetailsPage />} />
      <Route path="addresses/:address" element={<AddressDetailsPage />}>
        {/* <Route index element={<Navigate to="tokens" replace />} /> */}
        {/* <Route index path="tokens" element={<TokenHoldingsByAddressPage />} /> */}
      </Route>
      <Route path="addresses/:address/nft" element={<NftByAddressPage />} />

      <Route
        path="nft/:contractAddress/:tokenId"
        element={<NftDetailsPage />}
      />
    </Routes>
  );
}
