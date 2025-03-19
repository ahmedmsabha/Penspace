# PenSpace - A Modern Blogging Platform

PenSpace is a full-stack blogging platform built with a modern tech stack using a monorepo architecture powered by Turborepo. The application allows users to create, read, and interact with blog posts through a clean and intuitive interface.

## 🚀 Tech Stack

### Backend (API)

- **Framework**: NestJS
- **API**: GraphQL with Apollo Server
- **Authentication**: JWT, OAuth (Google, GitHub)
- **Database**: SQLite with Prisma ORM
- **Testing**: Jest

### Frontend

- **Framework**: Next.js 15
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Next.js middleware with JWT

### DevOps

- **Package Manager**: pnpm
- **Build Tool**: Turborepo
- **Language**: TypeScript

## 📁 Project Structure

```
penspace-turborepo/
├── apps/
│   ├── api/             # NestJS GraphQL API
│   │   ├── prisma/      # Database schema and migrations
│   │   └── src/         # API source code
│   └── front/           # Next.js frontend application
│       └── src/         # Frontend source code
└── packages/
    ├── ui/              # Shared UI components
    ├── eslint-config/   # Shared ESLint configurations
    └── typescript-config/ # Shared TypeScript configurations
```

## 🔑 Environment Variables

### API (.env)

```
# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback

# OAuth - GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8000/auth/github/callback
```

### Frontend (.env)

```
# Session
SESSION_SECRET_KEY=your_session_secret_key

# Supabase (for file storage)
SUPABASE_URL=your_supabase_url
SUPABASE_API_KEY=your_supabase_api_key
```

## 🛠️ Setup & Development

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/penspace-turborepo.git
   cd penspace-turborepo
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables

   - Copy `.env.example` to `.env` in both `apps/api` and `apps/front` directories
   - Fill in your environment variables

4. Initialize the database
   ```bash
   cd apps/api
   pnpm prisma migrate dev
   pnpm db:seed
   ```

### Development

Run the entire project in development mode:

```bash
pnpm dev
```

This will start:

- API server on http://localhost:8000
- Frontend on http://localhost:3000

### Build

Build all applications:

```bash
pnpm build
```

## 📊 Database Schema

The application uses the following data models:

- **User** - User accounts with authentication
- **Post** - Blog posts created by users
- **Comment** - Comments on blog posts
- **Tag** - Categories/tags for posts
- **Like** - User likes on posts

## 🔒 Authentication

The application supports:

- Local email/password authentication
- Google OAuth
- GitHub OAuth

## 🧪 Testing

Run tests:

```bash
pnpm test
```

## 📝 License

[MIT License](LICENSE)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
