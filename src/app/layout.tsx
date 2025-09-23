import SideBar from "../features/components/SideBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"flex flex-1 flex-row overflow-hidden"}>
        <SideBar />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
