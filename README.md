# Invoice App 🧾

A fullstack invoice management system built in a short timeframe to showcase end-to-end development with Next.js, Spring Boot, and PostgreSQL.
The app allows you to manage invoices, through a clean UI and a RESTful backend.

## 🚀 Tech Stack

- **Frontend:** Next.js (React + TypeScript,tailwindcss, Yarn)
- **Backend:** Spring Boot (Java 21)
- **Database:** PostgreSQL
- **Testing:** Spring Boot Test (JUnit & MockMvc)
- **Containerization:** Docker & Docker Compose (backend), Jest (frontend)

---

## 🐳 Run with Docker (recommended)

### ✅ Prerequisites

Make sure you have installed:

- [Docker](https://www.docker.com/get-started)

### ⚙️ Setup

1. **Clone the repository:**

   ```bash

   git clone https://github.com/PatrykkM/invoices-app.git

   cd invoices-app
   ```

2. **Build and start containers:**

   ```bash
   docker compose up -d --build
   ```

3. **Check if everything is running:**

   ```bash
   docker compose ps
   ```

4. **Open the app:**

   - Frontend → [http://localhost:3000](http://localhost:3000)
   - Backend API → [http://localhost:8080](http://localhost:8080)

   If everything goes well, you should see the frontend UI running and connected to the API.

5. **Test the json import:**

   You can use the test.json file located in the frontend folder to load data for generating an invoice.

6. **Troubleshooting:**

Sometimes on macOS or Linux you might encounter a “Permission denied” error during the Docker build.
This happens because the gradlew file needs execution permissions inside the container.
To fix it, run this command in your terminal from the root directory of the project:

```bash
 chmod +x backend/gradlew
```

![Invoice App Screenshot](./permisionDeniedError/permisionDeniedError.png)

## 💻 Run locally (without Docker)

If Docker setup doesn’t work, you can run the app manually.

### 🧩 Requirements

- Node.js 20+
- Yarn
- Java 21
- PostgreSQL 16+

---

### 1️⃣ Start PostgreSQL locally

Create a database:

```sql
CREATE DATABASE invoice_db;
```

Update your backend `application.properties` (if needed):

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/invoice_db
spring.datasource.username=postgres
spring.datasource.password=postgres
```

---

### 2️⃣ Run the backend

Backend available at: [http://localhost:8080](http://localhost:8080)

---

### 3️⃣ Run the frontend

```bash
cd frontend
yarn install
yarn dev
```

Frontend available at: [http://localhost:3000](http://localhost:3000)

---

### 4️⃣ Test the JSON import

You can use the test.json file located in the frontend folder to load data for generating an invoice.

---

Made with ❤️ by **Patryk Mrzygłód**
