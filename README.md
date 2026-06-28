# SHMS Prototype — Student Health Management System
Group 5 · SECD2613 (Section 06) · Phase 3 Analysis & Design

## What this is
A front-end-only clickable prototype of the SHMS, built directly from your
Phase 3 report (the 6 process modules, the 3 user roles, and the TO-BE
workflow). There is no real server or database — all data lives in your
browser's local storage, so booking an appointment, sending a message,
adding a user, etc. all genuinely update the screen and persist as you
click around, which is normally enough for a class demo or viva.

## How to run it
Just open `index.html` in any modern browser (Chrome, Edge, Firefox).
No installation, no server needed — double-click the file or drag it into
a browser tab.

If you want to demo it from a real URL instead of a local file (e.g. to
show it on a projector or share a link), you can upload the whole folder
to a free static host such as GitHub Pages, Netlify, or Vercel — it will
work exactly the same way since there is no backend.

## Logging in (demo accounts)
The login screen accepts **any** ID and password — just pick a role tab
and type anything. To see the pre-filled sample data tied to a specific
mock account, you can use these IDs (any password works):

| Role             | ID        | Shows up as           |
|------------------|-----------|------------------------|
| Student          | A99CS0001 | "Demo Student"         |
| Healthcare Staff | STF-001   | "Dr. Aisha Rahman"     |
| Administrator    | ADM-001   | "System Administrator" |

## What's wired up (per your Process Specifications, Section 6.2)
- **Process 1 — Login & Account Module:** role-based login routes to the
  Student, Staff, or Admin dashboard.
- **Process 2 — Online Appointment Booking:** pick a department/doctor,
  see live available time slots, confirm a booking, cancel it later.
- **Process 3 — Electronic Medical Record:** staff add diagnosis/
  treatment/prescription entries; students see their own history
  read-only.
- **Process 4 — Messaging & Notifications:** two-way chat UI between
  student and staff, with toast notifications for key actions.
- **Process 5 — Emergency Support:** hotline numbers, first-aid
  guidelines, and an emergency request form.
- **Process 6 — Admin Dashboard & Reports:** user account management,
  generated usage reports with a simple chart, and system settings.

## A couple of honest limitations (worth knowing for your demo/viva)
- Data is stored per-browser (`localStorage`), not on a shared server, so
  what a "student" books won't show up live on someone else's laptop —
  this is expected for a Phase 3 prototype, which is about validating the
  design, not building the real system yet.
- "Sign in" accepts any credentials by design, since there's no backend
  authentication to check against.
- If you want to reset all the demo data back to its original state,
  open your browser's DevTools console on any page and run:
  `localStorage.clear()`, then refresh.
