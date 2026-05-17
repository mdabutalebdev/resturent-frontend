import Routlayout from "@/components/Routlayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Routlayout>{children}</Routlayout>;
}
