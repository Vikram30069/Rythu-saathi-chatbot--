# Setup Guide

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- OpenAI API key
- Pinecone account

## Installation

1. Clone repository
2. Install dependencies: `npm install`
3. Configure environment: `cp .env.example .env.local`
4. Setup database: `npx prisma db push`
5. Seed data: `npm run db:seed`
6. Run: `npm run dev`

## Environment Variables

See `.env.example` for required variables.
