import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-ink">
      <div className="container-luxe py-24 text-center">
        <div aria-hidden="true" className="mx-auto flex items-center gap-5">
          <span className="h-px w-12 bg-gold/40" />
          <span className="text-gold/60">✦</span>
          <span className="h-px w-12 bg-gold/40" />
        </div>
        <p className="eyebrow eyebrow-on-dark mt-9">Error · 404</p>
        <h1 className="mx-auto mt-6 font-serif text-5xl leading-[1.05] text-cream md:text-7xl">
          This page has scattered
          <br />
          <em className="italic text-gold-light">like perfume.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-md text-sm leading-7 text-cream/60">
          The scent you followed leads nowhere — but the collection is always
          here, and it is always worth revisiting.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/" className="btn btn-gold">
            Return home
          </Link>
          <Link href="/all-perfumes" className="text-link text-link-light text-cream">
            Browse the collection
          </Link>
        </div>
      </div>
    </section>
  );
}