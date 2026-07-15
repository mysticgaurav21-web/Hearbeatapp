import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, Users, GraduationCap, Music2, CalendarDays, ClipboardCheck,
  IndianRupee, Wallet, Package, ShoppingCart, Wrench, BarChart3, Bell,
  Settings, LogOut, Search, Plus, X, Printer, Download, Building2,
  AlertTriangle, CheckCircle2, Phone, Menu, BookOpen, UserCircle2, Receipt as ReceiptIcon
} from "lucide-react";

/* ================= THEME ================= */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Inter:wght@400;500;600;700&display=swap');

/* ============ 1. DESIGN TOKENS ============ */
:root{
  /* Brand */
  --navy:#0E1B33; --navy2:#16264A; --navy3:#1E325E;
  --gold:#C9A227; --gold-2:#E3C566; --gold-soft:#F7EFD8;
  /* Neutrals */
  --ink:#1C2333; --mut:#6B7385; --line:#E6E8EE; --bg:#F4F5F8; --paper:#FFFFFF;
  /* Status */
  --ok:#1E7F4F; --ok-bg:#E5F4EC; --warn:#B7791F; --warn-bg:#FDF3E2; --bad:#B3362C; --bad-bg:#FBEAE8;
  /* Scale */
  --r-sm:8px; --r-md:12px; --r-lg:16px;
  --sh-sm:0 1px 2px rgba(14,27,51,.05);
  --sh-md:0 4px 14px rgba(14,27,51,.08);
  --sh-lg:0 14px 40px rgba(14,27,51,.30);
  --fs-xs:11px; --fs-sm:12.5px; --fs-md:13.5px; --fs-lg:16px;
}

/* ============ 2. BASE ============ */
.hb-app{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--bg);min-height:100vh;font-size:var(--fs-md);}
.hb-display{font-family:'Marcellus',serif;letter-spacing:.02em;}
.hb-main{padding:18px;max-width:1200px;margin:0 auto;width:100%;}
@media(min-width:1024px){.hb-main{padding:26px 30px;}}

