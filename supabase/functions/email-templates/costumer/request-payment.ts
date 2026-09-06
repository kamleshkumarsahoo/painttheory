interface OrderApprovedEmailProps {
  customerName: string;
  artworkTitle: string;
  artworkImage: string;
  artworkPrice: string;
  collectorPortal: string;
  artworkMedium: string;
  artworkDimensions: string;
  referenceNumber: string;
}

export function requestPaymentEmail({
  customerName,
  artworkTitle,
  artworkImage,
  artworkPrice,
  collectorPortal,
  artworkMedium,
  artworkDimensions,
  referenceNumber,
}: OrderApprovedEmailProps) {
  return `

  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Artwork Has Been Reserved</title>
  </head>

  <body style="margin:0;padding:0;background:#f3efe7;background-color:#f3efe7;">

  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your artwork has been reserved exclusively for you.
  </div>

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background:#f3efe7;padding:32px 12px;"
  >

  <tr>

  <td align="center">

  <table
    role="presentation"
    width="600"
    cellpadding="0"
    cellspacing="0"
    style="
      width:100%;
      max-width:600px;
      background:#fbf8f2;
      border:1px solid #e7dfd2;
      border-radius:18px;
      overflow:hidden;
    "
  >

  <!-- ================= HEADER ================= -->

  <tr>

  <td
  style="
  padding:42px 44px 12px;
  text-align:center;
  ">

  <div
  style="
  font-family:Georgia,'Times New Roman',serif;
  font-size:24px;
  letter-spacing:6px;
  text-transform:uppercase;
  color:#1c1a17;
  ">

  Kamlesh Sahoo

  </div>

  <div
  style="
  margin-top:8px;
  font-family:Georgia,serif;
  font-size:11px;
  letter-spacing:3px;
  text-transform:uppercase;
  color:#9b8668;
  ">

  Original Contemporary Art

  </div>

  </td>

  </tr>

  <tr>

  <td style="padding:0 44px;">

  <div
  style="
  height:1px;
  background:#e7dfd2;
  margin:22px 0;
  ">

  </div>

  </td>

  </tr>

  <!-- ================= GREETING ================= -->

  <tr>

  <td
  style="
  padding:0 44px;
  font-family:Georgia,serif;
  color:#2b2823;
  ">

  <p
  style="
  margin:0;
  font-size:17px;
  line-height:1.8;
  ">

  Hello ${customerName},

  </p>

  <p
  style="
  margin:18px 0 0;
  font-size:14px;
  line-height:1.9;
  color:#4a453d;
  ">

  Thank you for your interest in <span style="font-style: italic;">${artworkTitle}.</span>
  I'm delighted to let you know that your request has been approved, 
  and this artwork has now been reserved exclusively in your name. 
  Your private Collector Portal is ready below to complete your acquisition.

  </p>

  </td>

  </tr>

  <!-- ================= ARTWORK ================= -->

  <tr>

  <td
  style="
  padding:30px 44px 0;
  ">

  <img
  src="${artworkImage}"
  alt="${artworkTitle}"
  width="512"
  style="
  width:100%;
  display:block;
  height:auto;
  border-radius:14px;
  border:1px solid #e7dfd2;
  "
  />

  </td>

  </tr>

  <tr>

  <td
  style="
  padding:22px 44px 0;
  font-family:Georgia,serif;
  ">

  <div
  style="
  font-size:24px;
  color:#1c1a17;
  ">

  ${artworkTitle}

  </div>

  <div
  style="
  margin-top:5px;
  font-size:13px;
  letter-spacing:1px;
  color:#8a8072;
  ">

  Original Artwork

  </div>

  <div style="margin-top:5px;">
    <span
      style="
      margin-top:5px;
      font-size:13px;
      letter-spacing:1px;
      color:#8a8072;
      "
    >
      Medium ·
    </span>

    <span
      style="
        font-size:15px;
        color:#4a453d;
        font-weight:500;
        margin-left:4px;
      "
    >
      ${artworkMedium}
    </span>
  </div>
  

  <div style="margin-top:5px;">
    <span
      style="
      margin-top:5px;
      font-size:13px;
      letter-spacing:1px;
      color:#8a8072;
      "
    >
      Dimensions ·
    </span>

    <span
      style="
        font-size:15px;
        color:#4a453d;
        font-weight:500;
        margin-left:4px;
      "
    >
      ${artworkDimensions}
    </span>
  </div>

  <div style="margin-top:16px;">
    <span
      style="
        font-size:11px;
        letter-spacing:1.5px;
        color:#a08c6f;
      "
    >
      Request Reference
    </span>

    <div
      style="
        margin-top:5px;
        font-family:'Courier New',monospace;
        font-size:13px;
        letter-spacing:1px;
        color:#4a453d;
      "
    >
      ${referenceNumber}
    </div>
  </div>

  </td>

  </tr>

  <!-- ================= RESERVED PRICE ================= -->

  <tr>

  <td
  style="
  padding:28px 44px 0;
  ">

  <table
  role="presentation"
  width="100%"
  cellpadding="0"
  cellspacing="0"
  style="
  background:#f3efe7;
  border-radius:14px;
  ">

  <tr>

  <td
  style="
  padding:24px 28px;
  font-family:Georgia,serif;
  ">

  <div
  style="
  font-size:11px;
  letter-spacing:2px;
  text-transform:uppercase;
  color:#a08c6f;
  ">

  Reserved Price

  </div>

  <div
  style="
  margin-top:6px;
  font-size:30px;
  color:#1c1a17;
  ">

  ${artworkPrice}

  </div>

  <div
  style="
  margin-top:8px;
  font-size:13px;
  color:#8a8072;
  ">

  Reserved exclusively for you.

  </div>

  </td>

  </tr>

  </table>

  </td>

  </tr>

  <!-- ================= CTA ================= -->

<tr>


<!-- ================= Payment Button ================= -->

<td
align="center"
style="
padding:34px 44px 8px;
">

<a
href="${collectorPortal}"
style="
display:inline-block;
background:#8a6d3b;
color:#fbf8f2;
font-family:Georgia,serif;
font-size:16px;
font-weight:600;
letter-spacing:.5px;
text-decoration:none;
padding:16px 42px;
border-radius:999px;
">

Complete Your Purchase

</a>

<div
style="
margin-top:18px;
text-align:center;
font-family:Georgia,'Times New Roman',serif;
font-size:13px;
line-height:22px;
color:#8a8072;
">

Please provide delivery details after payment <br>
· Secure payment by Razorpay ·

</div>

</td>

</tr>


<tr>

<td
style="
padding:40px 44px 0;
font-family:Georgia,serif;
color:#4a453d;
">

<p
style="
margin:0;
font-size:14px;
line-height:1.8;
">

If you have any questions, simply reply to this message, I'll be happy to help.

Looking forward to sending this artwork to its new home.

</p>

<p
style="
margin:28px 0 0;
font-size:14px;
line-height:1.5;
">

Warm regards,

<br><br>

<strong style="color:#1c1a17;">
Kamlesh
</strong>

<br>

Artist

<br>

Painttheory

</p>

</td>

</tr>

<!-- ================= FOOTER ================= -->

<tr>

<td style="padding:0 44px;">

<div
style="
height:1px;
background:#e7dfd2;
margin:36px 0 0;
">

</div>

</td>

</tr>

<tr>

<td
style="
padding:24px 44px 40px;
text-align:center;
font-family:Georgia,'Times New Roman',serif;
">

<div
style="
font-size:11px;
letter-spacing:2px;
text-transform:uppercase;
color:#b3a892;
">

Painttheory by Kamlesh Sahoo

</div>

<div
style="
margin-top:8px;
font-size:12px;
color:#b3a892;
">

This email was prepared exclusively for ${customerName}.

</div>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>

`;
}