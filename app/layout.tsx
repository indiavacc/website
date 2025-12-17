import "./globals.css";
import "./styles/fonts.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { LayoutClient } from "@/components/LayoutClient";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

export const metadata = {
  title: "India vACC",
  description: "Official virtual Air Control Center website",
  icons: {
    icon: `/images/logo/Favicon-Standard.svg`,
  },
  // Different based on theme
  // icons: [
  //   {
  //     rel: "icon",
  //     url: `${BASE_URL}/uploads/Favicon_Standard_0a298a132d.svg`,
  //     media: "(prefers-color-scheme: light)",
  //   },
  //   {
  //     rel: "icon",
  //     url: `${BASE_URL}/uploads/Favicon_White_Standard_89d2e83bce.svg`,
  //     media: "(prefers-color-scheme: dark)",
  //   },
  // ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white">
        <SessionProviderWrapper>
          <LayoutClient>{children}</LayoutClient>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
