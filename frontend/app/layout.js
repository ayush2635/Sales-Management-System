import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "../components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sales Management System",
  description: "Retail Sales Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </head>
      <body className={inter.className}>
        <div className="flex h-screen w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </div>
      </body>
    </html>
  );
}