/* ============ 3. SIDEBAR / NAV ============ */
.hb-side{background:linear-gradient(180deg,var(--navy) 0%,var(--navy2) 100%);color:#DCE3F2;}
.hb-nav-group{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#6E7FA3;padding:14px 14px 5px;}
.hb-nav-item{display:flex;align-items:center;gap:10px;padding:8px 14px;border-radius:var(--r-sm);font-size:13px;cursor:pointer;color:#B9C3DA;transition:background .15s,color .15s;white-space:nowrap;}
.hb-nav-item:hover{background:rgba(255,255,255,.07);color:#fff;}
.hb-nav-item.active{background:rgba(201,162,39,.16);color:var(--gold-2);box-shadow:inset 3px 0 0 var(--gold);font-weight:600;}
.hb-pulse{stroke:var(--gold);stroke-width:2;fill:none;stroke-linecap:round;}

/* ============ 4. SURFACES ============ */
.hb-card{background:var(--paper);border:1px solid var(--line);border-radius:var(--r-md);box-shadow:var(--sh-sm);}
.hb-section-title{font-family:'Marcellus',serif;font-size:15px;color:var(--navy);display:flex;align-items:center;gap:8px;}
.hb-section-title::after{content:"";flex:1;height:1px;background:var(--line);}

/* ============ 5. CONTROLS ============ */
.hb-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 15px;border-radius:var(--r-sm);font-size:13px;font-weight:600;cursor:pointer;border:1px solid transparent;transition:all .15s;}
.hb-btn-gold{background:var(--gold);color:var(--navy);}
.hb-btn-gold:hover{background:var(--gold-2);box-shadow:var(--sh-md);}
.hb-btn-navy{background:var(--navy);color:#fff;}
.hb-btn-navy:hover{background:var(--navy3);}
.hb-btn-ghost{background:var(--paper);border-color:var(--line);color:var(--ink);}
.hb-btn-ghost:hover{border-color:var(--gold);color:var(--navy);}
.hb-input{width:100%;padding:8px 12px;border:1px solid var(--line);border-radius:var(--r-sm);font-size:var(--fs-md);background:var(--paper);outline:none;transition:border-color .15s,box-shadow .15s;}
.hb-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(201,162,39,.15);}
.hb-label{font-size:var(--fs-xs);font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--mut);margin-bottom:4px;display:block;}
.hb-grow{flex:1;min-width:180px;position:relative;}
.hb-minw{min-width:200px;}
.hb-ellipsis{max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}

/* ============ 6. TABLES ============ */
.hb-table{width:100%;border-collapse:collapse;font-size:13px;}
.hb-table th{text-align:left;padding:10px 12px;font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--mut);border-bottom:1px solid var(--line);background:#FAFBFD;font-weight:700;position:sticky;top:0;}
.hb-table td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:middle;}
.hb-table tbody tr:nth-child(even){background:#FAFBFD;}
.hb-table tbody tr:hover{background:#FBF7EA;}

/* ============ 7. INDICATORS ============ */
.hb-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:999px;font-size:var(--fs-xs);font-weight:600;}
.hb-stat{position:relative;overflow:hidden;padding:14px;display:flex;gap:12px;align-items:flex-start;}
.hb-stat-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(14,27,51,.06);color:var(--navy);}
.hb-stat.gold .hb-stat-icon{background:var(--gold-soft);color:var(--gold);}
.hb-stat::after{content:"";position:absolute;right:-8px;top:8px;bottom:8px;width:46px;opacity:.08;
  background:repeating-linear-gradient(180deg,var(--navy) 0 1.5px,transparent 1.5px 8px);}

/* ============ 8. OVERLAYS ============ */
.hb-modal-bg{position:fixed;inset:0;background:rgba(14,27,51,.55);z-index:50;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(2px);}
.hb-modal{background:var(--paper);border-radius:var(--r-lg);max-width:640px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:var(--sh-lg);}
.hb-toast{position:fixed;bottom:22px;right:22px;z-index:100;background:var(--navy);color:#fff;padding:12px 18px;border-radius:var(--r-md);font-size:var(--fs-md);display:flex;gap:9px;align-items:center;box-shadow:var(--sh-lg);border-left:3px solid var(--gold);}

/* ============ 9. PRINT ============ */
@media print{ .no-print{display:none !important;} .print-area{display:block !important;} }
`;

/* ================= DATA ================= */
const BRANCHES = [
  { id: "KN", name: "Kamla Nagar", code: "HM-KN", address: "B-42, Kamla Nagar, Agra", phone: "+91 98370 11001", manager: "TBD", open: "10:00", close: "20:00", active: true },
  { id: "KK", name: "Karkunj", code: "HM-KK", address: "Shop 7, Karkunj Chauraha, Agra", phone: "+91 98370 11002", manager: "TBD", open: "10:00", close: "20:00", active: true },
  { id: "SP", name: "Sastripuram", code: "HM-SP", address: "Plot 12, Sastripuram, Sikandra, Agra", phone: "+91 98370 11003", manager: "TBD", open: "10:30", close: "20:30", active: true },
];
const INSTRUMENTS = ["Guitar", "Keyboard", "Piano", "Drums", "Tabla", "Flute", "Violin", "Harmonium", "Dholak", "Vocal Music"];

const TEACHERS = [
  { id: "T01", name: "Saurab Kashyap", phone: "—", instruments: ["Guitar"], branches: ["KK", "KN"], joined: "—", salaryType: "Fixed", salary: 0, students: 54, status: "Active" },
  { id: "T02", name: "Sataydev Yadav", phone: "—", instruments: ["Keyboard"], branches: ["KK", "KN"], joined: "—", salaryType: "Fixed", salary: 0, students: 27, status: "Active" },
  { id: "T03", name: "Vishal Kumar", phone: "—", instruments: ["Guitar"], branches: ["SP"], joined: "—", salaryType: "Fixed", salary: 0, students: 0, status: "Active" },
  { id: "T04", name: "Nishant Singh", phone: "—", instruments: ["Keyboard"], branches: ["SP"], joined: "—", salaryType: "Fixed", salary: 0, students: 0, status: "Active" },
];

// Guitar Karkunj — real timing: Tue/Thu/Sat 9AM–1PM + 3PM–9PM (1-hr batches), Sunday 10AM–1PM
const GUITAR_KK_SLOTS = {
  weekdays: ["Tue", "Thu", "Sat"],
  morning: ["09:00–10:00", "10:00–11:00", "11:00–12:00", "12:00–13:00"],
  evening: ["15:00–16:00", "16:00–17:00", "17:00–18:00", "18:00–19:00", "19:00–20:00", "20:00–21:00"],
  sunday: ["10:00–11:00", "11:00–12:00", "12:00–13:00"],
};

const COURSES = [
  { id: "C01", name: "Guitar", instrument: "Guitar", level: "All Levels", type: "Group", monthly: 1500, admission: 0, duration: "Ongoing", perWeek: 2, maxBatch: 60 },
  { id: "C02", name: "Keyboard", instrument: "Keyboard", level: "All Levels", type: "Group", monthly: 1500, admission: 0, duration: "Ongoing", perWeek: 2, maxBatch: 30 },
];

const BATCHES = [
  { id: "B01", name: "Guitar — Karkunj", branch: "KK", instrument: "Guitar", course: "C01", teacher: "T01", days: "Tue, Thu, Sat, Sun", time: "09:00–13:00 & 15:00–21:00 (1-hr slots)", room: "—", max: 60, enrolled: 54 },
  { id: "B02", name: "Keyboard — Karkunj", branch: "KK", instrument: "Keyboard", course: "C02", teacher: "T02", days: "TBD", time: "TBD", room: "—", max: 30, enrolled: 20 },
  { id: "B03", name: "Keyboard — Kamla Nagar", branch: "KN", instrument: "Keyboard", course: "C02", teacher: "T02", days: "TBD", time: "TBD", room: "—", max: 15, enrolled: 7 },
  { id: "B04", name: "Guitar — Kamla Nagar", branch: "KN", instrument: "Guitar", course: "C01", teacher: "T01", days: "TBD", time: "TBD", room: "—", max: 30, enrolled: 0 },
  { id: "B05", name: "Guitar — Sastripuram", branch: "SP", instrument: "Guitar", course: "C01", teacher: "T03", days: "TBD", time: "TBD", room: "—", max: 30, enrolled: 0 },
  { id: "B06", name: "Keyboard — Sastripuram", branch: "SP", instrument: "Keyboard", course: "C02", teacher: "T04", days: "TBD", time: "TBD", room: "—", max: 30, enrolled: 0 },
];

const seedStudents = [
  ["S001","HM-416","Pradyumn","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S002","HM-420","Vanya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S003","HM-421","Aarohi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S004","HM-422","Vedant","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S005","HM-424","Pratyush","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S006","HM-425","Uditi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S007","HM-426","Chitranshu","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S008","HM-427","Ayush","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S009","HM-428","Mehul","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S010","HM-430","Aditya Bhardwaj","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S011","HM-431","Shubham","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S012","HM-433","Harshit","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S013","HM-434","Ayush Kumar","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S014","HM-435","Anshu","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S015","HM-436","Shyam Sunder","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S016","HM-437","Prabtej Singh","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S017","HM-438","Aryanshi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S018","HM-439","Arham Jain","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S019","HM-440","Kridha Garg","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S020","HM-441","Arnav Bansal","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S021","HM-442","Gracy","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S022","HM-443","Asha","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S023","HM-2026-023","Prakash Mankani","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S024","HM-2026-024","Devakshi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S025","HM-2026-025","Aarya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S026","HM-2026-026","Debangsu","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S027","HM-2026-027","Reyon","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S028","HM-2026-028","Aradhya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S029","HM-2026-029","Rivyansh","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S030","HM-2026-030","Kaustub Rag.","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S031","HM-2026-031","Tamanna","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S032","HM-2026-032","Veera","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S033","HM-2026-033","Manpreet","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S034","HM-2026-034","Varuni","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S035","HM-2026-035","Pallavi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S036","HM-2026-036","Poorvi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S037","HM-2026-037","Pranjal","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S038","HM-2026-038","Navya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S039","HM-2026-039","Priyanshi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S040","HM-2026-040","Arnav G.","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S041","HM-2026-041","Ishita","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S042","HM-2026-042","Divyam","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S043","HM-2026-043","Naavya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S044","HM-2026-044","Madhav","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S045","HM-2026-045","Shreya","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S046","HM-2026-046","Vanshika","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S047","HM-2026-047","Armaan","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S048","HM-2026-048","Ashish","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S049","HM-2026-049","Ramphal","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S050","HM-2026-050","Divyansh","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S051","HM-2026-051","Prachi","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S052","HM-2026-052","Aarna","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S053","HM-2026-053","Pallavi (H.T.)","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S054","HM-2026-054","Anshu (H.T.)","KK","Guitar","T01","B01","Paid",0,"Active","—","—","—"],
  ["S055","HM-2026-055","Harinaksh","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S056","HM-2026-056","Kavya","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S057","HM-2026-057","Jatin","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S058","HM-2026-058","Pramit","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S059","HM-2026-059","Amar","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S060","HM-2026-060","Advait","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S061","HM-2026-061","Aradhya Indolia","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S062","HM-2026-062","Prayan","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S063","HM-2026-063","Reyansh Bansal","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S064","HM-2026-064","Gauranshi","KK","Keyboard","T02","B02","Pending",0,"Active","—","—","—"],
  ["S065","HM-2026-065","Shaurya","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S066","HM-2026-066","Harsh","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S067","HM-2026-067","Aradhya","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S068","HM-2026-068","Aarima","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S069","HM-2026-069","Sumit","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S070","HM-2026-070","Gopal","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S071","HM-2026-071","Misty","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S072","HM-2026-072","Rahitash","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S073","HM-2026-073","Neev","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S074","HM-2026-074","Rudransh","KK","Keyboard","T02","B02","Paid",0,"Active","—","—","—"],
  ["S075","HM-2026-075","Krishnanshu","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S076","HM-2026-076","Aditya","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S077","HM-2026-077","Aadhya","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S078","HM-2026-078","Aarsh","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S079","HM-2026-079","Adwik","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S080","HM-2026-080","Anayesha","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
  ["S081","HM-2026-081","Madhav","KN","Keyboard","T02","B03","Paid",0,"Active","—","—","—"],
].map(r => ({ id:r[0], adm:r[1], name:r[2], branch:r[3], instrument:r[4], teacher:r[5], batch:r[6], feeStatus:r[7], attendance:r[8], status:r[9], phone:r[10], parent:r[11], joined:r[12] }));

const seedPayments = [
  { rec:"HB-REC-1041", student:"S001", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1042", student:"S002", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1043", student:"S003", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1044", student:"S004", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1045", student:"S005", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1046", student:"S006", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1047", student:"S007", branch:"KK", month:"June 2026", total:750, discount:0, paid:750, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1048", student:"S008", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1049", student:"S009", branch:"KK", month:"June 2026", total:1400, discount:0, paid:1400, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1050", student:"S010", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1051", student:"S011", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1052", student:"S012", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1053", student:"S013", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1054", student:"S014", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1055", student:"S015", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1056", student:"S016", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1057", student:"S017", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1058", student:"S018", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1059", student:"S019", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1060", student:"S020", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1061", student:"S021", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1062", student:"S022", branch:"KK", month:"June 2026", total:1200, discount:0, paid:1200, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1063", student:"S023", branch:"KK", month:"June 2026", total:2800, discount:0, paid:2800, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1064", student:"S024", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1065", student:"S025", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1066", student:"S026", branch:"KK", month:"June 2026", total:3000, discount:0, paid:3000, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1067", student:"S027", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1068", student:"S028", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1069", student:"S029", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1070", student:"S030", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1071", student:"S031", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1072", student:"S032", branch:"KK", month:"June 2026", total:1150, discount:0, paid:1150, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1073", student:"S033", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1074", student:"S034", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1075", student:"S035", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1076", student:"S036", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1077", student:"S037", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1078", student:"S038", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1079", student:"S039", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1080", student:"S040", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1081", student:"S041", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1082", student:"S042", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1083", student:"S043", branch:"KK", month:"June 2026", total:2500, discount:0, paid:2500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1084", student:"S044", branch:"KK", month:"June 2026", total:1000, discount:0, paid:1000, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1085", student:"S045", branch:"KK", month:"June 2026", total:1750, discount:0, paid:1750, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1086", student:"S046", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1087", student:"S047", branch:"KK", month:"June 2026", total:1250, discount:0, paid:1250, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1088", student:"S048", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1089", student:"S049", branch:"KK", month:"June 2026", total:850, discount:0, paid:850, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1090", student:"S050", branch:"KK", month:"June 2026", total:1300, discount:0, paid:1300, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1091", student:"S051", branch:"KK", month:"June 2026", total:2400, discount:0, paid:2400, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1092", student:"S052", branch:"KK", month:"June 2026", total:600, discount:0, paid:600, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1093", student:"S053", branch:"KK", month:"June 2026", total:5500, discount:0, paid:5500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1094", student:"S054", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1095", student:"S055", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1096", student:"S056", branch:"KK", month:"June 2026", total:1150, discount:0, paid:1150, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1097", student:"S057", branch:"KK", month:"June 2026", total:1100, discount:0, paid:1100, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1098", student:"S058", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1099", student:"S059", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1100", student:"S060", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1101", student:"S061", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1102", student:"S062", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1103", student:"S063", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1104", student:"S065", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1105", student:"S066", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1106", student:"S067", branch:"KK", month:"June 2026", total:1300, discount:0, paid:1300, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1107", student:"S068", branch:"KK", month:"June 2026", total:1300, discount:0, paid:1300, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1108", student:"S069", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1109", student:"S070", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1110", student:"S071", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1111", student:"S072", branch:"KK", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1112", student:"S073", branch:"KK", month:"June 2026", total:1000, discount:0, paid:1000, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1113", student:"S074", branch:"KK", month:"June 2026", total:550, discount:0, paid:550, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1114", student:"S075", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1115", student:"S076", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1116", student:"S077", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1117", student:"S078", branch:"KN", month:"June 2026", total:1400, discount:0, paid:1400, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1118", student:"S079", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1119", student:"S080", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
  { rec:"HB-REC-1120", student:"S081", branch:"KN", month:"June 2026", total:1500, discount:0, paid:1500, balance:0, date:"2026-06-30", mode:"Cash", by:"Register entry" },
];

const seedSalaries = []; // Teacher salary data pending — Gaurav ji se milte hi bharenge

const seedProducts = [
  ["P01","Yamaha F310 Acoustic Guitar","Guitars","Yamaha",8500,10500,"KN",6,2],
  ["P02","Cort AD810 Acoustic Guitar","Guitars","Cort",9200,11500,"SP",3,2],
  ["P03","Juarez JRZ38 Beginner Guitar","Guitars","Juarez",2800,4200,"KN",10,3],
  ["P04","Casio CT-X870 Keyboard","Keyboards","Casio",13500,16995,"KN",4,2],
  ["P05","Yamaha PSR-E373 Keyboard","Keyboards","Yamaha",15200,18500,"KK",2,2],
  ["P06","Bina No.9 Harmonium","Harmoniums","Bina",9800,13500,"KK",3,1],
  ["P07","MKS Tabla Set (Sheesham)","Tabla","MKS",5200,7500,"KK",5,2],
  ["P08","Punjab Dholak Standard","Dholaks","Punjab",2600,3900,"KK",4,2],
  ["P09","Hertz HZR-100 Violin 4/4","Violins","Hertz",4800,6800,"KK",2,1],
  ["P10","Punam Flutes C Natural","Flutes","Punam",1500,2400,"SP",8,3],
  ["P11","Pearl Roadshow Drum Kit","Drums","Pearl",42000,52000,"SP",1,1],
  ["P12","D'Addario EJ16 String Set","Strings","D'Addario",650,950,"KN",25,10],
  ["P13","Karuna Guitar Strings (Bronze)","Strings","Karuna",180,300,"KN",40,15],
  ["P14","Alice Picks (Pack of 10)","Picks","Alice",120,250,"KN",30,10],
  ["P15","Guitar Capo Aluminium","Accessories","Flanger",250,450,"SP",12,5],
  ["P16","6.35mm Instrument Cable 3m","Cables","MX",280,500,"SP",9,5],
  ["P17","Keyboard Stand X-Type","Stands","Kadence",900,1500,"KN",6,3],
  ["P18","Guitar Padded Gig Bag","Bags","Kadence",550,950,"KN",14,5],
  ["P19","Zildjian Drumsticks 5A","Accessories","Zildjian",700,1100,"SP",10,4],
  ["P20","Clip-on Chromatic Tuner","Accessories","Cherub",450,750,"KK",1,4],
].map(r=>({ id:r[0], name:r[1], cat:r[2], brand:r[3], cost:r[4], price:r[5], branch:r[6], stock:r[7], minStock:r[8], active:true }));

const SUPPLIERS = [
  { id:"SUP1", name:"Bharat Musical Traders, Delhi", contact:"Naveen Arora", phone:"98100 44121", gst:"07AAACB1234F1Z5", pending: 18500 },
  { id:"SUP2", name:"Sur Sangam Instruments, Meerut", contact:"Farhan Qureshi", phone:"98970 55672", gst:"09AABCS9876K1Z2", pending: 0 },
  { id:"SUP3", name:"Kadence Music, Bangalore", contact:"Online B2B", phone:"1800 121 4030", gst:"29AAECK4567P1Z8", pending: 7200 },
];

const seedSales = [
  { inv:"HB-INV-2201", customer:"Ramesh Solanki", phone:"99170 22011", branch:"KN", items:"Yamaha F310 ×1, Gig Bag ×1", amount:11450, mode:"UPI", status:"Paid", by:"Vikas Chauhan", date:"2026-07-08" },
  { inv:"HB-INV-2202", customer:"Sunita Devi", phone:"99170 22012", branch:"KK", items:"Bina Harmonium ×1", amount:13500, mode:"Cash", status:"Paid", by:"Ritu Saxena", date:"2026-07-09" },
  { inv:"HB-INV-2203", customer:"Faizan Sheikh", phone:"99170 22013", branch:"KN", items:"EJ16 Strings ×2, Picks ×1", amount:2150, mode:"UPI", status:"Paid", by:"Shop KN", date:"2026-07-11" },
  { inv:"HB-INV-2204", customer:"Col. R.K. Nair", phone:"99170 22014", branch:"SP", items:"Punam Flute ×1, Tuner ×1", amount:3150, mode:"Card", status:"Paid", by:"Amit Yadav", date:"2026-07-12" },
  { inv:"HB-INV-2205", customer:"Divya Tandon", phone:"99170 22015", branch:"KN", items:"Casio CT-X870 ×1, Stand ×1", amount:18495, mode:"Bank Transfer", status:"Pending", by:"Shop KN", date:"2026-07-13" },
];

const seedRepairs = [
  { job:"HB-RP-101", customer:"Mahesh Rawat", phone:"99230 40011", instrument:"Acoustic Guitar", brand:"GB&A", problem:"Fret buzz + bridge lift", est:1200, advance:500, tech:"Kabir Sethi", received:"2026-07-05", due:"2026-07-15", status:"In Progress", branch:"SP" },
  { job:"HB-RP-102", customer:"Shabnam Bano", phone:"99230 40012", instrument:"Harmonium", brand:"Bina", problem:"2 reeds silent, bellows leak", est:1800, advance:800, tech:"Salim Khan", received:"2026-07-07", due:"2026-07-16", status:"Ready", branch:"KK" },
  { job:"HB-RP-103", customer:"Ankit Dixit", phone:"99230 40013", instrument:"Electric Keyboard", brand:"Casio", problem:"3 keys not responding", est:950, advance:0, tech:"External - Delhi", received:"2026-07-09", due:"2026-07-20", status:"Pending", branch:"KN" },
  { job:"HB-RP-104", customer:"Pooja Bhadauria", phone:"99230 40014", instrument:"Violin", brand:"Hertz", problem:"Bridge replacement + restring", est:700, advance:700, tech:"Neha Bansal", received:"2026-07-01", due:"2026-07-10", status:"Delivered", branch:"KK" },
  { job:"HB-RP-105", customer:"Irfan Khan", phone:"99230 40015", instrument:"Tabla (Bayan)", brand:"MKS", problem:"Pudi replacement", est:1500, advance:500, tech:"Salim Khan", received:"2026-07-12", due:"2026-07-22", status:"Pending", branch:"KK" },
];

const NOTIFS = [
  { t:"Fee pending", d:"Gauranshi (Keyboard, Karkunj) — June 2026 payment pending", tone:"warn", when:"June" },
  { t:"Collection complete", d:"June 2026: ₹1,30,250 total — Guitar ₹93,950 + Keyboard ₹36,300", tone:"ok", when:"30 June" },
  { t:"Timetable updated", d:"Guitar Karkunj timing live: Tue/Thu/Sat 9–1 & 3–9, Sun 10–1 · Keyboard timing TBD", tone:"ok", when:"Today" },
  { t:"Data pending", d:"Teachers ki salary aur Keyboard/Sastripuram timings aana baaki hai", tone:"warn", when:"Today" },
  { t:"Verify karein", d:"Kuch naam register handwriting se doubtful hain: Vanya, Kaustub Rag., Ramphal, Harinaksh, Aarima, Rahitash", tone:"warn", when:"Today" },
];

/* ================= HELPERS ================= */
const inr = n => "₹" + Number(n).toLocaleString("en-IN");
const bName = id => (BRANCHES.find(b=>b.id===id)||{}).name || id;
const tName = id => (TEACHERS.find(t=>t.id===id)||{}).name || id;
const cName = id => (COURSES.find(c=>c.id===id)||{}).name || id;

const feeTone = s => s==="Paid" ? ["#E5F4EC","#1E7F4F"] : s==="Overdue" ? ["#FBEAE8","#B3362C"] : s==="Partial" ? ["#FDF3E2","#B7791F"] : ["#FDF3E2","#B7791F"];
const repTone = s => s==="Delivered"||s==="Ready" ? ["#E5F4EC","#1E7F4F"] : s==="In Progress" ? ["#E8EEFB","#2B4C9B"] : s==="Cancelled" ? ["#FBEAE8","#B3362C"] : ["#FDF3E2","#B7791F"];

function Badge({ text, tones }) {
  const [bg, fg] = tones;
  return <span className="hb-badge" style={{ background: bg, color: fg }}>{text}</span>;
}
function Stat({ icon: Ic, label, value, sub, gold }) {
  return (
    <div className={"hb-card hb-stat" + (gold ? " gold" : "")}>
      <div className="hb-stat-icon"><Ic size={18} /></div>
      <div className="min-w-0">
        <div className="text-xs font-semibold uppercase" style={{ color: "var(--mut)", letterSpacing: ".05em", fontSize: "10.5px" }}>{label}</div>
        <div className="hb-display text-2xl leading-tight" style={{ color: "var(--navy)" }}>{value}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: "var(--mut)" }}>{sub}</div>}
      </div>
    </div>
  );
}
function Modal({ title, onClose, children, wide }) {
  return (
    <div className="hb-modal-bg no-print" onClick={onClose}>
      <div className="hb-modal" style={wide ? { maxWidth: 820 } : {}} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
          <div className="hb-display text-lg" style={{ color: "var(--navy)" }}>{title}</div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
function Field({ label, children }) {
  return <div><label className="hb-label">{label}</label>{children}</div>;
}
function Empty({ msg }) {
  return <div className="text-center py-10 text-sm" style={{ color: "var(--mut)" }}>{msg}</div>;
}
function PageHead({ title, sub, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
      <div>
        <h1 className="hb-display text-2xl" style={{ color: "var(--navy)" }}>{title}</h1>
        {sub && <p className="text-xs mt-0.5" style={{ color: "var(--mut)" }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}
function downloadCSV(name, rows) {
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  a.download = name + ".csv";
  a.click();
}

/* ================= PAGES ================= */

function Dashboard({ scope, students, payments, sales, products, go }) {
  const inScope = x => scope === "ALL" || x.branch === scope;
  const st = students.filter(inScope);
  const pay = payments.filter(inScope);
  const sl = sales.filter(inScope);
  const collected = pay.reduce((a, p) => a + p.paid, 0);
  const pending = st.filter(s => s.feeStatus !== "Paid" && s.status === "Active");
  const low = products.filter(p => inScope(p) && p.stock <= p.minStock);
  const branchIncome = BRANCHES.map(b => ({
    b, amt: payments.filter(p => p.branch === b.id).reduce((a, p) => a + p.paid, 0)
      + sales.filter(s => s.branch === b.id && s.status === "Paid").reduce((a, s) => a + s.amount, 0)
  }));
  const maxAmt = Math.max(...branchIncome.map(x => x.amt), 1);
  return (
    <div>
      <PageHead title={scope === "ALL" ? "Owner Dashboard" : bName(scope) + " Dashboard"} sub="Tuesday, 14 July 2026 · Sab branches ka live overview" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Stat icon={Users} label="Active Students" value={st.filter(s => s.status === "Active").length} sub={`Total ${st.length} enrolled`} />
        <Stat icon={GraduationCap} label="Teachers" value={TEACHERS.filter(t => scope === "ALL" || t.branches.includes(scope)).length} sub="Across instruments" />
        <Stat icon={IndianRupee} label="July Collection" value={inr(collected)} sub={`${pay.length} receipts`} gold />
        <Stat icon={AlertTriangle} label="Pending Fees" value={pending.length} sub="Students due / overdue" />
        <Stat icon={CalendarDays} label="Today's Classes" value={BATCHES.filter(b => (scope === "ALL" || b.branch === scope) && b.days.includes("Tue")).length} sub="Tuesday batches" />
        <Stat icon={ShoppingCart} label="Shop Sales (July)" value={inr(sl.filter(s => s.status === "Paid").reduce((a, s) => a + s.amount, 0))} sub={`${sl.length} invoices`} gold />
        <Stat icon={Package} label="Low Stock Items" value={low.length} sub="Reorder needed" />
        <Stat icon={Wallet} label="Salaries Pending" value={seedSalaries.filter(s => s.status === "Pending" && (scope === "ALL" || s.branch === scope)).length} sub="June 2026 cycle" />
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <div className="hb-card p-4 lg:col-span-1">
          <div className="hb-display mb-3" style={{ color: "var(--navy)" }}>Branch-wise Income · July</div>
          {branchIncome.map(({ b, amt }) => (
            <div key={b.id} className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold">{b.name}</span><span style={{ color: "var(--mut)" }}>{inr(amt)}</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: "#EDF0F6" }}>
                <div className="h-2 rounded-full" style={{ width: (amt / maxAmt * 100) + "%", background: "linear-gradient(90deg,var(--navy),var(--gold))" }} />
              </div>
            </div>
          ))}
          <button className="hb-btn hb-btn-ghost w-full justify-center mt-2" onClick={() => go("reports")}><BarChart3 size={15} /> Full reports</button>
        </div>

        <div className="hb-card p-4">
          <div className="hb-display mb-2" style={{ color: "var(--navy)" }}>Recent Payments</div>
          {pay.slice(-5).reverse().map(p => (
            <div key={p.rec} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="text-sm font-semibold">{(students.find(s => s.id === p.student) || {}).name}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{p.rec} · {p.mode}</div>
              </div>
              <div className="text-sm font-bold" style={{ color: "var(--ok)" }}>{inr(p.paid)}</div>
            </div>
          ))}
        </div>

        <div className="hb-card p-4">
          <div className="hb-display mb-2" style={{ color: "var(--navy)" }}>Low Stock · Action Needed</div>
          {low.length === 0 ? <Empty msg="Sab stock theek hai 👍" /> : low.map(p => (
            <div key={p.id} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{bName(p.branch)}</div>
              </div>
              <Badge text={`${p.stock} left`} tones={["#FBEAE8", "#B3362C"]} />
            </div>
          ))}
          <div className="hb-display mt-4 mb-2" style={{ color: "var(--navy)" }}>Recent Admissions</div>
          {[...st].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 3).map(s => (
            <div key={s.id} className="flex justify-between py-1.5 text-sm">
              <span>{s.name}</span><span className="text-xs" style={{ color: "var(--mut)" }}>{s.instrument} · {s.joined}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BranchesPage() {
  const [rows, setRows] = useState(BRANCHES);
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", address: "", phone: "", manager: "", open: "10:00", close: "20:00" });
  const save = () => {
    if (!form.name.trim() || !form.manager.trim()) { setErr("Branch ka naam aur manager zaroori hai."); return; }
    const code = "HM-" + form.name.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 3);
    setRows([...rows, { id: code.slice(3) + rows.length, code, name: form.name.trim(), address: form.address || "Agra", phone: form.phone || "—", manager: form.manager.trim(), open: form.open, close: form.close, active: true }]);
    setShow(false); setErr(""); setForm({ name: "", address: "", phone: "", manager: "", open: "10:00", close: "20:00" });
  };
  return (
    <div>
      <PageHead title="Branches" sub="Heartbeat Musicals ki Agra branches" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Add branch</button>} />
      <div className="grid md:grid-cols-3 gap-3">
        {rows.map(b => (
          <div key={b.id} className="hb-card p-4">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg" style={{ background: "var(--gold-soft)", color: "var(--gold)" }}><Building2 size={18} /></div>
              <Badge text={b.active ? "Active" : "Inactive"} tones={b.active ? ["#E5F4EC", "#1E7F4F"] : ["#FBEAE8", "#B3362C"]} />
            </div>
            <div className="hb-display text-lg mt-2" style={{ color: "var(--navy)" }}>{b.name}</div>
            <div className="text-xs font-mono mb-2" style={{ color: "var(--gold)" }}>{b.code}</div>
            <div className="text-xs space-y-1" style={{ color: "var(--mut)" }}>
              <div>{b.address}</div>
              <div className="flex items-center gap-1"><Phone size={11} /> {b.phone}</div>
              <div>Manager: <b style={{ color: "var(--ink)" }}>{b.manager}</b></div>
              <div>Timings: {b.open} – {b.close}</div>
            </div>
          </div>
        ))}
      </div>
      {show && (
        <Modal title="Add Branch" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Branch name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Dayalbagh" /></Field>
            <Field label="Manager *"><input className="hb-input" value={form.manager} onChange={e => setForm({ ...form, manager: e.target.value })} /></Field>
            <Field label="Address"><input className="hb-input" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} /></Field>
            <Field label="Phone"><input className="hb-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="Opens"><input className="hb-input" type="time" value={form.open} onChange={e => setForm({ ...form, open: e.target.value })} /></Field>
            <Field label="Closes"><input className="hb-input" type="time" value={form.close} onChange={e => setForm({ ...form, close: e.target.value })} /></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Add branch</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function StudentsPage({ students, setStudents, toast, scope }) {
  const [q, setQ] = useState(""); const [fBranch, setFBranch] = useState(scope === "ALL" ? "" : scope);
  const [fInst, setFInst] = useState(""); const [fFee, setFFee] = useState("");
  const [show, setShow] = useState(false); const [view, setView] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", parent: "", branch: "KN", instrument: "Guitar", batch: "B01" });
  const [err, setErr] = useState("");

  const list = students.filter(s =>
    (scope === "ALL" || s.branch === scope) &&
    (!fBranch || s.branch === fBranch) && (!fInst || s.instrument === fInst) && (!fFee || s.feeStatus === fFee) &&
    (s.name.toLowerCase().includes(q.toLowerCase()) || s.adm.toLowerCase().includes(q.toLowerCase()) || s.phone.includes(q))
  );

  const save = () => {
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) { setErr("Naam aur valid 10-digit mobile number zaroori hai."); return; }
    const n = students.length + 1;
    const batch = BATCHES.find(b => b.id === form.batch);
    setStudents([...students, {
      id: "S" + String(100 + n), adm: "HM-2026-" + String(20 + n).padStart(3, "0"),
      name: form.name.trim(), branch: form.branch, instrument: form.instrument,
      teacher: batch ? batch.teacher : "T01", batch: form.batch, feeStatus: "Pending",
      attendance: 0, status: "Active", phone: form.phone, parent: form.parent || "—", joined: "2026-07-14",
    }]);
    setShow(false); setErr(""); setForm({ name: "", phone: "", parent: "", branch: "KN", instrument: "Guitar", batch: "B01" });
    toast("Student admit ho gaya ✔ Admission number generate hua");
  };

  return (
    <div>
      <PageHead title="Students" sub={`${list.length} students · search, filter, admission`} action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> New admission</button>} />
      <div className="hb-card p-3 mb-3 flex flex-wrap gap-2 items-center">
        <div className="hb-grow">
          <Search size={15} className="absolute left-3 top-2.5" style={{ color: "var(--mut)" }} />
          <input className="hb-input pl-9" placeholder="Naam, ID ya phone se search karein…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        {scope === "ALL" && <select className="hb-input w-auto" value={fBranch} onChange={e => setFBranch(e.target.value)}><option value="">All branches</option>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select>}
        <select className="hb-input w-auto" value={fInst} onChange={e => setFInst(e.target.value)}><option value="">All instruments</option>{INSTRUMENTS.map(i => <option key={i}>{i}</option>)}</select>
        <select className="hb-input w-auto" value={fFee} onChange={e => setFFee(e.target.value)}><option value="">Fee status</option>{["Paid", "Pending", "Partial", "Overdue"].map(f => <option key={f}>{f}</option>)}</select>
      </div>
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Student</th><th>Branch</th><th>Instrument</th><th>Teacher</th><th>Batch</th><th>Attendance</th><th>Fees</th><th>Status</th></tr></thead>
          <tbody>
            {list.map(s => (
              <tr key={s.id} className="cursor-pointer" onClick={() => setView(s)}>
                <td><div className="font-semibold">{s.name}</div><div className="text-xs font-mono" style={{ color: "var(--mut)" }}>{s.adm}</div></td>
                <td>{bName(s.branch)}</td><td>{s.instrument}</td><td>{tName(s.teacher)}</td>
                <td className="text-xs">{(BATCHES.find(b => b.id === s.batch) || {}).name}</td>
                <td><span style={{ color: s.attendance >= 75 ? "var(--ok)" : "var(--bad)", fontWeight: 600 }}>{s.attendance}%</span></td>
                <td><Badge text={s.feeStatus} tones={feeTone(s.feeStatus)} /></td>
                <td><Badge text={s.status} tones={s.status === "Active" ? ["#E5F4EC", "#1E7F4F"] : ["#EDF0F6", "#5A6478"]} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <Empty msg="Koi student match nahi hua — filters change karke dekhein." />}
      </div>

      {show && (
        <Modal title="New Student Admission" onClose={() => setShow(false)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Student name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Aditi Sharma" /></Field>
            <Field label="Mobile number *"><input className="hb-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" /></Field>
            <Field label="Parent / guardian"><input className="hb-input" value={form.parent} onChange={e => setForm({ ...form, parent: e.target.value })} /></Field>
            <Field label="Branch"><select className="hb-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
            <Field label="Instrument"><select className="hb-input" value={form.instrument} onChange={e => setForm({ ...form, instrument: e.target.value })}>{INSTRUMENTS.map(i => <option key={i}>{i}</option>)}</select></Field>
            <Field label="Batch"><select className="hb-input" value={form.batch} onChange={e => setForm({ ...form, batch: e.target.value })}>{BATCHES.filter(b => b.branch === form.branch).map(b => <option key={b.id} value={b.id}>{b.name} ({b.time})</option>)}</select></Field>
          </div>
          {err && <div className="text-xs mt-3 font-semibold" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><CheckCircle2 size={15} /> Admit student</button>
          </div>
        </Modal>
      )}

      {view && (
        <Modal title="Student Profile" onClose={() => setView(null)} wide>
          <div className="flex flex-wrap gap-4 items-start">
            <div className="w-16 h-16 rounded-2xl hb-display text-2xl flex items-center justify-center" style={{ background: "var(--navy)", color: "var(--gold-2)" }}>{view.name[0]}</div>
            <div className="flex-1 hb-minw">
              <div className="hb-display text-xl" style={{ color: "var(--navy)" }}>{view.name}</div>
              <div className="text-xs font-mono" style={{ color: "var(--gold)" }}>{view.adm}</div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm mt-3">
                <div><span style={{ color: "var(--mut)" }}>Branch: </span>{bName(view.branch)}</div>
                <div><span style={{ color: "var(--mut)" }}>Instrument: </span>{view.instrument}</div>
                <div><span style={{ color: "var(--mut)" }}>Teacher: </span>{tName(view.teacher)}</div>
                <div><span style={{ color: "var(--mut)" }}>Batch: </span>{(BATCHES.find(b => b.id === view.batch) || {}).name} · {(BATCHES.find(b => b.id === view.batch) || {}).time}</div>
                <div><span style={{ color: "var(--mut)" }}>Phone: </span>{view.phone}</div>
                <div><span style={{ color: "var(--mut)" }}>Parent: </span>{view.parent}</div>
                <div><span style={{ color: "var(--mut)" }}>Admission: </span>{view.joined}</div>
                <div><span style={{ color: "var(--mut)" }}>Attendance: </span><b>{view.attendance}%</b></div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge text={"Fees: " + view.feeStatus} tones={feeTone(view.feeStatus)} />
                <Badge text={view.status} tones={["#EDF0F6", "#2B4C9B"]} />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TeachersPage({ scope, toast }) {
  const [rows, setRows] = useState(TEACHERS);
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", instrument: "Guitar", branch: scope === "ALL" ? "KN" : scope, salaryType: "Fixed", salary: "20000" });
  const list = rows.filter(t => scope === "ALL" || t.branches.includes(scope));
  const save = () => {
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) { setErr("Naam aur valid 10-digit mobile zaroori hai."); return; }
    const sal = parseInt(form.salary, 10);
    if (!sal || sal <= 0) { setErr("Valid salary amount daalein."); return; }
    setRows([...rows, { id: "T" + String(rows.length + 1).padStart(2, "0"), name: form.name.trim(), phone: form.phone, instruments: [form.instrument], branches: [form.branch], joined: "2026-07-14", salaryType: form.salaryType, salary: sal, students: 0, status: "Active" }]);
    setShow(false); setErr(""); setForm({ name: "", phone: "", instrument: "Guitar", branch: scope === "ALL" ? "KN" : scope, salaryType: "Fixed", salary: "20000" });
    toast && toast("Teacher add ho gaye ✔");
  };
  return (
    <div>
      <PageHead title="Teachers" sub="Instrument-wise specialised faculty" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Add teacher</button>} />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Teacher</th><th>Instruments</th><th>Branches</th><th>Students</th><th>Salary Type</th><th>Salary</th><th>Status</th></tr></thead>
          <tbody>{list.map(t => (
            <tr key={t.id}>
              <td><div className="font-semibold">{t.name}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{t.phone} · since {t.joined.slice(0, 4)}</div></td>
              <td>{t.instruments.join(", ")}</td>
              <td className="text-xs">{t.branches.map(bName).join(" + ")}</td>
              <td className="font-semibold">{t.students}</td>
              <td>{t.salaryType}</td>
              <td>{t.salary ? (t.salaryType === "Fixed" ? inr(t.salary) + "/mo" : inr(t.salary) + "/student") : "TBD"}</td>
              <td><Badge text={t.status} tones={["#E5F4EC", "#1E7F4F"]} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="Add Teacher" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
            <Field label="Mobile *"><input className="hb-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" /></Field>
            <Field label="Primary instrument"><select className="hb-input" value={form.instrument} onChange={e => setForm({ ...form, instrument: e.target.value })}>{INSTRUMENTS.map(i => <option key={i}>{i}</option>)}</select></Field>
            <Field label="Branch"><select className="hb-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
            <Field label="Salary type"><select className="hb-input" value={form.salaryType} onChange={e => setForm({ ...form, salaryType: e.target.value })}><option>Fixed</option><option>Per-Student</option></select></Field>
            <Field label={form.salaryType === "Fixed" ? "Monthly salary (₹)" : "Per-student rate (₹)"}><input className="hb-input" type="number" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} /></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Add teacher</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function CoursesPage({ toast }) {
  const [rows, setRows] = useState(COURSES);
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", instrument: "Guitar", level: "Beginner", type: "Group", monthly: "1500", admission: "500", duration: "6 months", perWeek: "2" });
  const save = () => {
    if (!form.name.trim()) { setErr("Course ka naam zaroori hai."); return; }
    const fee = parseInt(form.monthly, 10);
    if (!fee || fee <= 0) { setErr("Valid monthly fee daalein."); return; }
    setRows([...rows, { id: "C" + String(rows.length + 1).padStart(2, "0"), name: form.name.trim(), instrument: form.instrument, level: form.level, type: form.type, monthly: fee, admission: parseInt(form.admission, 10) || 0, duration: form.duration, perWeek: parseInt(form.perWeek, 10) || 2, maxBatch: form.type === "Individual" ? 1 : 8 }]);
    setShow(false); setErr(""); setForm({ name: "", instrument: "Guitar", level: "Beginner", type: "Group", monthly: "1500", admission: "500", duration: "6 months", perWeek: "2" });
    toast && toast("Course add ho gaya ✔");
  };
  return (
    <div>
      <PageHead title="Courses & Instruments" sub="Har instrument ke levels, fees aur class type" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Add course</button>} />
      <div className="hb-card p-3 mb-3 flex flex-wrap gap-2">
        {INSTRUMENTS.map(i => <span key={i} className="hb-badge" style={{ background: "var(--gold-soft)", color: "var(--navy)", padding: "6px 12px" }}><Music2 size={12} style={{ marginRight: 5 }} /> {i}</span>)}
      </div>
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Course</th><th>Instrument</th><th>Level</th><th>Type</th><th>Monthly Fee</th><th>Admission</th><th>Duration</th><th>Classes/wk</th></tr></thead>
          <tbody>{rows.map(c => (
            <tr key={c.id}>
              <td className="font-semibold">{c.name}</td><td>{c.instrument}</td>
              <td><Badge text={c.level} tones={c.level === "Beginner" ? ["#E8EEFB", "#2B4C9B"] : c.level === "Advanced" ? ["#F7EFD8", "#8B6914"] : ["#EDF0F6", "#5A6478"]} /></td>
              <td>{c.type}</td><td className="font-semibold">{inr(c.monthly)}</td><td>{inr(c.admission)}</td><td>{c.duration}</td><td>{c.perWeek}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="Add Course" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Course name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Drums Advanced" /></Field>
            <Field label="Instrument"><select className="hb-input" value={form.instrument} onChange={e => setForm({ ...form, instrument: e.target.value })}>{INSTRUMENTS.map(i => <option key={i}>{i}</option>)}</select></Field>
            <Field label="Level"><select className="hb-input" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></Field>
            <Field label="Class type"><select className="hb-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Group</option><option>Individual</option></select></Field>
            <Field label="Monthly fee (₹) *"><input className="hb-input" type="number" value={form.monthly} onChange={e => setForm({ ...form, monthly: e.target.value })} /></Field>
            <Field label="Admission fee (₹)"><input className="hb-input" type="number" value={form.admission} onChange={e => setForm({ ...form, admission: e.target.value })} /></Field>
            <Field label="Duration"><select className="hb-input" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}><option>3 months</option><option>6 months</option><option>9 months</option><option>12 months</option></select></Field>
            <Field label="Classes / week"><select className="hb-input" value={form.perWeek} onChange={e => setForm({ ...form, perWeek: e.target.value })}><option>1</option><option>2</option><option>3</option></select></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Add course</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function BatchesPage({ scope, toast }) {
  const [rows, setRows] = useState(BATCHES);
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", branch: scope === "ALL" ? "KN" : scope, course: "C01", teacher: "T01", days: "Mon, Wed", time: "17:00–18:00", room: "Room 1", max: "8" });
  const list = rows.filter(b => scope === "ALL" || b.branch === scope);
  const save = () => {
    if (!form.name.trim()) { setErr("Batch ka naam zaroori hai."); return; }
    const fDays = form.days.split(",").map(d => d.trim());
    const clash = rows.find(b => b.time === form.time && b.days.split(",").map(d => d.trim()).some(d => fDays.includes(d)) && (b.teacher === form.teacher || (b.room === form.room && b.branch === form.branch)));
    if (clash) { setErr(`⚠ Conflict: "${clash.name}" (${clash.days} · ${clash.time}) mein same teacher ya room already booked hai.`); return; }
    const course = COURSES.find(c => c.id === form.course) || {};
    setRows([...rows, { id: "B" + String(rows.length + 1).padStart(2, "0"), name: form.name.trim(), branch: form.branch, instrument: course.instrument || "Guitar", course: form.course, teacher: form.teacher, days: form.days, time: form.time, room: form.room, max: parseInt(form.max, 10) || 8, enrolled: 0 }]);
    setShow(false); setErr(""); setForm({ name: "", branch: scope === "ALL" ? "KN" : scope, course: "C01", teacher: "T01", days: "Mon, Wed", time: "17:00–18:00", room: "Room 1", max: "8" });
    toast && toast("Batch create ho gaya ✔ Koi conflict nahi mila");
  };
  return (
    <div>
      <PageHead title="Batches" sub="Conflict-checked: ek teacher / room ek time par ek hi class" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Create batch</button>} />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Batch</th><th>Branch</th><th>Course</th><th>Teacher</th><th>Days</th><th>Time</th><th>Room</th><th>Seats</th></tr></thead>
          <tbody>{list.map(b => (
            <tr key={b.id}>
              <td className="font-semibold">{b.name}</td><td>{bName(b.branch)}</td><td className="text-xs">{cName(b.course)}</td>
              <td>{tName(b.teacher)}</td><td className="text-xs">{b.days}</td><td className="text-xs font-mono">{b.time}</td><td>{b.room}</td>
              <td><Badge text={`${b.enrolled}/${b.max}`} tones={b.enrolled >= b.max ? ["#FBEAE8", "#B3362C"] : ["#E5F4EC", "#1E7F4F"]} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="Create Batch" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Batch name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Guitar Weekend C" /></Field>
            <Field label="Branch"><select className="hb-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
            <Field label="Course"><select className="hb-input" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>{COURSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
            <Field label="Teacher"><select className="hb-input" value={form.teacher} onChange={e => setForm({ ...form, teacher: e.target.value })}>{TEACHERS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></Field>
            <Field label="Days"><select className="hb-input" value={form.days} onChange={e => setForm({ ...form, days: e.target.value })}><option>Mon, Wed</option><option>Tue, Thu</option><option>Mon, Fri</option><option>Wed, Sat</option><option>Tue, Sat</option><option>Mon, Wed, Fri</option><option>Sat</option><option>Sun</option></select></Field>
            <Field label="Time slot"><select className="hb-input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}><option>16:00–17:00</option><option>16:30–17:30</option><option>17:00–18:00</option><option>17:30–18:30</option><option>18:00–19:00</option><option>19:00–20:00</option><option>11:00–13:00</option></select></Field>
            <Field label="Room"><select className="hb-input" value={form.room} onChange={e => setForm({ ...form, room: e.target.value })}><option>Room 1</option><option>Room 2</option><option>Hall</option><option>Studio</option></select></Field>
            <Field label="Max seats"><input className="hb-input" type="number" value={form.max} onChange={e => setForm({ ...form, max: e.target.value })} /></Field>
          </div>
          {err && <div className="text-xs mt-2 p-2 rounded-lg" style={{ color: "var(--bad)", background: "var(--bad-bg)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Create batch</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function TimetablePage({ scope }) {
  const days = ["Tue", "Thu", "Sat", "Sun"];
  const showGuitarKK = scope === "ALL" || scope === "KK";
  const others = BATCHES.filter(b => (scope === "ALL" || b.branch === scope) && b.id !== "B01");
  const Slot = ({ t, sunday }) => (
    <div className="p-2 rounded-lg mb-1.5 flex items-center justify-between" style={{ background: sunday ? "var(--gold-soft)" : "#F7F8FB", borderLeft: "3px solid var(--gold)" }}>
      <span className="text-xs font-mono font-semibold" style={{ color: "var(--navy)" }}>{t}</span>
      <span className="text-xs" style={{ color: "var(--mut)" }}>Guitar · {tName("T01")}</span>
    </div>
  );
  return (
    <div>
      <PageHead title="Weekly Timetable" sub="Guitar Karkunj: Tue/Thu/Sat 9AM–1PM + 3PM–9PM (har batch 1 ghanta) · Sunday 10AM–1PM" />
      {showGuitarKK && (
        <div className="grid md:grid-cols-4 gap-3 mb-4">
          {days.map(d => (
            <div key={d} className="hb-card p-3">
              <div className="hb-display mb-2 pb-2 border-b flex items-center justify-between" style={{ color: "var(--navy)", borderColor: "var(--line)" }}>
                <span>{d}{d === "Tue" ? " · Today" : ""}</span>
                <span className="hb-badge" style={{ background: "var(--gold-soft)", color: "var(--navy)" }}>{d === "Sun" ? GUITAR_KK_SLOTS.sunday.length : GUITAR_KK_SLOTS.morning.length + GUITAR_KK_SLOTS.evening.length} slots</span>
              </div>
              {d === "Sun" ? (
                <>{GUITAR_KK_SLOTS.sunday.map(t => <Slot key={t} t={t} sunday />)}</>
              ) : (
                <>
                  <div className="hb-label">Morning</div>
                  {GUITAR_KK_SLOTS.morning.map(t => <Slot key={t} t={t} />)}
                  <div className="hb-label mt-2">Evening</div>
                  {GUITAR_KK_SLOTS.evening.map(t => <Slot key={t} t={t} />)}
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="hb-card p-4">
        <div className="hb-display mb-2" style={{ color: "var(--navy)" }}>Baaki batches (timing TBD)</div>
        {others.map(b => (
          <div key={b.id} className="flex items-center justify-between py-2 border-b text-sm" style={{ borderColor: "var(--line)" }}>
            <div><span className="font-semibold">{b.name}</span> <span className="text-xs" style={{ color: "var(--mut)" }}>· {tName(b.teacher)}</span></div>
            <Badge text={b.days === "TBD" ? "Timing TBD" : b.days} tones={b.days === "TBD" ? ["#FDF3E2", "#B7791F"] : ["#E5F4EC", "#1E7F4F"]} />
          </div>
        ))}
        <div className="text-xs mt-3" style={{ color: "var(--mut)" }}>Keyboard (teeno branch), Guitar Kamla Nagar & Sastripuram ki timing aate hi yahan grid ban jayega.</div>
      </div>
    </div>
  );
}

function AttendancePage({ students, toast, scope, teacherId }) {
  const batches = BATCHES.filter(b => (scope === "ALL" || b.branch === scope) && (!teacherId || b.teacher === teacherId));
  const [batch, setBatch] = useState(batches[0]?.id || "");
  const [marks, setMarks] = useState({});
  const STATUSES = ["Present", "Absent", "Leave", "Makeup"];
  const kids = students.filter(s => s.batch === batch && s.status === "Active");
  const tone = m => m === "Present" ? ["#E5F4EC", "#1E7F4F"] : m === "Absent" ? ["#FBEAE8", "#B3362C"] : m === "Leave" ? ["#FDF3E2", "#B7791F"] : ["#E8EEFB", "#2B4C9B"];
  return (
    <div>
      <PageHead title="Attendance" sub="Date: 14 July 2026 · batch select karke mark karein" />
      <div className="hb-card p-3 mb-3 flex flex-wrap gap-2 items-center">
        <select className="hb-input w-auto" value={batch} onChange={e => { setBatch(e.target.value); setMarks({}); }}>
          {batches.map(b => <option key={b.id} value={b.id}>{b.name} · {bName(b.branch)} · {b.time}</option>)}
        </select>
        <input type="date" className="hb-input w-auto" defaultValue="2026-07-14" />
        <button className="hb-btn hb-btn-navy ml-auto" onClick={() => { toast(`Attendance saved — ${Object.keys(marks).length}/${kids.length} marked`); }}>
          <CheckCircle2 size={15} /> Save attendance
        </button>
      </div>
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Student</th><th>Overall %</th><th>Mark today</th></tr></thead>
          <tbody>{kids.map(s => (
            <tr key={s.id}>
              <td><div className="font-semibold">{s.name}</div><div className="text-xs font-mono" style={{ color: "var(--mut)" }}>{s.adm}</div></td>
              <td style={{ color: s.attendance >= 75 ? "var(--ok)" : "var(--bad)", fontWeight: 600 }}>{s.attendance}%</td>
              <td>
                <div className="flex flex-wrap gap-1.5">
                  {STATUSES.map(m => (
                    <button key={m} onClick={() => setMarks({ ...marks, [s.id]: m })}
                      className="hb-badge" style={{ cursor: "pointer", padding: "5px 11px", border: "1px solid " + (marks[s.id] === m ? "transparent" : "var(--line)"), background: marks[s.id] === m ? tone(m)[0] : "#fff", color: marks[s.id] === m ? tone(m)[1] : "var(--mut)" }}>
                      {m}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
        {kids.length === 0 && <Empty msg="Is batch mein abhi students nahi hain." />}
      </div>
    </div>
  );
}

function FeesPage({ students, payments, setPayments, setStudents, toast, scope }) {
  const [tab, setTab] = useState("pending");
  const [collect, setCollect] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [amt, setAmt] = useState(""); const [mode, setMode] = useState("UPI"); const [disc, setDisc] = useState("0");

  const pend = students.filter(s => (scope === "ALL" || s.branch === scope) && s.feeStatus !== "Paid" && s.status === "Active");
  const pays = payments.filter(p => scope === "ALL" || p.branch === scope);

  const openCollect = s => {
    const batch = BATCHES.find(b => b.id === s.batch);
    const course = COURSES.find(c => c.id === (batch || {}).course);
    setAmt(String((course || { monthly: 1500 }).monthly)); setDisc("0"); setMode("UPI"); setCollect(s);
  };
  const confirmCollect = () => {
    const total = Number(amt) || 0, d = Number(disc) || 0;
    if (total <= 0) { toast("Amount valid nahi hai"); return; }
    const rec = "HB-REC-" + (1041 + payments.length); // seed 1041–1120, naye 1121 se
    const p = { rec, student: collect.id, branch: collect.branch, month: "July 2026", total, discount: d, paid: total - d, balance: 0, date: "2026-07-14", mode, by: "You" };
    setPayments([...payments, p]);
    setStudents(students.map(s => s.id === collect.id ? { ...s, feeStatus: "Paid" } : s));
    setCollect(null); setReceipt(p);
    toast(`Payment received ✔ Receipt ${rec} generated`);
  };
  const rs = receipt ? students.find(s => s.id === receipt.student) : null;

  return (
    <div>
      <PageHead title="Fees & Payments" sub="Collection, pending list aur receipts — sab ek jagah"
        action={<button className="hb-btn hb-btn-ghost" onClick={() => downloadCSV("fee-collection-july-2026", [["Receipt", "Student", "Branch", "Month", "Paid", "Mode", "Date"], ...pays.map(p => [p.rec, (students.find(s => s.id === p.student) || {}).name, bName(p.branch), p.month, p.paid, p.mode, p.date])])}><Download size={15} /> Export CSV</button>} />
      <div className="flex gap-2 mb-3">
        {[["pending", `Pending / Overdue (${pend.length})`], ["history", `Payment History (${pays.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} className="hb-btn" style={tab === k ? { background: "var(--navy)", color: "#fff" } : { background: "#fff", border: "1px solid var(--line)" }}>{l}</button>
        ))}
      </div>

      {tab === "pending" ? (
        <div className="hb-card overflow-x-auto">
          <table className="hb-table">
            <thead><tr><th>Student</th><th>Branch</th><th>Instrument</th><th>Status</th><th>Parent Contact</th><th></th></tr></thead>
            <tbody>{pend.map(s => (
              <tr key={s.id}>
                <td><div className="font-semibold">{s.name}</div><div className="text-xs font-mono" style={{ color: "var(--mut)" }}>{s.adm}</div></td>
                <td>{bName(s.branch)}</td><td>{s.instrument}</td>
                <td><Badge text={s.feeStatus} tones={feeTone(s.feeStatus)} /></td>
                <td className="text-xs">{s.parent} · {s.phone}</td>
                <td><button className="hb-btn hb-btn-gold" onClick={() => openCollect(s)}><IndianRupee size={14} /> Collect</button></td>
              </tr>
            ))}</tbody>
          </table>
          {pend.length === 0 && <Empty msg="Shabash! Koi pending fee nahi hai 🎉" />}
        </div>
      ) : (
        <div className="hb-card overflow-x-auto">
          <table className="hb-table">
            <thead><tr><th>Receipt No.</th><th>Student</th><th>Month</th><th>Amount</th><th>Discount</th><th>Mode</th><th>Date</th><th></th></tr></thead>
            <tbody>{[...pays].reverse().map(p => (
              <tr key={p.rec}>
                <td className="font-mono text-xs font-semibold" style={{ color: "var(--navy)" }}>{p.rec}</td>
                <td>{(students.find(s => s.id === p.student) || {}).name}</td>
                <td>{p.month}</td><td className="font-semibold" style={{ color: "var(--ok)" }}>{inr(p.paid)}</td>
                <td>{p.discount ? inr(p.discount) : "—"}</td><td>{p.mode}</td><td className="text-xs">{p.date}</td>
                <td><button className="hb-btn hb-btn-ghost" onClick={() => setReceipt(p)}><ReceiptIcon size={14} /> Receipt</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {collect && (
        <Modal title={`Collect Fee — ${collect.name}`} onClose={() => setCollect(null)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Billing month"><input className="hb-input" defaultValue="July 2026" /></Field>
            <Field label="Total fee (₹)"><input className="hb-input" value={amt} onChange={e => setAmt(e.target.value)} /></Field>
            <Field label="Discount (₹)"><input className="hb-input" value={disc} onChange={e => setDisc(e.target.value)} /></Field>
            <Field label="Payment mode"><select className="hb-input" value={mode} onChange={e => setMode(e.target.value)}>{["Cash", "UPI", "Card", "Bank Transfer"].map(m => <option key={m}>{m}</option>)}</select></Field>
          </div>
          <div className="mt-4 p-3 rounded-xl flex justify-between items-center" style={{ background: "var(--gold-soft)" }}>
            <span className="text-sm font-semibold">Net payable</span>
            <span className="hb-display text-xl" style={{ color: "var(--navy)" }}>{inr((Number(amt) || 0) - (Number(disc) || 0))}</span>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setCollect(null)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={confirmCollect}><CheckCircle2 size={15} /> Confirm & generate receipt</button>
          </div>
        </Modal>
      )}

      {receipt && rs && (
        <Modal title="Fee Receipt" onClose={() => setReceipt(null)}>
          <div className="border rounded-xl p-5" style={{ borderColor: "var(--gold)" }}>
            <div className="flex justify-between items-start pb-3 border-b" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="hb-display text-xl" style={{ color: "var(--navy)" }}>Heartbeat Musicals</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{BRANCHES.find(b => b.id === receipt.branch)?.address}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{BRANCHES.find(b => b.id === receipt.branch)?.phone}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold" style={{ color: "var(--gold)" }}>{receipt.rec}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{receipt.date}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm py-4">
              <div style={{ color: "var(--mut)" }}>Student</div><div className="font-semibold text-right">{rs.name} ({rs.adm})</div>
              <div style={{ color: "var(--mut)" }}>Billing month</div><div className="text-right">{receipt.month}</div>
              <div style={{ color: "var(--mut)" }}>Total fee</div><div className="text-right">{inr(receipt.total)}</div>
              <div style={{ color: "var(--mut)" }}>Discount</div><div className="text-right">{inr(receipt.discount)}</div>
              <div style={{ color: "var(--mut)" }}>Payment mode</div><div className="text-right">{receipt.mode}</div>
              <div style={{ color: "var(--mut)" }}>Collected by</div><div className="text-right">{receipt.by}</div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: "var(--navy)", color: "#fff" }}>
              <span className="text-sm">Amount received</span>
              <span className="hb-display text-xl" style={{ color: "var(--gold-2)" }}>{inr(receipt.paid)}</span>
            </div>
            <div className="text-center text-xs mt-3" style={{ color: "var(--mut)" }}>Music is the heartbeat of life 🎵 · Thank you!</div>
          </div>
          <div className="flex justify-end gap-2 mt-4 no-print">
            <button className="hb-btn hb-btn-ghost" onClick={() => window.print()}><Printer size={15} /> Print / Save PDF</button>
            <button className="hb-btn hb-btn-navy" onClick={() => setReceipt(null)}>Done</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SalariesPage({ toast, scope }) {
  const [rows, setRows] = useState(seedSalaries);
  const list = rows.filter(r => scope === "ALL" || r.branch === scope);
  if (!list.length) return (
    <div>
      <PageHead title="Teacher Salaries" sub="Salary data pending" />
      <div className="hb-card p-6 text-center">
        <Wallet size={26} style={{ color: "var(--gold)", margin: "0 auto 10px" }} />
        <div className="hb-display text-lg" style={{ color: "var(--navy)" }}>Salary data abhi nahi aaya</div>
        <div className="text-sm mt-2" style={{ color: "var(--mut)" }}>Chaaron teachers ki salary details milte hi yahan payroll cycle ban jayega:</div>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {TEACHERS.map(t => <span key={t.id} className="hb-badge" style={{ background: "var(--gold-soft)", color: "var(--navy)", padding: "6px 12px" }}>{t.name} · {t.instruments.join(", ")}</span>)}
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <PageHead title="Teacher Salaries" sub="June 2026 cycle · fixed aur per-student dono types" />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Teacher</th><th>Branch</th><th>Type</th><th>Base</th><th>Bonus</th><th>Deduction</th><th>Payable</th><th>Status</th><th></th></tr></thead>
          <tbody>{list.map(r => {
            const t = TEACHERS.find(x => x.id === r.teacher) || { name: r.teacher, instruments: [], students: 0, salary: 0 };
            const payable = r.base + r.bonus - r.deduction;
            return (
              <tr key={r.id}>
                <td><div className="font-semibold">{t.name}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{t.instruments.join(", ")}</div></td>
                <td>{bName(r.branch)}</td>
                <td className="text-xs">{r.type}{r.type === "Per-Student" ? ` (${t.students} × ${inr(t.salary)})` : ""}</td>
                <td>{inr(r.base)}</td><td>{r.bonus ? inr(r.bonus) : "—"}</td><td>{r.deduction ? inr(r.deduction) : "—"}</td>
                <td className="font-bold" style={{ color: "var(--navy)" }}>{inr(payable)}</td>
                <td><Badge text={r.status} tones={r.status === "Paid" ? ["#E5F4EC", "#1E7F4F"] : ["#FDF3E2", "#B7791F"]} /></td>
                <td>{r.status === "Pending" && <button className="hb-btn hb-btn-gold" onClick={() => { setRows(rows.map(x => x.id === r.id ? { ...x, status: "Paid", date: "2026-07-14", mode: "Bank Transfer" } : x)); toast(`${t.name} ki salary paid mark ho gayi ✔`); }}>Mark paid</button>}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsPage({ products, setProducts, toast, scope }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("");
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", brand: "", cat: "Guitars", branch: scope === "ALL" ? "KN" : scope, cost: "", price: "", stock: "1", minStock: "2" });
  const cats = [...new Set(products.map(p => p.cat))];
  const list = products.filter(p => (scope === "ALL" || p.branch === scope) && (!cat || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  const save = () => {
    if (!form.name.trim()) { setErr("Product ka naam zaroori hai."); return; }
    const cost = parseInt(form.cost, 10), price = parseInt(form.price, 10);
    if (!cost || cost <= 0 || !price || price <= 0) { setErr("Valid cost aur selling price daalein."); return; }
    if (price < cost) { setErr("Selling price cost se kam nahi ho sakta."); return; }
    setProducts([...products, { id: "P" + String(products.length + 1).padStart(2, "0"), name: form.name.trim(), cat: form.cat, brand: form.brand.trim() || "—", cost, price, branch: form.branch, stock: parseInt(form.stock, 10) || 0, minStock: parseInt(form.minStock, 10) || 2, active: true }]);
    setShow(false); setErr(""); setForm({ name: "", brand: "", cat: "Guitars", branch: scope === "ALL" ? "KN" : scope, cost: "", price: "", stock: "1", minStock: "2" });
    toast("Product add ho gaya ✔ Inventory update");
  };
  return (
    <div>
      <PageHead title="Shop Products & Inventory" sub="Branch-wise stock, low-stock alerts aur valuation"
        action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Add product</button>} />
      <div className="grid grid-cols-3 gap-3 mb-3">
        <Stat icon={Package} label="Total SKUs" value={list.length} />
        <Stat icon={AlertTriangle} label="Low stock" value={list.filter(p => p.stock <= p.minStock).length} />
        <Stat icon={IndianRupee} label="Stock valuation" value={inr(list.reduce((a, p) => a + p.cost * p.stock, 0))} gold />
      </div>
      <div className="hb-card p-3 mb-3 flex flex-wrap gap-2">
        <div className="hb-grow">
          <Search size={15} className="absolute left-3 top-2.5" style={{ color: "var(--mut)" }} />
          <input className="hb-input pl-9" placeholder="Product ya brand search karein…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="hb-input w-auto" value={cat} onChange={e => setCat(e.target.value)}><option value="">All categories</option>{cats.map(c => <option key={c}>{c}</option>)}</select>
      </div>
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Product</th><th>Category</th><th>Branch</th><th>Cost</th><th>Selling</th><th>Margin</th><th>Stock</th></tr></thead>
          <tbody>{list.map(p => (
            <tr key={p.id}>
              <td><div className="font-semibold">{p.name}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{p.brand} · {p.id}</div></td>
              <td>{p.cat}</td><td>{bName(p.branch)}</td>
              <td>{inr(p.cost)}</td><td className="font-semibold">{inr(p.price)}</td>
              <td className="text-xs" style={{ color: "var(--ok)" }}>{Math.round((p.price - p.cost) / p.cost * 100)}%</td>
              <td><Badge text={p.stock + (p.stock <= p.minStock ? " ⚠ low" : "")} tones={p.stock <= p.minStock ? ["#FBEAE8", "#B3362C"] : ["#E5F4EC", "#1E7F4F"]} /></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="Add Product" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Product name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fender CD-60 Guitar" /></Field>
            <Field label="Brand"><input className="hb-input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></Field>
            <Field label="Category"><select className="hb-input" value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })}><option>Guitars</option><option>Keyboards</option><option>Percussion</option><option>Wind</option><option>Strings</option><option>Accessories</option></select></Field>
            <Field label="Branch"><select className="hb-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
            <Field label="Cost price (₹) *"><input className="hb-input" type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} /></Field>
            <Field label="Selling price (₹) *"><input className="hb-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></Field>
            <Field label="Opening stock"><input className="hb-input" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></Field>
            <Field label="Min stock alert"><input className="hb-input" type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} /></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Add product</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SuppliersPage({ toast }) {
  const [rows, setRows] = useState(SUPPLIERS);
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", contact: "", phone: "", gst: "" });
  const save = () => {
    if (!form.name.trim()) { setErr("Supplier ka naam zaroori hai."); return; }
    setRows([...rows, { id: "SUP" + (rows.length + 1), name: form.name.trim(), contact: form.contact.trim() || "—", phone: form.phone || "—", gst: form.gst.trim().toUpperCase() || "—", pending: 0 }]);
    setShow(false); setErr(""); setForm({ name: "", contact: "", phone: "", gst: "" });
    toast && toast("Supplier add ho gaya ✔");
  };
  return (
    <div>
      <PageHead title="Suppliers" sub="Purchase partners aur pending payments" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> Add supplier</button>} />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Supplier</th><th>Contact Person</th><th>Phone</th><th>GST No.</th><th>Pending Payment</th></tr></thead>
          <tbody>{rows.map(s => (
            <tr key={s.id}>
              <td className="font-semibold">{s.name}</td><td>{s.contact}</td><td>{s.phone}</td>
              <td className="font-mono text-xs">{s.gst}</td>
              <td>{s.pending ? <Badge text={inr(s.pending) + " due"} tones={["#FDF3E2", "#B7791F"]} /> : <Badge text="Clear" tones={["#E5F4EC", "#1E7F4F"]} />}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="Add Supplier" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Supplier name *"><input className="hb-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Melody House, Mumbai" /></Field>
            <Field label="Contact person"><input className="hb-input" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} /></Field>
            <Field label="Phone"><input className="hb-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Field>
            <Field label="GST number"><input className="hb-input" value={form.gst} onChange={e => setForm({ ...form, gst: e.target.value })} placeholder="15-digit GSTIN" /></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Add supplier</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function SalesPage({ sales, setSales, products, setProducts, toast, scope }) {
  const [show, setShow] = useState(false); const [invoice, setInvoice] = useState(null);
  const [cust, setCust] = useState(""); const [phone, setPhone] = useState("");
  const [cart, setCart] = useState([]); const [mode, setMode] = useState("UPI"); const [err, setErr] = useState("");
  const list = sales.filter(s => scope === "ALL" || s.branch === scope);

  const addToCart = pid => {
    const ex = cart.find(c => c.id === pid);
    setCart(ex ? cart.map(c => c.id === pid ? { ...c, qty: c.qty + 1 } : c) : [...cart, { id: pid, qty: 1 }]);
  };
  const total = cart.reduce((a, c) => a + ((products.find(p => p.id === c.id) || {}).price || 0) * c.qty, 0);
  const complete = () => {
    if (!cust.trim() || cart.length === 0) { setErr("Customer name aur kam se kam ek product zaroori hai."); return; }
    const inv = "HB-INV-" + (2201 + sales.length);
    const items = cart.map(c => `${((products.find(p => p.id === c.id) || {}).name || "Item").split(" ").slice(0, 2).join(" ")} ×${c.qty}`).join(", ");
    const sale = { inv, customer: cust, phone, branch: scope === "ALL" ? "KN" : scope, items, amount: total, mode, status: "Paid", by: "You", date: "2026-07-14" };
    setSales([...sales, sale]);
    setProducts(products.map(p => { const c = cart.find(x => x.id === p.id); return c ? { ...p, stock: Math.max(0, p.stock - c.qty) } : p; }));
    setShow(false); setCart([]); setCust(""); setPhone(""); setErr("");
    setInvoice(sale); toast(`Sale complete ✔ Invoice ${inv} · stock updated`);
  };
  return (
    <div>
      <PageHead title="Shop Sales & Billing" sub="POS-style billing with auto invoice number aur stock deduction"
        action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> New sale</button>} />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Invoice</th><th>Customer</th><th>Branch</th><th>Items</th><th>Amount</th><th>Mode</th><th>Status</th><th>Date</th></tr></thead>
          <tbody>{[...list].reverse().map(s => (
            <tr key={s.inv} className="cursor-pointer" onClick={() => setInvoice(s)}>
              <td className="font-mono text-xs font-semibold" style={{ color: "var(--navy)" }}>{s.inv}</td>
              <td><div className="font-semibold">{s.customer}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{s.phone}</div></td>
              <td>{bName(s.branch)}</td><td className="text-xs">{s.items}</td>
              <td className="font-bold">{inr(s.amount)}</td><td>{s.mode}</td>
              <td><Badge text={s.status} tones={s.status === "Paid" ? ["#E5F4EC", "#1E7F4F"] : ["#FDF3E2", "#B7791F"]} /></td>
              <td className="text-xs">{s.date}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>

      {show && (
        <Modal title="New Sale" onClose={() => setShow(false)} wide>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <Field label="Customer name *"><input className="hb-input" value={cust} onChange={e => setCust(e.target.value)} /></Field>
            <Field label="Mobile"><input className="hb-input" value={phone} onChange={e => setPhone(e.target.value)} /></Field>
          </div>
          <Field label="Tap products to add">
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-1">
              {products.filter(p => p.stock > 0).map(p => (
                <button key={p.id} onClick={() => addToCart(p.id)} className="hb-badge" style={{ cursor: "pointer", background: "#F7F8FB", color: "var(--ink)", border: "1px solid var(--line)", padding: "6px 10px" }}>
                  {p.name.split(" ").slice(0, 3).join(" ")} · {inr(p.price)}
                </button>
              ))}
            </div>
          </Field>
          {cart.length > 0 && (
            <div className="mt-3 border rounded-xl p-3" style={{ borderColor: "var(--line)" }}>
              {cart.map(c => {
                const p = products.find(x => x.id === c.id);
                return (
                  <div key={c.id} className="flex justify-between items-center py-1.5 text-sm">
                    <span>{p.name} <b>×{c.qty}</b></span>
                    <span className="flex items-center gap-3"><b>{inr(p.price * c.qty)}</b>
                      <button onClick={() => setCart(cart.filter(x => x.id !== c.id))}><X size={14} style={{ color: "var(--bad)" }} /></button></span>
                  </div>
                );
              })}
              <div className="flex justify-between items-center pt-2 mt-1 border-t" style={{ borderColor: "var(--line)" }}>
                <select className="hb-input w-auto" value={mode} onChange={e => setMode(e.target.value)}>{["Cash", "UPI", "Card", "Bank Transfer"].map(m => <option key={m}>{m}</option>)}</select>
                <div className="hb-display text-xl" style={{ color: "var(--navy)" }}>{inr(total)}</div>
              </div>
            </div>
          )}
          {err && <div className="text-xs mt-2 font-semibold" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={complete}><CheckCircle2 size={15} /> Complete sale</button>
          </div>
        </Modal>
      )}

      {invoice && (
        <Modal title="Tax Invoice" onClose={() => setInvoice(null)}>
          <div className="border rounded-xl p-5" style={{ borderColor: "var(--gold)" }}>
            <div className="flex justify-between pb-3 border-b" style={{ borderColor: "var(--line)" }}>
              <div>
                <div className="hb-display text-xl" style={{ color: "var(--navy)" }}>Heartbeat Musicals — Shop</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{BRANCHES.find(b => b.id === invoice.branch)?.address}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold" style={{ color: "var(--gold)" }}>{invoice.inv}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{invoice.date}</div>
              </div>
            </div>
            <div className="text-sm py-3 space-y-1.5">
              <div><span style={{ color: "var(--mut)" }}>Customer: </span><b>{invoice.customer}</b> {invoice.phone && `· ${invoice.phone}`}</div>
              <div><span style={{ color: "var(--mut)" }}>Items: </span>{invoice.items}</div>
              <div><span style={{ color: "var(--mut)" }}>Payment: </span>{invoice.mode} · {invoice.status}</div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: "var(--navy)", color: "#fff" }}>
              <span className="text-sm">Grand total (incl. tax)</span>
              <span className="hb-display text-xl" style={{ color: "var(--gold-2)" }}>{inr(invoice.amount)}</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 no-print">
            <button className="hb-btn hb-btn-ghost" onClick={() => window.print()}><Printer size={15} /> Print invoice</button>
            <button className="hb-btn hb-btn-navy" onClick={() => setInvoice(null)}>Done</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function RepairsPage({ repairs, setRepairs, toast, scope }) {
  const FLOW = ["Pending", "In Progress", "Ready", "Delivered"];
  const [show, setShow] = useState(false); const [err, setErr] = useState("");
  const [form, setForm] = useState({ customer: "", phone: "", instrument: "", brand: "", problem: "", est: "", advance: "0", tech: "", due: "2026-07-25", branch: scope === "ALL" ? "KN" : scope });
  const list = repairs.filter(r => scope === "ALL" || r.branch === scope);
  const advance = r => FLOW[Math.min(FLOW.indexOf(r.status) + 1, FLOW.length - 1)];
  const save = () => {
    if (!form.customer.trim() || form.phone.replace(/\D/g, "").length < 10) { setErr("Customer ka naam aur valid 10-digit mobile zaroori hai."); return; }
    if (!form.instrument.trim() || !form.problem.trim()) { setErr("Instrument aur problem description zaroori hai."); return; }
    const est = parseInt(form.est, 10);
    if (!est || est <= 0) { setErr("Valid estimate amount daalein."); return; }
    const nextNum = Math.max(...repairs.map(r => parseInt(r.job.split("-")[2], 10)), 100) + 1;
    setRepairs([...repairs, { job: "HB-RP-" + nextNum, customer: form.customer.trim(), phone: form.phone, instrument: form.instrument.trim(), brand: form.brand.trim() || "—", problem: form.problem.trim(), est, advance: parseInt(form.advance, 10) || 0, tech: form.tech.trim() || "To assign", received: "2026-07-14", due: form.due, status: "Pending", branch: form.branch }]);
    setShow(false); setErr(""); setForm({ customer: "", phone: "", instrument: "", brand: "", problem: "", est: "", advance: "0", tech: "", due: "2026-07-25", branch: scope === "ALL" ? "KN" : scope });
    toast(`Repair job HB-RP-${nextNum} create ho gaya ✔`);
  };
  return (
    <div>
      <PageHead title="Repairs & Service" sub="Instrument repair jobs — status workflow ke saath" action={<button className="hb-btn hb-btn-gold" onClick={() => setShow(true)}><Plus size={15} /> New repair job</button>} />
      <div className="hb-card overflow-x-auto">
        <table className="hb-table">
          <thead><tr><th>Job No.</th><th>Customer</th><th>Instrument</th><th>Problem</th><th>Estimate</th><th>Advance</th><th>Technician</th><th>Due</th><th>Status</th><th></th></tr></thead>
          <tbody>{list.map(r => (
            <tr key={r.job}>
              <td className="font-mono text-xs font-semibold" style={{ color: "var(--navy)" }}>{r.job}</td>
              <td><div className="font-semibold">{r.customer}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{r.phone}</div></td>
              <td>{r.instrument}<div className="text-xs" style={{ color: "var(--mut)" }}>{r.brand}</div></td>
              <td className="text-xs hb-ellipsis">{r.problem}</td>
              <td>{inr(r.est)}</td><td>{r.advance ? inr(r.advance) : "—"}</td>
              <td className="text-xs">{r.tech}</td><td className="text-xs">{r.due}</td>
              <td><Badge text={r.status} tones={repTone(r.status)} /></td>
              <td>{r.status !== "Delivered" && r.status !== "Cancelled" &&
                <button className="hb-btn hb-btn-ghost" onClick={() => { setRepairs(repairs.map(x => x.job === r.job ? { ...x, status: advance(r) } : x)); toast(`${r.job} → ${advance(r)}${advance(r) === "Ready" ? " · customer ko notify karein" : ""}`); }}>→ {advance(r)}</button>}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {show && (
        <Modal title="New Repair Job" onClose={() => setShow(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Customer name *"><input className="hb-input" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })} /></Field>
            <Field label="Mobile *"><input className="hb-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" /></Field>
            <Field label="Instrument *"><input className="hb-input" value={form.instrument} onChange={e => setForm({ ...form, instrument: e.target.value })} placeholder="e.g. Acoustic Guitar" /></Field>
            <Field label="Brand / model"><input className="hb-input" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></Field>
          </div>
          <div className="mt-3"><Field label="Problem description *"><input className="hb-input" value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} placeholder="e.g. String buzz, tuning peg loose" /></Field></div>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Field label="Estimate (₹) *"><input className="hb-input" type="number" value={form.est} onChange={e => setForm({ ...form, est: e.target.value })} /></Field>
            <Field label="Advance received (₹)"><input className="hb-input" type="number" value={form.advance} onChange={e => setForm({ ...form, advance: e.target.value })} /></Field>
            <Field label="Technician"><input className="hb-input" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} placeholder="Blank = to assign" /></Field>
            <Field label="Due date"><input className="hb-input" type="date" value={form.due} onChange={e => setForm({ ...form, due: e.target.value })} /></Field>
            <Field label="Branch"><select className="hb-input" value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })}>{BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></Field>
          </div>
          {err && <div className="text-xs mt-2" style={{ color: "var(--bad)" }}>{err}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button className="hb-btn hb-btn-ghost" onClick={() => setShow(false)}>Cancel</button>
            <button className="hb-btn hb-btn-gold" onClick={save}><Plus size={15} /> Create job</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ReportsPage({ students, payments, sales, products }) {
  const reports = [
    ["Branch-wise students", ["Branch", "Students"], BRANCHES.map(b => [b.name, students.filter(s => s.branch === b.id).length])],
    ["Instrument-wise students", ["Instrument", "Students"], INSTRUMENTS.map(i => [i, students.filter(s => s.instrument === i).length]).filter(r => r[1] > 0)],
    ["Fee collection (July)", ["Receipt", "Student", "Amount", "Mode"], payments.map(p => [p.rec, (students.find(s => s.id === p.student) || {}).name, p.paid, p.mode])],
    ["Pending / overdue fees", ["Student", "Branch", "Status"], students.filter(s => s.feeStatus !== "Paid" && s.status === "Active").map(s => [s.name, bName(s.branch), s.feeStatus])],
    ["Shop sales (July)", ["Invoice", "Customer", "Amount"], sales.map(s => [s.inv, s.customer, s.amount])],
    ["Low-stock products", ["Product", "Branch", "Stock", "Min"], products.filter(p => p.stock <= p.minStock).map(p => [p.name, bName(p.branch), p.stock, p.minStock])],
    ["Teacher salary (June)", ["Teacher", "Payable", "Status"], seedSalaries.map(r => [tName(r.teacher), r.base + r.bonus - r.deduction, r.status])],
    ["Stock valuation", ["Product", "Qty", "Value"], products.map(p => [p.name, p.stock, p.cost * p.stock])],
  ];
  const totalFee = payments.reduce((a, p) => a + p.paid, 0);
  const totalSales = sales.filter(s => s.status === "Paid").reduce((a, s) => a + s.amount, 0);
  return (
    <div>
      <PageHead title="Reports" sub="Har report CSV mein download hoti hai · PDF ke liye print use karein" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
        <Stat icon={IndianRupee} label="Fee income (July)" value={inr(totalFee)} gold />
        <Stat icon={ShoppingCart} label="Shop income (July)" value={inr(totalSales)} gold />
        <Stat icon={BarChart3} label="Combined income" value={inr(totalFee + totalSales)} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {reports.map(([name, head, rows]) => (
          <div key={name} className="hb-card p-4 flex flex-col">
            <div className="font-semibold text-sm mb-1">{name}</div>
            <div className="text-xs mb-3" style={{ color: "var(--mut)" }}>{rows.length} rows</div>
            <button className="hb-btn hb-btn-ghost mt-auto justify-center" onClick={() => downloadCSV(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), [head, ...rows])}>
              <Download size={14} /> Download CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsPage() {
  const toneMap = { ok: ["#E5F4EC", "#1E7F4F"], warn: ["#FDF3E2", "#B7791F"], bad: ["#FBEAE8", "#B3362C"] };
  return (
    <div>
      <PageHead title="Notifications" sub="WhatsApp / SMS integration ke liye system ready hai" />
      <div className="hb-card divide-y" style={{ borderColor: "var(--line)" }}>
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-4">
            <span className="hb-badge mt-0.5 shrink-0" style={{ background: toneMap[n.tone][0], color: toneMap[n.tone][1] }}>{n.t}</span>
            <div className="flex-1 text-sm">{n.d}</div>
            <div className="text-xs shrink-0" style={{ color: "var(--mut)" }}>{n.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage() {
  const roles = [
    ["Super Admin / Owner", "Sab branches, sab modules — full access", "Gaurav (Owner)"],
    ["Branch Manager", "Sirf apni branch ka data aur staff", "Vikas, Ritu, Amit"],
    ["Receptionist", "Admissions, fees, attendance, receipts", "2 users"],
    ["Teacher", "Apne students, batches, attendance, progress notes", "8 users"],
    ["Shop Staff", "Products, stock, sales, repairs, invoices", "3 users"],
    ["Student / Parent", "Apna schedule, fees, attendance, receipts (read-only)", "15 users"],
  ];
  return (
    <div>
      <PageHead title="Users, Roles & Settings" sub="Role-based access control — branch isolation built-in" />
      <div className="hb-card overflow-x-auto mb-3">
        <table className="hb-table">
          <thead><tr><th>Role</th><th>Permissions</th><th>Users</th></tr></thead>
          <tbody>{roles.map(r => <tr key={r[0]}><td className="font-semibold">{r[0]}</td><td className="text-xs">{r[1]}</td><td className="text-xs">{r[2]}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="hb-card p-4 text-sm space-y-2">
        <div className="hb-display" style={{ color: "var(--navy)" }}>Business rules (enforced)</div>
        {["Ek branch ka data doosri branch ke unauthorised users ko nahi dikhta", "Har payment par unique receipt number, har sale par unique invoice number", "Fees, attendance aur sales records soft-delete hote hain — normal staff permanently delete nahi kar sakta", "Important actions audit log mein record hote hain", "Students multiple courses mein enroll ho sakte hain; teachers multiple branches par kaam kar sakte hain"].map((r, i) => (
          <div key={i} className="flex gap-2 items-start"><CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} /><span>{r}</span></div>
        ))}
      </div>
    </div>
  );
}

function StudentPortal({ students, payments }) {
  const me = students[0];
  const batch = BATCHES.find(b => b.id === me.batch) || { name: "—", course: "", days: "—", time: "—", room: "—", branch: me.branch };
  const myPays = payments.filter(p => p.student === me.id);
  return (
    <div>
      <PageHead title={`Namaste, ${me.name.split(" ")[0]} 👋`} sub={`${me.adm} · ${me.instrument} · ${bName(me.branch)}`} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <Stat icon={Music2} label="Course" value={me.instrument} sub={cName(batch.course)} />
        <Stat icon={GraduationCap} label="Teacher" value={tName(me.teacher)} />
        <Stat icon={ClipboardCheck} label="Attendance" value={me.attendance ? me.attendance + "%" : "—"} sub={me.attendance ? (me.attendance >= 75 ? "Great going!" : "Improve karein") : "Data aana baaki hai"} gold />
        <Stat icon={IndianRupee} label="Fee status" value={me.feeStatus} sub="July 2026" />
      </div>
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="hb-card p-4">
          <div className="hb-display mb-2" style={{ color: "var(--navy)" }}>My Class Schedule</div>
          <div className="p-3 rounded-lg" style={{ background: "var(--gold-soft)", borderLeft: "3px solid var(--gold)" }}>
            <div className="font-semibold text-sm">{batch.name}</div>
            <div className="text-xs mt-1" style={{ color: "var(--mut)" }}>{batch.days} · {batch.time} · {batch.room}, {bName(batch.branch)}</div>
          </div>
          <div className="hb-display mt-4 mb-2" style={{ color: "var(--navy)" }}>Progress Notes</div>
          <div className="text-sm" style={{ color: "var(--mut)" }}>"Chord transitions improve ho rahe hain — is week barre chords par focus. Riyaz roz 20 minute." — {tName(me.teacher)}</div>
        </div>
        <div className="hb-card p-4">
          <div className="hb-display mb-2" style={{ color: "var(--navy)" }}>Payment History</div>
          {myPays.length === 0 ? <Empty msg="Abhi tak koi payment record nahi." /> : myPays.map(p => (
            <div key={p.rec} className="flex justify-between py-2 border-b last:border-0 text-sm" style={{ borderColor: "var(--line)" }}>
              <div><div className="font-semibold">{p.month}</div><div className="text-xs font-mono" style={{ color: "var(--mut)" }}>{p.rec}</div></div>
              <div className="text-right"><div className="font-bold" style={{ color: "var(--ok)" }}>{inr(p.paid)}</div><div className="text-xs" style={{ color: "var(--mut)" }}>{p.mode} · {p.date}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= APP SHELL ================= */
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { key: "branches", label: "Branches", icon: Building2, group: "Academy" },
  { key: "students", label: "Students", icon: Users, group: "Academy" },
  { key: "teachers", label: "Teachers", icon: GraduationCap, group: "Academy" },
  { key: "courses", label: "Courses & Instruments", icon: BookOpen, group: "Academy" },
  { key: "batches", label: "Batches", icon: Music2, group: "Academy" },
  { key: "timetable", label: "Timetable", icon: CalendarDays, group: "Academy" },
  { key: "attendance", label: "Attendance", icon: ClipboardCheck, group: "Academy" },
  { key: "fees", label: "Fees & Receipts", icon: IndianRupee, group: "Finance" },
  { key: "salaries", label: "Teacher Salaries", icon: Wallet, group: "Finance" },
  { key: "reports", label: "Reports", icon: BarChart3, group: "Finance" },
  { key: "products", label: "Shop Inventory", icon: Package, group: "Shop" },
  { key: "sales", label: "Shop Sales", icon: ShoppingCart, group: "Shop" },
  { key: "suppliers", label: "Suppliers", icon: Building2, group: "Shop" },
  { key: "repairs", label: "Repairs", icon: Wrench, group: "Shop" },
  { key: "notifications", label: "Notifications", icon: Bell, group: "System" },
  { key: "settings", label: "Users & Settings", icon: Settings, group: "System" },
];
const NAV_GROUPS = ["Overview", "Academy", "Finance", "Shop", "System"];

const ROLES = {
  owner: { label: "Super Admin / Owner", scope: "ALL", pages: NAV.map(n => n.key), start: "dashboard", who: "Gaurav ji — full access, all branches" },
  manager: { label: "Branch Manager", scope: "KK", pages: ["dashboard", "students", "teachers", "batches", "timetable", "attendance", "fees", "salaries", "products", "sales", "repairs", "reports", "notifications"], start: "dashboard", who: "Karkunj branch only" },
  reception: { label: "Receptionist", scope: "KK", pages: ["students", "attendance", "timetable", "fees", "notifications"], start: "students", who: "Admissions, fees, attendance, receipts" },
  teacher: { label: "Teacher", scope: "KK", pages: ["timetable", "attendance"], start: "attendance", who: "Saurab Kashyap — apne students & batches", teacherId: "T01" },
  shop: { label: "Shop Staff", scope: "KK", pages: ["products", "sales", "suppliers", "repairs"], start: "sales", who: "Products, billing, repairs" },
  student: { label: "Student / Parent", scope: "KK", pages: ["portal"], start: "portal", who: "Pradyumn (Guitar) — read-only portal" },
};

function Login({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "radial-gradient(1100px 600px at 20% -10%, #22376B 0%, var(--navy) 55%)" }}>
      <div className="w-full" style={{ maxWidth: 430 }}>
        <div className="text-center mb-6">
          <svg width="220" height="44" viewBox="0 0 220 44" className="mx-auto">
            <path className="hb-pulse" d="M0 22 H60 L70 8 L82 36 L92 14 L100 22 H130" />
            <circle cx="140" cy="22" r="3.5" fill="var(--gold)" />
            <rect x="142.5" y="4" width="2" height="18" fill="var(--gold)" />
            <circle cx="160" cy="26" r="3.5" fill="var(--gold-2)" />
            <rect x="162.5" y="8" width="2" height="18" fill="var(--gold-2)" />
            <path className="hb-pulse" d="M175 22 H220" opacity=".5" />
          </svg>
          <div className="hb-display text-3xl mt-2" style={{ color: "#fff" }}>Heartbeat Musicals</div>
          <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--gold-2)" }}>Agra · Est. with 3 branches · Institute + Shop</div>
        </div>
        <div className="hb-card p-5">
          <div className="hb-display text-lg mb-1" style={{ color: "var(--navy)" }}>Sign in</div>
          <p className="text-xs mb-4" style={{ color: "var(--mut)" }}>Demo ke liye koi bhi role select karein — har role ko alag screens aur alag branch-scope milta hai.</p>
          {Object.entries(ROLES).map(([k, r]) => (
            <button key={k} onClick={() => onLogin(k)} className="w-full flex items-center justify-between p-3 rounded-xl mb-2 text-left transition-all"
              style={{ border: "1px solid var(--line)", background: "#fff" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--line)"}>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{r.label}</div>
                <div className="text-xs" style={{ color: "var(--mut)" }}>{r.who}</div>
              </div>
              <UserCircle2 size={20} style={{ color: "var(--gold)" }} />
            </button>
          ))}
          <div className="text-center text-xs mt-3" style={{ color: "var(--mut)" }}>Forgot password? Reception se contact karein · +91 98370 11001</div>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidUpdate(prev) { if (prev.resetKey !== this.props.resetKey && this.state.err) this.setState({ err: null }); }
  render() {
    if (this.state.err) return (
      <div className="hb-card p-6 text-center" style={{ maxWidth: 480, margin: "40px auto" }}>
        <AlertTriangle size={28} style={{ color: "var(--warn)", margin: "0 auto 10px" }} />
        <div className="hb-display text-lg" style={{ color: "var(--navy)" }}>Kuch gadbad ho gayi</div>
        <div className="text-xs mt-2" style={{ color: "var(--mut)" }}>{String(this.state.err.message || this.state.err)}</div>
        <div className="text-xs mt-1" style={{ color: "var(--mut)" }}>Dusra page kholein ya dobara login karein.</div>
      </div>
    );
    return this.props.children;
  }
}

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [menu, setMenu] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  const [students, setStudents] = useState(seedStudents);
  const [payments, setPayments] = useState(seedPayments);
  const [sales, setSales] = useState(seedSales);
  const [products, setProducts] = useState(seedProducts);
  const [repairs, setRepairs] = useState(seedRepairs);

  const toast = m => { setToastMsg(m); setTimeout(() => setToastMsg(null), 3200); };
  const login = k => { setRole(k); setPage(ROLES[k].start); };

  if (!role) return <div className="hb-app"><style>{CSS}</style><Login onLogin={login} /></div>;

  const R = ROLES[role];
  const scope = R.scope;
  const nav = NAV.filter(n => R.pages.includes(n.key));
  const go = p => { setPage(p); setMenu(false); };

  const PAGE = {
    dashboard: <Dashboard scope={scope} students={students} payments={payments} sales={sales} products={products} go={go} />,
    branches: <BranchesPage />,
    students: <StudentsPage students={students} setStudents={setStudents} toast={toast} scope={scope} />,
    teachers: <TeachersPage scope={scope} toast={toast} />,
    courses: <CoursesPage toast={toast} />,
    batches: <BatchesPage scope={scope} toast={toast} />,
    timetable: <TimetablePage scope={scope} />,
    attendance: <AttendancePage students={students} toast={toast} scope={scope} teacherId={R.teacherId} />,
    fees: <FeesPage students={students} payments={payments} setPayments={setPayments} setStudents={setStudents} toast={toast} scope={scope} />,
    salaries: <SalariesPage toast={toast} scope={scope} />,
    products: <ProductsPage products={products} setProducts={setProducts} toast={toast} scope={scope} />,
    sales: <SalesPage sales={sales} setSales={setSales} products={products} setProducts={setProducts} toast={toast} scope={scope} />,
    suppliers: <SuppliersPage toast={toast} />,
    repairs: <RepairsPage repairs={repairs} setRepairs={setRepairs} toast={toast} scope={scope} />,
    reports: <ReportsPage students={students} payments={payments} sales={sales} products={products} />,
    notifications: <NotificationsPage />,
    settings: <SettingsPage />,
    portal: <StudentPortal students={students} payments={payments} />,
  };

  return (
    <div className="hb-app">
      <style>{CSS}</style>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`hb-side no-print fixed lg:static inset-y-0 left-0 z-40 w-64 p-4 flex-col transition-transform ${menu ? "flex translate-x-0" : "hidden lg:flex"}`}>
          <div className="mb-5 px-2">
            <div className="hb-display text-xl" style={{ color: "#fff" }}>Heartbeat Musicals</div>
            <svg width="160" height="16" viewBox="0 0 160 16"><path className="hb-pulse" d="M0 8 H50 L58 2 L66 14 L72 5 L78 8 H160" opacity=".8" /></svg>
            <div className="text-xs" style={{ color: "#8FA0C4" }}>{R.label}{scope !== "ALL" ? " · " + bName(scope) : " · All branches"}</div>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {role === "student" && <div className="hb-nav-item active"><UserCircle2 size={16} /> My Portal</div>}
            {NAV_GROUPS.map(g => {
              const items = nav.filter(n => n.group === g);
              if (!items.length) return null;
              return (
                <div key={g}>
                  <div className="hb-nav-group">{g}</div>
                  {items.map(n => (
                    <div key={n.key} className={"hb-nav-item" + (page === n.key ? " active" : "")} onClick={() => go(n.key)}>
                      <n.icon size={16} /> {n.label}
                    </div>
                  ))}
                </div>
              );
            })}
          </nav>
          <div className="hb-nav-item mt-3" onClick={() => setRole(null)} style={{ color: "#E3A6A0" }}><LogOut size={16} /> Logout</div>
        </aside>
        {menu && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden no-print" onClick={() => setMenu(false)} />}

        {/* Main */}
        <div className="flex-1 min-w-0">
          <header className="no-print sticky top-0 z-20 flex items-center gap-3 px-4 py-3 border-b" style={{ background: "#fff", borderColor: "var(--line)" }}>
            <button className="lg:hidden p-1.5" onClick={() => setMenu(true)}><Menu size={20} /></button>
            <div className="text-sm font-semibold flex-1 truncate" style={{ color: "var(--navy)" }}>
              {role === "student" ? "Student Portal" : (NAV.find(n => n.key === page) || {}).label}
            </div>
            <div className="hb-badge" style={{ background: "var(--gold-soft)", color: "var(--navy)" }}>Tue, 14 Jul 2026</div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--navy)", color: "var(--gold-2)" }}>
              {R.label[0]}
            </div>
          </header>
          <main className="hb-main"><ErrorBoundary resetKey={page + role}>{PAGE[page] || <Empty msg="Page not found" />}</ErrorBoundary></main>
        </div>
      </div>
      {toastMsg && <div className="hb-toast no-print"><CheckCircle2 size={16} style={{ color: "var(--gold-2)" }} /> {toastMsg}</div>}
    </div>
  );
}
