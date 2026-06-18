# 🛒 E-Commerce Platform

A full-stack E-Commerce Platform built using **Spring Boot**, **React**, and **MySQL** following a feature-based architecture.

This project is being developed as a production-oriented learning project with a strong focus on backend design, security, scalability, and real-world business workflows.

> 🚧 Project Status: In Active Development

---

## ✨ Current Features

### Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Refresh Token Mechanism
- Logout Functionality
- Role-Based Access Control (RBAC)

Roles:

- BUYER
- SELLER
- ADMIN

---

### Product Management

- Create Product
- Update Product
- Delete Product
- Product Details
- Product Listing
- Product Search
- Product Filtering
- Product Sorting

Product Tags:

- Featured Products
- New Arrivals
- Best Sellers
- Trending Products

---

### Cart System

- Add To Cart
- Remove From Cart
- Update Quantity
- Cart Total Calculation

---

### Order Management

- Place Order
- Order Details
- Order Tracking
- Order History
- Order Status Updates

Order Status:

- PLACED
- PAID
- SHIPPED
- DELIVERED
- CANCELLED

---

### Address Management

Users can:

- Add Address
- Update Address
- Delete Address
- Set Default Address

Shipping information is stored as an order snapshot to preserve historical order data.

---

### Seller Module

Implemented:

- Seller Registration Flow
- Seller Profile
- Seller Approval Workflow
- Seller Status

Seller Status:

- PENDING
- APPROVED
- REJECTED

Admin can:

- View Seller Applications
- Approve Sellers
- Reject Sellers

---

### Admin Module

Implemented:

- Product Management
- Order Management
- Seller Approval Management

---

### Frontend Features

Built using React:

- Responsive Homepage
- Product Carousel
- Product Details Page
- Cart Page
- Checkout Page
- Login Page
- Registration Page
- Seller Dashboard Structure
- Admin Dashboard Structure

---

## 🏗️ Backend Architecture

Feature-Based Architecture:

```
features
├── auth
├── user
├── product
├── cart
├── order
├── address
├── seller
├── review
└── payment
```

Benefits:

- Scalable
- Maintainable
- Easy to extend
- Suitable for large projects

---

## 🔐 Security Features

- Spring Security
- JWT Authentication
- Refresh Tokens
- Password Encryption (BCrypt)
- Role-Based Authorization
- Input Validation

---

## 🛠️ Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- Lombok
- JWT

### Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Database

- MySQL

### Tools

- Git
- GitHub
- Postman
- Maven

---

## 📂 Project Structure

### Backend

```
backend
├── config
├── common
├── features
│   ├── auth
│   ├── user
│   ├── product
│   ├── cart
│   ├── order
│   ├── address
│   └── seller
```

### Frontend

```
src
├── admin
├── customer
├── seller
├── services
├── context
├── pages
└── assets
```

---

## 🚀 Future Enhancements

Planned Features:

- Payment Gateway Integration
- Product Reviews & Ratings
- Wishlist
- Inventory Management
- Seller Analytics Dashboard
- Revenue Reports
- Product Image Upload to Cloud Storage
- Email Notifications
- Admin Analytics
- Advanced Search
- Product Recommendations
- Coupon System
- Returns & Refund Workflow
- Docker Support
- CI/CD Pipeline
- Monitoring & Logging
- Microservice Migration (Future Exploration)

---

## 🎯 Learning Goals

This project is being built to gain hands-on experience with:

- Enterprise Backend Development
- Secure Authentication Systems
- REST API Design
- Database Design
- Role-Based Authorization
- Full-Stack Development
- Software Architecture
- Real-World E-Commerce Workflows

---

## 📌 Project Status

Current Version:

```
MVP + Seller Workflow Implemented
```

Completed:

- Authentication
- Products
- Cart
- Orders
- Addresses
- Seller Approval System
- Admin Panel

In Progress:

- Seller Product Ownership
- Seller Order Management
- Dashboard Analytics
- UI Improvements
- Payment Integration

---

## 👨‍💻 Author

**Sk Dulal Islam**

B.Tech Information Technology  
Jalpaiguri Government Engineering College

Building this project to learn production-grade full-stack development and software engineering principles.

---

⭐ If you like this project, feel free to star the repository.
