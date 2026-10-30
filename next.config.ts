import type { NextConfig } from "next";

// GitHub Pages 等のサブパス配信に対応するため、basePath は環境変数から読む。
// 未指定（空）ならルート配信としてビルドされる。
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
