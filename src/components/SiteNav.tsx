import { FloatingNav } from "@/components/ui/floating-navbar";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Docs", link: "/docs" },
];

export function SiteNav() {
  return <FloatingNav navItems={navItems} />;
}
