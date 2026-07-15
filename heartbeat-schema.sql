-- ============================================================
-- HEARTBEAT MUSICALS, AGRA — Database Schema (PostgreSQL / Supabase)
-- Multi-branch institute + instrument shop management
-- Run order: is file ko top se bottom tak run karein.
-- ============================================================

-- ---------- CORE / AUTH ----------
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,             -- owner, branch_manager, receptionist, teacher, shop_staff, student
  description TEXT
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  module TEXT NOT NULL,                  -- students, fees, sales, repairs...
  can_view BOOLEAN DEFAULT FALSE,
  can_create BOOLEAN DEFAULT FALSE,
  can_edit BOOLEAN DEFAULT FALSE,
  can_delete BOOLEAN DEFAULT FALSE,
  UNIQUE(role_id, module)
);

CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                    -- Kamla Nagar / Karkunj / Sastripuram
  code TEXT UNIQUE NOT NULL,             -- HM-KN, HM-KK, HM-SP
  address TEXT, phone TEXT,
  manager_user_id UUID,
  open_time TIME, close_time TIME,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE,                   -- Supabase auth.users.id se link
  full_name TEXT NOT NULL,
  email TEXT UNIQUE, phone TEXT,
  role_id INT REFERENCES roles(id),
  branch_id UUID REFERENCES branches(id),   -- NULL = all branches (owner)
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,                   -- soft delete
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE branches ADD CONSTRAINT fk_branch_manager
  FOREIGN KEY (manager_user_id) REFERENCES users(id);

-- ---------- ACADEMY ----------
CREATE TABLE instruments (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,             -- Guitar, Keyboard, Tabla, Vocal Music...
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id),   -- NULL = sab branches par available
  instrument_id INT REFERENCES instruments(id),
  name TEXT NOT NULL,
  level TEXT CHECK (level IN ('Beginner','Intermediate','Advanced')),
  class_type TEXT CHECK (class_type IN ('Individual','Group')),
  monthly_fee NUMERIC(10,2) NOT NULL,
  admission_fee NUMERIC(10,2) DEFAULT 0,
  duration_months INT,
  classes_per_week INT,
  class_duration_min INT DEFAULT 60,
  max_students_per_batch INT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  teacher_code TEXT UNIQUE NOT NULL,     -- T01, T02...
  full_name TEXT NOT NULL,
  photo_url TEXT, phone TEXT, email TEXT, address TEXT,
  joining_date DATE,
  salary_type TEXT CHECK (salary_type IN ('Fixed','Per-Student')),
  salary_amount NUMERIC(10,2),           -- fixed monthly ya per-student rate
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- teacher multiple branches / instruments (many-to-many)
CREATE TABLE teacher_branches (
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, branch_id)
);
CREATE TABLE teacher_instruments (
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  instrument_id INT REFERENCES instruments(id) ON DELETE CASCADE,
  levels TEXT[],                         -- {'Beginner','Advanced'}
  PRIMARY KEY (teacher_id, instrument_id)
);
CREATE TABLE teacher_availability (
  id SERIAL PRIMARY KEY,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  day_of_week SMALLINT CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME, end_time TIME
);

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),        -- student/parent portal login
  admission_no TEXT UNIQUE NOT NULL,        -- HM-2026-021
  branch_id UUID NOT NULL REFERENCES branches(id),
  full_name TEXT NOT NULL,
  photo_url TEXT,
  dob DATE, gender TEXT,
  phone TEXT, email TEXT, address TEXT,
  emergency_contact TEXT,
  admission_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active','Completed','Paused','Discontinued')),
  notes TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE guardians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  name TEXT NOT NULL, relation TEXT,
  phone TEXT, email TEXT
);

-- ek student, multiple courses
CREATE TABLE student_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  course_id UUID REFERENCES courses(id),
  teacher_id UUID REFERENCES teachers(id),
  batch_id UUID,                            -- FK niche add hota hai
  fee_plan_id UUID,
  discount_pct NUMERIC(5,2) DEFAULT 0,
  start_date DATE, end_date DATE,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active','Completed','Paused','Discontinued')),
  progress_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id),
  course_id UUID REFERENCES courses(id),
  teacher_id UUID REFERENCES teachers(id),
  name TEXT NOT NULL,
  classroom TEXT,
  days_of_week SMALLINT[] NOT NULL,         -- {1,3} = Mon,Wed
  start_time TIME NOT NULL, end_time TIME NOT NULL,
  max_students INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE student_enrollments
  ADD CONSTRAINT fk_enroll_batch FOREIGN KEY (batch_id) REFERENCES batches(id);

