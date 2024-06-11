# Blood Donation Client

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

The Blood Donation platform is a web application designed to connect blood donors and requesters. It makes the donation process easier, faster, and safer for everyone involved. Key features include advanced search and filtering options for finding donors based on blood type, location, and availability; detailed donor profiles displaying essential information; secure login and registration using JSON Web Tokens (JWT) for authentication and authorization; and a user-friendly interface for managing blood requests and tracking their status. This platform ensures a straightforward and reliable way to find and connect with blood donors, providing a critical service for both donors and requesters.


## Table of Contents

- [Live Link](#live-link)
- [Key Features](#key-features)
- [Technology Used](#technology-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation locally](#installation-locally)
    - [Running the Application](#running-the-application)

## Live Link
```bash
https://blood-donation-by-adnan-sarkar.vercel.app/
```

## Key Features

- **Home Page/Landing Page (public)**
    - Header with navigation links.
    - Hero section.
    - Donation tips
    - donor list (12).
    - Users feedbacks.
    - About Us section with website mission and team information.
    - Footer with contact and legal information.

- **User Authentication**
    - Login and registration forms.
    - JWT-based authentication.

- **Donors Page (public)**
    - Donor list page with search and filter options.
    - Donors list cards with pagination

- **Donor Details Page (public)**
  - Donor details without contact information.
  - Request for blood donation button

- **Blood Donation Request Page (Private)**
    - Request form with donation information

- **Dashboard: User (Private)**
    - Information about send, receive and completed donations

- **Dashboard: User Profile (Private)**
    - User profile information
    - Profile picture change button
    - Profile information change button

- **Dashboard: My Sent Requests (Private)**
    - List of my donation requests with status
    - donation request details button
    - rating/review button (if donation request is completed)

- **Dashboard: Receive Requests (Private)**
    - List of my received requests with status
    - donation request details button
    - donation status change button
    - donation complete button
    - rating/review button (if donation is completed)

- **Dashboard: Change Password (Private)**
    - Form for changing password

- **Dashboard Admin: Admin Profile (Private)**
    - User profile information
    - Profile picture change button
    - Profile information change button

- **Dashboard Admin: User Management (Private)**
    - List of all users
    - User details info button
    - User status change button

## Technology Used

- **Next js**
- **Material UI**
- **RTK & RTK-Query**
- **JWT (JSON Web Tokens)**
- **React-Hook-Form**
- **Zod**
- **Dev Tools**
    - **TypeScript**

## Getting Started

These instructions will help you set up and run the application on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation locally

1. Clone the repository:

```bash
https://github.com/Adnan-Sarkar/blood-donation-client.git
```

2. Navigate to the project directory:

```bash
cd blood-donation-client
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and configure environment variables:

```bash
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_CLOUDINARY_URL=...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
```

### Running the Application

```bash
npm run dev
```

<br><br>

Thank you for exploring the `Blood Donation Server` backend application! Feel free to provide feedback, report issues.

## 📢 Social Links

- [![](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adnan-sarkar-8b54341a0/)
- [![](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/AdnanSarkar14)
- [![](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/adnansarkaraduvai/)
- [![](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/_a_d_u_v_a_i_/)
- [![](https://img.shields.io/badge/Hashnode-2962FF?style=for-the-badge&logo=hashnode&logoColor=white)](https://adnansarkar.hashnode.dev/)
