# Harbor ⚓

> An open-source community for developers who want to move abroad.
> Real roadmaps by day. Live night-coding by night.

![License: MIT](https://img.shields.io/badge/license-MIT-green)
![Status: MVP in progress](https://img.shields.io/badge/status-MVP%20in%20progress-orange)

---

## What is Harbor?

Most advice about moving abroad as a developer is scattered, vague, or pure LinkedIn motivation. Harbor is a place where **people who have actually done it** share what worked, and where people who are on the way can ask real questions and get real answers.

Harbor is **not** another Instagram clone. It is a focused platform for one goal: helping developers from anywhere in the world move to countries like Germany, the USA, Canada, and Japan.

---

## Two Modes

### ☀️ Day Mode: Roadmaps and real answers
- Developers post real roadmaps, for example: *"How I got a Germany job"* or *"How much DSA is enough?"*
- Seniors who are already working abroad reply with honest, practical answers.
- A simple chatbot can search existing posts and answer common questions, for example: *"How much DSA do I need for Germany?"*

### 🌙 Night Mode: After Dark
- Between **12 AM and 5 AM**, the app switches to a dark theme.
- See live who is coding at night, for example: *"Shubham is coding at 2 AM"*.
- Developers can cheer each other on. Late-night coding feels less lonely.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js (TypeScript, ESM) |
| Database (feed) | MongoDB Atlas |
| Database (auth/payments, later) | PostgreSQL |
| Live status (later) | Redis |
| Realtime | Socket.io |
| Auth | JWT, httpOnly cookies, role-based access control (RBAC) |
| Chatbot | Simple `/api/chat` endpoint that searches posts and calls an LLM API (no model training) |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

### Why these choices?
- **MongoDB for the feed:** posts are flexible documents, and the feed favors availability over strict consistency.
- **PostgreSQL later for auth and payments:** these need strong consistency.
- **Redis later for live status:** fast, short-lived data suits it well.
- **Free-tier hosting:** the whole project can run at zero cost.

---

## Project Structure

```
harbor/
├── client/     # Next.js frontend (port 3000)
├── server/     # Express + TypeScript backend (port 5000)
├── LICENSE
└── README.md
```

---

## Roadmap

### Phase 0-1: MVP (current)
- [x] Repository, client and server setup
- [ ] Feed
- [ ] Create post
- [ ] Basic auth (JWT + httpOnly cookies)

### Phase 2: Core features
- [ ] Comments and replies from seniors
- [ ] Roadmap post templates
- [ ] User profiles (country, role, target country)
- [ ] Chatbot over the posts database

### Phase 3: Night Mode
- [ ] Automatic dark theme from 12 AM to 5 AM
- [ ] Live "who is coding now" status with Socket.io
- [ ] Cheers between developers

### Phase 4: Scale and polish
- [ ] Rate limiting with a token bucket (5 posts per minute)
- [ ] Sharding by country
- [ ] Post potency score
- [ ] PostgreSQL for auth, Redis for live status

### Later
- [ ] Job board
- [ ] Mentorship sessions with developers working abroad

---

## Getting Started

### Prerequisites
- Node.js 20 or higher
- Git
- A free MongoDB Atlas account (needed once the feed is built)

### 1. Clone the repository
```bash
git clone https://github.com/jvkedev/harbor.git
cd harbor
```

### 2. Run the backend
```bash
cd server
npm install
npm run dev
```
The server runs at `http://localhost:5000`.

### 3. Run the frontend (in a second terminal)
```bash
cd client
npm install
npm run dev
```
The app runs at `http://localhost:3000`.

### Environment variables
Create a `.env` file inside `server/` (never commit it):
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_here
```

---

## Contributing

Harbor is open source and contributions are welcome, especially from developers who have already moved abroad and know what this community needs.

### Branching
- `main`: live, stable code
- `dev`: active development
- `feature/your-feature-name`: your work, created from `dev`

### Steps
1. Fork the repo or create a branch from `dev`
2. Create your branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit with a clear message
4. Push your branch and open a Pull Request into `dev`

### Commit message style
- `feat: add create post API`
- `fix: correct feed pagination`
- `docs: update README`
- `chore: update dependencies`

---

## Build in Public

This project is being built in public. Follow the journey on Instagram [@shubhameilish](https://www.instagram.com/shubhameilish), LinkedIn, and Discord.

---

## Support the Project

Harbor is free and will stay free. If you like it, you can support it through GitHub Sponsors (coming soon).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with ☕ and late nights by [Shubham](https://github.com/jvkedev).
