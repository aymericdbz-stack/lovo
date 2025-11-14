'use client';

import { useState, type ReactElement } from "react";

type IconProps = {
  className?: string;
};

type SidebarItem = {
  label: string;
  icon: (props: IconProps) => ReactElement;
  active?: boolean;
};

type ChatItem = {
  name: string;
  message: string;
  time: string;
  unread?: number;
  pinned?: boolean;
  active?: boolean;
};

type Message = {
  id: number;
  author: "partner" | "user";
  text: string;
  time: string;
};

type ConversationEvent =
  | { type: "message"; payload: Message }
  | { type: "shortcut"; label: string };

const partnerName = "Mon amour 🧡";
const userName = "Moi";

const sidebarItems: SidebarItem[] = [
  { label: "Discussions", icon: ChatBubbleIcon, active: true },
  { label: "Statut", icon: StatusIcon },
  { label: "Canaux", icon: MegaphoneIcon },
  { label: "Réglages", icon: SettingsIcon },
];

const filters = ["All", "Unread", "Favorites", "Groups"];

const chats: ChatItem[] = [
  {
    name: "Studio Nova",
    message: "Lina: la maquette est en ligne.",
    time: "13:50",
    pinned: true,
    unread: 4,
  },
  {
    name: "Équipe Atlas",
    message: "Yvi: Anniv surprise à fêter alors...",
    time: "13:34",
    unread: 1,
  },
  {
    name: "🔥 Orbit Squad",
    message: "Colombe: https://luma.com/mock",
    time: "13:07",
  },
  {
    name: "Atelier Cosmo",
    message: "Ambre: Ce message a été effacé.",
    time: "12:14",
  },
  {
    name: "Jules Brion",
    message: "On se capte à 13h30 ?",
    time: "11:58",
  },
  {
    name: "Famille Louise",
    message: "Hello. J'arrive lundi à Paris 💌",
    time: "11:56",
  },
  {
    name: "Cercle Comète",
    message: "Rami: I'm going to call you today",
    time: "11:56",
  },
  {
    name: "Mon amour 🧡",
    message: "Deso bb j’essaye de pas rentrer trop tard.",
    time: "13:42",
    active: true,
  },
  {
    name: "Laboratoire Nébuleuse",
    message: "Zélie: Ahaha ça régale",
    time: "11:30",
  },
  {
    name: "Naïma Duarte",
    message: "tant que l'on est capable de se l'offrir",
    time: "11:03",
  },
  {
    name: "Doriane Renou",
    message: "Je n'ai pas pu te répondre, sorry.",
    time: "10:45",
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    author: "partner",
    text: "Coucou, tu passes une bonne journée?",
    time: "14:20",
  },
  { id: 2, author: "user", text: "Oui top", time: "14:20" },
  {
    id: 3,
    author: "partner",
    text: "tu rentres à quelle heure ce soir?",
    time: "14:21",
  },
  {
    id: 4,
    author: "user",
    text: "je sais pas trop en vrai, peut-être que je bois un verre avec les copains",
    time: "14:21",
  },
  {
    id: 5,
    author: "partner",
    text: "Ok ok, je pensais qu’on dinait ensemble.\nMoi rien de prévu du coup",
    time: "14:21",
  },
  {
    id: 6,
    author: "user",
    text: "ah j’avais oublié, on peut dîner quand je rentre vers 22h/23h?",
    time: "14:21",
  },
  { id: 7, author: "partner", text: "ouais", time: "14:21" },
  { id: 8, author: "user", text: "mais ça va?", time: "14:21" },
  {
    id: 9,
    author: "partner",
    text: "déjà ma boss me saoule, on a un point demain.\nEt en plus, je croyais qu’on dinait ensemble ce soir",
    time: "14:22",
  },
];

