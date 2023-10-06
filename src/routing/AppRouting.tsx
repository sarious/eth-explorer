import { Navigate, Route, Routes } from "react-router-dom";
import { BlockDetailsPage } from "pages/BlockDetailsPage";
import { AddressDetailsPage } from "pages/AddressDetailsPage";
import { BlockTransactionsPage } from "pages/BlockTransactionsPage";
import { TransactionDetailsPage } from "pages/TransactionDetailsPage";
import { MainPage } from "pages/MainPage";
import { NftByAddressPage } from "pages/NftByAddressPage";
import { NftDetailsPage } from "pages/NftDetailsPage";
import { TokenHoldingsByAddressPage } from "pages/TokenHoldingsByAddressPage";
import { AddressPage } from "pages/AddressPage";
import * as path from "./path";

export function AppRouting() {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route
        path={`${path.blocks}/:${path.blockHashOrBlockTagParam}`}
        element={<BlockDetailsPage />}
      />
      <Route
        path={`${path.blocks}/:${path.blockHashOrBlockTagParam}/${path.transactions}`}
        element={<BlockTransactionsPage />}
      />
      <Route
        path={`${path.transactions}/:${path.txHashParam}`}
        element={<TransactionDetailsPage />}
      />
      <Route
        path={`${path.addresses}/:${path.addressParam}`}
        element={<AddressPage />}
      >
        <Route index element={<Navigate to={path.details} replace />} />
        <Route path={path.details} element={<AddressDetailsPage />} />
        <Route path={path.tokens} element={<TokenHoldingsByAddressPage />} />
        <Route path={path.nfts} element={<NftByAddressPage />} />
      </Route>

      <Route
        path={`${path.nfts}/:${path.contractAddressParam}/:${path.tokenIdParam}`}
        element={<NftDetailsPage />}
      />
    </Routes>
  );
}
