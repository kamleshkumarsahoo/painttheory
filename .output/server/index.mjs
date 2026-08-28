globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/a-grid-3-aBclojhb.jpeg": {
		"type": "image/jpeg",
		"etag": "\"d114-UMo8oVYzOgCl6XDcPFmemAQHLXE\"",
		"mtime": "2026-08-27T22:54:17.150Z",
		"size": 53524,
		"path": "../public/assets/a-grid-3-aBclojhb.jpeg"
	},
	"/assets/a-grid-2-K7uDVxGU.jpeg": {
		"type": "image/jpeg",
		"etag": "\"22039-il/ZORc3JJmU8Nf97hiPO9LnZLU\"",
		"mtime": "2026-08-27T22:54:17.142Z",
		"size": 139321,
		"path": "../public/assets/a-grid-2-K7uDVxGU.jpeg"
	},
	"/assets/a-grid-6-DqWUpq36.jpeg": {
		"type": "image/jpeg",
		"etag": "\"1a0f5-m+qunGz+juBleD3j4jpJaSnhnxI\"",
		"mtime": "2026-08-27T22:54:17.163Z",
		"size": 106741,
		"path": "../public/assets/a-grid-6-DqWUpq36.jpeg"
	},
	"/assets/a-grid-1-BhsO67kD.jpeg": {
		"type": "image/jpeg",
		"etag": "\"34851-CEF6eVp9YBc6XWCvC9/VraS4x9I\"",
		"mtime": "2026-08-27T22:54:17.140Z",
		"size": 215121,
		"path": "../public/assets/a-grid-1-BhsO67kD.jpeg"
	},
	"/assets/admin-D9sPISxZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106b-S45dEbQSwsCy3eoCfI0ChcNZlyQ\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 4203,
		"path": "../public/assets/admin-D9sPISxZ.js"
	},
	"/assets/a-grid-7-GlgWbjK7.jpeg": {
		"type": "image/jpeg",
		"etag": "\"d420-mU35lkT9P4w710wPygyW9RaSjYk\"",
		"mtime": "2026-08-27T22:54:17.165Z",
		"size": 54304,
		"path": "../public/assets/a-grid-7-GlgWbjK7.jpeg"
	},
	"/assets/admin-DZSJnN4m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23d9-EqCdDpnwameTzfokcgbtksuwEpg\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 9177,
		"path": "../public/assets/admin-DZSJnN4m.js"
	},
	"/assets/about-0tC4_JTW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14c9-AQ63BWVvfZR7y8ajcePFwQsLg6A\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 5321,
		"path": "../public/assets/about-0tC4_JTW.js"
	},
	"/assets/AnimatePresence-zYwut65r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104f-WsZqJmC6Kvz9XegLN3CB9fkMn8g\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 4175,
		"path": "../public/assets/AnimatePresence-zYwut65r.js"
	},
	"/assets/arrow-left-BDExsfen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-6yOvTylBqRpZXbLlEIbaRRE4O7A\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BDExsfen.js"
	},
	"/assets/arrow-right-C1xZYlbV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-jJ6ixH+HE+E3rx4BkYtxNw0zt+g\"",
		"mtime": "2026-08-27T22:54:16.815Z",
		"size": 165,
		"path": "../public/assets/arrow-right-C1xZYlbV.js"
	},
	"/assets/artwork-CqAl7PJO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87-nJto3iq0W68PHGT0AbVWJz4pIns\"",
		"mtime": "2026-08-27T22:54:16.815Z",
		"size": 135,
		"path": "../public/assets/artwork-CqAl7PJO.js"
	},
	"/assets/artwork-media.service-CbvHjf1s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fd-hCnYLd3pjlkxnu1pSZnT/7XpP+s\"",
		"mtime": "2026-08-27T22:54:16.818Z",
		"size": 2301,
		"path": "../public/assets/artwork-media.service-CbvHjf1s.js"
	},
	"/assets/button-COjnlTBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1152-EmgJfvIHCn45jjjnnS/kFFFutDI\"",
		"mtime": "2026-08-27T22:54:16.820Z",
		"size": 4434,
		"path": "../public/assets/button-COjnlTBM.js"
	},
	"/assets/artworks-fIPniPjV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"afe-FWYKekrW9zAv+YklBAsnwQjMkWo\"",
		"mtime": "2026-08-27T22:54:16.818Z",
		"size": 2814,
		"path": "../public/assets/artworks-fIPniPjV.js"
	},
	"/assets/a-grid-5-M6d5ECqa.jpeg": {
		"type": "image/jpeg",
		"etag": "\"2c4f5-ifX7Jl0id/GAJibM/hIaVmtgD/g\"",
		"mtime": "2026-08-27T22:54:17.161Z",
		"size": 181493,
		"path": "../public/assets/a-grid-5-M6d5ECqa.jpeg"
	},
	"/assets/check-Gcr1-ydj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-fC12Jb16WEgKYUf80aNjlfSOeuE\"",
		"mtime": "2026-08-27T22:54:16.822Z",
		"size": 124,
		"path": "../public/assets/check-Gcr1-ydj.js"
	},
	"/assets/commission-BeIGw-DE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167f-3LMUrNBEKqgkQ2XmqKdDQyVqb4Q\"",
		"mtime": "2026-08-27T22:54:16.824Z",
		"size": 5759,
		"path": "../public/assets/commission-BeIGw-DE.js"
	},
	"/assets/ClientOnly-ZmZasCX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"335d-OZ/oigAxEExckF8Jxi+S8HOoN9U\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 13149,
		"path": "../public/assets/ClientOnly-ZmZasCX-.js"
	},
	"/assets/contact-messages-IWyu7KC0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e29-CWLzYvTtrsgRctbDiMPo67EygCQ\"",
		"mtime": "2026-08-27T22:54:16.830Z",
		"size": 3625,
		"path": "../public/assets/contact-messages-IWyu7KC0.js"
	},
	"/assets/contact-Uyx_M8aF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-dil7qD5wqkmG9dfk4v2RkxFROHU\"",
		"mtime": "2026-08-27T22:54:16.828Z",
		"size": 4644,
		"path": "../public/assets/contact-Uyx_M8aF.js"
	},
	"/assets/createLucideIcon-B_1GbDvl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-Y4enwiXY2yAcF1Gu2b12sxHBTW8\"",
		"mtime": "2026-08-27T22:54:16.832Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-B_1GbDvl.js"
	},
	"/assets/a-grid-4-RmdGhbTn.jpeg": {
		"type": "image/jpeg",
		"etag": "\"10311c-w0mu7KGDokpbGsb8n26yOFY39oE\"",
		"mtime": "2026-08-27T22:54:17.159Z",
		"size": 1061148,
		"path": "../public/assets/a-grid-4-RmdGhbTn.jpeg"
	},
	"/assets/feedback-CYPBA4yk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1afd-UkuJ27/QMqQkcHO8BaZwCG5thRc\"",
		"mtime": "2026-08-27T22:54:16.858Z",
		"size": 6909,
		"path": "../public/assets/feedback-CYPBA4yk.js"
	},
	"/assets/feedback.service-BY2vkoJb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12db-P4Cq+7Kw7bYPGWWsAVaZjXr/mW0\"",
		"mtime": "2026-08-27T22:54:16.863Z",
		"size": 4827,
		"path": "../public/assets/feedback.service-BY2vkoJb.js"
	},
	"/assets/gallery-CXhIzjNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-WwCMJyuPSTSPE39yHftVJyvcpCU\"",
		"mtime": "2026-08-27T22:54:16.866Z",
		"size": 141,
		"path": "../public/assets/gallery-CXhIzjNW.js"
	},
	"/assets/gallery.index-_A5lUj9C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e64-ZHlKclGxGybigSXjy0Ot9GmXybM\"",
		"mtime": "2026-08-27T22:54:16.872Z",
		"size": 3684,
		"path": "../public/assets/gallery.index-_A5lUj9C.js"
	},
	"/assets/gallery._artworkId-0o3Mzjx5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e79-RH1SH+V9k1GmqSXSxgU+4teyX/I\"",
		"mtime": "2026-08-27T22:54:16.866Z",
		"size": 11897,
		"path": "../public/assets/gallery._artworkId-0o3Mzjx5.js"
	},
	"/assets/gallery._artworkId-CR6kxiVz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220-qay5O/9wgE23DZV6zGwBpPk77wE\"",
		"mtime": "2026-08-27T22:54:16.869Z",
		"size": 544,
		"path": "../public/assets/gallery._artworkId-CR6kxiVz.js"
	},
	"/assets/image-plus-DVckAxED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-njGjt9JgVKaw837WDc/S10zuFpA\"",
		"mtime": "2026-08-27T22:54:16.874Z",
		"size": 363,
		"path": "../public/assets/image-plus-DVckAxED.js"
	},
	"/assets/image-processing-Boys0vz0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"569-fD3ZmWxcCiLIFMj0hY1z9Ehcozg\"",
		"mtime": "2026-08-27T22:54:16.878Z",
		"size": 1385,
		"path": "../public/assets/image-processing-Boys0vz0.js"
	},
	"/assets/inquiry-CBA2rv7I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"409-LA1ajjiuBUPnLPYjckcbtCboyaE\"",
		"mtime": "2026-08-27T22:54:16.888Z",
		"size": 1033,
		"path": "../public/assets/inquiry-CBA2rv7I.js"
	},
	"/assets/inquiry.service-D7ocCfFq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"184b-XiGGXCXTDuHmZvsTL2XXZSElGRs\"",
		"mtime": "2026-08-27T22:54:16.894Z",
		"size": 6219,
		"path": "../public/assets/inquiry.service-D7ocCfFq.js"
	},
	"/assets/input-ZaD0ZHgT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-/GDH+YhrfC5uzYFR0lwWBwCa5pQ\"",
		"mtime": "2026-08-27T22:54:16.884Z",
		"size": 621,
		"path": "../public/assets/input-ZaD0ZHgT.js"
	},
	"/assets/journal-Cgx3Lfue.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117f-hrMtjWBvXUCg7FigAfYZEVbxQoY\"",
		"mtime": "2026-08-27T22:54:16.898Z",
		"size": 4479,
		"path": "../public/assets/journal-Cgx3Lfue.js"
	},
	"/assets/journal.index-Cb2rsaMP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0e-EodwgkCbDCo0sqR3c3/4InLU/qI\"",
		"mtime": "2026-08-27T22:54:16.982Z",
		"size": 3086,
		"path": "../public/assets/journal.index-Cb2rsaMP.js"
	},
	"/assets/journal-DlYKs7ci.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-R+pTL9OYRaMJwff7kTz7Jvw8M9k\"",
		"mtime": "2026-08-27T22:54:16.932Z",
		"size": 154,
		"path": "../public/assets/journal-DlYKs7ci.js"
	},
	"/assets/journal._journalId-CrZUlMx2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1061-ah4cnCos0Ss1awowg/uVsIkIaOA\"",
		"mtime": "2026-08-27T22:54:16.947Z",
		"size": 4193,
		"path": "../public/assets/journal._journalId-CrZUlMx2.js"
	},
	"/assets/journal._journalId-zDLtMggy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-jBHRYeVAGAUPZEuYyNYBSw2ydAI\"",
		"mtime": "2026-08-27T22:54:16.969Z",
		"size": 494,
		"path": "../public/assets/journal._journalId-zDLtMggy.js"
	},
	"/assets/jsx-runtime-D8nDyRPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2210-qrBAUPDOR8ROKpBVNEla8AGnGKU\"",
		"mtime": "2026-08-27T22:54:17.046Z",
		"size": 8720,
		"path": "../public/assets/jsx-runtime-D8nDyRPw.js"
	},
	"/assets/label-osamkFYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"404-qTf0PoEl8KI0Leu9DqDePlK9cmA\"",
		"mtime": "2026-08-27T22:54:17.075Z",
		"size": 1028,
		"path": "../public/assets/label-osamkFYC.js"
	},
	"/assets/link-Bf5eLblt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116f-H4LsC0ZTd3KTqWkv1ANK0eznOUA\"",
		"mtime": "2026-08-27T22:54:17.077Z",
		"size": 4463,
		"path": "../public/assets/link-Bf5eLblt.js"
	},
	"/assets/loader-circle-D8psbp0G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-Acq+TaQonHAGEyTPCObIqaAAS2c\"",
		"mtime": "2026-08-27T22:54:17.086Z",
		"size": 144,
		"path": "../public/assets/loader-circle-D8psbp0G.js"
	},
	"/assets/lock-C4dkV71y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-I9n/7e9MD1aJ3NbOhec4S7qY8nw\"",
		"mtime": "2026-08-27T22:54:17.088Z",
		"size": 206,
		"path": "../public/assets/lock-C4dkV71y.js"
	},
	"/assets/index-WbTpFD-r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58c79-oMeL/+DEoM56NE4zq5Bnmu1jO84\"",
		"mtime": "2026-08-27T22:54:16.786Z",
		"size": 363641,
		"path": "../public/assets/index-WbTpFD-r.js"
	},
	"/assets/artist-pose-1-DJVQHJB7.png": {
		"type": "image/png",
		"etag": "\"1e3aae-2hHLZh/E4VA5wemqxlxP0dOPBws\"",
		"mtime": "2026-08-27T22:54:17.177Z",
		"size": 1981102,
		"path": "../public/assets/artist-pose-1-DJVQHJB7.png"
	},
	"/assets/a-grid-8-DNL077Ue.png": {
		"type": "image/png",
		"etag": "\"28288d-GDXLKmgpy6SlR0UbZAaIKOu8c1U\"",
		"mtime": "2026-08-27T22:54:17.171Z",
		"size": 2631821,
		"path": "../public/assets/a-grid-8-DNL077Ue.png"
	},
	"/assets/log-out-8k8-_csR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-tkhQFtzBm6DlhHjwoKRrSKaY19E\"",
		"mtime": "2026-08-27T22:54:17.092Z",
		"size": 230,
		"path": "../public/assets/log-out-8k8-_csR.js"
	},
	"/assets/mail-Bvyil9PM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-cXglhi5BQU2PxRf+Fu3+76UJIuo\"",
		"mtime": "2026-08-27T22:54:17.094Z",
		"size": 213,
		"path": "../public/assets/mail-Bvyil9PM.js"
	},
	"/assets/map-pin-DgG0xWS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-0woEcQvZiiDeDTA1kQY4x6YN7pg\"",
		"mtime": "2026-08-27T22:54:17.094Z",
		"size": 259,
		"path": "../public/assets/map-pin-DgG0xWS1.js"
	},
	"/assets/matchContext-BY_AZV6f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-DY8aOUf+9XM/fYz/dSZlIwuZ50k\"",
		"mtime": "2026-08-27T22:54:17.096Z",
		"size": 142,
		"path": "../public/assets/matchContext-BY_AZV6f.js"
	},
	"/assets/new-B7wYM6P7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2943-eiT50v9OfdRO+DE3TXxZOet/YxM\"",
		"mtime": "2026-08-27T22:54:17.098Z",
		"size": 10563,
		"path": "../public/assets/new-B7wYM6P7.js"
	},
	"/assets/plus-Fr4wl8yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-MATXIijJVHHyX2n8wxJIwEmY3e8\"",
		"mtime": "2026-08-27T22:54:17.104Z",
		"size": 153,
		"path": "../public/assets/plus-Fr4wl8yn.js"
	},
	"/assets/phone-BZ_Is3rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-D4H9aBAllVsKcujDSdRfnzerGmI\"",
		"mtime": "2026-08-27T22:54:17.102Z",
		"size": 322,
		"path": "../public/assets/phone-BZ_Is3rx.js"
	},
	"/assets/new-BMHF_NvL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"226e-1rIfc74DbsUXSOkdsxB/qrvgeWg\"",
		"mtime": "2026-08-27T22:54:17.100Z",
		"size": 8814,
		"path": "../public/assets/new-BMHF_NvL.js"
	},
	"/assets/react-dom-CrK8yE57.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-TYAl7GnUPUCbV+AVNcbJobxY8L4\"",
		"mtime": "2026-08-27T22:54:17.108Z",
		"size": 3546,
		"path": "../public/assets/react-dom-CrK8yE57.js"
	},
	"/assets/redirect-DnLf-3Zd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-OKGUrSof3kF11Yz1L80m8oAVyB4\"",
		"mtime": "2026-08-27T22:54:17.108Z",
		"size": 644,
		"path": "../public/assets/redirect-DnLf-3Zd.js"
	},
	"/assets/route-BeyU0kHc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-R+pTL9OYRaMJwff7kTz7Jvw8M9k\"",
		"mtime": "2026-08-27T22:54:17.110Z",
		"size": 154,
		"path": "../public/assets/route-BeyU0kHc.js"
	},
	"/assets/Reveal-CYUgyarB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-3NAPdLb4RlbNF1iagFOI6O9qUk4\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 411,
		"path": "../public/assets/Reveal-CYUgyarB.js"
	},
	"/assets/route-DlYKs7ci.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-R+pTL9OYRaMJwff7kTz7Jvw8M9k\"",
		"mtime": "2026-08-27T22:54:17.110Z",
		"size": 154,
		"path": "../public/assets/route-DlYKs7ci.js"
	},
	"/assets/save-C_o1SaQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-OOcLlQ0zIQ1ptSrVxLYTqbLdZz8\"",
		"mtime": "2026-08-27T22:54:17.115Z",
		"size": 327,
		"path": "../public/assets/save-C_o1SaQO.js"
	},
	"/assets/routes-D2_nQrjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"723b-a4+dTwwiX6UZEF/nF3p2JWrgsJQ\"",
		"mtime": "2026-08-27T22:54:17.113Z",
		"size": 29243,
		"path": "../public/assets/routes-D2_nQrjy.js"
	},
	"/assets/textarea-4dMi3dVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-/GHi7LKHuVUesD8VKuowNmV3uec\"",
		"mtime": "2026-08-27T22:54:17.121Z",
		"size": 519,
		"path": "../public/assets/textarea-4dMi3dVr.js"
	},
	"/assets/testxxx-BSrzgoHD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"204-B5LJhpNpgFq+fqZC/uEVIZZfl6U\"",
		"mtime": "2026-08-27T22:54:17.119Z",
		"size": 516,
		"path": "../public/assets/testxxx-BSrzgoHD.js"
	},
	"/assets/trash-2-o5ryXRPO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-ykHYcMQa0yGbxHsiWGvl2HLFAGk\"",
		"mtime": "2026-08-27T22:54:17.124Z",
		"size": 328,
		"path": "../public/assets/trash-2-o5ryXRPO.js"
	},
	"/assets/react-BRh5b15N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d847-g5Z16IeHouAYf8fM3qu3pArI4Xk\"",
		"mtime": "2026-08-27T22:54:17.106Z",
		"size": 120903,
		"path": "../public/assets/react-BRh5b15N.js"
	},
	"/assets/truck-D2wSaDHA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-JTLfmws1BFytcKsqwMviJVsvqPQ\"",
		"mtime": "2026-08-27T22:54:17.126Z",
		"size": 406,
		"path": "../public/assets/truck-D2wSaDHA.js"
	},
	"/assets/useRouter-BCafHaR4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-5VM4Ll3qN4RgQtYco8wVYxGcmco\"",
		"mtime": "2026-08-27T22:54:17.128Z",
		"size": 690,
		"path": "../public/assets/useRouter-BCafHaR4.js"
	},
	"/assets/styles-DO6NRWVz.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1ba06-JaLSmpl7SUJunKp5T0Vrw5ryS4A\"",
		"mtime": "2026-08-27T22:54:17.179Z",
		"size": 113158,
		"path": "../public/assets/styles-DO6NRWVz.css"
	},
	"/assets/supabase-DaFy-jX2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31bef-PkPDikZCspW1hKpGgDeU8NhIuRM\"",
		"mtime": "2026-08-27T22:54:17.115Z",
		"size": 203759,
		"path": "../public/assets/supabase-DaFy-jX2.js"
	},
	"/assets/useStore-Ox_3vycU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1560-A11qcdAMH9IFhDAqLcY3fnjbLIU\"",
		"mtime": "2026-08-27T22:54:17.128Z",
		"size": 5472,
		"path": "../public/assets/useStore-Ox_3vycU.js"
	},
	"/assets/v4-DDdyfk2q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"302-sAvH0m1JZeEyT7Aa9yDUDMSACw0\"",
		"mtime": "2026-08-27T22:54:17.132Z",
		"size": 770,
		"path": "../public/assets/v4-DDdyfk2q.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-27T22:54:17.130Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/x-DSGAjANB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-WxHrmsJOJmuNp0TnIch3bRILnZY\"",
		"mtime": "2026-08-27T22:54:17.132Z",
		"size": 154,
		"path": "../public/assets/x-DSGAjANB.js"
	},
	"/assets/_inquiryId-dXO1tj2I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de82-wNxI1j1DllvoZ1BRiAgi5keOP78\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 56962,
		"path": "../public/assets/_inquiryId-dXO1tj2I.js"
	},
	"/assets/_artworkId-BAIYjr3q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"325b-2MpQPs6bJGYzFz4IUHbVLT14THY\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 12891,
		"path": "../public/assets/_artworkId-BAIYjr3q.js"
	},
	"/assets/_journalId-0b1J-61v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2847-ysYXsbclipm5nUNbp2XSEwDKx1A\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 10311,
		"path": "../public/assets/_journalId-0b1J-61v.js"
	},
	"/assets/_paymentId-Ci9E-g4v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a1a-Pfrq9d2mn36Mkv0JAz1TytcwEuM\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 10778,
		"path": "../public/assets/_paymentId-Ci9E-g4v.js"
	},
	"/assets/_token-Ajsu7wn8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cbf-DGx7UijvM8MB+fjkn3QD15EQZP4\"",
		"mtime": "2026-08-27T22:54:16.802Z",
		"size": 15551,
		"path": "../public/assets/_token-Ajsu7wn8.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_o4OU4J = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_o4OU4J
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
