# THOR - AI App Builder

Build complete applications and projects with AI assistance. From concept to deployment - your intelligent development companion powered by Thor.

## 🌟 Live Demo

**🚀 [Try THOR AI App Builder Live](https://main.thor-ai-agent.pages.dev/)**

Experience the power of AI-driven development with our live deployment. Build applications, get intelligent code suggestions, and see real-time previews - all powered by advanced AI models.

## ✨ Features

- **🤖 Multi-LLM Support** - Switch between OpenRouter and Ollama models seamlessly
- **⚡ Real-time Preview** - See your changes instantly as you build
- **🎨 Full-Stack Development** - Build complete web applications with AI assistance
- **💬 AI-Powered Coding** - Get intelligent code suggestions and assistance
- **🌐 Cloud Deployment** - Ready-to-deploy configuration for production use

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm
- OpenRouter API Key (for AI functionality)

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Aishvarya-Pec/THOR-AI-APP-BUILDER.git
cd THOR-AI-APP-BUILDER
```

2. **Install dependencies:**
```bash
cd builder
npm install
```

3. **Configure API Key:**
Edit `builder/wrangler.toml` and replace the API key:
```toml
[vars]
OPEN_ROUTER_API_KEY = "your-actual-openrouter-api-key-here"
```

4. **Deploy to production:**
```bash
npm run deploy
```

5. **Or run locally:**
```bash
npm run dev
```

### 🌐 Access Points
- **🌟 Live Demo**: https://main.thor-ai-agent.pages.dev/
- **Local Development**: http://localhost:5173
- **Direct Builder**: http://localhost:5173/?builder=true

### Navigation

- **Landing Page**: http://localhost:5173 (showcases Thor's capabilities)
- **AI Builder**: http://localhost:5173/?builder=true (direct access to development environment)
- **Home Button**: From the builder, click "Home" to return to the landing page

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Remix
- **Styling**: Tailwind CSS + UnoCSS
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages
- **AI Integration**: OpenRouter API
- **State Management**: Nanostores
- **Code Editor**: CodeMirror
- **Terminal**: XTerm.js

## 🤖 AI Model Support

### 🌐 OpenRouter Models (Primary)
Access to premium AI models through OpenRouter:
- **Grok 4 Fast** - Quick tasks and responses
- **Gemini 2.0 Flash** - Landing pages and design
- **DeepSeek V3** - Complex analysis and heavy tasks

### 🏠 Local Models (Optional)
For private, offline development:
- **Qwen 2.5 Coder** - Optimized for programming tasks
- **Mistral 7B** - Balanced performance and quality
- **CodeLlama** - Specialized in code understanding

## 🚀 Deployment

### Production Deployment
The application is configured for Cloudflare Pages deployment:

```bash
cd builder
npm run deploy  # Deploys to Cloudflare Pages
```

### Environment Variables
Configure your API keys in `builder/wrangler.toml`:
```toml
[vars]
OPEN_ROUTER_API_KEY = "your-openrouter-api-key"
OLLAMA_API_BASE_URL = "http://localhost:11434"
```

## 📚 Getting Started Guide

### 🎯 For New Users
1. **Try the live demo** to see THOR in action
2. **Get an OpenRouter API key** for full functionality
3. **Deploy your own instance** or run locally

### 🛠️ For Developers
1. **Clone and setup** the repository
2. **Configure your API keys** in the appropriate files
3. **Customize and extend** the functionality

## 🤝 Contributing

We welcome contributions! Areas where you can help:
- UI/UX improvements
- Additional AI model support
- Performance optimizations
- Documentation enhancements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenRouter** - For providing access to multiple AI models
- **Remix Team** - For the excellent web framework
- **Cloudflare** - For reliable hosting and deployment
- **AI Community** - For advancing the field of AI-assisted development

---

**🌟 Ready to build something amazing? [Try THOR now!](https://main.thor-ai-agent.pages.dev/)**