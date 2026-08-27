import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/commission", label: "Commission" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"}`}>
    <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
      <Link to="/" className="wordmark wordmark-hover text-base md:text-lg" onClick={() => setOpen(false)}>Painttheory</Link>
      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => <Link key={link.to} to={link.to} className="link-underline text-xs font-medium tracking-wide text-foreground/70 hover:text-foreground" activeProps={{ className: "text-foreground" }}>{link.label}</Link>)}
      </nav>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="label text-foreground md:hidden">{open ? "Close" : "Menu"}</button>
    </div>
    {open && <div className="border-t border-hairline bg-background px-5 pb-8 pt-4 md:hidden"><nav className="flex flex-col gap-4">{navLinks.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="display text-3xl">{link.label}</Link>)}</nav></div>}
  </header>;
}
