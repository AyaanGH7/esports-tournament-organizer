# 🎮 E-Sports Tournament Organizer

A full-stack Database Management System (DBMS) project for managing E-Sports teams, tournaments, and match results.

This application allows users to store team details, organize tournaments, search tournaments by game titles, and record match outcomes using a relational database.

---

## 🚀 Features

- Add and manage E-Sports Teams
- Store Tournament information
- Record Match Results
- Search Teams by Region
- Search Tournaments using Game Title
- Maintain Match history
- Primary Key and Foreign Key relationship implementation

---

## 🛠️ Technologies Used

### Frontend
- React JS
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Tools
- VS Code
- MySQL Workbench
- Git & GitHub

---

## 🗄️ Database Tables

### Teams Table

| Attribute | Description |
|---------|-------------|
| Team_ID | Primary Key |
| Team_Name | Team Name |
| Region | Competition Region |
| Captain_Name | Team Captain |

---

### Tournaments Table

| Attribute | Description |
|---------|-------------|
| Tournament_ID | Primary Key |
| Tournament_Name | Tournament Name |
| Game_Title | Game Name |
| Total_Prize_Pool | Prize Amount |

---

### Matches Table

| Attribute | Description |
|---------|-------------|
| Match_ID | Primary Key |
| Tournament_ID | Foreign Key |
| Team1_ID | Foreign Key |
| Team2_ID | Foreign Key |
| Winner_ID | Winning Team |

---

## 🔗 Database Relationships

- Teams are connected with Matches using Team_ID
- Tournaments are connected with Matches using Tournament_ID
- Match results are generated using SQL JOIN queries

---

## 📌 Project Architecture

React Frontend  
⬇️  
Node.js + Express Backend  
⬇️  
MySQL Database  

---

## 📸 Screenshots

(Project screenshots can be added here)

---

## 👨‍💻 Developer

**Arja Acharjee**

B.Tech Information Technology

---

## ⭐ About

This project demonstrates practical implementation of DBMS concepts including:

- CRUD Operations
- SQL Queries
- Primary Keys
- Foreign Keys
- JOIN Operations
- Full Stack Database Connectivity
