import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

;

export const metadata: Metadata = {
  title: "Ojha Bazar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <Provider>
    <html lang="en">
        <body>
          <Nav />
          {children}
        </body>
    </html>
      </Provider>
  );
}
