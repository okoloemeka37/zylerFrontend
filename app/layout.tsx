import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { config } from '@fortawesome/fontawesome-svg-core';

import '../lib/fontawesome'; // Initialize FontAwesome

config.autoAddCss = false; // Disable auto-injection of FontAwesome CSS
import Navbar  from "@/app/component/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className="">
        <Navbar />
      
        {children}
      </body>
    </html>
    </AuthProvider>
  );
}
