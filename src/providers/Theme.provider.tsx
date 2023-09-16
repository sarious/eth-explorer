import ConfigProvider from "antd/es/config-provider";
import { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "green",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
