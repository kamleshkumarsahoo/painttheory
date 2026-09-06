import{n as e,s as t,t as n}from"./jsx-runtime-D8nDyRPw.js";import{t as r}from"./link-Bf5eLblt.js";import{t as i}from"./supabase-DaFy-jX2.js";import{t as a}from"./button-BtKWE5ZJ.js";import{t as o}from"./createLucideIcon-B_1GbDvl.js";import{t as s}from"./arrow-right-C1xZYlbV.js";import{t as c}from"./log-out-8k8-_csR.js";import{t as l}from"./mail-Bvyil9PM.js";import{t as u}from"./artwork-CqAl7PJO.js";import{f as d,p as f,r as p}from"./inquiry.service-CQB7nqNH.js";import{n as m,t as h}from"./inquiry-Bck5MIbI.js";var g=o(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),_=o(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),v=t(e()),y=n();function b(e){return f(e)}function x(e){return e.artwork_price_snapshot??e.artworks?.price??0}function S(e){if(!e)return null;let t=e.artwork_media??[],n=t.find(e=>e.role===`primary`)??[...t].sort((e,t)=>(e.sort_order??0)-(t.sort_order??0))[0];if(n){let e=n.medium_path??n.thumb_path??n.large_path??n.original_path;if(e)return i.storage.from(`artworks`).getPublicUrl(e).data.publicUrl}return e.thumbnail_url??null}function C({inquiry:e}){let t=!e.artwork_id,n=e.artworks,i=S(n);return(0,y.jsxs)(`article`,{className:`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift`,children:[(0,y.jsxs)(`div`,{className:`flex gap-4 p-4`,children:[t?(0,y.jsx)(`div`,{className:`flex size-20 shrink-0 items-center justify-center rounded-xl bg-secondary text-[0.65rem] uppercase tracking-widest text-muted-foreground`,children:`Commission`}):i?(0,y.jsx)(`img`,{src:i,alt:n.title??`Artwork`,loading:`lazy`,className:`size-20 shrink-0 rounded-xl object-cover`}):(0,y.jsx)(`div`,{className:`size-20 shrink-0 rounded-xl bg-secondary`}),(0,y.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,y.jsxs)(`div`,{className:`flex items-start justify-between gap-2`,children:[(0,y.jsx)(m,{status:d(e)}),(0,y.jsx)(`span`,{className:`shrink-0 text-xs text-muted-foreground`,children:b(e.created_at)})]}),(0,y.jsx)(`h3`,{className:`mt-2 truncate font-display text-lg leading-tight text-foreground`,children:t?`Commission request`:n?.title??`Artwork inquiry`}),(0,y.jsx)(`p`,{className:`truncate text-sm text-foreground/80`,children:e.customer_name}),(0,y.jsx)(`p`,{className:`mt-1 text-xs font-medium text-accent`,children:e.order_number??`Ref ${e.id.slice(0,8)}`}),(0,y.jsxs)(`p`,{className:`flex items-center gap-1 truncate text-xs text-muted-foreground`,children:[(0,y.jsx)(l,{className:`size-3`}),e.customer_email]})]})]}),(0,y.jsxs)(`div`,{className:`mt-auto flex items-center justify-between border-t border-border px-4 py-3`,children:[(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`p`,{className:`text-[0.65rem] uppercase tracking-widest text-muted-foreground`,children:t?`Request`:`Quote`}),(0,y.jsx)(`p`,{className:`font-display text-base text-foreground`,children:t?`To be discussed`:u(x(e))})]}),(0,y.jsx)(a,{asChild:!0,size:`sm`,variant:e.inquiry_status===`NEW`?`default`:`outline`,children:(0,y.jsxs)(r,{to:`/admin/inquiries/$inquiryId`,params:{inquiryId:e.id},children:[`Review`,(0,y.jsx)(s,{className:`size-3.5`})]})})]})]})}function w(e){let t=[...e].sort((e,t)=>new Date(t.created_at)-+new Date(e.created_at)),n=t.filter(e=>d(e)===`NEW`),r=t.filter(e=>{let t=d(e);return t!==`NEW`&&t!==`DELIVERED`&&t!==`DISCARDED`});return{newRequests:n,inProgress:r,completed:t.filter(e=>d(e)===`DELIVERED`),discarded:t.filter(e=>d(e)===`DISCARDED`),pipelineValue:[...n,...r].reduce((e,t)=>e+h(t),0)}}function T(){let[e,t]=(0,v.useState)([]);(0,v.useEffect)(()=>{p().then(t).catch(console.error)},[]);let{newRequests:n,inProgress:r,completed:o,discarded:s,pipelineValue:l}=w(e);return(0,y.jsxs)(`div`,{className:`mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10`,children:[(0,y.jsx)(`header`,{className:`border-b border-border pb-5 sm:border-0 sm:pb-0`,children:(0,y.jsxs)(`div`,{className:`flex items-start justify-between gap-4`,children:[(0,y.jsxs)(`div`,{className:`min-w-0`,children:[(0,y.jsx)(`p`,{className:`eyebrow`,children:`Studio dashboard`}),(0,y.jsx)(`h1`,{className:`mt-1 font-display text-3xl leading-tight text-foreground sm:text-4xl`,children:`Inquiries`})]}),(0,y.jsxs)(a,{type:`button`,variant:`outline`,size:`sm`,className:`hidden shrink-0 sm:inline-flex`,onClick:()=>i.auth.signOut(),children:[(0,y.jsx)(c,{className:`size-4`}),`Sign out`]}),(0,y.jsx)(`button`,{type:`button`,onClick:()=>i.auth.signOut(),className:`mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden`,"aria-label":`Sign out`,children:(0,y.jsx)(c,{className:`size-4`})})]})}),(0,y.jsxs)(`div`,{className:`mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-4 sm:gap-3`,children:[(0,y.jsx)(E,{label:`New`,value:String(n.length),accent:!0}),(0,y.jsx)(E,{label:`In progress`,value:String(r.length)}),(0,y.jsx)(E,{label:`Completed`,value:String(o.length)}),(0,y.jsx)(E,{label:`Open pipeline`,value:u(l)})]}),(0,y.jsx)(D,{title:`New requests`,hint:`Awaiting your review`,count:n.length,items:n,emptyLabel:`No new inquiries right now.`}),(0,y.jsx)(D,{title:`In progress`,hint:`Communicated, paid or shipping`,count:r.length,items:r,emptyLabel:`Nothing in progress.`}),(0,y.jsx)(D,{title:`Completed`,hint:`Delivered, feedback or closed`,count:o.length,items:o,emptyLabel:`No completed orders yet.`}),(0,y.jsx)(D,{title:`Discarded requests`,hint:`Hidden from active workflow`,count:s.length,items:s,emptyLabel:`No discarded requests.`,collapsed:!0}),(0,y.jsx)(`div`,{className:`h-4 sm:hidden`})]})}function E({label:e,value:t,accent:n}){return(0,y.jsxs)(`div`,{className:`\r
        rounded-xl\r
        border\r
        border-border\r
        bg-card\r
        px-3.5\r
        py-3\r
        sm:rounded-2xl\r
        sm:p-4\r
        sm:shadow-soft\r
      `,children:[(0,y.jsx)(`p`,{className:`text-[0.58rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.65rem] sm:tracking-widest`,children:e}),(0,y.jsx)(`p`,{className:`mt-1 font-display text-xl leading-none sm:text-2xl ${n?`text-accent`:`text-foreground`}`,children:t})]})}function D({title:e,hint:t,count:n,items:r,emptyLabel:i,collapsed:a}){let o=(0,y.jsx)(y.Fragment,{children:r.length===0?(0,y.jsxs)(`div`,{className:`\r
            mt-4\r
            flex\r
            items-center\r
            gap-3\r
            rounded-xl\r
            border\r
            border-dashed\r
            border-border\r
            bg-card/50\r
            px-4\r
            py-6\r
            text-sm\r
            text-muted-foreground\r
            sm:mt-5\r
            sm:rounded-2xl\r
            sm:px-5\r
            sm:py-8\r
          `,children:[(0,y.jsx)(_,{className:`size-4 shrink-0`}),(0,y.jsx)(`span`,{children:i})]}):(0,y.jsx)(`div`,{className:`\r
            mt-4\r
            grid\r
            gap-3\r
            sm:mt-5\r
            sm:grid-cols-2\r
            sm:gap-4\r
            lg:grid-cols-3\r
          `,children:r.map(e=>(0,y.jsx)(C,{inquiry:e},e.id))})});return a?(0,y.jsxs)(`details`,{className:`group mt-8 sm:mt-12`,children:[(0,y.jsxs)(`summary`,{className:`\r
            flex\r
            cursor-pointer\r
            list-none\r
            items-center\r
            gap-2.5\r
            rounded-xl\r
            border\r
            border-border\r
            bg-card\r
            px-4\r
            py-3.5\r
            transition-colors\r
            hover:bg-secondary/40\r
            sm:gap-3\r
            sm:rounded-2xl\r
            sm:px-5\r
            sm:py-4\r
            sm:shadow-soft\r
          `,children:[(0,y.jsx)(`h2`,{className:`min-w-0 font-display text-lg text-foreground sm:text-2xl`,children:e}),(0,y.jsx)(`span`,{className:`shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs`,children:n}),(0,y.jsx)(`span`,{className:`ml-auto hidden text-sm text-muted-foreground md:inline`,children:t}),(0,y.jsx)(`span`,{className:`hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:hidden sm:inline`,children:`Show`}),(0,y.jsx)(`span`,{className:`hidden text-[0.6rem] uppercase tracking-widest text-muted-foreground group-open:inline sm:inline`,children:`Hide`}),(0,y.jsx)(g,{className:`size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 sm:hidden`})]}),o]}):(0,y.jsxs)(`section`,{className:`mt-8 sm:mt-12`,children:[(0,y.jsxs)(`div`,{className:`flex items-baseline gap-2.5 sm:gap-3`,children:[(0,y.jsx)(`h2`,{className:`font-display text-xl text-foreground sm:text-2xl`,children:e}),(0,y.jsx)(`span`,{className:`shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground sm:px-2.5 sm:text-xs`,children:n}),(0,y.jsx)(`span`,{className:`ml-auto hidden text-sm text-muted-foreground sm:inline`,children:t})]}),(0,y.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground sm:hidden`,children:t}),o]})}export{T as component};