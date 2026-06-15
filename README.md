<div align="center">

![IRIS Neural OS Documentation Banner](./assets/banner.png)

### Voice-First Desktop AI Assistant

**Build faster. Automate workflows. Control your desktop with Voice Commands.**

---

<div style="display: flex; justify-center; gap: 10px; margin-bottom: 20px;">

  <a href="https://github.com/IRISX-AI/IRIS-AI/stargazers">
    <img src="https://img.shields.io/github/stars/IRISX-AI/IRIS-AI?style=for-the-badge&color=10b981&logo=github&logoColor=white" alt="GitHub stars">
  </a>

  <a href="https://github.com/IRISX-AI/IRIS-AI/network/members">
    <img src="https://img.shields.io/github/forks/201Harsh/IRIS-AI?style=for-the-badge&color=10b981&logo=git&logoColor=white" alt="GitHub forks">
  </a>

  <a href="https://github.com/IRISX-AI/IRIS-AI/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/IRISX-AI/IRIS-AI?style=for-the-badge&color=10b981&logo=users&logoColor=white" alt="Contributors">
  </a>

  <a href="https://github.com/IRISX-AI/IRIS-AI/releases">
    <img src="https://img.shields.io/github/downloads/IRISX-AI/IRIS-AI/total?style=for-the-badge&color=10b981&logo=download&logoColor=white" alt="Downloads">
  </a>

  <a href="https://github.com/sponsors/201Harsh">
    <img src="https://img.shields.io/badge/Sponsor-Support%20IRIS-ff69b4?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Sponsors">
  </a>

</div>

**Speak your command. IRIS executes it.**

A voice-first neural execution system powered by **Gemini 3.1 Live API** with real-time WebRTC audio, biometric security, and autonomous system control.

---

</div>

# 📑 Table of Contents

