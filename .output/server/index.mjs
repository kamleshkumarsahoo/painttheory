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
		"mtime": "2026-08-26T15:53:30.193Z",
		"size": 53524,
		"path": "../public/assets/a-grid-3-aBclojhb.jpeg"
	},
	"/assets/a-grid-7-GlgWbjK7.jpeg": {
		"type": "image/jpeg",
		"etag": "\"d420-mU35lkT9P4w710wPygyW9RaSjYk\"",
		"mtime": "2026-08-26T15:53:30.204Z",
		"size": 54304,
		"path": "../public/assets/a-grid-7-GlgWbjK7.jpeg"
	},
	"/assets/a-grid-1-BhsO67kD.jpeg": {
		"type": "image/jpeg",
		"etag": "\"34851-CEF6eVp9YBc6XWCvC9/VraS4x9I\"",
		"mtime": "2026-08-26T15:53:30.187Z",
		"size": 215121,
		"path": "../public/assets/a-grid-1-BhsO67kD.jpeg"
	},
	"/assets/admin-CBA4vuiC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2361-nbAtebKmcuRwoJ7w+gXM6GNjqdg\"",
		"mtime": "2026-08-26T15:53:29.977Z",
		"size": 9057,
		"path": "../public/assets/admin-CBA4vuiC.js"
	},
	"/assets/a-grid-2-K7uDVxGU.jpeg": {
		"type": "image/jpeg",
		"etag": "\"22039-il/ZORc3JJmU8Nf97hiPO9LnZLU\"",
		"mtime": "2026-08-26T15:53:30.191Z",
		"size": 139321,
		"path": "../public/assets/a-grid-2-K7uDVxGU.jpeg"
	},
	"/assets/about-BXpskHcE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14eb-C3urOVXz4mrKc3Ixu2jGuqPKsU0\"",
		"mtime": "2026-08-26T15:53:29.974Z",
		"size": 5355,
		"path": "../public/assets/about-BXpskHcE.js"
	},
	"/assets/a-grid-5-M6d5ECqa.jpeg": {
		"type": "image/jpeg",
		"etag": "\"2c4f5-ifX7Jl0id/GAJibM/hIaVmtgD/g\"",
		"mtime": "2026-08-26T15:53:30.202Z",
		"size": 181493,
		"path": "../public/assets/a-grid-5-M6d5ECqa.jpeg"
	},
	"/assets/admin-CK0axhhV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106b-EmWNlE+BFOBttqKR8TKiNxXfrHw\"",
		"mtime": "2026-08-26T15:53:29.980Z",
		"size": 4203,
		"path": "../public/assets/admin-CK0axhhV.js"
	},
	"/assets/AnimatePresence-zYwut65r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104f-WsZqJmC6Kvz9XegLN3CB9fkMn8g\"",
		"mtime": "2026-08-26T15:53:29.962Z",
		"size": 4175,
		"path": "../public/assets/AnimatePresence-zYwut65r.js"
	},
	"/assets/arrow-left-BDExsfen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-6yOvTylBqRpZXbLlEIbaRRE4O7A\"",
		"mtime": "2026-08-26T15:53:29.981Z",
		"size": 165,
		"path": "../public/assets/arrow-left-BDExsfen.js"
	},
	"/assets/arrow-right-C1xZYlbV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-jJ6ixH+HE+E3rx4BkYtxNw0zt+g\"",
		"mtime": "2026-08-26T15:53:29.984Z",
		"size": 165,
		"path": "../public/assets/arrow-right-C1xZYlbV.js"
	},
	"/assets/a-grid-6-DqWUpq36.jpeg": {
		"type": "image/jpeg",
		"etag": "\"1a0f5-m+qunGz+juBleD3j4jpJaSnhnxI\"",
		"mtime": "2026-08-26T15:53:30.203Z",
		"size": 106741,
		"path": "../public/assets/a-grid-6-DqWUpq36.jpeg"
	},
	"/assets/artwork-CqAl7PJO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"87-nJto3iq0W68PHGT0AbVWJz4pIns\"",
		"mtime": "2026-08-26T15:53:29.985Z",
		"size": 135,
		"path": "../public/assets/artwork-CqAl7PJO.js"
	},
	"/assets/artwork-media.service-CP6mhdah.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fe-MOviZJItcUzqDjHQ37m7gMPRY4k\"",
		"mtime": "2026-08-26T15:53:29.988Z",
		"size": 2302,
		"path": "../public/assets/artwork-media.service-CP6mhdah.js"
	},
	"/assets/artworks-Dmiea3GB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"959-HDZA02RpHDHSGWqCwk25XiIAcW8\"",
		"mtime": "2026-08-26T15:53:29.994Z",
		"size": 2393,
		"path": "../public/assets/artworks-Dmiea3GB.js"
	},
	"/assets/button-COjnlTBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1152-EmgJfvIHCn45jjjnnS/kFFFutDI\"",
		"mtime": "2026-08-26T15:53:30.000Z",
		"size": 4434,
		"path": "../public/assets/button-COjnlTBM.js"
	},
	"/assets/check-Gcr1-ydj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-fC12Jb16WEgKYUf80aNjlfSOeuE\"",
		"mtime": "2026-08-26T15:53:30.007Z",
		"size": 124,
		"path": "../public/assets/check-Gcr1-ydj.js"
	},
	"/assets/commission-DjLQlF1B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"167f-SkeboYcKo1pNd2X/LSvHTP++Ods\"",
		"mtime": "2026-08-26T15:53:30.011Z",
		"size": 5759,
		"path": "../public/assets/commission-DjLQlF1B.js"
	},
	"/assets/ClientOnly-ZmZasCX-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"335d-OZ/oigAxEExckF8Jxi+S8HOoN9U\"",
		"mtime": "2026-08-26T15:53:29.962Z",
		"size": 13149,
		"path": "../public/assets/ClientOnly-ZmZasCX-.js"
	},
	"/assets/contact-messages-IWyu7KC0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e29-CWLzYvTtrsgRctbDiMPo67EygCQ\"",
		"mtime": "2026-08-26T15:53:30.012Z",
		"size": 3625,
		"path": "../public/assets/contact-messages-IWyu7KC0.js"
	},
	"/assets/createLucideIcon-B_1GbDvl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-Y4enwiXY2yAcF1Gu2b12sxHBTW8\"",
		"mtime": "2026-08-26T15:53:30.020Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-B_1GbDvl.js"
	},
	"/assets/contact-p7uJvyzE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1224-yCdqmooo/qfPPCOUOFp32+0U0i0\"",
		"mtime": "2026-08-26T15:53:30.013Z",
		"size": 4644,
		"path": "../public/assets/contact-p7uJvyzE.js"
	},
	"/assets/a-grid-4-RmdGhbTn.jpeg": {
		"type": "image/jpeg",
		"etag": "\"10311c-w0mu7KGDokpbGsb8n26yOFY39oE\"",
		"mtime": "2026-08-26T15:53:30.199Z",
		"size": 1061148,
		"path": "../public/assets/a-grid-4-RmdGhbTn.jpeg"
	},
	"/assets/feedback-CYPBA4yk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1afd-UkuJ27/QMqQkcHO8BaZwCG5thRc\"",
		"mtime": "2026-08-26T15:53:30.022Z",
		"size": 6909,
		"path": "../public/assets/feedback-CYPBA4yk.js"
	},
	"/assets/feedback.service-BY2vkoJb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12db-P4Cq+7Kw7bYPGWWsAVaZjXr/mW0\"",
		"mtime": "2026-08-26T15:53:30.023Z",
		"size": 4827,
		"path": "../public/assets/feedback.service-BY2vkoJb.js"
	},
	"/assets/gallery-CWwXXhsn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-ztA72q8s8etsc45SatfjfBrsk78\"",
		"mtime": "2026-08-26T15:53:30.025Z",
		"size": 141,
		"path": "../public/assets/gallery-CWwXXhsn.js"
	},
	"/assets/gallery.index-D1rZhznl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e64-CATNIeAeuKVCNIN2zbxLzw5uaUQ\"",
		"mtime": "2026-08-26T15:53:30.033Z",
		"size": 3684,
		"path": "../public/assets/gallery.index-D1rZhznl.js"
	},
	"/assets/gallery._artworkId-CR6kxiVz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"220-qay5O/9wgE23DZV6zGwBpPk77wE\"",
		"mtime": "2026-08-26T15:53:30.030Z",
		"size": 544,
		"path": "../public/assets/gallery._artworkId-CR6kxiVz.js"
	},
	"/assets/gallery._artworkId-BQTcmm9b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e79-0F0FH+Y7Esiku1dRYly2wS4dXhQ\"",
		"mtime": "2026-08-26T15:53:30.028Z",
		"size": 11897,
		"path": "../public/assets/gallery._artworkId-BQTcmm9b.js"
	},
	"/assets/image-plus-DVckAxED.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16b-njGjt9JgVKaw837WDc/S10zuFpA\"",
		"mtime": "2026-08-26T15:53:30.048Z",
		"size": 363,
		"path": "../public/assets/image-plus-DVckAxED.js"
	},
	"/assets/image-processing-Boys0vz0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"569-fD3ZmWxcCiLIFMj0hY1z9Ehcozg\"",
		"mtime": "2026-08-26T15:53:30.072Z",
		"size": 1385,
		"path": "../public/assets/image-processing-Boys0vz0.js"
	},
	"/assets/input-ZaD0ZHgT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-/GDH+YhrfC5uzYFR0lwWBwCa5pQ\"",
		"mtime": "2026-08-26T15:53:30.079Z",
		"size": 621,
		"path": "../public/assets/input-ZaD0ZHgT.js"
	},
	"/assets/inquiry-CBA2rv7I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"409-LA1ajjiuBUPnLPYjckcbtCboyaE\"",
		"mtime": "2026-08-26T15:53:30.081Z",
		"size": 1033,
		"path": "../public/assets/inquiry-CBA2rv7I.js"
	},
	"/assets/inquiry.service-D0IY27pw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1783-kqgHd7Qs1S6J3VaRH4J75XNm/6w\"",
		"mtime": "2026-08-26T15:53:30.082Z",
		"size": 6019,
		"path": "../public/assets/inquiry.service-D0IY27pw.js"
	},
	"/assets/journal-Cpk_e_L-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117f-5Srhk4rBkkVd4IYQG+Iv0jdVeyA\"",
		"mtime": "2026-08-26T15:53:30.086Z",
		"size": 4479,
		"path": "../public/assets/journal-Cpk_e_L-.js"
	},
	"/assets/journal.index-RhQ4qea3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0e-vn2PKbGYnhEau/iA4mYV3t+UFW4\"",
		"mtime": "2026-08-26T15:53:30.095Z",
		"size": 3086,
		"path": "../public/assets/journal.index-RhQ4qea3.js"
	},
	"/assets/journal-CQnnuydl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-0A1UZ/cz+6cJZbwLTqBpxLzGZtM\"",
		"mtime": "2026-08-26T15:53:30.084Z",
		"size": 154,
		"path": "../public/assets/journal-CQnnuydl.js"
	},
	"/assets/journal._journalId-zDLtMggy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-jBHRYeVAGAUPZEuYyNYBSw2ydAI\"",
		"mtime": "2026-08-26T15:53:30.091Z",
		"size": 494,
		"path": "../public/assets/journal._journalId-zDLtMggy.js"
	},
	"/assets/journal._journalId-VGV_fBmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1061-7ur3aesRUwp0UE/baycWNLDUEDs\"",
		"mtime": "2026-08-26T15:53:30.088Z",
		"size": 4193,
		"path": "../public/assets/journal._journalId-VGV_fBmK.js"
	},
	"/assets/label-osamkFYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"404-qTf0PoEl8KI0Leu9DqDePlK9cmA\"",
		"mtime": "2026-08-26T15:53:30.101Z",
		"size": 1028,
		"path": "../public/assets/label-osamkFYC.js"
	},
	"/assets/jsx-runtime-D8nDyRPw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2210-qrBAUPDOR8ROKpBVNEla8AGnGKU\"",
		"mtime": "2026-08-26T15:53:30.099Z",
		"size": 8720,
		"path": "../public/assets/jsx-runtime-D8nDyRPw.js"
	},
	"/assets/link-Bf5eLblt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"116f-H4LsC0ZTd3KTqWkv1ANK0eznOUA\"",
		"mtime": "2026-08-26T15:53:30.105Z",
		"size": 4463,
		"path": "../public/assets/link-Bf5eLblt.js"
	},
	"/assets/loader-circle-D8psbp0G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-Acq+TaQonHAGEyTPCObIqaAAS2c\"",
		"mtime": "2026-08-26T15:53:30.109Z",
		"size": 144,
		"path": "../public/assets/loader-circle-D8psbp0G.js"
	},
	"/assets/index-BjTnbnTf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58bca-MxWYACKn4uTxRrryzjM3pAWGetw\"",
		"mtime": "2026-08-26T15:53:29.961Z",
		"size": 363466,
		"path": "../public/assets/index-BjTnbnTf.js"
	},
	"/assets/lock-C4dkV71y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-I9n/7e9MD1aJ3NbOhec4S7qY8nw\"",
		"mtime": "2026-08-26T15:53:30.113Z",
		"size": 206,
		"path": "../public/assets/lock-C4dkV71y.js"
	},
	"/assets/artist-pose-1-DJVQHJB7.png": {
		"type": "image/png",
		"etag": "\"1e3aae-2hHLZh/E4VA5wemqxlxP0dOPBws\"",
		"mtime": "2026-08-26T15:53:30.211Z",
		"size": 1981102,
		"path": "../public/assets/artist-pose-1-DJVQHJB7.png"
	},
	"/assets/a-grid-8-DNL077Ue.png": {
		"type": "image/png",
		"etag": "\"28288d-GDXLKmgpy6SlR0UbZAaIKOu8c1U\"",
		"mtime": "2026-08-26T15:53:30.208Z",
		"size": 2631821,
		"path": "../public/assets/a-grid-8-DNL077Ue.png"
	},
	"/assets/log-out-8k8-_csR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-tkhQFtzBm6DlhHjwoKRrSKaY19E\"",
		"mtime": "2026-08-26T15:53:30.113Z",
		"size": 230,
		"path": "../public/assets/log-out-8k8-_csR.js"
	},
	"/assets/mail-Bvyil9PM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-cXglhi5BQU2PxRf+Fu3+76UJIuo\"",
		"mtime": "2026-08-26T15:53:30.114Z",
		"size": 213,
		"path": "../public/assets/mail-Bvyil9PM.js"
	},
	"/assets/map-pin-DgG0xWS1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-0woEcQvZiiDeDTA1kQY4x6YN7pg\"",
		"mtime": "2026-08-26T15:53:30.115Z",
		"size": 259,
		"path": "../public/assets/map-pin-DgG0xWS1.js"
	},
	"/assets/matchContext-BY_AZV6f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-DY8aOUf+9XM/fYz/dSZlIwuZ50k\"",
		"mtime": "2026-08-26T15:53:30.123Z",
		"size": 142,
		"path": "../public/assets/matchContext-BY_AZV6f.js"
	},
	"/assets/new-B2HR03CT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"226e-5WclJowN/lgKlUPIc82MrKT6oAw\"",
		"mtime": "2026-08-26T15:53:30.126Z",
		"size": 8814,
		"path": "../public/assets/new-B2HR03CT.js"
	},
	"/assets/phone-BZ_Is3rx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-D4H9aBAllVsKcujDSdRfnzerGmI\"",
		"mtime": "2026-08-26T15:53:30.138Z",
		"size": 322,
		"path": "../public/assets/phone-BZ_Is3rx.js"
	},
	"/assets/plus-Fr4wl8yn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-MATXIijJVHHyX2n8wxJIwEmY3e8\"",
		"mtime": "2026-08-26T15:53:30.139Z",
		"size": 153,
		"path": "../public/assets/plus-Fr4wl8yn.js"
	},
	"/assets/new-D2l4Bo06.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2943-KlXNJiH2FBivt+8eihSR2zMIGgY\"",
		"mtime": "2026-08-26T15:53:30.137Z",
		"size": 10563,
		"path": "../public/assets/new-D2l4Bo06.js"
	},
	"/assets/redirect-DnLf-3Zd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"284-OKGUrSof3kF11Yz1L80m8oAVyB4\"",
		"mtime": "2026-08-26T15:53:30.154Z",
		"size": 644,
		"path": "../public/assets/redirect-DnLf-3Zd.js"
	},
	"/assets/react-dom-CrK8yE57.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-TYAl7GnUPUCbV+AVNcbJobxY8L4\"",
		"mtime": "2026-08-26T15:53:30.146Z",
		"size": 3546,
		"path": "../public/assets/react-dom-CrK8yE57.js"
	},
	"/assets/Reveal-CYUgyarB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19b-3NAPdLb4RlbNF1iagFOI6O9qUk4\"",
		"mtime": "2026-08-26T15:53:29.963Z",
		"size": 411,
		"path": "../public/assets/Reveal-CYUgyarB.js"
	},
	"/assets/route-CQnnuydl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-0A1UZ/cz+6cJZbwLTqBpxLzGZtM\"",
		"mtime": "2026-08-26T15:53:30.155Z",
		"size": 154,
		"path": "../public/assets/route-CQnnuydl.js"
	},
	"/assets/route-DDusTJxG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-0A1UZ/cz+6cJZbwLTqBpxLzGZtM\"",
		"mtime": "2026-08-26T15:53:30.155Z",
		"size": 154,
		"path": "../public/assets/route-DDusTJxG.js"
	},
	"/assets/save-C_o1SaQO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-OOcLlQ0zIQ1ptSrVxLYTqbLdZz8\"",
		"mtime": "2026-08-26T15:53:30.164Z",
		"size": 327,
		"path": "../public/assets/save-C_o1SaQO.js"
	},
	"/assets/react-BRh5b15N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d847-g5Z16IeHouAYf8fM3qu3pArI4Xk\"",
		"mtime": "2026-08-26T15:53:30.141Z",
		"size": 120903,
		"path": "../public/assets/react-BRh5b15N.js"
	},
	"/assets/routes-B8-aKQBS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7199-jDv+Fnih6RbCgQ+dnUpwnGCbZNE\"",
		"mtime": "2026-08-26T15:53:30.162Z",
		"size": 29081,
		"path": "../public/assets/routes-B8-aKQBS.js"
	},
	"/assets/testxxx-BTNG8xD_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"204-CG6c8bfKVy51i3SlJTv8HtNVE8w\"",
		"mtime": "2026-08-26T15:53:30.167Z",
		"size": 516,
		"path": "../public/assets/testxxx-BTNG8xD_.js"
	},
	"/assets/textarea-4dMi3dVr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"207-/GHi7LKHuVUesD8VKuowNmV3uec\"",
		"mtime": "2026-08-26T15:53:30.167Z",
		"size": 519,
		"path": "../public/assets/textarea-4dMi3dVr.js"
	},
	"/assets/trash-2-o5ryXRPO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-ykHYcMQa0yGbxHsiWGvl2HLFAGk\"",
		"mtime": "2026-08-26T15:53:30.168Z",
		"size": 328,
		"path": "../public/assets/trash-2-o5ryXRPO.js"
	},
	"/assets/truck-D2wSaDHA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-JTLfmws1BFytcKsqwMviJVsvqPQ\"",
		"mtime": "2026-08-26T15:53:30.172Z",
		"size": 406,
		"path": "../public/assets/truck-D2wSaDHA.js"
	},
	"/assets/useRouter-BCafHaR4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-5VM4Ll3qN4RgQtYco8wVYxGcmco\"",
		"mtime": "2026-08-26T15:53:30.175Z",
		"size": 690,
		"path": "../public/assets/useRouter-BCafHaR4.js"
	},
	"/assets/useStore-Ox_3vycU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1560-A11qcdAMH9IFhDAqLcY3fnjbLIU\"",
		"mtime": "2026-08-26T15:53:30.178Z",
		"size": 5472,
		"path": "../public/assets/useStore-Ox_3vycU.js"
	},
	"/assets/supabase-DaFy-jX2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31bef-PkPDikZCspW1hKpGgDeU8NhIuRM\"",
		"mtime": "2026-08-26T15:53:30.165Z",
		"size": 203759,
		"path": "../public/assets/supabase-DaFy-jX2.js"
	},
	"/assets/styles-N_GehKLW.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1b8d0-VO8++fVtJXLN/jP8KkfwrwUgDZo\"",
		"mtime": "2026-08-26T15:53:30.212Z",
		"size": 112848,
		"path": "../public/assets/styles-N_GehKLW.css"
	},
	"/assets/v4-DDdyfk2q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"302-sAvH0m1JZeEyT7Aa9yDUDMSACw0\"",
		"mtime": "2026-08-26T15:53:30.181Z",
		"size": 770,
		"path": "../public/assets/v4-DDdyfk2q.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-08-26T15:53:30.180Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/assets/x-DSGAjANB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-WxHrmsJOJmuNp0TnIch3bRILnZY\"",
		"mtime": "2026-08-26T15:53:30.183Z",
		"size": 154,
		"path": "../public/assets/x-DSGAjANB.js"
	},
	"/assets/_artworkId-CBS7aRIF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30ac-6TGHlLE30Dpk8+AX+2lhAUp5l9c\"",
		"mtime": "2026-08-26T15:53:29.964Z",
		"size": 12460,
		"path": "../public/assets/_artworkId-CBS7aRIF.js"
	},
	"/assets/_journalId-CIcjJXFJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2847-6OKXPykZMMp5lh6aBW2XUy7/U1k\"",
		"mtime": "2026-08-26T15:53:29.967Z",
		"size": 10311,
		"path": "../public/assets/_journalId-CIcjJXFJ.js"
	},
	"/assets/_paymentId-DPNtId8W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29db-25Ns4Pju17pdz9uRSpJLMvoO610\"",
		"mtime": "2026-08-26T15:53:29.969Z",
		"size": 10715,
		"path": "../public/assets/_paymentId-DPNtId8W.js"
	},
	"/assets/_token-DGAm6K6F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c90-WgsezBUUJJ+btev/BtET6NbB+bg\"",
		"mtime": "2026-08-26T15:53:29.971Z",
		"size": 15504,
		"path": "../public/assets/_token-DGAm6K6F.js"
	},
	"/assets/_inquiryId-CAtQ7hcd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de83-tWprFuDYvXb7hOcKnn/xloVFVHk\"",
		"mtime": "2026-08-26T15:53:29.965Z",
		"size": 56963,
		"path": "../public/assets/_inquiryId-CAtQ7hcd.js"
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
var _lazy_h_MHxr = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_h_MHxr
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