CREATE TABLE batch_students (
  batch_id UUID REFERENCES batches(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  joined_on DATE DEFAULT CURRENT_DATE,
  PRIMARY KEY (batch_id, student_id)
);

CREATE TABLE class_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID REFERENCES batches(id),
  class_date DATE NOT NULL,
  start_time TIME, end_time TIME,
  status TEXT DEFAULT 'Scheduled' CHECK (status IN ('Scheduled','Completed','Cancelled','Rescheduled','Makeup')),
  reschedule_of UUID REFERENCES class_schedules(id),
  notes TEXT
);

-- ---------- ATTENDANCE ----------
CREATE TABLE student_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  batch_id UUID REFERENCES batches(id),
  branch_id UUID REFERENCES branches(id),
  attendance_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present','Absent','Leave','Holiday','Class Cancelled','Makeup Class')),
  marked_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (student_id, batch_id, attendance_date)
);

CREATE TABLE teacher_attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id),
  branch_id UUID REFERENCES branches(id),
  attendance_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present','Absent','Leave','Holiday')),
  notes TEXT,
  UNIQUE (teacher_id, attendance_date)
);

-- ---------- FEES & PAYMENTS ----------
CREATE TABLE fee_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                    -- Monthly, Quarterly, Half-Yearly, Full Course, Custom
  cycle TEXT CHECK (cycle IN ('Monthly','Quarterly','Half-Yearly','Full-Course','One-Time','Custom')),
  amount NUMERIC(10,2),
  is_active BOOLEAN DEFAULT TRUE
);
ALTER TABLE student_enrollments
  ADD CONSTRAINT fk_enroll_feeplan FOREIGN KEY (fee_plan_id) REFERENCES fee_plans(id);

CREATE TABLE student_fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES student_enrollments(id),
  student_id UUID REFERENCES students(id),
  branch_id UUID REFERENCES branches(id),
  billing_period TEXT NOT NULL,          -- 'July 2026'
  due_date DATE,
  total_fee NUMERIC(10,2) NOT NULL,
  discount NUMERIC(10,2) DEFAULT 0,
  late_fee NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Paid','Partially Paid','Pending','Overdue')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE SEQUENCE receipt_seq START 1041;
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_no TEXT UNIQUE NOT NULL DEFAULT ('HB-REC-' || nextval('receipt_seq')),
  student_fee_id UUID REFERENCES student_fees(id),
  student_id UUID REFERENCES students(id),
  branch_id UUID REFERENCES branches(id),
  amount_paid NUMERIC(10,2) NOT NULL,
  balance NUMERIC(10,2) DEFAULT 0,
  payment_date DATE DEFAULT CURRENT_DATE,
  payment_mode TEXT CHECK (payment_mode IN ('Cash','UPI','Card','Bank Transfer')),
  transaction_id TEXT,
  collected_by UUID REFERENCES users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID UNIQUE REFERENCES payments(id),
  pdf_url TEXT,
  generated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE teacher_salaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id),
  branch_id UUID REFERENCES branches(id),
  salary_month TEXT NOT NULL,            -- 'June 2026'
  salary_type TEXT,
  base_amount NUMERIC(10,2),
  active_students INT,
  bonus NUMERIC(10,2) DEFAULT 0,
  deduction NUMERIC(10,2) DEFAULT 0,
  final_amount NUMERIC(10,2) GENERATED ALWAYS AS (base_amount + bonus - deduction) STORED,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Paid','Pending')),
  payment_date DATE, payment_mode TEXT, notes TEXT,
  UNIQUE (teacher_id, salary_month)
);

-- ---------- SHOP ----------
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL              -- Guitars, Strings, Picks, Accessories...
);

CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, contact_person TEXT,
  phone TEXT, email TEXT, address TEXT, gst_no TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id INT REFERENCES product_categories(id),
  brand TEXT, model TEXT,
  sku TEXT UNIQUE, barcode TEXT,
  description TEXT,
  purchase_price NUMERIC(10,2),
  selling_price NUMERIC(10,2),
  tax_pct NUMERIC(5,2) DEFAULT 18,
  discount_pct NUMERIC(5,2) DEFAULT 0,
  supplier_id UUID REFERENCES suppliers(id),
  warranty_months INT DEFAULT 0,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE branch_inventory (
  branch_id UUID REFERENCES branches(id),
  product_id UUID REFERENCES products(id),
  stock_qty INT DEFAULT 0 CHECK (stock_qty >= 0),
  min_stock_level INT DEFAULT 0,
  PRIMARY KEY (branch_id, product_id)
);

CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id UUID REFERENCES suppliers(id),
  branch_id UUID REFERENCES branches(id),
  purchase_date DATE DEFAULT CURRENT_DATE,
  total_amount NUMERIC(12,2),
  paid_amount NUMERIC(12,2) DEFAULT 0,
  notes TEXT,
  created_by UUID REFERENCES users(id)
);
CREATE TABLE purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  qty INT NOT NULL, unit_cost NUMERIC(10,2)
);

CREATE SEQUENCE invoice_seq START 2201;
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no TEXT UNIQUE NOT NULL DEFAULT ('HB-INV-' || nextval('invoice_seq')),
  branch_id UUID REFERENCES branches(id),
  customer_name TEXT, customer_phone TEXT,
  subtotal NUMERIC(12,2), discount NUMERIC(12,2) DEFAULT 0,
  tax NUMERIC(12,2) DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  payment_mode TEXT CHECK (payment_mode IN ('Cash','UPI','Card','Bank Transfer')),
  payment_status TEXT DEFAULT 'Paid' CHECK (payment_status IN ('Paid','Pending','Partially Paid')),
  warranty_info TEXT,
  sold_by UUID REFERENCES users(id),
  sale_date DATE DEFAULT CURRENT_DATE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  qty INT NOT NULL, unit_price NUMERIC(10,2),
  discount NUMERIC(10,2) DEFAULT 0, tax NUMERIC(10,2) DEFAULT 0
);

CREATE TABLE stock_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  from_branch UUID REFERENCES branches(id),
  to_branch UUID REFERENCES branches(id),
  qty INT NOT NULL,
  reason TEXT DEFAULT 'Transfer',        -- Transfer / Adjustment / Damaged / Returned
  transfer_date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES users(id)
);

-- ---------- REPAIRS ----------
CREATE SEQUENCE repair_seq START 101;
CREATE TABLE repairs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_no TEXT UNIQUE NOT NULL DEFAULT ('HB-RP-' || nextval('repair_seq')),
  branch_id UUID REFERENCES branches(id),
  customer_name TEXT NOT NULL, customer_phone TEXT,
  instrument_type TEXT, brand TEXT, model TEXT,
  problem_description TEXT,
  estimated_cost NUMERIC(10,2),
  advance_payment NUMERIC(10,2) DEFAULT 0,
  technician TEXT,
  received_date DATE DEFAULT CURRENT_DATE,
  expected_delivery DATE,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending','In Progress','Ready','Delivered','Cancelled')),
  parts_used TEXT,
  final_amount NUMERIC(10,2),
  payment_status TEXT DEFAULT 'Pending' CHECK (payment_status IN ('Paid','Pending','Partially Paid')),
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ---------- SYSTEM ----------
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),     -- NULL = broadcast
  branch_id UUID REFERENCES branches(id),
  type TEXT NOT NULL,                    -- fee_due, payment_confirmed, class_cancelled, low_stock, repair_ready, birthday...
  title TEXT, body TEXT,
  channel TEXT DEFAULT 'in_app',         -- in_app / whatsapp / sms (future-ready)
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  branch_id UUID REFERENCES branches(id),
  action TEXT NOT NULL,                  -- create / update / delete / login / payment...
  entity TEXT NOT NULL,                  -- students / payments / sales...
  entity_id TEXT,
  old_values JSONB, new_values JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ---------- INDEXES ----------
CREATE INDEX idx_students_branch ON students(branch_id);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_enroll_student ON student_enrollments(student_id);
CREATE INDEX idx_batches_branch ON batches(branch_id);
CREATE INDEX idx_batches_teacher ON batches(teacher_id);
CREATE INDEX idx_att_student_date ON student_attendance(student_id, attendance_date);
CREATE INDEX idx_fees_status ON student_fees(status);
CREATE INDEX idx_payments_branch_date ON payments(branch_id, payment_date);
CREATE INDEX idx_inventory_low ON branch_inventory(branch_id) WHERE stock_qty <= min_stock_level;
CREATE INDEX idx_sales_branch_date ON sales(branch_id, sale_date);
CREATE INDEX idx_repairs_status ON repairs(status);
CREATE INDEX idx_audit_entity ON audit_logs(entity, entity_id);

