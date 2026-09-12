Reverse Google 🎯
Basic Details
Team Name: Stuga
Team Members
Team Lead: Surya Nandini Santhosh- Adi Sankara Institute of Engineering and Technology
Member 2: Nithin P R-  Adi Sankara Institute of Engineering and Technology

Project Description

Reverse Google is a search engine that refuses to answer your questions. Instead, it throws the question right back at you — forcing you to confront why you even wanted to know in the first place.

The Problem (that doesn't exist)

Search engines keep giving people answers instantly, robbing humanity of the ancient art of sitting with unresolved curiosity and mild existential doubt.

The Solution (that nobody asked for)

We built an AI that never answers anything. Ask it "Why is the sky blue?" and it fires back "Why do you need to know that?" — in six different personalities, ranging from gentle therapist to unnecessarily rude.

Technical Details
Technologies/Components Used

For Software:

Languages used: TypeScript, JavaScript
Frameworks used: Next.js (App Router)
Libraries used: Tailwind CSS, @google/generative-ai
Tools used: VS Code, Git, GitHub, Vercel
Implementation
For Software:

Installation

bash
git clone https://github.com/suryanandini/stuga.git
cd stuga
npm install

Add a .env.local file with:

GEMINI_API_KEY=your_key_here

Run

bash
npm run dev

Open http://localhost:3000 to see it running locally.

Project Documentation
For Software:

Screenshots
![alt text](<Screenshot 2026-09-12 070801.png>)
![alt text](<Screenshot 2026-09-12 070024.png>) 
![alt text](<Screenshot 2026-09-12 070024-1.png>)
Project Demo
Video

<video controls src="Screen Recording 2026-09-12 070121.mp4" title="Title"></video>

Demonstrates asking a question in each personality mode and viewing the resulting counter-questions live on the deployed site.

Additional Demos

Live deployment: [ADD YOUR ACTUAL VERCEL URL HERE, e.g. https://stuga.vercel.app]

Team Contributions
Surya: Built the Next.js frontend, integrated the Gemini API, handled deployment to Vercel
[ADD NAME]: [ADD CONTRIBUTION]
[ADD NAME]: [ADD CONTRIBUTION]

Made with 💙 at a hackathon, by Team Stuga

Content

🔄 Reverse Google — How to implement Basic idea User types: “Why is the sky blue?” Instead of answering, your app generates: “Why are you interested in the sky being blue?” So the flow is: User question → AI analyzes it → AI generates a related counter-question → Display it 🛠️

PASTED