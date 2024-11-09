// -----------------------------------------------------------------------------
// Mailer config is not part of the main config.ts to make the system more
// customizable. The structure of "MAILER_TRANSPORT_OPTIONS" depends on the mail
// system.
//
// This config must provide "MAILER_TRANSPORT_OPTIONS" and "MAILER_FROM" (the
// sender address).
//
// See https://nodemailer.com/smtp for details.
// -----------------------------------------------------------------------------

// transporter settings
export const MAILER_TRANSPORT_OPTIONS = {
  host: Deno.env.get("MAILER_HOST") || "",
  port: Number(Deno.env.get("MAILER_PORT") || 465),
  secure: Boolean(Deno.env.get("MAILER_SECURE") || true),
  auth: {
    user: Deno.env.get("MAILER_USER") || "",
    pass: Deno.env.get("MAILER_PASS") || "",
  },
};

// the sender address
export const MAILER_FROM = Deno.env.get("MAILER_FROM") || "";
