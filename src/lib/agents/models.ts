import Groq from "groq-sdk";

// === GROQ MODELS (OpenAI via Groq API) ===
// Lazy initialization to avoid build-time errors when env vars are not set
let _groq: Groq | null = null;

export function getGroq(): Groq {
    if (!_groq) {
        _groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    }
    return _groq;
}

// For backward compatibility - use getter to lazy init
export const groq = {
    get chat() {
        return getGroq().chat;
    }
};

// Model assignments
export const GROQ_MODEL_STANDARD = "openai/gpt-oss-120b"; // For most tasks
export const GROQ_MODEL_EXPERT = "openai/gpt-oss-20b"; // For complex reasoning (Medical Expert)
