import{n as e,s as t,t as n}from"./jsx-runtime-D8nDyRPw.js";import{t as r}from"./button-BtKWE5ZJ.js";import{t as i}from"./createLucideIcon-B_1GbDvl.js";import{t as a}from"./check-Gcr1-ydj.js";import{i as o,n as s,t as c}from"./customer-feedback.service-DPHWqxNq.js";import{t as l}from"./trash-2-o5ryXRPO.js";import{t as u}from"./x-DSGAjANB.js";var d=i(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]),f=t(e()),p=n();function m(){let[e,t]=(0,f.useState)([]),[n,r]=(0,f.useState)(!0),[i,a]=(0,f.useState)(null);async function o(){try{r(!0);let e=await s();t(e)}catch(e){console.error(e)}finally{r(!1)}}(0,f.useEffect)(()=>{o()},[]);async function l(e){if(window.confirm(`Delete this customer feedback? This cannot be undone.`))try{a(e),await c(e),t(t=>t.filter(t=>t.id!==e))}catch(e){console.error(e)}finally{a(null)}}return(0,p.jsxs)(`div`,{className:`mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10`,children:[(0,p.jsxs)(`header`,{className:`border-b border-border pb-5 sm:pb-6`,children:[(0,p.jsx)(`p`,{className:`eyebrow`,children:`Studio dashboard`}),(0,p.jsxs)(`div`,{className:`mt-1 flex items-baseline gap-3`,children:[(0,p.jsx)(`h1`,{className:`font-display text-3xl leading-tight text-foreground sm:text-4xl`,children:`Customer feedback`}),!n&&(0,p.jsx)(`span`,{className:`rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground`,children:e.length})]}),(0,p.jsx)(`p`,{className:`mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground`,children:`Private feedback submitted by collectors. Nothing here is published automatically.`})]}),n?(0,p.jsx)(`div`,{className:`py-16 text-center text-sm text-muted-foreground`,children:`Loading feedback...`}):e.length===0?(0,p.jsx)(`div`,{className:`\r
            mt-6\r
            rounded-2xl\r
            border\r
            border-dashed\r
            border-border\r
            bg-card/50\r
            px-5\r
            py-12\r
            text-center\r
            text-sm\r
            text-muted-foreground\r
          `,children:`No customer feedback yet.`}):(0,p.jsx)(`div`,{className:`mt-6 space-y-3 sm:mt-8 sm:space-y-4`,children:e.map(e=>(0,p.jsx)(h,{feedback:e,deleting:i===e.id,onDelete:()=>l(e.id)},e.id))})]})}function h({feedback:e,deleting:t,onDelete:n}){let i=new Date(e.created_at).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`});return(0,p.jsxs)(`article`,{className:`\r
        rounded-2xl\r
        border\r
        border-border\r
        bg-card\r
        p-4\r
        shadow-soft\r
        sm:p-5\r
      `,children:[(0,p.jsxs)(`div`,{className:`flex items-start gap-3`,children:[(0,p.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,p.jsx)(`h2`,{className:`font-display text-lg text-foreground sm:text-xl`,children:e.name}),(0,p.jsx)(`div`,{className:`mt-2 flex items-center gap-0.5`,"aria-label":`${e.rating} out of 5 stars`,children:[1,2,3,4,5].map(t=>(0,p.jsx)(o,{className:`
                  size-3.5
                  ${t<=e.rating?`fill-current text-foreground`:`text-muted-foreground/20`}
                `},t))}),(0,p.jsxs)(`div`,{className:`mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground`,children:[(0,p.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,p.jsx)(d,{className:`size-3`}),i]}),(0,p.jsx)(`span`,{className:`text-border`,children:`·`}),e.allow_publish?(0,p.jsxs)(`span`,{className:`inline-flex items-center gap-1 text-foreground/70`,children:[(0,p.jsx)(a,{className:`size-3`}),`Permission to feature`]}):(0,p.jsxs)(`span`,{className:`inline-flex items-center gap-1`,children:[(0,p.jsx)(u,{className:`size-3`}),`Private`]})]})]}),(0,p.jsx)(r,{type:`button`,variant:`ghost`,size:`icon`,disabled:t,onClick:n,className:`\r
            shrink-0\r
            text-muted-foreground\r
            hover:text-destructive\r
          `,"aria-label":`Delete feedback`,children:(0,p.jsx)(l,{className:`size-4`})})]}),(0,p.jsxs)(`blockquote`,{className:`\r
          mt-5\r
          max-w-3xl\r
          text-sm\r
          leading-relaxed\r
          text-foreground/85\r
          sm:text-base\r
        `,children:[`“`,e.message,`”`]})]})}export{m as component};