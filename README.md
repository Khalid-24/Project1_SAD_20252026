# SHMS Prototype — Student Health Management System
Group 5 · SECD2613 (Section 06) 

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

## What's wired up ( Process Specifications)
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

## 📖 Project Overview

The current healthcare service at PKU relies on manual and semi-digital processes, which can lead to:

- Long waiting times
- Manual appointment scheduling
- Poor communication during urgent situations
- Limited access to medical records
- Increased administrative workload

To address these challenges, the proposed SHMS provides a centralized platform that improves healthcare service management while enhancing the overall experience for students and healthcare staff.

---

## 🎯 Project Objectives

- Develop a centralized healthcare management system for PKU.
- Enable online appointment booking and scheduling.
- Provide secure electronic medical record management.
- Improve communication between students and healthcare staff.
- Provide emergency support information through the system.
- Reduce paperwork and manual administrative tasks.
- Improve healthcare service efficiency and accessibility.

---

## ✨ Key Features

### 👨‍🎓 Student

- Secure Login
- Online Appointment Booking
- View Appointment Status
- View Electronic Medical Records
- Contact Healthcare Staff
- Receive Notifications & Reminders
- Access Emergency Support Information

### 👩‍⚕️ Healthcare Staff

- Staff Login
- Manage Student Appointments
- Update Medical Records
- Respond to Student Queries
- Manage Notifications
- View Appointment Schedule

### 👨‍💼 System Administrator

- Manage User Accounts
- Generate Reports
- View Dashboard Analytics
- Maintain System Data

---

## 🛠️ Technologies Used

- **System Analysis and Design (SAD)**
- UML Diagrams
- Data Flow Diagrams (DFD)
- Entity Relationship Diagram (ERD)
- Git & GitHub
- GitHub Projects (Kanban Board)

> *This project focuses on system analysis and design. The implementation technologies may vary in future development.*

---

## 📂 Project Documentation

This repository contains:

- Phase 1 – Project Proposal & Planning
- Phase 2 – System Analysis
- Phase 3 – System Design
- UML Diagrams
- Data Flow Diagrams (DFD)
- ER Diagram
- Database Design
- User Interface Design
- Project Report

---

## 👥 Team Members

| Name | Role |
|------|------|
| **Md Khalid Safiullah** | Team Leader, Project Planning, System Analysis & Design |
| **Member 2** | Requirement Gathering & Documentation |
| **Member 3** | Data Flow Diagrams & Database Design |
| **Member 4** | UML Diagrams & Interface Design |
| **Member 5** | Testing, Validation & Report Compilation |

---
- "Sign in" accepts any credentials by design, since there's no backend
  authentication to check against.
- If you want to reset all the demo data back to its original state,
  open your browser's DevTools console on any page and run:
  `localStorage.clear()`, then refresh.
