import{t as e}from"./supabase-DaFy-jX2.js";import{t}from"./v4-DDdyfk2q.js";import{t as n}from"./image-processing-Boys0vz0.js";var r=`artworks`,i=`feedback`;function a(t){return e.storage.from(r).getPublicUrl(t).data.publicUrl}function o(e){let t=e.split(`.`).pop()?.toLowerCase();return t&&t.length<=5?t:`jpg`}function s(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&apos;`)}function c(e,t){let n=e.trim().split(/\s+/),r=[],i=``;for(let e of n){let n=i?`${i} ${e}`:e;n.length>t&&i?(r.push(i),i=e):i=n}return i&&r.push(i),r}function l({quote:e,name:t,location:n,date:r,rating:i}){let a=1200,o=c(e,55),l=250+o.length*48+60,u=[];t?.trim()&&u.push(s(t.trim())),n?.trim()&&u.push(s(n.trim())),r?.trim()&&u.push(s(r.trim()));let d=u.join(`  ·  `),f=i&&i>0?`★`.repeat(Math.min(5,i)):``,p=f?`
      <text
        x="120"
        y="${l}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="25"
        letter-spacing="5"
        fill="#a46d42"
      >${f}</text>
    `:``;f&&(l+=50);let m=d?`
        <text
          x="120"
          y="${l+4}"
          font-family="Arial, Helvetica, sans-serif"
          font-size="34"
          fill="#6f685f"
        >${d}</text>
      `:``,h=Math.max(720,l+(d?110:35)),g=o.map((e,t)=>`
          <text
            x="120"
            y="${250+t*48}"
            font-family="DM Sans, ui-sans-serif, system-ui, sans-serif"
            font-size="40"
            font-weight="400"
            fill="#27231f"
          >${s(e)}</text>
        `).join(``);return`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${a}"
      height="${h}"
      viewBox="0 0 ${a} ${h}"
    >
      <rect
        width="100%"
        height="100%"
        fill="#fbf8f2"
      />

      <rect
        x="36"
        y="36"
        width="${a-72}"
        height="${h-72}"
        rx="28"
        fill="none"
        stroke="#e5ddd1"
        stroke-width="2"
      />

      <text
        x="120"
        y="125"
        font-family="JetBrains Mono, ui-monospace, monospace"
        font-size="24"
        letter-spacing="5"
        text-transform="uppercase"
        fill="#9a8b79"
      >BUYER'S NOTE</text>

      <text
        x="${a-120}"
        y="185"
        text-anchor="end"
        font-family="Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
        font-size="120"
        fill="#d5c7b6"
      >“</text>

      ${g}

      ${p}

      ${m}
    </svg>
  `}async function u(){let{data:t,error:n}=await e.from(`feedback`).select(`id, image_path, sort_order, created_at`).order(`sort_order`,{ascending:!0}).order(`created_at`,{ascending:!0});if(n)throw n;return(t??[]).map(e=>{let t=e.image_path.endsWith(`.svg`),n=e.image_path.replace(t?/\/medium\.svg$/:/\/medium\.webp$/,``);return{id:e.id,sortOrder:e.sort_order,createdAt:e.created_at,imageUrl:a(e.image_path),thumbUrl:a(`${n}/${t?`thumb.svg`:`thumb.webp`}`)}})}async function d(a,s){let c=t(),l=o(a.name),u=`${i}/${c}`,d=await n(a),f=`${u}/original.${l}`,p=`${u}/large.webp`,m=`${u}/medium.webp`,h=`${u}/thumb.webp`;try{let t=[{path:f,file:a,contentType:a.type},{path:p,file:d.large.blob,contentType:`image/webp`},{path:m,file:d.medium.blob,contentType:`image/webp`},{path:h,file:d.thumb.blob,contentType:`image/webp`}];for(let n of t){let{error:t}=await e.storage.from(r).upload(n.path,n.file,{upsert:!1,contentType:n.contentType,cacheControl:`31536000`});if(t)throw t}let{error:n}=await e.from(`feedback`).insert({id:c,image_path:m,sort_order:s});if(n)throw n}catch(t){throw await e.storage.from(r).remove([f,p,m,h]),t}}async function f({quote:n,name:a,location:o,date:s,rating:c,sortOrder:u}){if(!n.trim())throw Error(`Feedback text is required.`);let d=t(),f=`${i}/${d}`,p=l({quote:n.trim(),name:a,location:o,date:s,rating:c}),m=new File([p],`feedback.svg`,{type:`image/svg+xml`}),h=`${f}/original.svg`,g=`${f}/large.svg`,_=`${f}/medium.svg`,v=`${f}/thumb.svg`;try{let t=[{path:h,file:m},{path:g,file:m},{path:_,file:m},{path:v,file:m}];for(let n of t){let{error:t}=await e.storage.from(r).upload(n.path,n.file,{upsert:!1,contentType:`image/svg+xml`,cacheControl:`31536000`});if(t)throw t}let{error:n}=await e.from(`feedback`).insert({id:d,image_path:_,sort_order:u});if(n)throw n;return d}catch(t){throw await e.storage.from(r).remove([h,g,_,v]),t}}async function p(t){let n=t.imageUrl.split(`/storage/v1/object/public/artworks/`)[1]?.replace(/\/medium\.(webp|svg)$/,``);n&&await e.storage.from(r).remove([`${n}/original.jpg`,`${n}/original.jpeg`,`${n}/original.png`,`${n}/original.webp`,`${n}/original.svg`,`${n}/large.webp`,`${n}/medium.webp`,`${n}/thumb.webp`,`${n}/large.svg`,`${n}/medium.svg`,`${n}/thumb.svg`]);let{error:i}=await e.from(`feedback`).delete().eq(`id`,t.id);if(i)throw i}export{d as i,p as n,u as r,f as t};