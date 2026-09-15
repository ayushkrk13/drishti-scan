import type { Metadata } from "next";
import { Rajdhani, Ubuntu } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import { CursorProvider } from "@/lib/CursorContext";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "DRISTI-SCAN",
  description: "Interactive phygital reading web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${ubuntu.variable} antialiased font-ubuntu`}
      >
        <CursorProvider>
          <CustomCursor />
          <AuthProvider>
            <div className="min-h-screen flex flex-col relative overflow-hidden">
              {/* Background Blob Elements */}
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
              
              <Navbar />
              <main className="flex-1 flex flex-col z-10">
                {children}
              </main>
            </div>
          </AuthProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
