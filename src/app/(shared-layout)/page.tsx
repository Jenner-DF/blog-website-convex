import LandingPage from "@/components/web/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Blog | Where Ideas Find Their Voice",
  description:
    "Write, publish, and share your stories with the world. Join our community of writers and readers today.",
};

export default async function HomePage() {
  return <LandingPage />;
}
