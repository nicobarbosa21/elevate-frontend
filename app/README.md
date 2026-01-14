This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager


### Environment Variables

Create a `.env` file in the `app` directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/
```

### Run Development Server
First, run the development server:

```bash
cd app
npm i
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```

This app contains 3 APIs, two publics and one created with FastAPI [https://github.com/nicobarbosa21/elevate-backend]

#### 1. **Italian Jokes API**
- Fetch random Italian jokes
- Type and subtype classification
- One-click reload functionality

#### 2. **Harry Potter API**
- Browse books, characters, and spells
- Tab-based navigation
- Real-time search functionality
- Organized data tables

#### 3. **Employees API** (CRUD)
- Create, read, update, and delete employees
- Search by name or last name
- Modal-based forms
- Job titles, nationalities, and seniorities management
- Real-time data synchronization with React Query
