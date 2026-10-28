import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Smile,
  Sparkles,
  X,
} from 'lucide-react';
import { siteConfig } from '@/site-config';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: string[];
  cta?: { label: string; href: string };
}

const KNOWLEDGE_BASE: { keywords: string[]; answer: string; cta?: { label: string; href: string } }[] = [
  {
    keywords: ['guaranteed', 'rent-to-rent', 'rent to rent', 'guarantee', 'fixed rent', 'void', 'every month', 'pay'],
    answer:
      'The #1 advantage with JM LetVest is 100% Guaranteed Rent paid every single month without fail. We sign a commercial agreement with you (typically 3–5 years) and pay your agreed rent directly into your bank on the same date each month — whether the property is occupied or not. Zero void periods, zero tenant chasing, and £0 management fees deducted!',
    cta: { label: 'Explore Guaranteed Rent', href: '#services' },
  },
  {
    keywords: ['care', 'cared for', 'look after', 'damage', 'repairs', 'maintenance', 'clean', 'inspection'],
    answer:
      'Your property will be cared for as if it were our own. We conduct regular photographic inspections, employ vetted local Sussex trades (gas, electrics, plumbing), carry out preventive maintenance at zero markup, and maintain hotel-grade cleanliness for every stay. At the end of the term, your property is returned in equal or better condition.',
    cta: { label: 'Our Property Care Standard', href: '#property-care' },
  },
  {
    keywords: ['airbnb', 'holiday', 'short stay', 'goodwood', 'short let', 'guest', 'wittering'],
    answer:
      'We offer complete hands-off Airbnb & holiday let management across West Sussex! From dynamic pricing during peak seasons (such as the Goodwood Festival of Speed and summer coastal surges) to 24/7 guest check-in, 5-star linen and cleaning, and listing optimization on Airbnb, Booking.com, and Vrbo. You also get an owner portal to block dates for personal use.',
    cta: { label: 'See Airbnb Management', href: '#services' },
  },
  {
    keywords: ['area', 'location', 'where', 'cover', 'chichester', 'worthing', 'crawley', 'horsham', 'arundel', 'bognor'],
    answer:
      'We cover all of West Sussex! Core locations include Chichester, Worthing, Arundel, Horsham, Crawley, Bognor Regis, Littlehampton, Shoreham-by-Sea, The Witterings, Haywards Heath, and the South Downs National Park villages. If your property is in or near West Sussex, we can manage it.',
    cta: { label: 'Explore Sussex Areas', href: '#local' },
  },
  {
    keywords: ['fee', 'cost', 'charge', 'commission', 'price', 'pricing', 'how much'],
    answer:
      'For our Guaranteed Rent model, there are £0 letting fees and 0% commission deducted — the agreed rent is what you receive. For Fully Managed letting and Airbnb management, our transparent commission models include all marketing, management, inspections, and compliance oversight with zero hidden extras.',
    cta: { label: 'Compare Options', href: '#compare' },
  },
  {
    keywords: ['valuation', 'appraisal', 'quote', 'contact', 'call', 'speak', 'phone', 'email'],
    answer:
      'We would be delighted to visit your property or speak on the phone to provide a free, no-obligation rental appraisal comparing all three letting options. You can fill out the form below or call our West Sussex office directly on ' +
      siteConfig.phone +
      '.',
    cta: { label: 'Request Free Appraisal', href: '#contact' },
  },
  {
    keywords: ['about', 'who are you', 'jm letvest', 'company', 'brand', 'background'],
    answer:
      'JM LetVest Ltd is a premier independent West Sussex property letting, rent-to-rent and Airbnb management company. We combine the financial security of guaranteed institutional leases with the genuine care and local insight of a dedicated boutique team based in Sussex.',
    cta: { label: 'Read Our Story', href: '#about' },
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: 'Hello and welcome to JM LetVest Ltd! 👋 I am your digital property concierge.',
    time: 'Just now',
  },
  {
    id: '2',
    sender: 'bot',
    text: 'Whether you want Guaranteed Rent paid every single month, boutique Airbnb hosting, or fully managed letting in West Sussex, we are here to help your property thrive with zero hassle.',
    time: 'Just now',
    options: [
      '💰 How does Guaranteed Rent work?',
      '🛡️ How will you care for my property?',
      '🏖️ Can I do Airbnb with my property?',
      '📍 Which areas of Sussex do you cover?',
      '📞 Book a free property appraisal',
    ],
  },
];

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const respond = (query: string) => {
    const q = query.toLowerCase();
    let match = KNOWLEDGE_BASE.find((k) => k.keywords.some((w) => q.includes(w)));

    let answerText = '';
    let cta: { label: string; href: string } | undefined;

    if (match) {
      answerText = match.answer;
      cta = match.cta;
    } else {
      answerText =
        'Thank you for asking! JM LetVest Ltd specializes in 100% Guaranteed Rent (paid every month without fail), fully managed letting, and Airbnb management across West Sussex. Would you like to speak directly with our local property team or book a free appraisal?';
      cta = { label: 'Book a Free Appraisal', href: '#contact' };
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          sender: 'bot',
          text: answerText,
          time: getTime(),
          cta,
        },
      ]);
    }, 550);
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
      time: getTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    respond(text);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className={`chatbot-trigger${isOpen ? ' active' : ''}`}
        aria-label="Open JM LetVest chat concierge"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="chatbot-trigger-avatar">
          {isOpen ? <X size={22} /> : <Smile size={22} />}
        </span>
        <span className="chatbot-trigger-text">
          <strong>JM LetVest Concierge</strong>
          <small>Friendly local advice</small>
        </span>
        <span className="chatbot-online-pulse" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <aside className="chatbot-window" aria-label="JM LetVest Digital Assistant">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-brand">
              <div className="chatbot-bot-icon">
                <Smile size={20} />
              </div>
              <div>
                <h4>JM LetVest Concierge</h4>
                <p>
                  <span className="online-dot" /> Online · Friendly Property Advisor
                </p>
              </div>
            </div>
            <button
              type="button"
              className="chatbot-close"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick Notice Banner */}
          <div className="chatbot-banner">
            <Sparkles size={14} />
            <span>Main Advantage: <strong>Guaranteed Rent Paid Every Month</strong></span>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages" ref={scrollRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chatbot-msg ${m.sender}`}>
                {m.sender === 'bot' && (
                  <div className="chatbot-msg-avatar">
                    <Smile size={14} />
                  </div>
                )}
                <div className="chatbot-bubble">
                  <p>{m.text}</p>
                  {m.cta && (
                    <a
                      href={m.cta.href}
                      className="chatbot-cta-btn"
                      onClick={() => setIsOpen(false)}
                    >
                      {m.cta.label} <ArrowRight size={14} />
                    </a>
                  )}
                  {m.options && (
                    <div className="chatbot-options">
                      {m.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="chatbot-opt-btn"
                          onClick={() => handleSend(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="chatbot-time">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg bot">
                <div className="chatbot-msg-avatar">
                  <Smile size={14} />
                </div>
                <div className="chatbot-bubble typing">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Bar */}
          <div className="chatbot-quick-chips">
            <button
              type="button"
              onClick={() => handleSend('How does guaranteed rent work?')}
            >
              💰 Guaranteed Rent
            </button>
            <button
              type="button"
              onClick={() => handleSend('How is my property cared for?')}
            >
              🛡️ Property Care
            </button>
            <button
              type="button"
              onClick={() => handleSend('Tell me about Airbnb management')}
            >
              🏖️ Airbnb Stays
            </button>
          </div>

          {/* Input Bar */}
          <form
            className="chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Ask about rent, care, Airbnb..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Your question for JM LetVest"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>

          {/* Footer Direct Contact */}
          <div className="chatbot-footer">
            <span>Direct helpline:</span>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>
              <Phone size={12} /> {siteConfig.phone}
            </a>
          </div>
        </aside>
      )}
    </>
  );
}
