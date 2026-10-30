import type { Metadata, Viewport } from "next";
import "./globals.css";

// フォントは端末のシステムフォントを使う（外部フォント取得に依存しない）

const DESCRIPTION =
  "日付で決まる今日のテーマと、朝・昼・夜の開運バフを巫女ねこが渡す、1日1回の小さな占い。引き直しはなし、結果はその日固定です。";

export const metadata: Metadata = {
  title: "今日の開運バフ",
  description: DESCRIPTION,
  openGraph: {
    title: "今日の開運バフ",
    description: DESCRIPTION,
    siteName: "今日の開運バフ",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "今日の開運バフ",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#b03a2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
