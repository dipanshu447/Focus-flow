// import { transporter } from "../config/mail.js";
import { resend } from "../config/resend.js";

// export const sendWelcomeEmail = async ({ email, name }) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Welcome to FocusFlow",
//       html: `
// <div style="
//   background:#000000;
//   padding:40px 20px;
//   font-family:Inter,Arial,sans-serif;
//   color:#ffffff;
// ">

//   <div style="
//     max-width:620px;
//     margin:0 auto;
//     background:#0a0a0a;
//     border:1px solid #1a1a1a;
//     border-radius:28px;
//     overflow:hidden;
//   ">

//     <div style="
//       padding:52px 32px 40px;
//       text-align:center;
//       border-bottom:1px solid #1a1a1a;
//     ">

//       <img
//         src="https://github.com/dipanshu447/Focus-flow/raw/main/.github/FocusFlow.png"
//         width="64"
//         alt="FocusFlow"
//         style="
//           margin-bottom:22px;
//           border-radius:18px;
//         "
//       />

//       <h1 style="
//         margin:0;
//         font-size:42px;
//         font-weight:700;
//         letter-spacing:-1.5px;
//         color:#ffffff;
//       ">
//         Welcome to FocusFlow
//       </h1>

//       <p style="
//         margin-top:12px;
//         color:#8a8a8a;
//         font-size:18px;
//         line-height:1.7;
//       ">
//         Build focus. Stay consistent. Do meaningful work.
//       </p>

//     </div>

//     <div style="padding:48px 32px;">

//       <p style="
//         color:#d1d1d1;
//         font-size:18px;
//         line-height:1.9;
//         margin-bottom:28px;
//       ">
//         Hey ${name},
//       </p>

//       <p style="
//         color:#b3b3b3;
//         font-size:17px;
//         line-height:1.9;
//         margin-bottom:28px;
//       ">
//         Thanks for joining FocusFlow.
//       </p>

//       <p style="
//         color:#b3b3b3;
//         font-size:17px;
//         line-height:1.9;
//         margin-bottom:42px;
//       ">
//         We built FocusFlow to help you reduce distractions,
//         stay intentional, and make consistent progress every day.
//       </p>

//       <div style="
//         margin-bottom:42px;
//       ">

//         <div style="
//           background:#111111;
//           border:1px solid #1d1d1d;
//           border-radius:18px;
//           padding:22px;
// margin-bottom:16px;
//         ">
//           <h3 style="
//             margin:0 0 10px;
//             color:#ffffff;
//             font-size:18px;
//           ">
//             Focus Sessions
//           </h3>

//           <p style="
//             margin:0;
//             color:#8f8f8f;
//             font-size:15px;
//             line-height:1.8;
//           ">
//             Stay locked in with structured deep-work sessions.
//           </p>
//         </div>

//         <div style="
//           background:#111111;
//           border:1px solid #1d1d1d;
//           border-radius:18px;
//           padding:22px;
// margin-bottom:16px;
//         ">
//           <h3 style="
//             margin:0 0 10px;
//             color:#ffffff;
//             font-size:18px;
//           ">
//             Task Tracking
//           </h3>

//           <p style="
//             margin:0;
//             color:#8f8f8f;
//             font-size:15px;
//             line-height:1.8;
//           ">
//             Organize what matters and keep momentum daily.
//           </p>
//         </div>

//         <div style="
//           background:#111111;
//           border:1px solid #1d1d1d;
//           border-radius:18px;
//           padding:22px;
//         ">
//           <h3 style="
//             margin:0 0 10px;
//             color:#ffffff;
//             font-size:18px;
//           ">
//             Productivity Insights
//           </h3>

//           <p style="
//             margin:0;
//             color:#8f8f8f;
//             font-size:15px;
//             line-height:1.8;
//           ">
//             Understand your focus patterns and improve over time.
//           </p>
//         </div>

//       </div>

//       <div style="text-align:center;">

//         <a
//           href="https://focusflow.app/dashboard"
//           style="
//             display:inline-block;
//             background:#ffffff;
//             color:#000000;
//             padding:18px 34px;
//             border-radius:16px;
//             text-decoration:none;
//             font-weight:700;
//             font-size:16px;
//           "
//         >
//           Start Focusing
//         </a>

//       </div>

//     </div>

//     <div style="
//       border-top:1px solid #1a1a1a;
//       padding:32px;
//       text-align:center;
//     ">

