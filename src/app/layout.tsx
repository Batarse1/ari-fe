import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "Secure Data Exchange Software",
  description:
    "This project involves the development of a secure data exchange software, focusing on information security asset management. The software aims to explore and utilize standard protocols for application communication and exchange on the web. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
