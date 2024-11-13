import "./globals.css";

import Navbar  from "@/app/component/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />
      
        {children}
      </body>
    </html>
  );
}
