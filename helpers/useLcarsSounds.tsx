import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

// --- Types ---

interface LcarsSoundContextType {
  playClick: () => void;
  playBeep: () => void;
  playAlert: () => void;
  playTransition: () => void;
  playSuccess: () => void;
  playError: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  toggleSound: () => void;
  isSoundEnabled: boolean;
  isSpeaking: boolean;
}

// --- Context ---

const LcarsSoundContext = createContext<LcarsSoundContextType | null>(null);

// --- Audio Logic ---

/**
 * Helper to create an oscillator with an envelope
 */
const playTone = (
  ctx: AudioContext,
  freq: number,
  type: OscillatorType,
  duration: number,
  startTime: number = 0,
  vol: number = 0.1,
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);

  // Envelope
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.01); // Attack
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Decay

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

/**
 * Helper for frequency sweeps (chirps/slides)
 */
const playSweep = (
  ctx: AudioContext,
  startFreq: number,
  endFreq: number,
  duration: number,
  type: OscillatorType = "sine",
  startTime: number = 0,
  vol: number = 0.1,
) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, startTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

  // Envelope
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(vol, startTime + 0.01);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
};

// --- Provider Component ---

export const LcarsSoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize AudioContext lazily on user interaction if enabled
  const initAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      // @ts-expect-error - webkitAudioContext fallback for older Safari
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const next = !prev;
      if (next) {
        initAudioContext();
      }
      return next;
    });
  }, [initAudioContext]);

  // --- Sound Effects ---

  const playClick = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // High pitched chirp: 1200Hz, very short
    playTone(ctx, 1200, "sine", 0.05, now, 0.05);
  }, [isSoundEnabled]);

  const playBeep = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // Standard beep: 800Hz
    playTone(ctx, 800, "sine", 0.1, now, 0.05);
  }, [isSoundEnabled]);

  const playAlert = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // Two-tone alert
    playTone(ctx, 600, "square", 0.15, now, 0.03);
    playTone(ctx, 900, "square", 0.15, now + 0.15, 0.03);
  }, [isSoundEnabled]);

  const playTransition = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // Sweep up
    playSweep(ctx, 400, 800, 0.2, "sine", now, 0.04);
  }, [isSoundEnabled]);

  const playSuccess = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // Ascending major third
    playTone(ctx, 880, "sine", 0.1, now, 0.05); // A5
    playTone(ctx, 1108, "sine", 0.15, now + 0.1, 0.05); // C#6
  }, [isSoundEnabled]);

  const playError = useCallback(() => {
    if (!isSoundEnabled || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    // Descending tritone/dissonant
    playTone(ctx, 440, "sawtooth", 0.15, now, 0.03);
    playTone(ctx, 311, "sawtooth", 0.3, now + 0.15, 0.03);
  }, [isSoundEnabled]);

  const speak = useCallback((text: string) => {
    if (!isSoundEnabled) return;
    if (!('speechSynthesis' in window)) {
      console.warn("Speech synthesis not supported");
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Try to find a computer-like voice
    const voices = window.speechSynthesis.getVoices();
    const computerVoice = voices.find(
      voice => 
        voice.name.toLowerCase().includes('alex') || // macOS Alex is good
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('google uk english male') ||
        voice.name.toLowerCase().includes('microsoft david')
    );
    
    if (computerVoice) {
      utterance.voice = computerVoice;
    }
    
    // Computer-like voice settings
    utterance.rate = 1.1; // Slightly faster
    utterance.pitch = 0.8; // Lower pitch for computer effect
    utterance.volume = 0.7;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      console.log("Started speaking");
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      console.log("Finished speaking");
    };
    
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isSoundEnabled]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Auto-resume context if it gets suspended (common browser behavior)
  useEffect(() => {
    const handleInteraction = () => {
      if (isSoundEnabled && audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [isSoundEnabled]);

  // Load voices on mount (needed for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.getVoices();
      
      // Some browsers need this event to load voices
      const loadVoices = () => {
        window.speechSynthesis.getVoices();
      };
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const value = {
    playClick,
    playBeep,
    playAlert,
    playTransition,
    playSuccess,
    playError,
    speak,
    stopSpeaking,
    toggleSound,
    isSoundEnabled,
    isSpeaking,
  };

  return (
    <LcarsSoundContext.Provider value={value}>
      {children}
    </LcarsSoundContext.Provider>
  );
};

// --- Hook ---

export const useLcarsSounds = () => {
  const context = useContext(LcarsSoundContext);
  if (!context) {
    throw new Error("useLcarsSounds must be used within a LcarsSoundProvider");
  }
  return context;
};