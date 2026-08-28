import { a as __toESM } from "../_runtime.mjs";
import { i as getAllArtworks } from "./artwork.service-D5UQhGTZ.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { t as Route$22 } from "../_artworkId-CzJqtP9v.mjs";
import { t as Route$23 } from "../_inquiryId-BC5OMdk6.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$24 } from "../_paymentId-CHw4JZJX.mjs";
import { t as Route$25 } from "../_token-WJ4iWXWx.mjs";
import { t as Route$26 } from "./gallery._artworkId-Cj7OS89f.mjs";
import { t as Route$27 } from "./journal._journalId-eMjJHTaT.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C6nekHXi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DO6NRWVz.css";
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
	(0, import_react.useEffect)(() => {
		const update = () => setScrolled(window.scrollY > 24);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-background/85 backdrop-blur-md" : "bg-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "wordmark wordmark-hover text-base md:text-lg",
					onClick: () => setOpen(false),
					children: "Painttheory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						className: "link-underline text-xs font-medium tracking-wide text-foreground/70 hover:text-foreground",
						activeProps: { className: "text-foreground" },
						children: link.label
					}, link.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen((value) => !value),
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					className: "label text-foreground md:hidden",
					children: open ? "Close" : "Menu"
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-hairline bg-background px-5 pb-8 pt-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-4",
				children: navLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					onClick: () => setOpen(false),
					className: "display text-3xl",
					children: link.label
				}, link.to))
			})
		})]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "hairline mx-auto w-full max-w-[1400px] px-5 pb-10 pt-16 md:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-10 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label",
				children: "Painttheory | studio of Kamlesh Sahoo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "wordmark wordmark-hover mt-3 text-[13vw] md:text-[7vw]",
				children: "Painttheory"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-10 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Site"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gallery",
							className: "link-underline",
							children: "Gallery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: "link-underline",
							children: "Artist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/journal",
							className: "link-underline",
							children: "Journal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/contact",
							className: "link-underline",
							children: "Contact"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label",
							children: "Elsewhere"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Instagram" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Behance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "emailkamleshsahoo@gmail.com" })
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "label mt-12",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Painttheory. All works original."
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
var Route$21 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Maison — Original Artworks that Carry Stories" },
			{
				name: "description",
				content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork."
			},
			{
				name: "author",
				content: "Maison Studio"
			},
			{
				name: "theme-color",
				content: "#fdfbf7"
			},
			{
				property: "og:title",
				content: "Maison — Original Artworks that Carry Stories"
			},
			{
				property: "og:description",
				content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork."
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
				content: "Maison — Original Artworks that Carry Stories"
			},
			{
				name: "description",
				content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork."
			},
			{
				property: "og:description",
				content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork."
			},
			{
				name: "twitter:description",
				content: "One-of-a-kind acrylic paintings inspired by places, memories and emotions. Collect an original or commission a bespoke artwork."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/deb5ce44-f5b1-49d9-b897-cbf7c5c6eed8/id-preview-6247deb0--2d6c3fac-0f5b-4f8d-90de-516c77b2284d.lovable.app-1783181880840.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/deb5ce44-f5b1-49d9-b897-cbf7c5c6eed8/id-preview-6247deb0--2d6c3fac-0f5b-4f8d-90de-516c77b2284d.lovable.app-1783181880840.png"
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
	const { queryClient } = Route$21.useRouteContext();
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
var $$splitComponentImporter$19 = () => import("./testxxx-vXR7Y_wS.mjs");
var Route$20 = createFileRoute("/testxxx")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var BASE_URL = "";
var Route$19 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
var $$splitComponentImporter$18 = () => import("./journal-CFBeZsID.mjs");
var Route$18 = createFileRoute("/journal")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./gallery-CJgghy47.mjs");
var Route$17 = createFileRoute("/gallery")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./contact-B2xNuSMI.mjs");
var Route$16 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact — Maison" },
		{
			name: "description",
			content: "Get in touch about collecting an original artwork, commissions or shipping."
		},
		{
			property: "og:title",
			content: "Contact — Maison"
		},
		{
			property: "og:description",
			content: "Get in touch with Maison Studio."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./commission-CbCTzYfk.mjs");
var Route$15 = createFileRoute("/commission")({
	head: () => ({ meta: [
		{ title: "Commission a Story — Maison" },
		{
			name: "description",
			content: "Commission a bespoke acrylic painting. Share your idea and we'll create an original artwork made just for you."
		},
		{
			property: "og:title",
			content: "Commission a Story — Maison"
		},
		{
			property: "og:description",
			content: "Commission a bespoke, one-of-a-kind acrylic painting made just for you."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin-BhE1-nag.mjs");
var Route$14 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Studio Admin - PaintTheory" },
		{
			name: "description",
			content: "Private studio dashboard for managing artworks and collector inquiries."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./about-CpBKAfUJ.mjs");
var Route$13 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About the Artist  Maison" },
		{
			name: "description",
			content: "The story behind Maison  an artist painting the feeling of places, memories and emotions in original acrylic works."
		},
		{
			property: "og:title",
			content: "About the Artist  Maison"
		},
		{
			property: "og:description",
			content: "The story behind Maison original artworks."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./routes-Pk4j_f2B.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./journal.index-Cf2LL8G8.mjs");
var Route$11 = createFileRoute("/journal/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./gallery.index-CELfHU6F.mjs");
var Route$10 = createFileRoute("/gallery/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./admin-DF393i-S.mjs");
var Route$9 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./feedback-DAbw5UbT.mjs");
var Route$8 = createFileRoute("/admin/feedback")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./contact-messages-BsBWQOlC.mjs");
var Route$7 = createFileRoute("/admin/contact-messages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./route-Ckkot2cv.mjs");
var Route$6 = createFileRoute("/admin/journal")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./route-CFF7QEVZ.mjs");
var Route$5 = createFileRoute("/admin/artworks")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./journal-CxHA2ChF.mjs");
var Route$4 = createFileRoute("/admin/journal/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./artworks-Bt-4ik_f.mjs");
var Route$3 = createFileRoute("/admin/artworks/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./new-BZNknIjR.mjs");
var Route$2 = createFileRoute("/admin/journal/new")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_journalId-BQ1ZASlF.mjs");
var Route$1 = createFileRoute("/admin/journal/$journalId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./new-vGWGWT9s.mjs");
var Route = createFileRoute("/admin/artworks/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var TestxxxRoute = Route$20.update({
	id: "/testxxx",
	path: "/testxxx",
	getParentRoute: () => Route$21
});
var SitemapDotxmlRoute = Route$19.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$21
});
var JournalRoute = Route$18.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$21
});
var GalleryRoute = Route$17.update({
	id: "/gallery",
	path: "/gallery",
	getParentRoute: () => Route$21
});
var ContactRoute = Route$16.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$21
});
var CommissionRoute = Route$15.update({
	id: "/commission",
	path: "/commission",
	getParentRoute: () => Route$21
});
var AdminRoute = Route$14.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$21
});
var AboutRoute = Route$13.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$21
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var JournalIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => JournalRoute
});
var GalleryIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => GalleryRoute
});
var AdminIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var OrderTokenRoute = Route$25.update({
	id: "/order/$token",
	path: "/order/$token",
	getParentRoute: () => Route$21
});
var JournalJournalIdRoute = Route$27.update({
	id: "/$journalId",
	path: "/$journalId",
	getParentRoute: () => JournalRoute
});
var GalleryArtworkIdRoute = Route$26.update({
	id: "/$artworkId",
	path: "/$artworkId",
	getParentRoute: () => GalleryRoute
});
var CommissionPaymentPaymentIdRoute = Route$24.update({
	id: "/commission-payment/$paymentId",
	path: "/commission-payment/$paymentId",
	getParentRoute: () => Route$21
});
var AdminFeedbackRoute = Route$8.update({
	id: "/feedback",
	path: "/feedback",
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
var AdminInquiriesInquiryIdRoute = Route$23.update({
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
	AdminArtworksArtworkIdRoute: Route$22.update({
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
	GalleryRoute: GalleryRouteWithChildren,
	JournalRoute: JournalRoute._addFileChildren(JournalRouteChildren),
	SitemapDotxmlRoute,
	TestxxxRoute,
	CommissionPaymentPaymentIdRoute,
	OrderTokenRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
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
