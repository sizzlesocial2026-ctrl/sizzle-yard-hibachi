# Sizzle Yard Hibachi Order Automation Plan

Date: 2026-07-01

## Current Decision

Build the booking system in stages:

1. Instant estimate on website.
2. Lead record in Google Sheet.
3. Internal order number.
4. Google Calendar event.
5. Customer confirmation email.
6. Chef notification and calendar invite.
7. Deposit/payment status updates.

## Stage 1: Live Website Estimate

Status: started.

Rules:

- Adults: $60/person
- Kids: $30/person
- Minimum booking: 10 guests / $600 total
- Deposit: $100
- Balance: estimated total minus deposit
- Final confirmation required before deposit

## Stage 2: Lead Sheet

Required fields:

- Received At
- Name
- Phone
- Email
- Event Date
- City / ZIP
- Adults
- Kids
- Guest Count
- Estimated Total
- Deposit Amount
- Estimated Balance
- Minimum Applied
- Preferred Time
- Notes
- Browser Submitted At

## Stage 3: Order Number

Recommended format:

```text
SYH-YYYYMMDD-001
```

Example:

```text
SYH-20260704-001
```

## Stage 4: Google Calendar

Calendar event should include:

- Customer name
- Phone
- Event address or city
- Event date and start time
- Adults / kids / total guests
- Estimated total
- Deposit status
- Balance
- Notes, allergies, upgrades
- Assigned chef

## Stage 5: Email Updates

Customer email:

- Request received
- Estimated total
- Deposit link
- What happens next

Chef email:

- Event date/time
- City/address
- Guest count
- Menu notes
- Customer phone only when order is confirmed

## Recommendation

Do not make the first version fully automatic payment-to-confirmation. Keep a human confirmation step before deposit until travel fees, chef availability, setup rules, and special requests are predictable.
