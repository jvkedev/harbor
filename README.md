# Harbor ⚓

> A community for developers working toward a move abroad.
> Practical roadmaps by day; a little company for late-night coding.

![License: MIT](https://img.shields.io/badge/license-MIT-green)
![Status: Early development](https://img.shields.io/badge/status-early%20development-orange)

Harbor aims to make moving abroad as a developer less confusing. The long-term
idea is a place to share first-hand job-search roadmaps, ask people who have
already made the move, and support one another while learning and building.

**Current state:** Harbor is in early development. The backend has a working
Express API foundation and authentication endpoints; the frontend is still the
default Next.js starter screen. The feed, community features, and frontend to
backend integration have not been built yet.

## What exists today

- **Frontend:** Next.js App Router, React, TypeScript, and Tailwind CSS.
- **Backend:** Express 5 API using TypeScript and native ES modules.
- **Database:** MongoDB through Mongoose. The server connects to MongoDB before
  it starts listening.
- **Authentication foundation:** registration, login, current-user, and logout
  endpoints. Passwords are hashed with Argon2; login issues an access token in
  an HTTP-only cookie, and authenticated routes verify that cookie.
- **Validation and operations:** Zod request/environment validation, Helmet
  security headers, a 10 KB JSON body limit, Pino HTTP logging, and centralized
  API error responses.

There is currently no post feed, chat service, Socket.IO integration, Redis,
PostgreSQL, payment system, or LLM-powered chatbot. Those remain possibilities
for future development, not current runtime dependencies.

## Project structure

```text
harbor/
├── client/                         # Next.js frontend
│   ├── app/
│   │   ├── globals.css             # Global styles and Tailwind import
│   │   ├── layout.tsx              # Root layout and metadata
│   │   └── page.tsx                # Current starter home page
│   ├── public/                     # Static assets
│   ├── package.json                # Frontend scripts and dependencies
│   └── next.config.ts              # Next.js configuration
├── server/                         # Express API
│   ├── src/
│   │   ├── config/                 # Environment parsing and app config
│   │   ├── infrastructure/         # MongoDB connection and logger
│   │   ├── modules/
│   │   │   ├── auth/               # Auth routes, controller, service, tokens
│   │   │   └── users/              # Mongoose user model
│   │   ├── shared/                 # Errors and Express middleware
│   │   ├── types/
│   │   │   └── express.d.ts        # Adds the authenticated user to Express requests
│   │   ├── app.ts                  # Express app and route registration
│   │   └── server.ts               # Database connection and HTTP startup
│   ├── .env.example                # Backend environment variable template
│   ├── package.json                # Backend scripts and dependencies
│   └── tsconfig.json
├── LICENSE
└── README.md
```

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- npm
- MongoDB, either a local instance or a MongoDB Atlas database

### 1. Get the code

```bash
git clone https://github.com/jvkedev/harbor.git
cd harbor
```

### 2. Configure and run the backend

```bash
cd server
npm ci
cp .env.example .env
```

Edit `server/.env` and set `MONGODB_URI` to your MongoDB connection string and
`JWT_ACCESS_SECRET` to a private random secret of at least 32 characters. Keep
`.env` out of version control.

Start the API:

```bash
npm run dev
```

The API listens on `http://localhost:5000` by default. It exits during startup
if the environment is invalid or MongoDB cannot be reached.

### 3. Run the frontend

In another terminal, from the repository root:

```bash
cd client
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page is currently the
unmodified Next.js starter screen; it does not yet call the API.

## Backend API

The server allows credentialed CORS requests from `http://localhost:3000`.
Authentication uses the `accessToken` HTTP-only cookie.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/` | API welcome/status response |
| `GET` | `/health` | Basic health response (`{ "status": "ok" }`) |
| `POST` | `/api/auth/register` | Create an account with `email`, `username`, and `password` |
| `POST` | `/api/auth/login` | Authenticate with `email` and `password`; sets the access cookie |
| `GET` | `/api/auth/me` | Return the authenticated user's profile; requires the access cookie |
| `POST` | `/api/auth/logout` | Clear the access cookie |

Successful authentication responses use a JSON `status: "success"` field and
return the user under `data.user`. Errors use `status: "error"` and a message.
Registration creates the account; sign in afterward to receive the access
cookie.

## Environment variables

The backend reads `server/.env` in development. Its template is
[`server/.env.example`](server/.env.example).

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `5000` | API listen port |
| `MONGODB_URI` | Yes | — | MongoDB connection URI |
| `NODE_ENV` | No | `development` | `development`, `production`, or `test` |
| `LOG_LEVEL` | No | `info` | Pino log level |
| `JWT_ACCESS_SECRET` | Yes | — | Private signing secret; at least 32 characters |
| `JWT_ACCESS_EXPIRES_SECONDS` | No | `900` | Access-token lifetime in seconds |

## Useful commands

Run commands from the corresponding `client/` or `server/` directory:

| Project | Command | Description |
|---|---|---|
| Client | `npm run dev` | Start the Next.js development server |
| Client | `npm run lint` | Run ESLint |
| Client | `npm run build` | Create a production build |
| Client | `npm start` | Serve the production build |
| Server | `npm run dev` | Run the API with watch mode and load `.env` |
| Server | `npm run build` | Compile TypeScript into `server/dist/` |
| Server | `npm start` | Run the compiled API |

## Roadmap

The roadmap describes the direction of the project; unchecked items are not
implemented yet.

### Community MVP

- [ ] Build the frontend for the community feed
- [ ] Create and browse roadmap posts
- [ ] Connect frontend authentication flows to the API
- [ ] Add comments and replies
- [ ] Add developer profiles and target-country information

### Community tools

- [ ] Search posts and provide answers grounded in existing community content
- [ ] Add roadmap templates and practical resources
- [ ] Support job-search and mentorship discovery

### Night coding

- [ ] Offer an optional late-night coding mode
- [ ] Show opt-in live coding status and encouragement between members

### Longer term

- [ ] Evaluate a job board and mentorship sessions
- [ ] Revisit infrastructure needs as the community grows

## Contributing

Contributions are welcome, especially practical feedback from developers who
have moved abroad or are working toward it. For a change:

1. Fork the repository or create a feature branch from the active development
   branch.
2. Make a focused change and run the relevant client or server checks.
3. Open a pull request describing the change and how it was verified.

Suggested commit prefixes: `feat:`, `fix:`, `docs:`, and `chore:`.

## Build in public

Follow the project journey on Instagram
[@shubhameilish](https://www.instagram.com/shubhameilish), LinkedIn, and
Discord.

## License

Harbor is licensed under the [MIT License](LICENSE).

---

Built with ☕ and late nights by [Shubham](https://github.com/jvkedev).
