import SideBar from "../components/layouts/SideBar";
import "@/src/theme/globals.css";
import { Nunito } from "next/font/google";
import { Toaster } from "../components/ui/sonner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className={`flex flex-1 flex-row`}>
        <SideBar />
        <div className="flex-1">{children}</div>\
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
