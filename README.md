# LandVision - Real Estate Intelligence SaaS Platform

LandVision is a complete SaaS platform for AI-powered real estate intelligence, featuring property valuations, buy/rent/invest decision analysis, and financing calculations.

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Node.js 18+ with TypeScript
- Express.js for REST API
- Prisma ORM with PostgreSQL
- Redis for caching, rate limiting, and session management
- Stripe for payments
- Anthropic Claude for AI analysis
- JWT + Refresh Tokens for authentication

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript
- Axios for API calls

**Infrastructure:**
- Docker & Docker Compose for local development
- Terraform for AWS deployment (ECS, RDS, ElastiCache)
- GitHub Actions for CI/CD

## 📁 Project Structure

```
landvision-project/
├── landvision-backend/          # Backend API
│   ├── src/
│   │   ├── auth/                # Authentication module
│   │   ├── payments/            # Stripe payments & webhooks
│   │   ├── regions/             # Countries, states, cities, neighborhoods
│   │   ├── valuations/          # Property valuation with AI
│   │   ├── decisions/           # Buy/Rent/Invest analysis
│   │   ├── financing/           # Loan calculations
│   │   ├── lgpd/                # LGPD compliance (data export/deletion)
│   │   ├── admin/               # Admin dashboard
│   │   ├── ai/                  # AI service (Anthropic integration)
│   │   ├── config/              # Database, Redis, Stripe, JWT, AI configs
│   │   ├── middleware/          # Auth, rate limiting, validation, error handling
│   │   ├── utils/               # Logger, response helpers, errors
│   │   └── server.ts            # Main Express server
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── landvision-frontend/         # Frontend Application
│   ├── app/                     # Next.js 14 App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Landing page
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── pricing/
│   │   ├── valuations/new/
│   │   └── decisions/new/
│   ├── components/              # Reusable components
│   ├── lib/                     # API client, auth functions
│   ├── styles/
│   ├── Dockerfile
│   ├── package.json
│   └── next.config.js
│
├── infra/                       # Infrastructure as Code
│   ├── docker-compose.yml
│   └── terraform/               # AWS deployment configs
│
└── .github/workflows/           # CI/CD pipelines
    ├── backend-ci.yml
    └── frontend-ci.yml
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL 15 (or use Docker)
- Redis 7 (or use Docker)
- Stripe account (for payments)
- Anthropic API key (for AI features)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-org/landvision-project.git
cd landvision-project
```

#### 2. Backend Setup

```bash
cd landvision-backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your credentials
# Required: DATABASE_URL, REDIS_HOST, JWT_SECRET, REFRESH_TOKEN_SECRET
# Optional: STRIPE_SECRET_KEY, ANTHROPIC_API_KEY

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
# npx prisma db seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:3001`

#### 3. Frontend Setup

```bash
cd landvision-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### Using Docker Compose (Recommended)

```bash
# From project root
cd infra

# Create .env file with required variables
# JWT_SECRET, REFRESH_TOKEN_SECRET, STRIPE_SECRET_KEY, ANTHROPIC_API_KEY

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This starts:
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`
- Backend API on `localhost:3001`
- Frontend on `localhost:3000`

## 🔑 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/landvision?schema=public

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...

# AI
ANTHROPIC_API_KEY=sk-ant-...
AI_MODEL=claude-3-sonnet-20240229

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🎯 Key Features

### 1. Authentication & Authorization
- JWT + Refresh Token authentication
- Redis-backed token blacklist
- Role-based access control (USER, ADMIN)
- Session management

### 2. Payment & Subscriptions
- Stripe integration for subscriptions
- Free and PRO plans
- Webhook handling for subscription events
- Usage limits enforcement

### 3. Property Valuation
- AI-powered property value estimation
- Market trends analysis
- Confidence scoring
- Fallback to rule-based calculation

### 4. Decision Analysis
- Buy vs Rent vs Invest recommendations
- Financial scenario modeling
- AI-powered reasoning
- Score-based recommendations

### 5. Financing Calculator
- Loan payment calculations
- Amortization schedules
- Interest and principal breakdown

### 6. LGPD Compliance
- User data export
- Account deletion requests
- Audit logging

### 7. Admin Dashboard
- User management
- Audit log viewing
- Platform statistics
- Subscription monitoring

## 📊 Database Schema

Key models:
- `User`: User accounts with authentication
- `Session`: Refresh token sessions
- `Subscription`: User subscription plans and usage
- `Country`, `State`, `City`, `Neighborhood`: Geographic hierarchy
- `Valuation`: Property valuations with AI analysis
- `Decision`: Buy/rent/invest analysis results
- `Financing`: Loan simulation results
- `AuditLog`: System audit trail

## 🔒 Security Features

- Helmet.js for security headers
- Rate limiting with Redis
- CORS configuration
- JWT token blacklisting
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection
- Password hashing with bcrypt

## 🧪 Testing

```bash
# Backend tests
cd landvision-backend
npm test
npm run test:watch

# Frontend tests
cd landvision-frontend
npm test
```

## 🚢 Deployment

### AWS Deployment with Terraform

```bash
cd infra/terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var="db_username=admin" -var="db_password=yourpassword"

# Apply configuration
terraform apply

# Destroy resources
terraform destroy
```

### Manual Docker Deployment

```bash
# Build images
docker build -t landvision-backend:latest ./landvision-backend
docker build -t landvision-frontend:latest ./landvision-frontend

# Push to registry (ECR, DockerHub, etc.)
docker tag landvision-backend:latest your-registry/landvision-backend:latest
docker push your-registry/landvision-backend:latest
```

## 🔄 CI/CD

GitHub Actions workflows are configured for:
- Automated testing on pull requests
- Linting and code quality checks
- Docker image building and pushing to ECR
- Automated deployments to AWS ECS (on main branch)

## 📝 API Documentation

### Authentication Endpoints

```
POST /api/auth/register       - Register new user
POST /api/auth/login          - Login
POST /api/auth/refresh        - Refresh access token
POST /api/auth/logout         - Logout
GET  /api/auth/profile        - Get user profile
```

### Core Endpoints

```
# Regions
GET  /api/regions/countries
GET  /api/regions/countries/:id/states
GET  /api/regions/states/:id/cities
GET  /api/regions/cities/:id/neighborhoods

# Valuations
POST /api/valuations          - Create valuation
GET  /api/valuations          - List user valuations
GET  /api/valuations/:id      - Get specific valuation

# Decisions
POST /api/decisions           - Create decision analysis
GET  /api/decisions           - List user decisions
GET  /api/decisions/:id       - Get specific decision

# Financing
POST /api/financing           - Create financing simulation
GET  /api/financing           - List simulations
GET  /api/financing/:id       - Get specific simulation

# Payments
POST /api/payments/checkout   - Create Stripe checkout session

# LGPD
GET  /api/lgpd/export         - Export user data
POST /api/lgpd/delete-request - Request account deletion

# Admin (requires ADMIN role)
GET  /api/admin/users         - List all users
PATCH /api/admin/users/:id    - Update user
GET  /api/admin/audit-logs    - View audit logs
GET  /api/admin/stats         - Platform statistics
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

LandVision Development Team

## 📞 Support

For support, email support@landvision.com or open an issue on GitHub.

---

**Built with ❤️ using TypeScript, Next.js, and Express**
