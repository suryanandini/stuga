"use client";
import { useEffect, useRef, useState } from "react";

const modes = ["normal", "judgmental", "philosophical", "rude", "therapist", "genz"];

function clientCounterQuestion(question: string, mode: string) {
  const templates: Record<string, string[]> = {
    normal: [
      "Why does that matter to you right now?",
      "What would change for you if you knew that?",
      "Who told you to ask this?"
    ],
    judgmental: [
      "Why couldn't you just Google it instead of asking me?",
      "Are you sure you tried searching first?",
      "Do you really need someone to spoon-feed you that?"
    ],
    philosophical: [
      "What does knowing this reveal about your place in the world?",
      "If you had the answer, how would your beliefs change?",
      "Does the question reflect a deeper curiosity about meaning?"
    ],
    rude: [
      "Why ask me when you can figure it out yourself?",
      "Seriously — what do you expect me to do, handhold you?",
      "Why are you relying on others for this?"
    ],
    therapist: [
      "How do you feel when you think about the answer?",
      "What do you think gaining this knowledge would do for you?",
      "When did you first start wondering this?"
    ],
    genz: [
      "Bruh, why you wanna know tho? 🤔",
      "Low-key, what would you even do with that info?",
      "No cap, why does this slap your curiosity? 😅"
    ]
  };
  const list = templates[mode] || templates.normal;
  return list[Math.floor(Math.random() * list.length)];
}

export default function Home() {
  const [mode, setMode] = useState("normal");
  const [messages, setMessages] = useState<{ id: string; from: "user" | "bot" | "system"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationActive, setConversationActive] = useState(false);
  const lastBotRef = useRef<string | null>(null);

  function makeId() {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
  }

  useEffect(() => {
    // no server/client seeded messages to avoid hydration differences
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pushMessage(from: "user" | "bot" | "system", text: string) {
    const id = makeId();
    // do not render `system` messages to avoid showing internal notices
    if (from === "system") return;
    setMessages((m) => [{ id, from, text }, ...m]);
    if (from === "bot") lastBotRef.current = text;
  }

  async function getCounter(questionText: string) {
    try {
      const res = await fetch("/api/reverse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, mode }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (data?.counterQuestion) return data.counterQuestion;
      return clientCounterQuestion(questionText, mode);
    } catch (e) {
      return clientCounterQuestion(questionText, mode);
    }
  }

  async function startConversation() {
    if (!input.trim()) return;
    const userQ = input.trim();
    pushMessage("user", userQ);
    setInput("");
    setLoading(true);
    setConversationActive(true);
    const counter = await getCounter(userQ);
    pushMessage("bot", counter);
    setLoading(false);
  }

  async function replyLoop() {
    // user replies to latest bot question
    if (!conversationActive) return;
    const userReply = input; // allow empty to stop
    if (userReply === "") {
      setConversationActive(false);
      setInput("");
      return;
    }
    pushMessage("user", userReply);
    setInput("");
    setLoading(true);
    const lastBot = lastBotRef.current || userReply;
    const promptForNext = `${lastBot} → user answered: ${userReply}`;
    const nextQ = await getCounter(promptForNext);
    pushMessage("bot", nextQ);
    setLoading(false);
  }

  function endConversation() {
    setConversationActive(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-[#0f172a] via-[#0b1220] to-[#001219] text-white">
      <div suppressHydrationWarning className="w-full max-w-3xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
        <header className="px-8 py-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.04)]">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Reverse Google</h1>
            <p className="text-sm text-[rgba(255,255,255,0.6)]">We won't answer — we make you answer yourself.</p>
          </div>
          <div className="flex gap-2">
            {modes.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-shadow ${
                  mode === m ? "bg-gradient-to-r from-pink-500 to-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.24)]" : "bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </header>

        <section className="p-6 flex flex-col-reverse gap-4 h-[60vh] overflow-auto" style={{ direction: "ltr" }}>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                m.from === "user" ? "bg-gradient-to-r from-blue-500 to-teal-400 text-black" : m.from === "bot" ? "bg-[rgba(255,255,255,0.04)] text-white" : "bg-[rgba(255,255,255,0.02)] text-gray-300"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </section>

        <footer className="p-6 border-t border-[rgba(255,255,255,0.04)]">
          <div className="flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  conversationActive ? replyLoop() : startConversation();
                }
              }}
              placeholder={conversationActive ? "Answer the question (leave empty and press Reply to go speechless)" : "Ask your initial question..."}
              className="flex-1 px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] placeholder:text-[rgba(255,255,255,0.4)]"
            />
            <button
              onClick={conversationActive ? replyLoop : startConversation}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] font-semibold"
            >
              {loading ? "Thinking..." : conversationActive ? "Reply" : "Start"}
            </button>
            <button onClick={endConversation} className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.03)]">Stop</button>
          </div>
          <p className="mt-3 text-xs text-[rgba(255,255,255,0.45)]">Tip: leave the input empty and press Reply to go speechless and end the loop.</p>
        </footer>
      </div>
    </main>
  );
}