- [⚡ Overview](#-overview)
- [🎯 What is Voice-First?](#-what-is-voice-first)
- [✨ Core Features](#-core-features)
- [🔐 Code Protection & Security](#-code-protection--security)
- [💰 Sponsorship Tiers](#-sponsorship-tiers)
- [🏗️ Architecture](#️-architecture)
- [💻 Tech Stack](#-tech-stack)
- [🚀 Installation & Setup](#-installation--setup)
- [📁 Project Structure](#-project-structure)
- [🧠 Development Philosophy](#-development-philosophy)
- [🤝 Contributing](#-contributing)
- [🧩 Extending IRIS](#-extending-iris)
- [🧠 Roadmap](#-roadmap)
- [⚠️ Disclaimer](#️-disclaimer)
- [👨‍💻 Architect](#-architect)
- [📜 License](#-license)

---

# ⚡ Overview

IRIS is not a chatbot.

It is a **voice-first AI Operating System layer** that executes real-world actions across your system, applications, and devices—powered by **Gemini 3.1 Live API** with real-time bidirectional audio processing.

> **Speak naturally. IRIS understands intent. Real actions execute instantly.**

## What Makes IRIS Different?

✅ **Voice-First Design** – Optimized for natural speech input with real-time WebRTC audio streaming  
✅ **Proprietary Agent Logic** – Heavily protected, production-grade agentic orchestration  
✅ **Production-Ready Security** – V8 bytecode + ASAR integrity validation + window isolation  
✅ **No Code Exposure** – Core agent and tools are completely hidden from public source  
✅ **Autonomous Execution** – LangGraph-powered state machine with dynamic tool orchestration

---

# ✨ What's New In v1.5.1

- Rebuilt voice architecture using Gemini Live SDK
- Removed legacy WebSocket-heavy communication layer
- Improved voice responsiveness and stability
- Refactored tool execution pipeline
- Improved memory handling
- Improved vision support
- Cleaner Electron-native architecture
- Foundation for future premium modules
- Updated branding and documentation

---

# 🎯 What is Voice-First?

Traditional AI assistants are **text-first**: you type → they respond → you read.

IRIS is **voice-first**: you speak → they listen & execute → actions happen in real-time.

### Real-Time Audio Processing

```
Your Voice
    ↓ (WebRTC Stream)
Gemini 3.1 Live API (Real-time)
    ↓ (Intent Recognition)
LangGraph Agent Orchestration
    ↓ (Tool Selection)
Protected Tool Execution
    ↓ (System Actions)
Results Streamed Back to You
```

- **Latency:** < 500ms end-to-end (including network)
- **Quality:** Full duplex (talk while agent responds)
- **Models:** Gemini 3.1 Live API (primary) + Groq + Hugging Face (fallback)
- **Search:** Tavily for real-time web data

No local-only limitations. IRIS connects to **cloud AI, search engines, and APIs** for maximum intelligence.

---

# ✨ Core Features & System Capabilities

### 📂 System & File Management

- 🖥️ **Open App:** Native application lifecycle control
- 🛑 **Close App:** Instant process termination
- 🗂️ **Read Directory:** Local folder scanning & indexing
- 📁 **Create Folder:** Instant directory structure generation
- 📄 **Read File:** Deep text & code extraction
- 📝 **Write File:** Autonomous disk write access
- 🔄 **Manage File:** Copy, move, and delete control
- 🚀 **Open File:** Native OS application launcher
- 🗃️ **Smart Drop Zones:** Viral, autonomous folder sorting

### 🧠 Vector Search & Local Knowledge

- 🔍 **Index Folder:** Semantic LanceDB directory ingestion
- 🔎 **Smart File Search:** Vector-based local file retrieval
- 🖼️ **Read Gallery:** Local image cache scanning
- 👁️ **Analyze Photo:** Direct multimodal vision processing

### 💻 Developer & Terminal Tools

- ⌨️ **Run Terminal:** Native shell & CLI execution
- 🛠️ **Open Project:** Instant IDE workspace loading
- ⚙️ **Activate Protocol:** Context-aware coding mode switch
- 🏗️ **Build File:** Writing code directly to disk
- 🤖 **Execute Sequence:** JSON-based macro automation runs
- ▶️ **Execute Macro:** Named workflow sequence triggering
- 🕳️ **Deploy Wormhole:** Expose localhost to public internet
- 🛑 **Close Wormhole:** Terminate public localhost tunnels

### 🎯 Desktop UI, Vision & Automation

- 🪟 **Teleport Windows:** Dynamic desktop window management
- 🧩 **Create Widget:** Spawn live floating desktop components
- ❌ **Close Widgets:** Clear active floating overlays
- 🖱️ **Click on Screen:** AI-driven exact coordinate targeting
- 📜 **Scroll Screen:** Autonomous up/down page navigation
- ⚡ **Press Shortcut:** Global keyboard hotkey injection
- 👻 **Phantom Typer:** Global inline clipboard injection
- ✂️ **Screen Peeler (OCR):** Instant UI-to-code visual extraction
- ⌨️ **Ghost Coder:** Inline IDE generation (`Ctrl+Alt+Space`)
- 🔊 **Set Volume:** Master audio level control
- 📸 **Take Screenshot:** Instant visual context capture

### 💾 Memory & Information

- 🧠 **Save Core Memory:** Deep persistent identity tracking
- 📥 **Retrieve Memory:** Instant past context recall
- 📝 **Save Note:** Local markdown note generation
- 📖 **Read Notes:** Instant saved plan retrieval
- 📧 **Read Emails:** Gmail inbox scraping & summarization

### 🌐 Web, Media & Financials

- 🔍 **Google Search:** Live internet data retrieval (via Tavily)
- 🌤️ **Get Weather:** Real-time atmospheric condition checks
- 🗺️ **Open Map:** Interactive dark-mode map loading
- 🚗 **Get Navigation:** Real-time routing and directions
- 🎵 **Play Spotify:** Instant music & playlist execution
- 📈 **Stock Price:** Real-time financial ticker tracking
- 📊 **Compare Stocks:** Dual-ticker fundamental market analysis
- 🕷️ **Hack Live Website:** Viral visual DOM manipulation
- 🎨 **Build Animated Web:** Agentic Tailwind & GSAP generation
- 🖼️ **Generate Image:** High-fidelity multimodal media generation

### 💬 Communications

- 📲 **Send WhatsApp:** Instant automated message dispatch
- 🕒 **Schedule WhatsApp:** Cron-based delayed message automation
- 📧 **Draft Email:** Autonomous message composition
- 🚀 **Send Email:** Action-oriented direct dispatch

### 📱 Mobile Telekinesis (Deep Android Link)

- 🔔 **Mobile Notifications:** Read texts from connected phone
- 🔋 **Mobile Info:** Battery & hardware telemetry tracking
- 📤 **Push File to Mobile:** Seamless PC-to-phone transfers
- 📥 **Pull File from Mobile:** Instant phone-to-PC fetching
- 📱 **Open Mobile App:** Remote Android application launching
- 🛑 **Close Mobile App:** Remote Android process killing
- 👆 **Tap Mobile Screen:** Remote coordinate touch execution
- 📜 **Swipe Mobile Screen:** Remote directional scrolling control
- ⚙️ **Toggle Hardware:** Remote Wi-Fi/Bluetooth/Flashlight switching

### 🕵️ Autonomous Research & Deep RAG

- 🕸️ **Deep Research:** Autonomous Llama 3 web crawling
- 📓 **Read Notion Reports:** Deep sync with Notion databases
- 📚 **Ingest Codebase:** Deep local project Vector embedding
- 🔮 **Consult Oracle:** Deep local codebase RAG queries

### 🔐 Security & OS Vault

- 🔒 **Lock System Vault:** Standard PIN OS lockdown protocol
- 🛡️ **Biometric Encryption:** Multi-face recognition OS lockdown

---

# 🔐 Code Protection & Security

## ⚠️ Important: Core Code is Protected

IRIS uses **enterprise-grade code protection** to secure proprietary agent logic and tool implementations:

### What is Protected?

✅ **Agent Core** (`src/main/agents/iris-ai.ts`)  
✅ **Tool Implementations** (`src/main/tools/tools.ts`)  
✅ **IPC Handlers** (`src/main/ipc/handlers.ts`)  
✅ **System Utilities** (All Main Process code)

### How It's Protected?

1. **V8 Bytecode Compilation**
   - TypeScript → JavaScript → Binary V8 bytecode
   - Result: `.jsc` files (unreadable, machine-specific)
   - Reverse engineering: 100+ hours of effort

2. **Protected Strings Obfuscation**
   - Sensitive strings transformed to obfuscated functions
   - Example: System prompts, tool definitions, API patterns
   - Grep/string search returns nothing useful

3. **ASAR Integrity Validation**
   - SHA256 hashing at build time
   - Runtime validation at app startup
   - Tampering detection: **App crashes immediately**

4. **Window Isolation**
   - Renderer windows cannot directly access each other
   - All inter-process communication via secure IPC bridge
   - No Node.js in renderer process

### Security Guarantees

- **100% BYOK** (Bring Your Own Key) – Your API keys, your control
- **Local Encryption** – Keys stored in OS keychain, never transmitted
- **Zero-Trust Architecture** – All inputs validated, outputs sanitized
- **No External Validation** – Core logic never phones home

---

# 💰 Sponsorship Tiers

IRIS is built on open-source principles, but the **core agent logic and proprietary tools are hidden** to protect intellectual property and fund development.

## 🎁 Free Tier (Public Repository)

**What You Get:**

- Public source code (UI, integrations, setup)
- Ready-to-run desktop application (`npm run dev`)
- Community documentation
- Public GitHub issues & discussions
- Basic example tool signatures

**What You DON'T Get:**

- Full agent implementation (protected)
- Complete tool source code
- Advanced configuration docs
- Priority support

**Cost:** FREE ✅

---

## ⭐ GitHub Sponsors Tier ($5/month)

**What You Get:**

- ✅ Everything in Free Tier
- ✅ **Working Example Code Snippets** (agent & tools)
- ✅ Advanced setup guides
- ✅ Private GitHub Discussions (faster support)
- ✅ Monthly development updates
- ✅ Early access to new features
- ✅ Custom configuration templates
- ✅ PDF guides & tutorials

**What You DON'T Get:**

- ❌ Full source code (agent/tools remain protected)
- ❌ Ability to self-host (protected code can't run locally without sponsorship)
- ❌ Commercial license (requires higher tier)

**Cost:** $5/month (USD)  
**Commitment:** Cancel anytime

**Signup:** [GitHub Sponsors - @201Harsh](https://github.com/sponsors/201Harsh)

---

## 🏢 Enterprise Tier ($50/month)

**What You Get:**

- ✅ Everything in Sponsors Tier
- ✅ **Full source code access** (agent + tools unprotected)
- ✅ Commercial license
- ✅ Self-hosting capabilities
- ✅ Private Discord channel (direct support)
- ✅ Custom modifications & features
- ✅ Priority bug fixes
- ✅ Quarterly strategy calls

**Perfect For:**

- Companies integrating IRIS
- Custom deployments
- Commercial applications
- Teams needing priority support

**Cost:** $50/month (USD)  
**Commitment:** Annual contract (can negotiate)

**Signup:** [Enterprise Support Form](https://forms.gle/your-form-link)

---

## Why This Model?

```
Open Source + Sustainable Development

┌─────────────────────────────┐
│ Free Tier Users             │
│ (Community, feedback)       │
└──────────┬──────────────────┘
           │
    ┌──────▼───────┐
    │ Sponsors     │
    │ Fund Dev     │
    │ Get snippets │
    └──────┬───────┘
           │
    ┌──────▼──────────┐
    │ Enterprise      │
    │ Full access     │
    │ Support + mods  │
    └─────────────────┘
```

---

# 🏗️ Architecture

### Frontend (React)

- UI, widgets, visualizations
- Voice input/output handling
- Real-time metrics display

### Backend (Electron Main Process) - **PROTECTED**

- LangGraph agent orchestration
- Tool execution engine
- Protected by V8 bytecode + ASAR

### IPC Bridge (Secure)

```typescript
// Frontend
window.electron.ipcRenderer.invoke('tool-name', payload)

// Backend (Protected)
ipcMain.handle('tool-name', async (event, payload) => {
  // Secure tool execution
})
```

### AI Integration

- **Gemini 3.1 Live API** – Real-time voice processing
- **Groq API** – Ultra-fast inference fallback
- **Hugging Face** – Local model support
- **Tavily** – Web search & research

---

# 💻 Tech Stack

### 🖥️ Core Desktop & UI Framework

- **Electron & Vite:** High-performance desktop compilation
- **React 19:** Component-based frontend
- **Tailwind CSS v4:** Utility-first styling
- **Framer Motion & GSAP:** Hardware-accelerated animations
- **Three.js & React Three Fiber:** 3D neural visualizations
- **Zustand:** Global state management

### 🧠 AI & Agent Layer (PROTECTED)

- **Google Gemini 3.1 Live API:** Primary reasoning engine + WebRTC audio
- **Groq SDK:** Ultra-fast inference routing
- **LangGraph:** Agentic state orchestration (protected)
- **Hugging Face:** Local model inference
- **LanceDB:** Vector database for RAG & memory

### 🔐 Security & Protection

- **V8 Bytecode:** Code compilation to binary (unreadable)
- **ASAR Integrity:** Package validation + tampering detection
- **electron-vite:** Secure split-process architecture
- **Context Isolation:** Renderer/Main process separation

### ⚙️ OS Control & Automation

- **Nut.js:** Desktop automation (mouse, keyboard, coordinates)
- **Puppeteer + Stealth:** Headless browser & web automation
- **Node Window Manager:** Window lifecycle control
- **Tesseract.js:** OCR for visual extraction
- **Native Utilities:** Audio, clipboard, screenshots

### 🔗 Integrations

- **Google APIs & Auth:** Gmail, Google Cloud
- **Notion Client:** Database sync
- **Tavily Core:** Web search
- **Data Parsers:** PDF, DOCX, HTML

---

# 🚀 Installation & Setup

## For Free Tier Users

### 1. Clone Repository

```bash
git clone https://github.com/IRISX-AI/IRIS-AI
cd IRIS-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add API Keys

Create `.env` file (copy from `.env.example`):

```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_GROQ_API_KEY=your_groq_key
VITE_TAVILY_API_KEY=your_tavily_key
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Build Production

```bash
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## For Sponsors ($5+/month)

**Benefits:**

- ✅ Access to working code examples
- ✅ Advanced setup documentation
- ✅ Private support channel

**How to Access:**

1. Become a sponsor: [GitHub Sponsors](https://github.com/sponsors/201Harsh)
2. Get private repo access via GitHub
3. Clone private repository with examples
4. Follow sponsor-only documentation

---

## 🔑 System Keys & Configuration

IRIS operates with **cloud-powered AI**, requiring specific API keys to function:

### Required Keys

**[Google Gemini API](https://aistudio.google.com/app/apikey)** (`VITE_GEMINI_API_KEY`)

- Primary reasoning engine for IRIS
- Real-time voice processing (WebRTC)
- Multimodal vision capabilities
- Setup: Google AI Studio → Get API Key → Create

**[Groq API](https://console.groq.com/keys)** (`VITE_GROQ_API_KEY`)

- Ultra-fast inference fallback
- Sub-100ms response times
- Setup: Groq Console → API Keys → Create

### Optional Keys

**[Tavily Search API](https://app.tavily.com/home)** (`VITE_TAVILY_API_KEY`)

- Real-time web search & research
- Powers Deep Research agent
- Setup: Tavily Portal → Generate key

**[Hugging Face Token](https://huggingface.co/settings/tokens)** (`VITE_HUGGINGFACE_API_KEY`)

- Local model inference
- Community model access
- Setup: Create Hugging Face account → Access Tokens

---

# 📁 Project Structure

```text
IRIS/
├── build/                          # Build resources
├── out/                            # Compiled output (protected bytecode)
├── resources/                      # Static assets
├── src/
│   ├── main/                       # ⚠️ PROTECTED BY V8 BYTECODE
│   │   ├── agents/
│   │   │   └── iris-ai.ts         # Protected agent orchestration
│   │   ├── tools/
│   │   │   └── tools.ts           # Protected tool implementations
│   │   ├── ipc/
│   │   │   └── handlers.ts        # Protected IPC handlers
│   │   └── utils/
│   ├── preload/                    # ⚠️ PROTECTED BY V8 BYTECODE
│   │   └── index.ts
│   └── renderer/                   # React Frontend (public)
│       └── src/
│           ├── components/
│           ├── hooks/
│           ├── services/
│           └── types/
├── .env.example                    # API key template
├── electron-builder.yml            # Build configuration
├── electron.vite.config.ts         # Vite + bytecode config
├── package.json
└── README.md
```

### What's Protected?

| Path                         | Protected?  | Access        |
| ---------------------------- | ----------- | ------------- |
| `src/main/agents/iris-ai.ts` | ✅ Bytecode | Sponsors only |
| `src/main/tools/tools.ts`    | ✅ Bytecode | Sponsors only |
| `src/renderer/`              | ❌ Open     | Public        |
| IPC handlers                 | ✅ Bytecode | Built-in only |

---

# 🧠 Development Philosophy

- **Execution > Conversation** – Real actions, not just chat
- **Voice > Text** – Natural speech input first
- **Security by Default** – Protection built into every build
- **Modular Design** – Extensible tool system
- **Real-World Utility** – Practical autonomous assistance

---

# 🤝 Contributing

IRIS welcomes contributions! Help expand the neural forge.

### Quick Start

1. **Fork** the repository
2. **Branch** off `main`
3. **Test** thoroughly
4. **Submit** PR with clear explanation

### Contribution Types

- 🐛 **Bug Reports** – Issues & fixes
- 📚 **Documentation** – Guides & examples (public)
- 🎨 **UI/UX** – React components (public)
- 🔗 **Integrations** – New API connections (public)

### Non-Contributable Areas

❌ Agent logic (protected)  
❌ Tool implementations (protected)  
❌ Core security code (protected)

---

### Commit Rules

```bash
✅ git commit -m "feat: new ui widget (#45)"
✅ git commit -m "fix: ipc memory leak (#12)"
```

---

# 🧩 Extending IRIS

### For Free Users

- Build custom UI widgets
- Add public integrations
- Extend renderer components

### For Sponsors

- Access example agent snippets
- Modify tool behavior (examples provided)
- Create custom workflows

### For Enterprise

- Full source code
- Custom agent implementations
- Private tool development

---

# 🧠 Roadmap

- [x] Voice-first interface
- [x] Real-time audio processing
- [x] Production security (bytecode + ASAR)
- [ ] Plugin marketplace
- [ ] Advanced memory graph
- [ ] Multi-agent orchestration
- [ ] Desktop + Cloud hybrid
- [ ] Mobile agent integration

---

# ⚠️ Disclaimer

IRIS has **deep system-level execution capabilities**.

Use responsibly. The maintainers are not liable for misuse, data loss, or unintended actions.

**By using IRIS, you agree:**

- ✅ You understand IRIS executes real system commands
- ✅ You are responsible for API key security
- ✅ You use IRIS ethically and legally
- ✅ You do not reverse engineer protected code

---

# 👨‍💻 Architect

**Harsh Pandey**  
AI Systems Engineer & Creator

**Connect:**

- 🎬 Instagram: [@201Harshs](https://www.instagram.com/201harshs/)
- 💻 GitHub: [@201Harsh](https://github.com/201Harsh)
- 🤝 Sponsor: [GitHub Sponsors](https://github.com/sponsors/201Harsh)

---

# 📜 License

**Dual License Model:**

1. **Free Tier (Public Source):** MIT License
2. **Sponsors & Enterprise:** Custom Commercial License

See [LICENSE](LICENSE) file for details.

---

# 🎯 Get Started

### Free Users

```bash
git clone https://github.com/IRISX-AI/IRIS-AI
cd IRIS-AI
npm install
npm run dev
```

### Sponsors

```bash
# Access private repository with examples
# See sponsor-only documentation
# Join Discord for support
```

### Enterprise

```bash
# Full source access + custom support
# Contact: enterprise@irisai.dev
```

---

# 🚀 What's Next?

**Speak. IRIS listens. Reality changes.**

> System Online. Neural OS Activated.

---

# ❤️ Support IRIS

If you find IRIS valuable, consider:

- ⭐ **Star** the repository
- 💬 **Share** with your network
- 🤝 **Sponsor** development ($5/month)
- 🔗 **Integrate** IRIS into your workflow
- 🐛 **Report** bugs & suggest features

---

Made with ❤️ by [Harsh Pandey](https://instagram.com/201Harshs)

**System Online.**
