import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Provider from "../../../utils/Provider"
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Police Dashboard",
  description: "Smart security operations management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  const smallCase = session.user.role.toLowerCase();

  if (session && session.user.role !== "POLICE") {

    redirect(`${smallCase}/dashboard`);
  }
  const data = {
    link: [
      {
        href: `${smallCase}/dashboard`,
      },
      {
        href: `${smallCase}/verification`,
      },
      {
        href: `${smallCase}/dashboard/incident`,
      },
    ],
    value: [
      {
        value: "Police's Dashboard",
      },
      {
        value: "Verification",
      },
      {
        value: "Incident",
      },
    ],
  }
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar data={data} />
          {children}
        </body>
      </Provider>
    </html>
  );
}

