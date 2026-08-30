import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

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
  const [visible, setVisible] = useState(true);

  const headerRef = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openRef = useRef(open);
  const scrolledRef = useRef(scrolled);

  // Keep refs synchronized with state
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    scrolledRef.current = scrolled;
  }, [scrolled]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startInactivityTimer = () => {
    clearTimer();

    if (!scrolledRef.current || openRef.current) {
      return;
    }

    timerRef.current = setTimeout(() => {
      // Check again when the timer actually fires.
      if (scrolledRef.current && !openRef.current) {
        setVisible(false);
      }

      timerRef.current = null;
    }, 3000);
  };

  /*
   * Scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 32;

      scrolledRef.current = isScrolled;
      setScrolled(isScrolled);

      // At the top, always show the full header.
      if (!isScrolled) {
        clearTimer();
        setVisible(true);
        return;
      }

      // Every scroll is user activity.
      setVisible(true);

      if (!openRef.current) {
        startInactivityTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    // Set initial state without starting an unwanted timer.
    const initiallyScrolled = window.scrollY > 32;

    scrolledRef.current = initiallyScrolled;
    setScrolled(initiallyScrolled);

    if (!initiallyScrolled) {
      setVisible(true);
    } else {
      setVisible(true);
      startInactivityTimer();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimer();
    };
  }, []);

  /*
   * User interaction wakes the header.
   */
  useEffect(() => {
    const wakeHeader = () => {
      if (!scrolledRef.current || openRef.current) {
        return;
      }

      setVisible(true);
      startInactivityTimer();
    };

    const handleMouseMove = () => {
      // Mouse movement is only relevant on desktop.
      if (window.innerWidth < 768) {
        return;
      }

      wakeHeader();
    };

    const handleTouchStart = () => {
      wakeHeader();
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  /*
   * Opening the mobile menu keeps the header visible.
   */
  useEffect(() => {
    if (open) {
      clearTimer();
      setVisible(true);
    } else if (scrolled) {
      startInactivityTimer();
    }
  }, [open, scrolled]);

  /*
   * Close mobile menu when tapping outside the entire header.
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideInteraction = (
      event: MouseEvent | TouchEvent,
    ) => {
      const target = event.target as Node;

      if (
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideInteraction,
    );

    document.addEventListener(
      "touchstart",
      handleOutsideInteraction,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideInteraction,
      );

      document.removeEventListener(
        "touchstart",
        handleOutsideInteraction,
      );
    };
  }, [open]);

  /*
   * Cleanup timer when component unmounts.
   */
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`
        fixed left-0 right-0 top-0 z-50
        transition-all duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          scrolled
            ? "px-4 pt-3 sm:px-5 md:px-6 lg:px-[4.2vw] lg:pt-[15px]"
            : "px-0 pt-0"
        }

        ${
          scrolled && !visible
            ? "pointer-events-none -translate-y-[calc(100%+20px)] opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      {/* Main header */}
      <div
        className={`
          relative flex items-center justify-between
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            scrolled
              ? `
                h-[52px]
                w-full
                rounded-[20px]
                bg-[#2b2622]
                px-5
                text-[#f4eee5]
                shadow-[0_8px_24px_rgba(35,28,23,0.15)]
                sm:h-[54px]
                sm:px-6
                lg:h-[56px]
                lg:px-[28px]
              `
              : `
                h-[74px]
                w-full
                border-b
                border-black/10
                bg-[#faf9f6]
                px-5
                text-foreground
                sm:h-[78px]
                sm:px-8
                lg:h-[82px]
                lg:px-[52px]
              `
          }
        `}
      >
        {/* Painttheory */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`
            shrink-0
            text-[19px]
            leading-none
            tracking-[-0.015em]
            transition-colors duration-500
            sm:text-[20px]
            lg:text-[21px]
            ${
              scrolled
                ? "text-[#f4eee5]"
                : "text-foreground"
            }
          `}
          style={{
            fontFamily: '"Melodrama", serif',
            fontWeight: 400,
          }}
        >
          PaintTheory
        </Link>

        {/* Desktop navigation */}
        <nav
          className={`
            hidden items-center md:flex

            ${
              scrolled
                ? "absolute left-[48%] -translate-x-1/2 gap-6 lg:gap-8"
                : "ml-auto gap-6 lg:gap-[42px]"
            }
          `}
        >
          {navLinks.map((link) => {
            const isContact = link.to === "/contact";

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  link-underline
                  whitespace-nowrap
                  text-[10px]
                  font-medium
                  transition-colors
                  duration-300

                  ${
                    scrolled
                      ? "uppercase tracking-[0.15em] text-[#f4eee5]/70 hover:text-[#f4eee5]"
                      : "tracking-[0.08em] text-foreground/65 hover:text-foreground"
                  }

                  ${isContact && scrolled ? "hidden" : ""}
                `}
                activeProps={{
                  className: `
                    link-underline
                    whitespace-nowrap
                    text-[10px]
                    font-medium
                    transition-colors
                    duration-300

                    ${
                      scrolled
                        ? "uppercase tracking-[0.15em] text-[#f4eee5]"
                        : "tracking-[0.08em] text-foreground"
                    }

                    ${isContact && scrolled ? "hidden" : ""}
                  `,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right translucent Enquire section */}
        <Link
          to="/contact"
          className={`
            absolute
            right-0
            top-0
            hidden
            h-full
            w-[110px]
            items-center
            justify-center
            rounded-r-[20px]
            border-l
            border-white/25
            bg-white/[0.035]
            text-[9px]
            font-medium
            uppercase
            tracking-[0.16em]
            text-[#f4eee5]/80
            transition-all
            duration-300
            hover:bg-white/[0.07]
            hover:text-[#f4eee5]
            md:flex

            ${
              scrolled
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }
          `}
        >
          Enquire
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className={`
            relative
            z-10
            label
            md:hidden

            ${
              scrolled
                ? "text-[#f4eee5]"
                : "text-foreground"
            }
          `}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`
          overflow-hidden
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden

          ${
            open
              ? "mt-2 max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <nav
          className={`
            flex
            flex-col
            gap-1
            rounded-2xl
            px-6
            py-5
            shadow-lg

            ${
              scrolled
                ? "bg-[#2b2622] text-[#f4eee5]"
                : "border border-black/10 bg-[#faf9f6] text-foreground"
            }
          `}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`
                py-2
                text-lg

                ${
                  scrolled
                    ? "text-[#f4eee5]/80"
                    : "text-foreground/80"
                }
              `}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className={`
              mt-3
              flex
              h-10
              items-center
              justify-center
              rounded-full
              text-sm
              font-medium

              ${
                scrolled
                  ? "bg-[#f5f1e9] text-[#2b2622]"
                  : "bg-foreground text-background"
              }
            `}
          >
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}