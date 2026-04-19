import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { siteConfig } from "@/data/site-config";

const footerLinks = {
  catalog: [
    { label: "All Products", href: "/#catalog" },
    { label: "Lows", href: "/#catalog" },
    { label: "Zaa", href: "/#catalog" },
    { label: "Indoors", href: "/#catalog" },
    { label: "Exotics", href: "/#catalog" },
    { label: "Moon Rocks", href: "/#catalog" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ],
  support: [
    { label: "How It Works", href: "/#process" },
    { label: "Shipping Info", href: "/blog" },
    { label: "FAQ", href: "/blog" },
  ],
};

export function Footer() {
  return (
    <footer className="glass-dark backdrop-blur-xl border-t border-graphite">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <Image
                src="/images/logo.webp"
                alt="Park Street Boys"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="font-display text-base font-semibold text-ivory">
                Park Street Boys
              </span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-silver">
              {siteConfig.tagline}. Serving licensed businesses with competitive
              pricing and curated selections.
            </p>
            <p className="mb-5 text-xs text-ash">{siteConfig.address}</p>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-ivory">
                Follow Us
              </h3>
              <SocialLinks iconSize="sm" />
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-ivory">
              Catalog
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.catalog.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-ivory">
              Company
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-ivory">
              Support
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-sm text-silver">
              <p>{siteConfig.contactEmail}</p>
              <p>{siteConfig.contactPhone}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-graphite">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-ash">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-ash">
            Premium wholesale distribution. 21+ only.
          </p>
        </Container>
      </div>
    </footer>
  );
}
