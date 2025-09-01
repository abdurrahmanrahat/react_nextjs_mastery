import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { dbConnect } from "@/services/mongo";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({weight: ['300', '400', '500', '600', '700', '800'] , subsets: ["latin"]})
const poppins = Poppins({weight: ['300', '400', '500', '600', '700', '800'], subsets: ["latin"], variable: "--font-poppins"})

export const metadata = {
  title: "EduConnect",
  description: "Learn and build share",
};

export default async function RootLayout({ children }) {
  await dbConnect()
  
  return (
    <html lang="en">
      <body
        className={cn(inter.className, poppins.className)}
      >
        {children}

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
