import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"flex-1 flex-row flex overflow-hidden"}>
        <div className="bg-red-50 w-5xl h-screen overflow-y-auto"></div>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
