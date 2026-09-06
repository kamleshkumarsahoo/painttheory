import{t as e}from"./supabase-DaFy-jX2.js";import{t}from"./v4-DDdyfk2q.js";var n=`Asia/Kolkata`;function r(e){return e?new Date(e).toLocaleString(`en-IN`,{dateStyle:`medium`,timeStyle:`short`,timeZone:n}):``}function i(e){return e?new Date(e).toLocaleDateString(`en-IN`,{day:`numeric`,month:`short`,year:`numeric`,timeZone:n}):``}function a(e=new Date){let t=new Intl.DateTimeFormat(`en-CA`,{year:`numeric`,month:`2-digit`,day:`2-digit`,timeZone:n}).formatToParts(e),r=e=>t.find(t=>t.type===e)?.value??``;return`${r(`year`)}${r(`month`)}${r(`day`)}`}var o=[`NEW`,`REVIEWED`,`PAYMENT_REQUESTED`,`PAID`,`ADDRESS_RECEIVED`,`SHIPPED`,`DELIVERED`],s={NEW:`New`,REVIEWED:`Reviewed`,PAYMENT_REQUESTED:`Payment Requested`,PAID:`Payment Received`,ADDRESS_RECEIVED:`Address Received`,SHIPPED:`Packed & Shipped`,DELIVERED:`Delivered`,DISCARDED:`Discarded`};[...o];function c(e){return o.indexOf(e)}function l(e){return e?e.inquiry_status===`DISCARDED`?`DISCARDED`:e.inquiry_status===`DELIVERED`?`DELIVERED`:e.shipped_at||e.inquiry_status===`SHIPPED`?`SHIPPED`:e.address_received_at||e.address_submitted_at||e.inquiry_status===`ADDRESS_RECEIVED`?`ADDRESS_RECEIVED`:e.payment_status===`PAID`||e.paid_at||e.inquiry_status===`PAID`?`PAID`:e.payment_requested_at||e.customer_link||e.razorpay_payment_link||e.inquiry_status===`PAYMENT_REQUESTED`?`PAYMENT_REQUESTED`:e.reviewed_at||e.inquiry_status===`REVIEWED`?`REVIEWED`:`NEW`:`NEW`}var u={REVIEWED:`reviewed_at`,PAYMENT_REQUESTED:`payment_requested_at`,PAID:`paid_at`,ADDRESS_RECEIVED:`address_received_at`,SHIPPED:`shipped_at`,DELIVERED:`delivered_at`},d=30,f=`
  id,
  role,
  sort_order,
  thumb_path,
  alt_text
`;function p(){let e=Math.random().toString(36).slice(2,6).toUpperCase();return`KS-${a()}-${e}`}function m(e,t,n=new Date().toISOString()){let r={updated_at:n},i=c(t),a=c(e);return t===`DISCARDED`?(r.inquiry_status=`DISCARDED`,r.link_expires_on=n,r):(i>=0&&i>a&&(r.inquiry_status=t),o.slice(1,i+1).forEach(e=>{r[u[e]]=n}),r)}async function h(t,n){let{error:r}=await e.from(`artworks`).update({availability_status:n}).eq(`id`,t);if(r)throw r}async function g(t){let n=t.artwork_price_snapshot;if(t.artwork_id&&n==null){let{data:r,error:i}=await e.from(`artworks`).select(`price`).eq(`id`,t.artwork_id).single();if(i)throw i;n=r.price}let{data:r,error:i}=await e.from(`inquiries`).insert({inquiry_type:t.inquiry_type??`ART_PURCHASE`,artwork_id:t.artwork_id??null,artwork_price_snapshot:n??null,order_number:p(),customer_name:t.customer_name.trim(),customer_email:t.customer_email.trim(),customer_phone:t.customer_phone.trim(),country:t.country?.trim()||null,budget:t.budget?.trim()||null,deadline:t.deadline||null,note:t.note?.trim()||null,inquiry_status:`NEW`}).select().single();if(i)throw i;return r}async function _(){let{data:t,error:n}=await e.from(`inquiries`).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        artwork_media!artwork_media_artwork_id_fkey (
          ${f}
        )
      )
    `).order(`created_at`,{ascending:!1});if(n)throw n;return t}async function v(t){let{data:n,error:r}=await e.from(`inquiries`).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${f}
        )
      )
    `).eq(`id`,t).single();if(r)throw r;return n}async function y(t,n){let{data:r,error:i}=await e.from(`inquiries`).update({artist_notes:n,updated_at:new Date().toISOString()}).eq(`id`,t).select().single();if(i)throw i;return r}async function b(t,n){let r=new Date().toISOString(),{data:i,error:a}=await e.from(`inquiries`).select(`inquiry_status`).eq(`id`,t).single();if(a)throw a;let o={...m(i.inquiry_status,n,r),inquiry_status:n};if(n===`PAID`&&(o.payment_status=`PAID`,o.payment_submitted_at=r),n===`DELIVERED`){let e=new Date;e.setDate(e.getDate()+d),o.link_expires_on=e.toISOString()}let{data:s,error:c}=await e.from(`inquiries`).update(o).eq(`id`,t).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${f}
        )
      )
    `).single();if(c)throw c;return(n===`SHIPPED`||n===`DELIVERED`)&&s.artwork_id&&await h(s.artwork_id,`SOLD`),n===`DISCARDED`&&s.artwork_id&&await h(s.artwork_id,`AVAILABLE`),s}async function x(n){let r=t(),i=new Date().toISOString(),a=`${window.location.origin}/order/${r}`,{data:o,error:s}=await e.from(`inquiries`).select(`inquiry_status`).eq(`id`,n).single();if(s)throw s;let{data:c,error:l}=await e.from(`inquiries`).update({customer_token:r,customer_link:a,link_expires_on:null,...m(o.inquiry_status,`PAYMENT_REQUESTED`,i)}).eq(`id`,n).select(`
      *,
      artworks (
        id,
        title,
        thumbnail_url,
        price,
        medium,
        dimensions,
        availability_status,
        artwork_media!artwork_media_artwork_id_fkey (
          ${f}
        )
      )
    `).single();if(l)throw l;return await h(c.artwork_id,`RESERVED`),c}async function S(t){let{data:n,error:r}=await e.rpc(`get_customer_inquiry`,{p_customer_token:t});if(r)throw r;return n}async function C(t,n){let{data:r,error:i}=await e.rpc(`save_customer_shipping`,{p_customer_token:t,p_shipping_name:n.shipping_name,p_shipping_phone:n.shipping_phone,p_shipping_address_line1:n.shipping_address_line1,p_shipping_address_line2:n.shipping_address_line2,p_shipping_city:n.shipping_city,p_shipping_state:n.shipping_state,p_shipping_pincode:n.shipping_pincode,p_shipping_landmark:n.shipping_landmark});if(i)throw i;return r}async function w(t,n){let{data:r,error:i}=await e.rpc(`save_commission_shipping`,{p_payment_id:t,p_shipping_name:n.shipping_name,p_shipping_phone:n.shipping_phone,p_shipping_address_line1:n.shipping_address_line1,p_shipping_address_line2:n.shipping_address_line2,p_shipping_city:n.shipping_city,p_shipping_state:n.shipping_state,p_shipping_pincode:n.shipping_pincode,p_shipping_landmark:n.shipping_landmark});if(i)throw i;return r}export{S as a,y as c,s as d,l as f,v as i,b as l,r as m,x as n,w as o,i as p,_ as r,C as s,g as t,o as u};