const conversationEvents: ConversationEvent[] = [
  {
    type: "message",
    payload: {
      id: 10,
      author: "partner",
      text: "Do you want to go to the cinema tonight?",
      time: "14:23",
    },
  },
  {
    type: "message",
    payload: {
      id: 11,
      author: "user",
      text: "Yes sure, which film ?",
      time: "14:23",
    },
  },
  {
    type: "message",
    payload: {
      id: 12,
      author: "partner",
      text: "Chien 51",
      time: "14:24",
    },
  },
  { type: "shortcut", label: "Book a movie night for Chien 51" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [scriptIndex, setScriptIndex] = useState(0);
  const [shortcutVisible, setShortcutVisible] = useState(false);

  const handleSimulatedMessage = () => {
    if (scriptIndex >= conversationEvents.length) {
      return;
    }
    const event = conversationEvents[scriptIndex];
    if (event.type === "message") {
      setMessages((prev) => [...prev, event.payload]);
    } else {
      setShortcutVisible(true);
    }
    setScriptIndex((prev) => prev + 1);
  };

  const handleShortcutClick = () => {
    console.log("TODO: connect webhook to book movie night for Chien 51");
  };

  const simulateDisabled = scriptIndex >= conversationEvents.length;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b141a] px-3 py-6 text-white">
      <div className="flex w-full max-w-[1180px] flex-col overflow-hidden rounded-[32px] border border-black/30 bg-[#101a24] shadow-[0_30px_120px_rgba(0,0,0,0.55)] lg:h-[760px] lg:flex-row">
        <aside className="hidden w-20 flex-col items-center gap-6 border-r border-black/40 bg-[#0b141a] px-4 pt-6 lg:flex">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/10 text-sm font-semibold text-emerald-300">
            YOU
          </div>
          <div className="flex flex-1 flex-col items-center gap-4">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
                  item.active
                    ? "bg-emerald-400/15 text-emerald-300"
                    : "text-[#d1d7db]"
                } hover:bg-white/10`}
                aria-label={item.label}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    item.active ? "text-emerald-300" : "text-[#d1d7db]"
                  }`}
                />
              </button>
            ))}
          </div>
        </aside>
        <section className="w-full border-r border-black/40 bg-[#1f2c34] lg:w-[340px]">
          <header className="flex items-center justify-between border-b border-black/40 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0b141a] text-center text-sm font-semibold leading-10 text-[#d1d7db]">
                {getInitials("You")}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {userName}
                </span>
                <span className="text-xs text-[#8696a0]">
                  Disponible pour dîner
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <StatusIcon className="h-5 w-5 text-[#c5d6da]" />
              <ChatBubbleIcon className="h-5 w-5 text-[#c5d6da]" />
              <DotsIcon className="h-5 w-5 text-[#c5d6da]" />
            </div>
          </header>
          <div className="border-b border-black/40 px-4 py-3 text-xs font-semibold uppercase text-[#8696a0]">
            <div className="flex items-center gap-3">
              {filters.map((filter) => (
                <span
                  key={filter}
                  className={`cursor-pointer rounded-full px-3 py-1 ${
                    filter === "All"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "hover:bg-white/5"
                  }`}
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
          <div className="px-4 pb-3 pt-2">
            <div className="flex items-center gap-3 rounded-2xl bg-[#111b21] px-3 py-2 text-sm text-[#aebac1]">
              <SearchIcon className="h-4 w-4 text-[#aebac1]" />
              <span>Search or start new chat</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pb-4">
            {chats.map((chat) => (
              <article
                key={chat.name}
                className={`flex cursor-pointer gap-3 px-4 py-3 transition-colors ${
                  chat.active ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b141a] text-sm font-semibold text-[#d1d7db]">
                    {getInitials(chat.name)}
                  </div>
                  {chat.pinned && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-[#1f2c34] p-1 text-emerald-300">
                      <PinIcon className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1 border-b border-white/5 pb-3">
                  <div className="flex items-start justify-between">
                    <p className="truncate text-[15px] font-medium text-white">
                      {chat.name}
                    </p>
                    <span className="text-[11px] uppercase text-[#8696a0]">
                      {chat.time}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-[#c5d6da]">
                    <p className="truncate">{chat.message}</p>
                    {chat.unread && (
                      <span className="ml-auto inline-flex min-w-[22px] justify-center rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold text-[#0b141a]">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="flex flex-1 flex-col bg-[#0b141a]">
          <header className="flex h-20 items-center justify-between border-b border-black/40 bg-[#1f2c34] px-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#0b141a] text-center text-lg font-bold leading-[48px] text-[#d1d7db]">
                {getInitials(partnerName)}
              </div>
              <div>
                <p className="text-base font-semibold text-white">
                  {partnerName}
                </p>
                <p className="text-sm text-[#8696a0]">en ligne</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[#aebac1]">
              <SearchIcon className="h-5 w-5" />
              <PaperclipIcon className="h-5 w-5" />
              <DotsIcon className="h-5 w-5" />
              <button
                className={`rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60`}
                onClick={handleSimulatedMessage}
                disabled={simulateDisabled}
              >
                {simulateDisabled
                  ? "Aucun nouveau message"
                  : "Recevoir un message"}
              </button>
            </div>
          </header>
          <div className="relative flex-1 overflow-hidden">
            <div className="chat-wallpaper absolute inset-0" />
            <div className="relative z-10 flex h-full flex-col gap-6 overflow-y-auto px-6 py-10">
              <div className="mx-auto rounded-full bg-[#0b141a]/60 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#d1d7db]">
                Aujourd’hui
              </div>
              <div className="flex flex-col gap-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.author === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[75%] rounded-2xl px-4 py-3 text-[15px] leading-6 text-[#111b21] shadow-md ${
                        message.author === "user"
                          ? "rounded-br-sm bg-[#d9fdd3]"
                          : "rounded-bl-sm bg-white"
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      <div className="mt-2 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                        <span>{message.time}</span>
                        {message.author === "user" && (
                          <ChecksIcon className="h-3.5 w-3.5 text-[#53bdeb]" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {shortcutVisible && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleShortcutClick}
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-5 py-2 text-sm font-semibold text-[#0b141a] shadow-lg hover:bg-[#1dc85a]"
                    >
                      Book a movie night for Chien 51
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <footer className="flex items-center gap-4 border-t border-black/40 bg-[#1f2c34] px-6 py-4">
            <EmojiIcon className="h-6 w-6 text-[#aebac1]" />
            <PlusIcon className="h-6 w-6 text-[#aebac1]" />
            <div className="flex-1 rounded-2xl bg-[#2a3942] px-4 py-3 text-sm text-[#d1d7db]">
              Écrire un message
            </div>
            <MicIcon className="h-6 w-6 text-[#aebac1]" />
          </footer>
        </section>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  const sanitised = name.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]/g, " ").trim();
  const parts = sanitised.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "•";
}

function ChatBubbleIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5h14a2 2 0 012 2v9a2 2 0 01-2 2H8l-4 4v-15a2 2 0 012-2z" />
      <path d="M8 11h8" />
      <path d="M8 7h5" />
    </svg>
  );
}

function StatusIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v4" />
      <path d="M12 12l3 3" />
    </svg>
  );
}

function MegaphoneIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 11l14-5v12L3 13z" />
      <path d="M17 6v12" />
      <path d="M6 15v4l4 1" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function SearchIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function PaperclipIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 13l7.5-7.5a3.5 3.5 0 115 5L12 18a4.5 4.5 0 11-6.4-6.4l8.2-8.2" />
    </svg>
  );
}

function DotsIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function EmojiIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      <path d="M9 9h.01M15 9h.01" />
    </svg>
  );
}

function PlusIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function MicIcon({ className = "h-5 w-5 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="4" width="6" height="10" rx="3" />
      <path d="M5 11v1a7 7 0 0014 0v-1" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12l-3 7v4l3 3H6l3-3v-4z" />
      <path d="M12 14v7" />
    </svg>
  );
}

function ChecksIcon({ className = "h-4 w-4 text-[#d1d7db]" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 13l-3-3" />
      <path d="M7 13l4-4" />
      <path d="M14 13l-3-3" />
      <path d="M14 13l6-6" />
    </svg>
  );
}
