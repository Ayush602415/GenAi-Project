import { ChatIcon } from "./ChatIcon.jsx";

const promptIdeas = [
  { title: "Make a plan", description: "Help me turn a big goal into small steps." },
  { title: "Get inspired", description: "Give me a fresh perspective on a problem." },
  { title: "Learn something", description: "Explain a tricky idea in simple terms." },
];

export function ChatWelcome({ name, onPrompt }) {
  return (
    <div className="welcome-panel">
      <div className="welcome-symbol"><ChatIcon name="sparkle" className="h-7 w-7" /></div>
      <p className="welcome-eyebrow">YOUR THINKING PARTNER</p>
      <h1>Good to have you here, {name}.</h1>
      <p className="welcome-description">A question, a half-formed idea, a problem to untangle. Start anywhere.</p>
      <div className="prompt-grid">
        {promptIdeas.map((idea) => (
          <button className="prompt-card" key={idea.title} onClick={() => onPrompt(idea.description)}>
            <span className="prompt-card-title">{idea.title}</span>
            <span className="prompt-card-description">{idea.description}</span>
            <ChatIcon name="arrow" className="h-4 w-4 prompt-arrow" />
          </button>
        ))}
      </div>
    </div>
  );
}