//       <p style="
//         color:#ffffff;
//         font-size:20px;
//         margin-bottom:8px;
//         font-weight:600;
//       ">
//         Stay focused. Keep building.
//       </p>

//       <p style="
//         color:#7a7a7a;
//         margin-bottom:28px;
//         font-size:15px;
//       ">
//         — The FocusFlow Team
//       </p>

//       <div style="
//         width:180px;
//         height:1px;
//         background:#1f1f1f;
//         margin:0 auto 24px;
//       "></div>

//       <p style="
//         color:#5f5f5f;
//         font-size:13px;
//         margin:0;
//       ">
//         Built with focus by Dipanshu Sahu
//       </p>

//     </div>

//   </div>

// </div>
//       `,
//     });
//   } catch (error) {
//     console.error("Welcome email failed:", error);
//   }
// };

export const sendContactEmail = async ({ name, email, message }) => {
  return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      replyTo: email,

    html: `
<div style="
  background:#000000;
  padding:40px 20px;
  font-family:Inter,Arial,sans-serif;
  color:#ffffff;
">

  <div style="
    max-width:680px;
    margin:0 auto;
    background:#0a0a0a;
    border:1px solid #1a1a1a;
    border-radius:24px;
    overflow:hidden;
  ">

    <!-- Header -->
    <div style="
      padding:40px 32px;
      border-bottom:1px solid #1a1a1a;
    ">

      <div style="
        display:flex;
        align-items:center;
        gap:16px;
      ">

        <img
          src="https://github.com/dipanshu447/Focus-flow/raw/main/.github/FocusFlow.png"
          width="52"
          height="52"
          alt="FocusFlow"
          style="border-radius:14px;"
        />

        <div>
          <h1 style="
            margin:0;
            font-size:30px;
            font-weight:700;
            letter-spacing:-1px;
            color:#ffffff;
          ">
            New Contact Submission
          </h1>

          <p style="
            margin-top:6px;
            color:#8a8a8a;
            font-size:15px;
          ">
            Someone reached out through FocusFlow
          </p>
        </div>

      </div>

    </div>

    <!-- Main Content -->
    <div style="padding:40px 32px;">

      <!-- User Info Cards -->
      <div style="
        margin-bottom:32px;
      ">

        <div style="
          background:#111111;
          border:1px solid #1d1d1d;
          border-radius:16px;
          padding:18px 20px;
margin-bottom:16px;
        ">
          <p style="
            margin:0 0 8px;
            color:#7a7a7a;
            font-size:13px;
            text-transform:uppercase;
            letter-spacing:1px;
          ">
            Name
          </p>

          <p style="
            margin:0;
            color:#ffffff;
            font-size:18px;
            font-weight:600;
          ">
            ${name}
          </p>
        </div>

        <div style="
          background:#111111;
          border:1px solid #1d1d1d;
          border-radius:16px;
          padding:18px 20px;
margin-bottom:16px;
        ">
          <p style="
            margin:0 0 8px;
            color:#7a7a7a;
            font-size:13px;
            text-transform:uppercase;
            letter-spacing:1px;
          ">
            Email
          </p>

          <p style="
            margin:0;
            color:#ffffff;
            font-size:18px;
            font-weight:600;
          ">
            ${email}
          </p>
        </div>

      </div>

      <!-- Message -->
      <div style="
        background:#111111;
        border:1px solid #1d1d1d;
        border-radius:20px;
        padding:18px 20px;
      ">

        <p style="
          margin:0 0 18px;
          color:#7a7a7a;
          font-size:13px;
          text-transform:uppercase;
          letter-spacing:1px;
        ">
          Message
        </p>

        <p style="
          margin:0;
          color:#d1d1d1;
          font-size:17px;
          line-height:1.9;
          white-space:pre-wrap;
          word-break:break-word;
        ">
          ${message}
        </p>

      </div>

    </div>

    <!-- Footer -->
    <div style="
      border-top:1px solid #1a1a1a;
      padding:28px 32px;
      text-align:center;
    ">

      <p style="
        color:#8a8a8a;
        font-size:14px;
        margin:0 0 12px;
      ">
        Sent from the FocusFlow contact form
      </p>

      <div style="
        width:140px;
        height:1px;
        background:#1f1f1f;
        margin:0 auto 16px;
      "></div>

      <p style="
        color:#5f5f5f;
        font-size:13px;
        margin:0;
      ">
        Built with focus by Dipanshu Sahu
      </p>

    </div>

  </div>

</div>
`
  });
};