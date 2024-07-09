import { Roboto as Robot } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontRoboto = Robot({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  preload: true,
  variable: "--font-robot",
});

export const metadata = {
  title: "Management System",
  // school management system
  author: "Your Name",
  keywords: ["management system", "school"],
  image: "/favicon.png",
  description:
    "A simple, efficient, and user-friendly management system for school.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-roboto antialiased",
          fontRoboto.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
