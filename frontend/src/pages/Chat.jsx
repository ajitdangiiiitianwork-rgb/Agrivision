// src/pages/Chat.jsx
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SendHorizontal, Sparkles, Bot, User, Trash2, HelpCircle } from "lucide-react";

import { chatWithBot } from "../utils/api";
import VoiceSpeakerButton from "../components/farmer/VoiceSpeakerButton";
import VoiceMicButton from "../components/farmer/VoiceMicButton";
import FarmerButton from "../components/farmer/FarmerButton";

export default function Chat() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "mr";
  const isMr = currentLang === "mr";

  const initialGreeting = isMr
    ? "नमस्कार शेतकरी बांधवांनो! मी आपला AgriVision कृषी मित्र आहे. खते, औषधे, हवामान, रोग नियंत्रण किंवा पुणे व महाराष्ट्रातील बाजारभावांबद्दल मला काहीही विचारा."
    : "Hello Farmer Friend! I am your AgriVision AI Farming Assistant. Ask me anything about crops, fertilizers, pest control, weather, or Pune mandi rates.";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: initialGreeting,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Pune / Maharashtra specific prompt pills
  const promptPills = isMr
    ? [
        "🍅 पुणे / नारायणगाव बाजारात टोमॅटोचे चालू भाव काय आहेत?",
        "🧅 कांदा साठवणूक आणि भाव वाढीचा अंदाज सांगा",
        "🌾 बारामती भागात सोयाबीन आणि गहू उत्पादन वाढीसाठी खत सल्ला",
        "🎋 उसावरील खोडकिडीवर सेंद्रिय उपाय काय?",
        "🌿 डाळिंब बागेतील तेल्या रोगावर प्रतिबंधात्मक उपाय"
      ]
    : [
        "🍅 What are today's tomato prices in Narayangaon / Pune?",
        "🧅 When should I sell stored onions for the best price?",
        "🌾 Best fertilizer schedule for soybean in Pune district",
        "🎋 Organic remedies for sugarcane stem borer",
        "🌿 How to prevent bacterial blight in pomegranate?"
      ];

  const handleSend = async (customText) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || loading) return;

    const userMsg = {
      role: "user",
      content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatWithBot(textToSend, currentLang);
      const replyText =
        response?.reply ||
        response?.text ||
        (isMr
          ? "माहिती मिळाली नाही, कृपया पुन्हा विचारा."
          : "Could not get an answer. Please try again.");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isMr
            ? "⚠️ सर्व्हरशी जोडणी होऊ शकली नाही. कृपया इंटरनेट तपासा आणि पुन्हा प्रयत्न करा."
            : "⚠️ Unable to reach the AI assistant. Please check your internet connection.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: "assistant",
        content: initialGreeting,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-3 sm:px-6">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-5 shadow-sm border border-emerald-900/10 dark:border-neutral-800 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-emerald-700 text-white shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-50">
                {isMr ? "AgriVision कृषी मित्र" : "AgriVision AI Assistant"}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live AI
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {isMr
                ? "पुणे व महाराष्ट्रातील शेती, पिके व बाजारभावासाठी २४×७ सहाय्यक"
                : "24×7 smart advisory for crops, pests & Pune mandi prices"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          title={isMr ? "संभाषण साफ करा" : "Clear chat"}
          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompt Suggestions */}
      <div className="mb-4">
        <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isMr ? "शेतकऱ्यांचे नेहमीचे प्रश्न (टॅप करा):" : "Frequently Asked Questions (Tap to ask):"}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(pill)}
              disabled={loading}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-neutral-800 hover:border-emerald-500 hover:bg-emerald-50/60 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 whitespace-nowrap transition cursor-pointer shadow-2xs"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white/95 dark:bg-neutral-900/90 rounded-3xl border border-emerald-900/10 dark:border-neutral-800 p-4 sm:p-6 shadow-sm min-h-[50vh] max-h-[60vh] overflow-y-auto space-y-4">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <div
              key={i}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? "bg-emerald-700 text-white"
                    : "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs space-y-2 ${
                  isUser
                    ? "bg-emerald-700 text-white rounded-tr-none"
                    : m.isError
                    ? "bg-red-50 text-red-950 border border-red-200 dark:bg-red-950/40 dark:text-red-100 rounded-tl-none"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-tl-none border border-neutral-200/60 dark:border-neutral-700"
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {m.content}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 text-[11px] opacity-70 border-t border-current/10">
                  <span>{m.time}</span>
                  {!isUser && !m.isError && (
                    <VoiceSpeakerButton text={m.content} size="sm" />
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-tl-none p-4 bg-neutral-100 dark:bg-neutral-800 text-sm font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span>{isMr ? "कृषी मित्र विचार करत आहे..." : "AgriVision AI is thinking..."}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="mt-4 bg-white dark:bg-neutral-900 rounded-3xl p-2.5 border-2 border-emerald-500/40 dark:border-neutral-700 shadow-md flex items-center gap-2">
        {/* Voice Input Button */}
        <VoiceMicButton
          onTranscript={(text) => {
            setInput(text);
          }}
        />

        {/* Text Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={
            isMr
              ? "आपला शेतीविषयक प्रश्न येथे विचारा..."
              : "Ask your farming question here..."
          }
          className="flex-1 bg-transparent px-3 py-2 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none min-h-[46px]"
        />

        {/* Send Button */}
        <FarmerButton
          size="md"
          variant="primary"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          ariaLabel="Send question"
        >
          <SendHorizontal className="w-5 h-5" />
        </FarmerButton>
      </div>
    </div>
  );
}
