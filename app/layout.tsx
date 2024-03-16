import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Providers from "@/components/shared/providers";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fluidpay",
  description: "Seamlessly pay from different stealth addresses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={raleway.className}>
        <Providers>
          <main className="max-w-[430px] mx-auto border-x w-full h-screen border-[#232324] overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
