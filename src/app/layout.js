import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
  title: "Full Stack Dev",
  description: "Rakibuzzaman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <AuthProvider>
          <div className="max-w-[900px] mx-auto">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </html>
  );
}
