export const metadata = {
  title: "Login | India vACC",
  description: "Official virtual Air Control Center website",
  icons: {
    icon: `/images/logo/Favicon-Standard.svg`,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // render only page content, no main layout
}
