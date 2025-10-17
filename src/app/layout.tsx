import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import styles from "./layout.module.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Langdy 과제",
  description: "Langdy 프론트엔드 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={roboto.className}>
        <Header />
        <main className={styles.layoutMain}>
          <Sidebar />
          <div className={styles.layoutContent}>{children}</div>
        </main>
      </body>
    </html>
  );
}
