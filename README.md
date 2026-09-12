This is [Reverse Google](https://github.com/suryanandini/stuga), a project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You ask. We ask why you asked. Reverse Google flips the usual search experience — instead of answering your question, it responds with a counter-question that makes you think about why you wanted to know in the first place.

## Getting Started

First, add your Gemini API key to a `.env.local` file:

GEMINI_API_KEY=your_key_here


Then install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Ask any question and get a witty counter-question back
- Multiple personality modes: Normal, Judgmental, Philosophical, Rude, Therapist, Gen Z
- Question history tracker

## How It Works

1. You type a question into the input box
2. The question is sent to `/api/reverse`, which calls the Gemini API
3. Gemini generates a short counter-question based on the selected personality mode
4. The counter-question is displayed, and added to your question history

## Roadmap

- Uselessness Score — rate how unnecessary your question was
- Infinite Reverse — keep asking "why" on your own counter-questions
- Battle Mode — pit two questions against each other to see which is more useless

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.