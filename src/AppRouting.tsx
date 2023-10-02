import { Navigate, Route, Routes } from "react-router-dom";
import { BlockDetailsPage } from "./pages/BlockDetailsPage";
import { AddressDetailsPage } from "./pages/AddressDetailsPage";
import { BlockTransactionsPage } from "./pages/BlockTransactionsPage";
import { TransactionDetailsPage } from "./pages/TransactionDetailsPage";
import { MainPage } from "./pages/MainPage";
import { NftByAddressPage } from "./pages/NftByAddressPage";
import { NftDetailsPage } from "./pages/NftDetailsPage";
import { TokenHoldingsByAddressPage } from "./pages/TokenHoldingsByAddressPage";
import { AddressPage } from "./pages/AddressPage";

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
      <Route path="addresses/:address" element={<AddressPage />}>
        <Route index element={<Navigate to="details" replace />} />
        <Route path="details" element={<AddressDetailsPage />} />
        <Route path="tokens" element={<TokenHoldingsByAddressPage />} />
        <Route path="nfts" element={<NftByAddressPage />} />
      </Route>

      <Route
        path="nft/:contractAddress/:tokenId"
        element={<NftDetailsPage />}
      />
    </Routes>
  );
}
