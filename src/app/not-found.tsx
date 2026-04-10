import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-32">
      <Container className="text-center">
        <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          404
        </span>
        <h1 className="font-display text-4xl font-bold text-ivory sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-silver">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-ivory transition-colors hover:bg-champagne"
          >
            Back to Home
          </Link>
          <Link
            href="/#catalog"
            className="inline-flex items-center rounded-lg border border-slate px-6 py-3 text-sm font-medium text-silver transition-colors hover:border-gold hover:text-ivory"
          >
            Browse Catalog
          </Link>
        </div>
      </Container>
    </div>
  );
}
