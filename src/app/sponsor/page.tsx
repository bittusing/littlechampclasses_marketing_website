import type { Metadata } from "next";
import { SponsorClient } from "@/components/sponsor/SponsorClient";

export const metadata: Metadata = {
  title: "Demo classes",
  description: "Book ₹9 demo classes powered by our MongoDB-backed API.",
};

export default function SponsorPage() {
  return <SponsorClient />;
}
