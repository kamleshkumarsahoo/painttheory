import { a as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BYgwpyL6.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/@radix-ui/react-label+[...].mjs";
import { S as LoaderCircle, m as Phone, y as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-messages-BsBWQOlC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactMessagesPage() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		loadMessages();
	}, []);
	async function loadMessages() {
		try {
			setLoading(true);
			setError("");
			const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			setMessages(data ?? []);
		} catch (error) {
			console.error("LOAD CONTACT MESSAGES ERROR:", error);
			setError(error instanceof Error ? error.message : "Unable to load contact messages.");
		} finally {
			setLoading(false);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-6 py-12 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), "Loading messages..."]
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-12 lg:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Studio dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-foreground",
				children: "Contact Messages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-destructive",
				children: error
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-6 py-12 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Studio dashboard"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl text-foreground",
					children: "Contact Messages"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Messages received through the website contact form."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm text-muted-foreground",
				children: [
					messages.length,
					" ",
					messages.length === 1 ? "message" : "messages"
				]
			})]
		}), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-2xl border border-border bg-card p-10 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl text-foreground",
				children: "No messages yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Messages submitted through the contact form will appear here."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 space-y-4",
			children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl text-foreground",
								children: message.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground",
								children: message.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `mailto:${message.email}`,
								className: "flex items-center gap-2 hover:text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), message.email]
							}), message.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:${message.phone}`,
								className: "flex items-center gap-2 hover:text-accent",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), message.phone]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						className: "shrink-0 text-xs text-muted-foreground",
						children: new Date(message.created_at).toLocaleString("en-IN", {
							dateStyle: "medium",
							timeStyle: "short"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 border-t border-border pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap text-sm leading-7 text-foreground/85",
						children: message.message
					})
				})]
			}, message.id))
		})]
	});
}
//#endregion
export { ContactMessagesPage as component };
