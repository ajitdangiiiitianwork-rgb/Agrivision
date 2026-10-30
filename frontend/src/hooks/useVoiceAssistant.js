// src/hooks/useVoiceAssistant.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useVoiceAssistant() {
  const { i18n } = useTranslation();
  const rawLang = (i18n.language || "mr").toLowerCase();
  const currentLang = rawLang.startsWith("hi") ? "hi" : rawLang.startsWith("mr") ? "mr" : "en";

  // Speech Synthesis (TTS)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasTtsSupport, setHasTtsSupport] = useState(false);
  const voicesRef = useRef([]);

  // Speech Recognition (STT)
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechError, setSpeechError] = useState("");
  const recognitionRef = useRef(null);

  // Load available speech synthesis voices
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setHasTtsSupport(true);

      const updateVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices() || [];
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  // Stop TTS cleanly on unmount or navigation
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (err) {
          void err;
        }
      }
    };
  }, []);

  /**
   * Speak given text in target language
   */
  const speak = useCallback(
    (text, forcedLang) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      if (!text || typeof text !== "string") return;

      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const rawTarget = (forcedLang || currentLang || "mr").toLowerCase();
      const langToUse = rawTarget.startsWith("hi") ? "hi" : rawTarget.startsWith("mr") ? "mr" : "en";
      const utterance = new SpeechSynthesisUtterance(text);

      // Select suitable voice
      const voices = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
      let chosenVoice = null;

      if (langToUse === "hi") {
        chosenVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("hi") ||
            v.name.toLowerCase().includes("hindi")
        );
        utterance.lang = "hi-IN";
      } else if (langToUse === "mr") {
        // Look for Marathi voice first
        chosenVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("mr") ||
            v.name.toLowerCase().includes("marathi")
        );
        // Fallback to Hindi voice if Marathi voice not installed in OS
        if (!chosenVoice) {
          chosenVoice = voices.find(
            (v) =>
              v.lang.toLowerCase().startsWith("hi") ||
              v.name.toLowerCase().includes("hindi")
          );
        }
        utterance.lang = "mr-IN";
      } else {
        chosenVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("en-in") ||
            v.lang.toLowerCase().startsWith("en")
        );
        utterance.lang = "en-IN";
      }

      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.rate = 0.95; // Slightly slower, clear pace for farmers
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (e) => {
        // If canceled explicitly, ignore error
        if (e.error !== "canceled" && e.error !== "interrupted") {
          console.warn("TTS error:", e);
        }
        setIsSpeaking(false);
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("speechSynthesis.speak failed:", err);
        setIsSpeaking(false);
      }
    },
    [currentLang]
  );

  /**
   * Stop speaking immediately
   */
  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  /**
   * Start Speech-to-Text
   */
  const startListening = useCallback(
    (onResultCallback) => {
      setSpeechError("");
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setSpeechError(
          currentLang === "hi"
            ? "आपके ब्राउज़र में आवाज पहचानने की सुविधा उपलब्ध नहीं है।"
            : currentLang === "mr"
            ? "आपल्या ब्राउझरमध्ये आवाज ओळखण्याची सुविधा उपलब्ध नाही."
            : "Voice recognition is not supported in this browser."
        );
        return;
      }

      try {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        const langLocale =
          currentLang === "hi"
            ? "hi-IN"
            : currentLang === "mr"
            ? "mr-IN"
            : "en-IN";

        recognition.lang = langLocale;
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript("");
        };

        recognition.onresult = (event) => {
          let text = "";
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          setTranscript(text);
          if (onResultCallback && typeof onResultCallback === "function") {
            onResultCallback(text);
          }
        };

        recognition.onerror = (event) => {
          console.warn("Speech recognition error:", event.error);
          setIsListening(false);
          if (event.error === "not-allowed" || event.error === "permission-denied") {
            setSpeechError(
              currentLang === "hi"
                ? "माइक्रोफोन अनुमति अस्वीकार कर दी गई है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।"
                : currentLang === "mr"
                ? "मायक्रोफोन परवानगी नाकारली गेली आहे. कृपया ब्राउझरमध्ये परवानगी द्या."
                : "Microphone permission was denied. Please allow microphone access."
            );
          } else if (event.error !== "no-speech") {
            setSpeechError(
              currentLang === "hi"
                ? "आवाज स्पष्ट सुनाई नहीं दी। कृपया पुनः बोलें।"
                : currentLang === "mr"
                ? "आवाज स्पष्ट ऐकू आला नाही. कृपया पुन्हा बोला."
                : "Speech could not be recognized. Please try again."
            );
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err) {
        console.warn("Speech recognition start failed:", err);
        setIsListening(false);
        setSpeechError(
          currentLang === "mr"
            ? "मायक्रोफोन सुरू करता आला नाही."
            : "Could not start microphone."
        );
      }
    },
    [currentLang]
  );

  /**
   * Stop Speech-to-Text
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        void err;
      }
      setIsListening(false);
    }
  }, []);

  return {
    // TTS
    isSpeaking,
    speak,
    stopSpeaking,
    hasTtsSupport,
    // STT
    isListening,
    transcript,
    speechError,
    startListening,
    stopListening,
    currentLang
  };
}

export default useVoiceAssistant;
