import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "XLCSV | Convert XLS/XLSX Files To CSV Easily",
  description: "Convert xls/xlsx files to csv easily using drag and drop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
