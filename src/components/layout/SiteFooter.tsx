import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="hairline mx-auto w-full max-w-[1400px] px-5 pb-10 pt-16 md:px-10">
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label">Painttheory | studio of Kamlesh Sahoo</p>

          <p className="wordmark wordmark-hover mt-3 text-[13vw] md:text-[7vw]">
            Painttheory
          </p>
        </div>

        <div className="flex gap-10 text-xs text-muted-foreground">
          <div className="flex flex-col gap-2">
            <span className="label">Site</span>

            <Link to="/gallery" className="link-underline">
              Gallery
            </Link>

            <Link to="/about" className="link-underline">
              Artist
            </Link>

            <Link to="/journal" className="link-underline">
              Journal
            </Link>

            <Link to="/contact" className="link-underline">
              Contact
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="label">Elsewhere</span>

            <span>Instagram</span>
            <span>Behance</span>
            <span>emailkamleshsahoo@gmail.com</span>
          </div>
        </div>
      </div>

      <p className="label mt-12">
        © {new Date().getFullYear()} Painttheory. All works original.
      </p>
    </footer>
  );
}