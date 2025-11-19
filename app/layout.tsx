import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata = {
  title: "India vACC",
  description: "Official virtual Air Control Center website",
  icons: {
    icon: `https://tremendous-oasis-7b78bc3ba3.media.strapiapp.com/Favicon_Standard_1c219013bc.svg`,
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
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
