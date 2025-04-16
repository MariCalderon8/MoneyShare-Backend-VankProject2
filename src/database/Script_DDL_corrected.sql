CREATE DATABASE moneyshare;

--Users table
CREATE TABLE "user" (
    id_user SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    tel VARCHAR(20) NOT NULL
);

CREATE TYPE share_status AS ENUM ('active', 'completed', 'expired');
CREATE TYPE share_type AS ENUM ('share_expense', 'share_goal', 'share_debt');

--Shares table
CREATE TABLE "share" (
    id_share SERIAL PRIMARY KEY,
    id_creator INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    code VARCHAR(20) UNIQUE NOT NULL,
    type share_type NOT NULL,
    name VARCHAR(100) NOT null,
    description text,
    amount DECIMAL(10,2) DEFAULT 0,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    status share_status DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    split_equally BOOLEAN DEFAULT true
);


--Expenses table
CREATE TABLE "expense" (
    id_expense SERIAL PRIMARY KEY, 
    id_share INT REFERENCES "share"(id_share) ON DELETE CASCADE,
   	id_user INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL
);

--Expense distribution table
CREATE TABLE "share_split" (
    id_split SERIAL PRIMARY KEY,
    id_share INT REFERENCES "share"(id_share) ON DELETE CASCADE,
    id_user INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    percentage DECIMAL(5,2),
    assigned_amount DECIMAL(10,2) NOT NULL,
    paid DECIMAL(10,2) DEFAULT 0 NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0 NOT NULL 
);

CREATE TYPE notification_type AS ENUM('payment', 'debt', 'goal', 'general');
--Notifications table
CREATE TABLE "notification" (
    id_notification SERIAL PRIMARY KEY,
    id_user INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW view_share_members AS
SELECT 
    ss.id_share,
    u.id_user,
    u.email AS email_user,
    u.username,
    ss.percentage,
    ss.assigned_amount AS amount_to_pay,
    ss.balance,
    ss.paid
FROM share_split ss
JOIN "user" u ON ss.id_user = u.id_user;

/*
-- Debts and Loans table
CREATE TABLE  "debt" (
    id_debt SERIAL PRIMARY KEY,
    id_lender INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    interest DECIMAL(5,2) DEFAULT 0,
);

CREATE TYPE payment_options AS ENUM ('digital', 'cash');
-- Payments table
CREATE TABLE "payment" (
    id_payment SERIAL PRIMARY KEY,
    id_debt INT REFERENCES "debt"(id_debt) ON DELETE CASCADE,
    id_user INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method payment_options NOT NULL
);

-- Savings goals table
-- SAVING GOAL DEJA DE EXISTIR Y QUEDA SOLO GOAL CONTRIBUTION
 CREATE TABLE "saving_goal" (
    id_saving_goal SERIAL PRIMARY KEY,
    id_share INT REFERENCES "share"(id_share) ON DELETE CASCADE,
);

-- Aportes a Metas de Ahorro
CREATE TABLE "goal_contribution" (
    id_goal_contribution SERIAL PRIMARY KEY,
    id_goal INT REFERENCES "saving_goal"(id_saving_goal) ON DELETE CASCADE,
    id_user INT REFERENCES "user"(id_user) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/



/*
--Expense summary per share
CREATE VIEW view_expense_summary AS
SELECT s.name AS share_name, SUM(e.amount) AS total_expenses
FROM "expense" e
JOIN "share" s ON e.id_share= s.id_share
GROUP BY s.name;
*/
-- DROP type notification_type ;
-- DROP TYPE payment_options;