export const metadata = {
  title: "Live | India vACC",
  description: "Official virtual Air Control Center website",
  icons: {
    icon: `/images/logo/Favicon-Standard.svg`,
  },
};

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // render only page content, no main layout
}
