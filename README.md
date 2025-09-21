# Project Management Tool Backend

## Author
**Jatin Kumar**  
Email: jatinkumar160902@gmail.com
GitHub: [https://github.com/jatinbishnoi/Project-Management](https://github.com/jatinbishnoi/Project-Management)

---

## 📦 How to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/jatinbishnoi/Project-Management.git
cd Project-Management/backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npm run dev
```
### 4. Access the application
Open your browser and navigate to `http://localhost:5000`
### 5. Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=project_management
DB_USER=root
DB_PASSWORD=yourpassword
JWT_SECRET=supersecret_jwt_key
GROQ_API_KEY=your_groq_api_key

```
### 6. Database Setup
Ensure you have MySQL installed and running. Create a database named `project_management` or as specified in your `.env` file.
Run the following command to create necessary tables:
```bash
npx sequelize-cli db:migrate
```
### 7. API Documentation
| Endpoint              | Method | Description       | Access        |
| --------------------- | ------ | ----------------- | ------------- |
| `/api/users/register` | POST   | Register new user | Public        |
| `/api/users/login`    | POST   | Login user        | Public        |
| `/api/users/:id`      | GET    | Get user info     | Authenticated |
| `/api/users/:id`      | PUT    | Update user info  | Authenticated |
| `/api/users/:id`      | DELETE | Delete user       | Admin         |


| Endpoint            | Method | Description         | Access         |
| ------------------- | ------ | ------------------- | -------------- |
| `/api/projects`     | POST   | Create new project  | Admin, Manager |
| `/api/projects`     | GET    | List all projects   | Authenticated  |
| `/api/projects/:id` | GET    | Get project details | Authenticated  |
| `/api/projects/:id` | PUT    | Update project      | Admin, Manager |
| `/api/projects/:id` | DELETE | Delete project      | Admin          |

| Endpoint         | Method | Description      | Access         |
| ---------------- | ------ | ---------------- | -------------- |
| `/api/tasks`     | POST   | Create new task  | Admin, Manager |
| `/api/tasks/:id` | GET    | Get task details | Authenticated  |
| `/api/tasks/:id` | PUT    | Update task      | Admin, Manager |
| `/api/tasks/:id` | DELETE | Delete task      | Admin, Manager |

| Endpoint                        | Method | Description                                          | Access        |
| ------------------------------- | ------ | ---------------------------------------------------- | ------------- |
| `/api/ai/generate-user-stories` | POST   | Generate user stories from plain text using GROQ API | Authenticated |
