-- Initialize and Configure Database
DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

-- Select employee_db as the database to utilize and perform SQL operations on
USE employee_db;

-- Create table department
CREATE TABLE department (

    -- Create unique id for each item
    id INT NOT NULL AUTO_INCREMENT,
    
    -- Set col dept_name to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    dept_name VARCHAR(30) NOT NULL,

    -- Set id as the primary key to uniquely identify each item in this table
    PRIMARY KEY (id)
);

-- Create table employee
CREATE TABLE employees (

    -- Create unique id for each item
    id INT NOT NULL AUTO_INCREMENT,

    -- Set col first_name to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    first_name VARCHAR(30) NOT NULL,

    -- Set col last_name to accept variable-length strings of max 30 characters, where data feild recieved can be empty
    last_name VARCHAR(30) NULL,
    
    -- Set col role_id to accept only integers, where data feild recieved cannot be empty
    role_id INT NOT NULL,

    -- Set col manager_id to accept only integers, where data feild recieved cannot be empty
    manager_id INT NOT NULL,
    
    -- Set id as the primary key to uniquely identify each item in this table
    PRIMARY KEY (id)

);

-- Create table roles
create table roles (

    -- Create unique id for each item
    id INT NOT NULL AUTO_INCREMENT,

    --  Set col title to accept variable-length strings of max 30 characters, where data feild recieved cannot be empty
    title VARCHAR(30) NOT NULL,

    -- Set col salary to accept decimal numberical values, where data feild recieved cannot be empty
    salary DECIMAL NOT NULL,

    -- Set col department_id to accept only integers, where data feild recieved cannot be empty
    department_id INT NOT NULL,

    -- Set id as the primary key to uniquely identify each item in this table
    PRIMARY KEY (id)

);