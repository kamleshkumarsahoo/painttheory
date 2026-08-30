import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="grain relative mt-20 overflow-hidden bg-ink text-paper md:mt-24">
      {/* Subtle warm glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-30 md:h-72"
        style={{
          background:
            "radial-gradient(55% 100% at 12% 0%, color-mix(in oklab, var(--clay) 50%, transparent), transparent 85%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pb-7 pt-16 md:px-10 md:pb-10 md:pt-32">

        {/* Main footer content */}
        <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-20">

          {/* Left / Studio */}
          <div className="max-w-xl">
            <p className="label text-paper/40">
              Painttheory · studio of Kamlesh Sahoo
            </p>

            <p className="mt-6 max-w-lg text-sm leading-[1.8] text-paper/65 md:mt-8 md:text-lg">
              Original paintings, made by hand and lived with for a while
              before they find a new wall. Enquiries and commissions are
              always open.
            </p>

            <a
              href="mailto:emailkamleshsahoo@gmail.com"
              className="link-underline mt-7 inline-block text-sm tracking-wide text-clay md:mt-10"
            >
              emailkamleshsahoo@gmail.com
            </a>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-12 md:flex md:gap-20">

            {/* Site */}
            <div className="flex flex-col gap-4 md:min-w-[70px] md:gap-5">
              <span className="label text-paper/40">
                Site
              </span>

              <Link
                to="/gallery"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Gallery
              </Link>

              <Link
                to="/about"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Artist
              </Link>

              <Link
                to="/journal"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Journal
              </Link>

              <Link
                to="/contact"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Contact
              </Link>
            </div>

            {/* Elsewhere */}
            <div className="flex flex-col gap-4 md:min-w-[90px] md:gap-5">
              <span className="label text-paper/40">
                Elsewhere
              </span>

              <a
                href="#"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Behance
              </a>

              <a
                href="#"
                className="text-sm text-paper/70 transition-colors hover:text-paper"
              >
                Artsy
              </a>
            </div>
          </div>
        </div>

        {/* Large decorative wordmark */}
        <div className="mt-10 w-full overflow-hidden md:mt-16">
          <p
            aria-hidden="true"
            className="select-none text-center text-[20vw] font-normal leading-none tracking-[-0.055em] text-paper/[0.15] md:text-[15vw]"
            style={{
              fontFamily: '"Melodrama", serif',
            }}
          >
            PaintTheory
          </p>
        </div>

        {/* Bottom divider */}
        <div className="mt-8 border-t border-paper/15 pt-5 md:mt-10 md:pt-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="label text-paper/35">
              © {new Date().getFullYear()} Painttheory. All works original.
            </span>

            <span className="label text-paper/35">
              Shipped worldwide
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}