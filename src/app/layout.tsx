import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockStateProvider } from "./context/MockStateContext";
import EdgeCaseSelector from "./components/EdgeCaseSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABTalks Redesign | Premium 60-Day Code Challenge",
  description: "Accelerating consistency and career outcomes for Indian developers through public building.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-violet-500/30 selection:text-violet-200">
        <MockStateProvider>
          {children}
          <EdgeCaseSelector />
        </MockStateProvider>
      </body>
    </html>
  );
}
