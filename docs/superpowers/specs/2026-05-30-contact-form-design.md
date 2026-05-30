# Contact Form Design

**Date:** 2026-05-30
**Status:** Approved

## Goal

Add a `/contact` page to the CJ Studio website so potential clients can submit project enquiries. Ollie and Josh are notified by email via Resend.

## Architecture

- **Page:** `app/contact/page.tsx` — dedicated route, full page layout
- **Form component:** `components/contact-form.tsx` — client component, handles field state and displays feedback
- **Server Action:** `app/actions/send-enquiry.ts` — validates fields, calls Resend, returns result
- **Email:** Resend API sends HTML email to `hello@cjstudio.co.uk`
- **Config:** `RESEND_API_KEY` environment variable in Vercel (never in code)

## Page Layout

Two-column desktop layout matching existing site aesthetic:

- **Left column:** Headline ("Let's build something great"), one-line reassurance ("We reply within 24 hours"), email address, phone number
- **Right column:** The contact form
- **Mobile:** Single column, form below contact details
- Same Nav and Footer as all other pages
- Global aurora background persists through the page

"Start a project" buttons in Nav and CTA section updated to link to `/contact`.

## Form Fields

All three fields are required:

| Field | Type | Placeholder |
|---|---|---|
| Name | text input | "Your name" |
| Email | email input | "your@email.com" |
| Message | textarea (4 rows) | "Tell us about your project — what you need, rough timeline, any references you like" |

Submit button: "Send message" — uses existing `AnimatedButton` component.

## Server Action

File: `app/actions/send-enquiry.ts`

1. Receives `{ name, email, message }` from the form
2. Validates server-side: all fields present, email format valid
3. On validation failure: returns `{ success: false, errors: { name?, email?, message? } }`
4. On validation pass: calls Resend API to send email
5. On Resend success: returns `{ success: true }`
6. On Resend failure: returns `{ success: false, serverError: true }`

## Email Format

- **To:** `hello@cjstudio.co.uk` (placeholder until domain is live — update via env var)
- **From:** `noreply@cjstudio.co.uk` (Resend verified domain)
- **Subject:** `New project enquiry from [Name]`
- **Body:** Plain HTML — name, email, message in a clean layout

## States & Feedback

**Loading:** Button text changes to "Sending...", button disabled, no spinner needed.

**Success:** Form fields clear, inline message replaces submit button: "Message sent! We'll be in touch within 24 hours."

**Validation error:** Red helper text below the offending field. Form stays populated so user does not lose their input.

**Send failure:** Inline error above the submit button: "Something went wrong — please email us directly at hello@cjstudio.co.uk"

## Dependencies

- `resend` npm package (`npm install resend`)
- `RESEND_API_KEY` env var (set in `.env.local` for dev, Vercel dashboard for production)
- `CONTACT_EMAIL` env var (recipient address — defaults to `hello@cjstudio.co.uk`)

## Out of Scope

- Storing submissions in a database (not needed yet)
- Auto-reply to the sender (can add later)
- CAPTCHA / spam protection (add if spam becomes an issue)
- File/brief attachment uploads
