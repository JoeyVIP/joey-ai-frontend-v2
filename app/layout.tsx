import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joey AI Agent - 網站自動建置平台",
  description: "使用 AI 自動建立和部署您的網站專案",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
