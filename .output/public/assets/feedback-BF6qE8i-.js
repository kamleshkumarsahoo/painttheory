import{n as e,s as t,t as n}from"./jsx-runtime-D8nDyRPw.js";import{t as r}from"./link-Bf5eLblt.js";import{x as i}from"./index-uLbsqENe.js";import{t as a}from"./Reveal-CYUgyarB.js";import{t as o}from"./createLucideIcon-B_1GbDvl.js";import{t as s}from"./check-Gcr1-ydj.js";import{i as c,r as l}from"./customer-feedback.service-DPHWqxNq.js";var u=o(`external-link`,[[`path`,{d:`M15 3h6v6`,key:`1q9fwt`}],[`path`,{d:`M10 14 21 3`,key:`gplh6r`}],[`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`,key:`a6xqqp`}]]),d=t(e()),f=n();function p(){let[e,t]=(0,d.useState)(``),[n,o]=(0,d.useState)(``),[p,m]=(0,d.useState)(0),[h,g]=(0,d.useState)(!1),[_,v]=(0,d.useState)(!1),[y,b]=(0,d.useState)(!1);async function x(r){r.preventDefault();let a=e.trim(),s=n.trim();if(!a){i.error(`Please add your name.`);return}if(!s){i.error(`Please share your thoughts.`);return}if(p===0){i.error(`Please choose a rating.`);return}try{v(!0),await l({name:a,message:s,rating:p,allowPublish:h}),b(!0),t(``),o(``),m(0),g(!1)}catch(e){console.error(e),i.error(e instanceof Error?e.message:`Something went wrong. Please try again.`)}finally{v(!1)}}return(0,f.jsx)(`main`,{className:`mx-auto max-w-[1400px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40`,children:y?(0,f.jsxs)(a,{className:`mx-auto max-w-2xl text-center`,children:[(0,f.jsx)(`p`,{className:`text-2xl tracking-tight text-foreground`,style:{fontFamily:`Melodrama`},children:`PaintTheory`}),(0,f.jsx)(`div`,{className:`mx-auto mt-8 flex size-10 items-center justify-center rounded-full bg-foreground/5`,children:(0,f.jsx)(s,{className:`size-5`})}),(0,f.jsx)(`h1`,{className:`display mt-6 text-4xl md:text-6xl`,children:`Thank you.`}),(0,f.jsx)(`p`,{className:`mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground`,children:`Your feedback has been received. I really appreciate you taking the time to share it.`}),(0,f.jsxs)(r,{to:`/`,className:`\r
              group\r
              mt-8\r
              inline-flex\r
              items-center\r
              gap-2\r
              text-xs\r
              font-medium\r
            `,children:[(0,f.jsx)(`span`,{className:`link-underline`,children:`Visit PaintTheory`}),(0,f.jsx)(u,{className:`\r
                size-3.5\r
                text-muted-foreground\r
                transition-transform\r
                duration-300\r
                group-hover:translate-x-0.5\r
                group-hover:-translate-y-0.5\r
              `})]})]}):(0,f.jsxs)(`div`,{className:`mx-auto max-w-2xl`,children:[(0,f.jsxs)(a,{children:[(0,f.jsx)(`p`,{className:`text-xl tracking-tight text-foreground`,style:{fontFamily:`Melodrama`},children:`PaintTheory`}),(0,f.jsx)(`span`,{className:`label mt-8 block`,children:`A little note`}),(0,f.jsx)(`h1`,{className:`display mt-5 text-3xl md:text-5xl`,children:`Share your thoughts`}),(0,f.jsx)(`p`,{className:`mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground`,children:`I’d love to know what you thought of the painting. A few words, a feeling, or simply what came to mind when you first saw it.`})]}),(0,f.jsx)(a,{className:`mt-12`,children:(0,f.jsxs)(`form`,{onSubmit:x,className:`space-y-8`,children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{htmlFor:`feedback-name`,className:`label`,children:`Your name`}),(0,f.jsx)(`input`,{id:`feedback-name`,type:`text`,value:e,onChange:e=>t(e.target.value),placeholder:`Your name`,autoComplete:`name`,className:`\r
                    mt-3\r
                    w-full\r
                    border-0\r
                    border-b\r
                    border-border\r
                    bg-transparent\r
                    px-0\r
                    py-3\r
                    text-sm\r
                    outline-none\r
                    transition-colors\r
                    placeholder:text-muted-foreground/50\r
                    focus:border-foreground\r
                  `})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{className:`label`,children:`How would you rate your experience?`}),(0,f.jsx)(`div`,{className:`mt-4 flex items-center gap-2`,children:[1,2,3,4,5].map(e=>(0,f.jsx)(`button`,{type:`button`,"aria-label":`${e} star${e>1?`s`:``}`,"aria-pressed":p===e,onClick:()=>m(e),className:`\r
                          p-1\r
                          text-muted-foreground/40\r
                          transition-all\r
                          duration-200\r
                          hover:scale-105\r
                          hover:text-foreground\r
                          focus:outline-none\r
                        `,children:(0,f.jsx)(c,{className:`
                            size-5
                            ${e<=p?`fill-current text-foreground`:``}
                          `})},e))})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`label`,{htmlFor:`feedback-message`,className:`label`,children:`Your thoughts`}),(0,f.jsx)(`textarea`,{id:`feedback-message`,value:n,onChange:e=>o(e.target.value),placeholder:`Tell me what you thought...`,rows:5,className:`\r
                    mt-3\r
                    w-full\r
                    resize-none\r
                    border-0\r
                    border-b\r
                    border-border\r
                    bg-transparent\r
                    px-0\r
                    py-3\r
                    text-sm\r
                    leading-relaxed\r
                    outline-none\r
                    transition-colors\r
                    placeholder:text-muted-foreground/50\r
                    focus:border-foreground\r
                  `})]}),(0,f.jsxs)(`label`,{className:`flex cursor-pointer items-start gap-3`,children:[(0,f.jsx)(`input`,{type:`checkbox`,checked:h,onChange:e=>g(e.target.checked),className:`\r
                    mt-0.5\r
                    size-3.5\r
                    shrink-0\r
                    accent-foreground\r
                  `}),(0,f.jsx)(`span`,{className:`text-xs leading-relaxed text-muted-foreground`,children:`I’m happy for my feedback to be featured on PaintTheory.`})]}),(0,f.jsx)(`button`,{type:`submit`,disabled:_,className:`\r
    rounded-full\r
    bg-foreground\r
    px-5\r
    py-2.5\r
    text-xs\r
    font-medium\r
    text-background\r
    transition-opacity\r
    hover:opacity-80\r
    disabled:cursor-not-allowed\r
    disabled:opacity-50\r
  `,children:_?`Sending...`:`Send feedback`})]})})]})})}export{p as component};