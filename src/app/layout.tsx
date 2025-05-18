import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import { GlobalProvider } from "@/lib/context/GlobalDataContext";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Box } from "@chakra-ui/react"; // add import for container

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventPlanner",
  description: "Aplikacja do planowania wydarzeń",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <GlobalProvider>
            <Navbar />
            <Box maxW="1200px" mx="auto" px={4}>
              {children}
            </Box>
            <Toaster />
          </GlobalProvider>
        </Provider>
      </body>
    </html>
  );
}
