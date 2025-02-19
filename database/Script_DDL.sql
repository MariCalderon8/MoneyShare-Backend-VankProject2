create schema sharemoney;

--Users table
CREATE TABLE "sharemoney"."user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0
);

--Shares table
CREATE TABLE "sharemoney"."share" (
    id_share SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT null,
    description text,
    amount DECIMAL(10,2) NOT NULL,
    due_date TIMESTAMP
);

-- Relationship between users and shares
CREATE TABLE "sharemoney"."share_member" (
    id_share_member SERIAL PRIMARY KEY,
   	id_user INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    id_share INT REFERENCES "sharemoney"."share"(id_share) ON DELETE CASCADE
);

--Expenses table
CREATE TABLE "sharemoney"."expense" (
    id_expense SERIAL PRIMARY KEY,
    id_share INT REFERENCES "sharemoney"."share"(id_share) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Expense distribution table
CREATE TABLE "sharemoney"."expense_split" (
    id_split SERIAL PRIMARY KEY,
    id_expense INT REFERENCES "sharemoney"."expense"(id_expense) ON DELETE CASCADE,
    id_user INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    percentage DECIMAL(5,2),
    assigned_amount DECIMAL(10,2) NOT NULL
);

--CREATE TYPE debt_status AS ENUM ('pending', 'paid');

-- Debts and Loans table
CREATE TABLE  "sharemoney"."debt" (
    id_debt SERIAL PRIMARY KEY,
    id_lender INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    id_debtor INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    interest DECIMAL(5,2) DEFAULT 0,
    status debt_status DEFAULT 'pending',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE
);

CREATE TYPE payment_options AS ENUM ('digital', 'cash');
-- Payments table
CREATE TABLE "sharemoney"."payment" (
    id_payment SERIAL PRIMARY KEY,
    id_debt INT REFERENCES "sharemoney"."debt"(id_debt) ON DELETE CASCADE,
    id_user INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method payment_options NOT NULL
);

CREATE TYPE goal_status AS ENUM('active', 'completed', 'expired');
-- Savings goals table
CREATE TABLE "sharemoney"."saving_goal" (
    id_saving_goal SERIAL PRIMARY KEY,
    id_share INT REFERENCES "sharemoney"."share"(id_share) ON DELETE CASCADE,
    target_amount DECIMAL(10,2) NOT NULL,
    due_date DATE,
    status goal_status DEFAULT 'active'
);

-- Aportes a Metas de Ahorro
CREATE TABLE "sharemoney"."goal_contribution" (
    id_goal_contribution SERIAL PRIMARY KEY,
    id_goal INT REFERENCES "sharemoney"."saving_goal"(id_saving_goal) ON DELETE CASCADE,
    id_user INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE notification_type AS ENUM('payment', 'debt', 'goal', 'general');
--Notifications table
CREATE TABLE "sharemoney"."notification" (
    id_notification SERIAL PRIMARY KEY,
    id_user INT REFERENCES "sharemoney"."user"(id_user) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Members of each Share
CREATE VIEW "sharemoney"."view_share_members" AS
SELECT u.name AS user_name, s.name AS share_name
FROM "sharemoney"."share_member" sm
JOIN "sharemoney"."user" u ON sm.id_user = u.id_user
JOIN "sharemoney"."share" s ON sm.id_share = s.id_share;

--Expense summary per share
CREATE VIEW "sharemoney"."view_expense_summary" AS
SELECT s.name AS share_name, SUM(e.amount) AS total_expenses
FROM "sharemoney"."expense" e
JOIN "sharemoney"."share" s ON e.id_share= s.id_share
GROUP BY s.name;

-- drop schema sharemoney cascade;

-- DROP TYPE goal_status;
-- DROP type notification_type ;
-- DROP TYPE payment_options;