-- ---------- BATCH CONFLICT DETECTION ----------
-- Teacher / classroom double-booking rokne ke liye trigger
CREATE OR REPLACE FUNCTION check_batch_conflict() RETURNS TRIGGER AS $$
BEGIN
  -- Same teacher, overlapping day + time
  IF EXISTS (
    SELECT 1 FROM batches b
    WHERE b.id <> COALESCE(NEW.id,'00000000-0000-0000-0000-000000000000'::uuid)
      AND b.is_active AND b.teacher_id = NEW.teacher_id
      AND b.days_of_week && NEW.days_of_week
      AND (NEW.start_time, NEW.end_time) OVERLAPS (b.start_time, b.end_time)
  ) THEN RAISE EXCEPTION 'Conflict: teacher is time par doosri class le raha hai';
  END IF;
  -- Same classroom in same branch, overlapping day + time
  IF EXISTS (
    SELECT 1 FROM batches b
    WHERE b.id <> COALESCE(NEW.id,'00000000-0000-0000-0000-000000000000'::uuid)
      AND b.is_active AND b.branch_id = NEW.branch_id AND b.classroom = NEW.classroom
      AND b.days_of_week && NEW.days_of_week
      AND (NEW.start_time, NEW.end_time) OVERLAPS (b.start_time, b.end_time)
  ) THEN RAISE EXCEPTION 'Conflict: classroom is time par already booked hai';
  END IF;
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_batch_conflict BEFORE INSERT OR UPDATE ON batches
FOR EACH ROW EXECUTE FUNCTION check_batch_conflict();

-- ---------- ROW LEVEL SECURITY (Supabase) — branch isolation ----------
-- Pattern: owner (branch_id IS NULL) sab dekhta hai, baaki sirf apni branch.
-- Har branch-scoped table par ye pattern repeat karein. Example:
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY students_branch_isolation ON students
  USING (
    branch_id IN (SELECT branch_id FROM users WHERE auth_id = auth.uid())
    OR EXISTS (SELECT 1 FROM users u JOIN roles r ON r.id = u.role_id
               WHERE u.auth_id = auth.uid() AND r.name = 'owner')
  );

-- ---------- SEED: BASICS ----------
INSERT INTO roles (name, description) VALUES
 ('owner','Super Admin — all branches, all modules'),
 ('branch_manager','Apni assigned branch ka full management'),
 ('receptionist','Admissions, fees, attendance, receipts'),
 ('teacher','Apne students, batches, attendance, progress'),
 ('shop_staff','Products, stock, sales, repairs, invoices'),
 ('student','Read-only portal — schedule, fees, attendance');

INSERT INTO instruments (name) VALUES
 ('Guitar'),('Keyboard'),('Piano'),('Drums'),('Tabla'),
 ('Flute'),('Violin'),('Harmonium'),('Dholak'),('Vocal Music');

INSERT INTO branches (name, code, address, phone, open_time, close_time) VALUES
 ('Kamla Nagar','HM-KN','B-42, Kamla Nagar, Agra','+91 98370 11001','10:00','20:00'),
 ('Karkunj','HM-KK','Shop 7, Karkunj Chauraha, Agra','+91 98370 11002','10:00','20:00'),
 ('Sastripuram','HM-SP','Plot 12, Sastripuram, Sikandra, Agra','+91 98370 11003','10:30','20:30');

INSERT INTO product_categories (name) VALUES
 ('Guitars'),('Keyboards'),('Pianos'),('Drums'),('Tabla'),('Flutes'),('Violins'),
 ('Harmoniums'),('Dholaks'),('Strings'),('Picks'),('Cables'),('Stands'),('Bags'),('Accessories');

INSERT INTO fee_plans (name, cycle) VALUES
 ('Monthly','Monthly'),('Quarterly','Quarterly'),('Half-Yearly','Half-Yearly'),
 ('Full Course','Full-Course'),('Admission Fee','One-Time'),('Registration Fee','One-Time');

INSERT INTO settings (key, value) VALUES
 ('institute', '{"name":"Heartbeat Musicals","city":"Agra","currency":"INR"}'),
 ('whatsapp_integration', '{"enabled":false,"provider":null}'),
 ('backup', '{"schedule":"daily","retention_days":30}');
