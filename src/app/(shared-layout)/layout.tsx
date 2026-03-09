import Navbar from "@/components/web/Navbar";
import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: {
    default: "The Blog", // Used if a page doesn't have a title
    template: "%s | The Blog", // The %s is replaced by the page's title
  },
  description: "Where Ideas Find Their Voice.",
};
export default function SharedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
