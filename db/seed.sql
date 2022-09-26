-- Select employee_db as the database to utilize and perform SQL operations on
USE employee_db;

-- Insert the following items to table department
INSERT INTO department(dept_name)
VALUES 
('Competitor Benchmarking'),
('Information Technology'),
('Computer Engineering'),
('Electrical Engineering'),
('Chemical Engineering'),
('Mechanical Engineering'),
('User Interface Design'),
('Supply Chain Mgmt Logistics'),
('Credit & Finance'),
('Marketing & Sales'),
('Warranty Legal'),
('Intellectual Property'),
('Human Resources');

-- Insert the following items to table role
INSERT INTO roles(title, salary, department_id)
VALUES
('Web Development Manager', 90000, 2),
('Web Dev Frontend', 90000, 2),
('Web Dev Backend', 90000, 2),

('Database Admin Manager', 90000, 2),
('Database Administrator', 90000, 2),
('Database Architect Lead', 90000, 2),
('Database Frontend Dev', 90000, 2),
('Database Backend', 90000, 2),
('Software Engineeing Manager', 90000, 3),
('Sr. Software Developer', 90000, 3),
('Jr. Software Developer', 90000, 3),

('Computer Engineeing Manager', 90000, 3),
('Computer Hardware Developer', 90000, 3),
('Computer Middleware Developer', 90000, 3),

('Chief Electrical Engineer', 150000, 4),
('Electrical Engineer Manager', 150000, 4),
('Electrical Engineer', 90000, 4),

('Chief Chemical Engineer', 150000, 5),
('Chemical Engineer Manager', 150000, 5),
('Chemical Engineer', 90000, 5),

('Chief Mechanincal Engineer', 150000, 6),
('Mechanincal Engineer Manager', 150000, 6),
('Mechanincal Engineer', 90000, 6),

('Chief Industrial Engineer', 150000, 8),
('Industrial Engineer Manager', 150000, 8),
('Industrial Engineer', 90000, 8),

('Chief Accountant', 170000, 9),
('Accounting Manager', 70000, 9),
('Sr. Accountant', 70000, 9),
('Jr. Accountant', 70000, 9),

('Chief Financial Analyst', 170000, 9),
('Financial Analyst Manager', 170000, 9),
('Sr. Financial Analyst', 70000, 9),
('Jr. Financial Analyst', 70000, 9),

('Chief Budget Analyst', 170000, 9),
('Budget Analyst Manager', 70000, 9),
('Sr. Budget Analyst', 70000, 9), 
('Jr. Budget Analyst', 70000, 9),

('Chief of Marketing', 70000, 10),
('Marketing Manager', 70000, 10),
('Sr. Market Specialist', 70000, 10), 
('Jr. Market Specialist', 70000, 10),
('Sr. Marketing Strategist', 70000, 10), 
('Jr. Marketing Strategist', 70000, 10),

('IR Chief Council', 50000, 9),
('IR Council', 50000, 9),
('IR Paralegal', 50000, 9),

('Warranty Chief Council', 50000, 11),
('Warranty Council', 50000, 11),
('warranty Paralegal', 50000, 11),

('IP Chief Council', 50000, 12),
('IP Council', 50000, 12),
('IP Paralegal', 50000, 12),

('Discovery Chief Council', 50000, 12),
('Discovery Council', 50000, 12),
('Discovery Paralegal', 50000, 12),

('HR Chief Council', 50000, 13),
('HR Council', 50000, 13),
('HR Paralegal', 50000, 13);

-- Insert the following items to table employees
INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Lee', 4, 0),
('Jimmy', 'Lu', 1, 0),
('Jason', 'Kimee', 57, 0),
('Hwan', 'Yu', 35, 0),
('William', 'Seo', 58, 3),
('Soon', 'Choi', 54, 0),
('Lali', 'Bae', 12, 0);