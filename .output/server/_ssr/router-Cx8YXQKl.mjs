import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks } from "./artwork.service-D5UQhGTZ.mjs";
import { a as require_react, i as require_jsx_runtime, n as SiWhatsapp, r as SiInstagram, t as SiYoutube } from "../_libs/@icons-pack/react-simple-icons+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$23 } from "../_artworkId-Cz8yaW_o.mjs";
import { t as Route$24 } from "../_inquiryId-CDF6dpjR.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$25 } from "../_paymentId-Dq_ZSR3W.mjs";
import { t as Route$26 } from "../_token-BwMhE3U5.mjs";
import { t as socials } from "./socials-CeFA8XD3.mjs";
import { t as Route$27 } from "./gallery._artworkId-DeIfoO_G.mjs";
import { t as Route$28 } from "./journal._journalId-vfnGQ2_o.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cx8YXQKl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BM2g9xZo.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var navLinks = [
	{
		to: "/gallery",
		label: "Gallery"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/journal",
		label: "Journal"
	},
	{
		to: "/commission",
		label: "Commission"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [visible, setVisible] = (0, import_react.useState)(true);
	const headerRef = (0, import_react.useRef)(null);
	const timerRef = (0, import_react.useRef)(null);
	const openRef = (0, import_react.useRef)(open);
	const scrolledRef = (0, import_react.useRef)(scrolled);
	(0, import_react.useEffect)(() => {
		openRef.current = open;
	}, [open]);
	(0, import_react.useEffect)(() => {
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
		if (!scrolledRef.current || openRef.current) return;
		timerRef.current = setTimeout(() => {
			if (scrolledRef.current && !openRef.current) setVisible(false);
			timerRef.current = null;
		}, 3e3);
	};
	(0, import_react.useEffect)(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 32;
			scrolledRef.current = isScrolled;
			setScrolled(isScrolled);
			if (!isScrolled) {
				clearTimer();
				setVisible(true);
				return;
			}
			setVisible(true);
			if (!openRef.current) startInactivityTimer();
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		const initiallyScrolled = window.scrollY > 32;
		scrolledRef.current = initiallyScrolled;
		setScrolled(initiallyScrolled);
		if (!initiallyScrolled) setVisible(true);
		else {
			setVisible(true);
			startInactivityTimer();
		}
		return () => {
			window.removeEventListener("scroll", handleScroll);
			clearTimer();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const wakeHeader = () => {
			if (!scrolledRef.current || openRef.current) return;
			setVisible(true);
			startInactivityTimer();
		};
		const handleMouseMove = () => {
			if (window.innerWidth < 768) return;
			wakeHeader();
		};
		const handleTouchStart = () => {
			wakeHeader();
		};
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		window.addEventListener("touchstart", handleTouchStart, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchstart", handleTouchStart);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (open) {
			clearTimer();
			setVisible(true);
		} else if (scrolled) startInactivityTimer();
	}, [open, scrolled]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handleOutsideInteraction = (event) => {
			const target = event.target;
			if (headerRef.current && !headerRef.current.contains(target)) setOpen(false);
		};
		document.addEventListener("mousedown", handleOutsideInteraction);
		document.addEventListener("touchstart", handleOutsideInteraction);
		return () => {
			document.removeEventListener("mousedown", handleOutsideInteraction);
			document.removeEventListener("touchstart", handleOutsideInteraction);
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		return () => {
			clearTimer();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		ref: headerRef,
		className: `
        fixed left-0 right-0 top-0 z-50
        transition-all duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${scrolled ? "px-4 pt-3 sm:px-5 md:px-6 lg:px-[4.2vw] lg:pt-[15px]" : "px-0 pt-0"}

        ${scrolled && !visible ? "pointer-events-none -translate-y-[calc(100%+20px)] opacity-0" : "translate-y-0 opacity-100"}
      `,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `
          relative flex items-center justify-between
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${scrolled ? `
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
              ` : `
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
              `}
        `,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					onClick: () => setOpen(false),
					className: `
            shrink-0
            text-[19px]
            leading-none
            tracking-[-0.015em]
            transition-colors duration-500
            sm:text-[20px]
            lg:text-[21px]
            ${scrolled ? "text-[#f4eee5]" : "text-foreground"}
          `,
					style: {
						fontFamily: "\"Melodrama\", serif",
						fontWeight: 400
					},
					children: "PaintTheory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: `
            hidden items-center md:flex

            ${scrolled ? "absolute left-[48%] -translate-x-1/2 gap-6 lg:gap-8" : "ml-auto gap-6 lg:gap-[42px]"}
          `,
					children: navLinks.map((link) => {
						const isContact = link.to === "/contact";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: link.to,
							className: `
                  link-underline
                  whitespace-nowrap
                  text-[13px]
                  font-medium
                  transition-colors
                  duration-300

                  ${scrolled ? "uppercase tracking-[0.15em] text-[#f4eee5]/70 hover:text-[#f4eee5]" : "tracking-[0.08em] text-foreground/65 hover:text-foreground"}

                  ${isContact && scrolled ? "hidden" : ""}
                `,
							activeProps: { className: `
                    link-underline
                    whitespace-nowrap
                    text-[10px]
                    font-medium
                    transition-colors
                    duration-300

                    ${scrolled ? "uppercase tracking-[0.15em] text-[#f4eee5]" : "tracking-[0.08em] text-foreground"}

                    ${isContact && scrolled ? "hidden" : ""}
                  ` },
							children: link.label
						}, link.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					className: `
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

            ${scrolled ? "opacity-100" : "pointer-events-none opacity-0"}
          `,
					children: "Enquire"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen((value) => !value),
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					className: `
            relative
            z-10
            label
            md:hidden

            ${scrolled ? "text-[#f4eee5]" : "text-foreground"}
          `,
					children: open ? "CLOSE" : "MENU"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `
          overflow-hidden
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden

          ${open ? "mt-2 max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: `
            flex
            flex-col
            gap-1
            rounded-2xl
            px-6
            py-5
            shadow-lg

            ${scrolled ? "bg-[#2b2622] text-[#f4eee5]" : "border border-black/10 bg-[#faf9f6] text-foreground"}
          `,
				children: [navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					onClick: () => setOpen(false),
					className: `
                py-2
                text-lg

                ${scrolled ? "text-[#f4eee5]/80" : "text-foreground/80"}
              `,
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/contact",
					onClick: () => setOpen(false),
					className: `
              mt-3
              flex
              h-10
              items-center
              justify-center
              rounded-full
              text-sm
              font-medium

              ${scrolled ? "bg-[#f5f1e9] text-[#2b2622]" : "bg-foreground text-background"}
            `,
					children: "Enquire"
				})]
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "grain relative mt-20 overflow-hidden bg-ink text-paper md:mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 h-56 opacity-30 md:h-72",
			style: { background: "radial-gradient(55% 100% at 12% 0%, color-mix(in oklab, var(--clay) 50%, transparent), transparent 85%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-[1400px] px-5 pb-7 pt-16 md:px-10 md:pb-10 md:pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-12 md:flex-row md:justify-between md:gap-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label text-paper/40",
								children: "Painttheory · studio of Kamlesh Sahoo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 max-w-lg text-sm leading-[1.8] text-paper/65 md:mt-8 md:text-lg",
								children: [
									"Original paintings. Curious ideas. Made by hand.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:block" }),
									"Explore the work, follow the process, or get in touch about a piece of your own."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${socials.email}`,
								className: "link-underline mt-7 inline-block text-sm tracking-wide text-clay md:mt-10",
								children: socials.email
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-12 md:flex md:gap-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 md:min-w-[70px] md:gap-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label text-paper/40",
									children: "Site"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/gallery",
									className: "text-sm text-paper/70 transition-colors hover:text-paper",
									children: "Gallery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "text-sm text-paper/70 transition-colors hover:text-paper",
									children: "Artist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/journal",
									className: "text-sm text-paper/70 transition-colors hover:text-paper",
									children: "Journal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "text-sm text-paper/70 transition-colors hover:text-paper",
									children: "Contact"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 md:min-w-[70px] md:gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label text-paper/50",
								children: "ELSEWHERE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: socials.instagram,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiInstagram, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instagram" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: socials.youtube,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiYoutube, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "YouTube" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: socials.whatsapp,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group flex items-center gap-3 text-sm text-paper/70 transition-colors hover:text-paper",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiWhatsapp, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WhatsApp" })]
									})
								]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 w-full overflow-hidden md:mt-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"aria-hidden": "true",
						className: "select-none text-center text-[20vw] font-normal leading-none tracking-[-0.055em] text-paper/[0.15] md:text-[15vw]",
						style: { fontFamily: "\"Melodrama\", serif" },
						children: "PaintTheory"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 border-t border-paper/15 pt-5 md:mt-10 md:pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "label text-paper/35 !normal-case",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" PaintTheory · From the studio of Kamlesh Sahoo."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label text-paper/35",
							children: "Shipped worldwide"
						})]
					})
				})
			]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Lost in the gallery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-hero text-foreground",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-md text-muted-foreground",
				children: "This wall is empty. The piece you're looking for may have moved or sold."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				className: "mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent",
				children: "Return home"
			})
		]
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-section text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try again or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$22 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PaintTheory • Handmade Originals & Custom Art" },
			{
				name: "description",
				content: "Welcome to PaintTheory, A space for Handmade Acrylic and Oil Paintings inspired by people, places, memories, and everyday moments, with custom artwork created around some ideas."
			},
			{
				name: "author",
				content: "PaintTheory | Kamlesh Sahoo"
			},
			{
				name: "theme-color",
				content: "#fdfbf7"
			},
			{
				property: "og:title",
				content: "PaintTheory • Handmade Originals & Custom Art"
			},
			{
				property: "og:description",
				content: "Welcome to PaintTheory, A space for Handmade Acrylic and Oil Paintings inspired by people, places, memories, and everyday moments, with custom artwork created around some ideas."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "PaintTheory • Handmade Originals & Custom Art"
			},
			{
				name: "description",
				content: "Welcome to PaintTheory, A space for Handmade Acrylic and Oil Paintings inspired by people, places, memories, and everyday moments, with custom artwork created around some ideas."
			},
			{
				property: "og:description",
				content: "Welcome to PaintTheory, A space for Handmade Acrylic and Oil Paintings inspired by people, places, memories, and everyday moments, with custom artwork created around some ideas."
			},
			{
				name: "twitter:description",
				content: "Welcome to PaintTheory, A space for Handmade Acrylic and Oil Paintings inspired by people, places, memories, and everyday moments, with custom artwork created around some ideas."
			},
			{
				property: "og:image",
				content: "https://painttheory.in/og-image.png"
			},
			{
				name: "twitter:image",
				content: "https://painttheory.in/og-image.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$22.useRouteContext();
	const isAdmin = useLocation().pathname.startsWith("/admin");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				!isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var BASE_URL = "";
var Route$21 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/gallery",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/commission",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/about",
				changefreq: "monthly",
				priority: "0.6"
			},
			{
				path: "/contact",
				changefreq: "yearly",
				priority: "0.5"
			},
			...(await getAllArtworks()).map((a) => ({
				path: `/gallery/${a.id}`,
				changefreq: "monthly",
				priority: "0.7"
			}))
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$20 = () => import("./journal-CFBeZsID.mjs");
var Route$20 = createFileRoute("/journal")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./gallery-CJgghy47.mjs");
var Route$19 = createFileRoute("/gallery")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./feedback-D-T6mztn.mjs");
var Route$18 = createFileRoute("/feedback")({
	head: () => ({ meta: [{ title: "Feedback • PaintTheory" }, {
		name: "description",
		content: "Share your experience with a PaintTheory artwork."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./contact-DHQb4RkU.mjs");
var Route$17 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact • PaintTheory" },
		{
			name: "description",
			content: "Get in touch about artwork, commissions, ideas or simply to say hello."
		},
		{
			property: "og:title",
			content: "Contact • PaintTheory"
		},
		{
			property: "og:description",
			content: "Get in touch with PaintTheory."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./commission-25Z01XPv.mjs");
var Route$16 = createFileRoute("/commission")({
	head: () => ({ meta: [
		{ title: "Commission • PaintTheory" },
		{
			name: "description",
			content: "Commission a bespoke acrylic painting. Share your idea and we'll create an original artwork made just for you."
		},
		{
			property: "og:title",
			content: "Commission • PaintTheory"
		},
		{
			property: "og:description",
			content: "Request for a painting, share your inputs, thoughts and then we see the though unveil into reality"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin--_MU18up.mjs");
var Route$15 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin • PaintTheory" },
		{
			name: "description",
			content: "Private studio dashboard for managing artworks and collector inquiries."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-DSot49Yf.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About • PaintTheory" },
		{
			name: "description",
			content: "The story behind PaintTheory, a passionate persion painting the feeling of places, memories and emotions in different art works."
		},
		{
			property: "og:title",
			content: "About • PaintTheory"
		},
		{
			property: "og:description",
			content: "The story behind PaintTheory artwork and studio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./routes-Bz3z7_HZ.mjs");
var Route$13 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./journal.index-KdkoL_1e.mjs");
var Route$12 = createFileRoute("/journal/")({
	head: () => ({ meta: [
		{ title: "Journal • PaintTheory" },
		{
			name: "description",
			content: "Journal, stories and insights on artwork, process and life by Kamlesh Sahoo"
		},
		{
			property: "og:title",
			content: "Journal • PaintTheory"
		},
		{
			property: "og:description",
			content: "Journal, stories and insights on artwork, process and life by Kamlesh Sahoo"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./gallery.index-QfmkDs-E.mjs");
var Route$11 = createFileRoute("/gallery/")({
	head: () => ({ meta: [
		{ title: "Gallery • PaintTheory" },
		{
			name: "description",
			content: "Artwork Gallery of PaintTheory, You can find all the artworks here."
		},
		{
			property: "og:title",
			content: "Gallery • PaintTheory"
		},
		{
			property: "og:description",
			content: "Artwork Gallery of PaintTheory, You can find all the artworks here."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin-B7uQ9s0_.mjs");
var Route$10 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./feedback-Bgq0aty6.mjs");
var Route$9 = createFileRoute("/admin/feedback")({
	head: () => ({ meta: [
		{ title: "Share Your Feedback | PaintTheory" },
		{
			name: "description",
			content: "Had a PaintTheory artwork? I’d love to hear what you thought of it."
		},
		{
			property: "og:title",
			content: "Share Your Thoughts | PaintTheory"
		},
		{
			property: "og:description",
			content: "Had a PaintTheory artwork? I’d love to hear what you thought of it."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		},
		{
			name: "twitter:title",
			content: "Share Your Thoughts | PaintTheory"
		},
		{
			name: "twitter:description",
			content: "Had a PaintTheory artwork? I’d love to hear what you thought of it."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./customer-feedback-BVvPcoyV.mjs");
var Route$8 = createFileRoute("/admin/customer-feedback")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./contact-messages-BsBWQOlC.mjs");
var Route$7 = createFileRoute("/admin/contact-messages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./route-Ckkot2cv.mjs");
var Route$6 = createFileRoute("/admin/journal")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./route-CFF7QEVZ.mjs");
var Route$5 = createFileRoute("/admin/artworks")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./journal-BIvvlZCP.mjs");
var Route$4 = createFileRoute("/admin/journal/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./artworks-DG3BTc60.mjs");
var Route$3 = createFileRoute("/admin/artworks/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./new-BYY7aU9P.mjs");
var Route$2 = createFileRoute("/admin/journal/new")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_journalId-BUnuO5_j.mjs");
var Route$1 = createFileRoute("/admin/journal/$journalId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./new-gdq5VRvJ.mjs");
var Route = createFileRoute("/admin/artworks/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SitemapDotxmlRoute = Route$21.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$22
});
var JournalRoute = Route$20.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$22
});
var GalleryRoute = Route$19.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$22
});
var FeedbackRoute = Route$18.update({
	id: "/feedback",
	path: "/feedback",
	getParentRoute: () => Route$22
});
var ContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$22
});
var CommissionRoute = Route$16.update({
	id: "/commission",
	path: "/commission",
	getParentRoute: () => Route$22
});
var AdminRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$22
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$22
});
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$22
});
var JournalIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => JournalRoute
});
var GalleryIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => GalleryRoute
});
var AdminIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var OrderTokenRoute = Route$26.update({
	id: "/order/$token",
	path: "/order/$token",
	getParentRoute: () => Route$22
});
var JournalJournalIdRoute = Route$28.update({
	id: "/$journalId",
	path: "/$journalId",
	getParentRoute: () => JournalRoute
});
var GalleryArtworkIdRoute = Route$27.update({
	id: "/$artworkId",
	path: "/$artworkId",
	getParentRoute: () => GalleryRoute
});
var CommissionPaymentPaymentIdRoute = Route$25.update({
	id: "/commission-payment/$paymentId",
	path: "/commission-payment/$paymentId",
	getParentRoute: () => Route$22
});
var AdminFeedbackRoute = Route$9.update({
	id: "/feedback",
	path: "/feedback",
	getParentRoute: () => AdminRoute
});
var AdminCustomerFeedbackRoute = Route$8.update({
	id: "/customer-feedback",
	path: "/customer-feedback",
	getParentRoute: () => AdminRoute
});
var AdminContactMessagesRoute = Route$7.update({
	id: "/contact-messages",
	path: "/contact-messages",
	getParentRoute: () => AdminRoute
});
var AdminJournalRouteRoute = Route$6.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => AdminRoute
});
var AdminArtworksRouteRoute = Route$5.update({
	id: "/artworks",
	path: "/artworks",
	getParentRoute: () => AdminRoute
});
var AdminJournalIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminJournalRouteRoute
});
var AdminArtworksIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminArtworksRouteRoute
});
var AdminJournalNewRoute = Route$2.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminJournalRouteRoute
});
var AdminJournalJournalIdRoute = Route$1.update({
	id: "/$journalId",
	path: "/$journalId",
	getParentRoute: () => AdminJournalRouteRoute
});
var AdminInquiriesInquiryIdRoute = Route$24.update({
	id: "/inquiries/$inquiryId",
	path: "/inquiries/$inquiryId",
	getParentRoute: () => AdminRoute
});
var AdminArtworksNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AdminArtworksRouteRoute
});
var AdminArtworksRouteRouteChildren = {
	AdminArtworksArtworkIdRoute: Route$23.update({
		id: "/$artworkId",
		path: "/$artworkId",
		getParentRoute: () => AdminArtworksRouteRoute
	}),
	AdminArtworksNewRoute,
	AdminArtworksIndexRoute
};
var AdminArtworksRouteRouteWithChildren = AdminArtworksRouteRoute._addFileChildren(AdminArtworksRouteRouteChildren);
var AdminJournalRouteRouteChildren = {
	AdminJournalJournalIdRoute,
	AdminJournalNewRoute,
	AdminJournalIndexRoute
};
var AdminRouteChildren = {
	AdminArtworksRouteRoute: AdminArtworksRouteRouteWithChildren,
	AdminJournalRouteRoute: AdminJournalRouteRoute._addFileChildren(AdminJournalRouteRouteChildren),
	AdminContactMessagesRoute,
	AdminCustomerFeedbackRoute,
	AdminFeedbackRoute,
	AdminIndexRoute,
	AdminInquiriesInquiryIdRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var GalleryRouteChildren = {
	GalleryArtworkIdRoute,
	GalleryIndexRoute
};
var GalleryRouteWithChildren = GalleryRoute._addFileChildren(GalleryRouteChildren);
var JournalRouteChildren = {
	JournalJournalIdRoute,
	JournalIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AdminRoute: AdminRouteWithChildren,
	CommissionRoute,
	ContactRoute,
	FeedbackRoute,
	GalleryRoute: GalleryRouteWithChildren,
	JournalRoute: JournalRoute._addFileChildren(JournalRouteChildren),
	SitemapDotxmlRoute,
	CommissionPaymentPaymentIdRoute,
	OrderTokenRoute
};
var routeTree = Route$22._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
