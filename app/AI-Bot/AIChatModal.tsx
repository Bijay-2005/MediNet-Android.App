"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

const OPENROUTER_API_URL = process.env.NEXT_PUBLIC_OPENROUTER_API_URL || "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

// Debug: verify env availability in browser at runtime without exposing the key
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-console
  console.log('AIChat: OPENROUTER key present?', Boolean(OPENROUTER_API_KEY));
}

const SYSTEM_PROMPT = `
You are MediBot, a friendly and professional medical assistant. Follow these rules:

1. GREETINGS:
   - Respond warmly and professionally to greetings
   - Introduce yourself as a health assistant
   - Encourage users to ask medical questions

2. MEDICAL QUESTIONS:
   - Provide accurate, helpful medical information
   - Always recommend consulting healthcare providers for personal advice
   - Be professional but approachable

3. NON-MEDICAL QUESTIONS:
   - Politely redirect to medical topics
   - Template: "I specialize in medical questions. How can I help with your health concerns?"

4. MEDICAL RESPONSE FORMAT:
   **Condition/Query**
   ### Key Information
   - **Fact 1:** Detail
   - **Fact 2:** Detail

   ### Medical Guidance
   - Professional recommendation 1
   - Professional recommendation 2

   *Consult a healthcare provider for personal advice*
`;

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const MEDICAL_KEYWORDS = [
  // Symptoms
  'pain', 'fever', 'headache', 'rash', 'swelling', 'cough', 'bleeding',
  'nausea', 'vomit', 'diarrhea', 'fatigue', 'dizziness', 'shortness',
  
  // Conditions
  'diabetes', 'cancer', 'hiv', 'aids', 'flu', 'cold', 'fracture', 
  'infection', 'disease', 'hypertension', 'asthma', 'arthritis',
  
  // Treatments
  'medicine', 'drug', 'vaccine', 'treatment', 'surgery', 'therapy',
  
  // Body systems
  'heart', 'lung', 'liver', 'kidney', 'brain', 'nerve', 'bone',
  'skin', 'eye', 'ear', 'stomach', 'intestine', 'bladder'
];

const GREETING_KEYWORDS = [
  'hi', 'hello', 'hey', 'hii', 'hiii', 'hiiii', 'hallo', 'hallo',
  'good morning', 'good afternoon', 'good evening', 'gm', 'gn',
  'morning', 'afternoon', 'evening', 'sup', 'whatsup', 'what\'s up'
];

export default function AIChatModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 😇 I'm your health assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [cooldownMs, setCooldownMs] = useState(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle rate-limit cooldown countdown
  useEffect(() => {
    if (cooldownMs <= 0) return;
    const interval = setInterval(() => {
      setCooldownMs((ms) => {
        const next = Math.max(0, ms - 1000);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownMs]);

  const isMedicalQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return MEDICAL_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
  };

  const isGreeting = (query: string) => {
    const lowerQuery = query.toLowerCase().trim();
    return GREETING_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
  };

  const getGreetingResponse = () => {
    const greetings = [
      "Hello! 👋 I'm your health assistant. How can I help you with any medical questions today?",
      "Hi there! 😊 I'm here to help with your health concerns. What would you like to know?",
      "Hey! 🏥 Welcome! I'm your medical assistant. Feel free to ask me any health-related questions.",
      "Greetings! 🌟 I'm your health companion. How can I assist you with medical information today?",
      "Hello! 💙 I'm here to provide medical guidance. What health questions do you have?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // First check if it's a greeting
    if (isGreeting(input)) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: getGreetingResponse()
        }]);
        setLoading(false);
      }, 300);
      return;
    }

    // Then check if query is medical
    if (!isMedicalQuery(input)) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I specialize only in medical questions. Please ask about health concerns."
        }]);
        setLoading(false);
      }, 300);
      return;
    }

    try {
      if (!OPENROUTER_API_KEY) {
        throw new Error("API key not configured");
      }
      
      const response = await fetch(OPENROUTER_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          // Recommended OpenRouter headers for better routing/debugging
          "HTTP-Referer": typeof window !== 'undefined' ? window.location.origin : '',
          "X-Title": "MediBot"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(-3),
            userMessage
          ],
          max_tokens: 500,
          temperature: 0.7
        }),
      });

      // Diagnostic logging
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.log('AIChat: response.ok', response.ok, 'status', response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        let friendly = '**System Error**\n\nPlease try your medical question again.';
        if (response.status === 401 || response.status === 403) friendly = '**Auth Error**\n\nInvalid or expired API key.';
        else if (response.status === 429) {
          friendly = '**Rate Limit**\n\nToo many requests. Please wait and try again.';
          // Respect server-provided backoff when available
          const retryAfterHeader = response.headers.get('retry-after');
          let retryAfterMs = 15000;
          if (retryAfterHeader) {
            const parsedSeconds = parseInt(retryAfterHeader, 10);
            if (!Number.isNaN(parsedSeconds) && parsedSeconds > 0) {
              retryAfterMs = parsedSeconds * 1000;
            }
          }
          setCooldownMs((prev) => (prev > 0 ? prev : retryAfterMs));
        }
        else if (response.status >= 500) friendly = '**Service Unavailable**\n\nOpenRouter is unavailable. Try again later.';

        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-console
          console.error('AIChat: error response', response.status, errorText);
        }
        setMessages(prev => [...prev, { role: 'assistant', content: `${friendly}\n\n(Code ${response.status})` }]);
        return;
      }

      const data = await response.json();
      const aiMessage = data.choices[0]?.message?.content || "I couldn't process that request.";
      
      setMessages(prev => [...prev, { role: "assistant", content: aiMessage }]);
    } catch (err) {
      if (typeof window !== 'undefined') {
        // eslint-disable-next-line no-console
        console.error('AIChat: request failed', err);
      }
      const errorMessage = err instanceof Error && err.message === "API key not configured"
        ? "**Configuration Error**\n\nAPI key not configured. Please check your environment variables."
        : "**Network Error**\n\nCould not reach the AI service. Check your connection and try again.";
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md h-[80vh] rounded-xl flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <span className="text-xl">🤖</span>
            </div>
            <h2 className="text-lg font-bold">MediBot</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white/80 hover:bg-white/10">
            ✕
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[90%] rounded-lg p-4 ${
                msg.role === "user" 
                  ? "bg-blue-100 text-blue-900 rounded-br-none" 
                  : "bg-gray-50 text-gray-800 rounded-bl-none"
              }`}>
                <div className="prose prose-sm">
                  <ReactMarkdown>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-gray-50 rounded-b-xl">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a medical question..."
              className="flex-1 rounded-lg border-gray-300 focus-visible:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading || cooldownMs > 0}
            />
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={sendMessage}
              disabled={loading || cooldownMs > 0}
            >
              {loading ? "..." : (cooldownMs > 0 ? `Wait ${Math.ceil(cooldownMs/1000)}s` : "Ask")}
            </Button>
          </div>
          <div className="mt-2 text-center">
            {cooldownMs > 0 ? (
              <p className="text-xs text-amber-600">
                Rate limit active. Please wait {Math.ceil(cooldownMs/1000)}s before trying again.
              </p>
            ) : (
              <p className="text-xs text-gray-500">*Professional medical information only</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}