# Heartbeat Musicals — Management App (Agra)

## Project kya hai
Heartbeat Musicals & Classes (Agra) ke liye multi-branch music institute + instrument shop management app.
Malik: Gaurav ji. Baat-cheet **Hinglish** mein karni hai.

## 3 Branches
- Karkunj (KK), Kamla Nagar (KN), Sastripuram (SP)

## Files in this folder
- `heartbeat-musicals-app.jsx` — Complete working React single-file demo app (browser-tested, 44/44 interaction tests pass). 6 role logins (Owner/Manager/Receptionist/Teacher/Shop/Student), 17 pages, saare forms working (admission, fees+receipts HB-REC-####, POS sales HB-INV-####, repairs HB-RP-###, batches with conflict detection), navy-gold theme, in-memory state.
- `heartbeat-schema.sql` — Production PostgreSQL/Supabase schema: 33+ tables, RLS branch isolation, receipt/invoice sequences, batch-conflict trigger, seed data. Supabase SQL Editor mein directly run hoti hai.
- `data/heartbeat_june2026_fee_register.csv|xlsx` — REAL June 2026 fee data (register photos se transcribe, math-verified): 81 students, ₹1,30,250 collection.

## Real data (app mein already loaded)
- **Teachers:** Saurab Kashyap (Guitar, KK+KN), Sataydev Yadav (Keyboard, KK+KN), Vishal Kumar (Guitar, SP), Nishant Singh (Keyboard, SP)
- **Students:** 54 Guitar KK, 20 Keyboard KK, 7 Keyboard KN (Gauranshi = June fee pending)
- **Guitar Karkunj timing:** Tue/Thu/Sat 9AM–1PM + 3PM–9PM (1-hr slots), Sun 10AM–1PM
- **TBD (data aana baaki):** Keyboard timings, Guitar KN/SP timings, teacher salaries, student phones/parents, branch managers

## Doubtful names (register handwriting) — Gaurav ji se confirm karna
Vanya/Nanya, Prakash Mankani, Kaustub Rag., Ramphal, Harinaksh, Aarima, Rahitash
Armaan ka amount: register mein 1450 dikhta hai par running total se 1250 sahi hai (1250 use kiya).

## Agla kaam (is order mein)
1. Is single-file demo ko proper **Vite + React + TypeScript** project mein todna (components/, pages/, data/)
2. **Supabase integration:** `heartbeat-schema.sql` se project banao, real auth (6 roles), Firestore nahi — Supabase Postgres. Demo ka in-memory state Supabase queries se replace karo.
3. June 2026 real data ko CSV se Supabase mein seed karna
4. **GitHub Pages ya Vercel deploy** — GitHub Actions workflow ke saath (Gaurav ji ne pehle Walldecor99 GitHub Pages pe deploy kiya hai, base-path issues ka dhyan rakhna: vite.config mein `base` set karna)
5. WhatsApp fee-reminder integration (baad mein)

## Design rules
- Navy (#0E1B33) + Gold (#C9A227) premium theme, Marcellus + Inter fonts
- Receipt numbers HB-REC-#### (next: 1121), Invoice HB-INV-####, Repair HB-RP-### (next: 106)
- Branch data isolation: manager/reception/teacher sirf apni branch dekhe
