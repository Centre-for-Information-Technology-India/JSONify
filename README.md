# JSONify 🚀

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**JSONify** is a professional, free, and open-source JSON editor and validator designed for developers. Format, validate, minify, and convert JSON with AI-powered error detection and security scanning.

🌐 **Live Demo:** [https://jsonify.cit.org.in](https://jsonify.cit.org.in)

![JSONify Screenshot](https://i.ibb.co/hxkCXWYK/Screenshot-12-11-2025-95440-localhost.jpg)

## ✨ Features

### Core Features
- 🎨 **JSON Formatting** - Beautify and format JSON with proper indentation
- ✅ **JSON Validation** - Real-time syntax validation with detailed error messages
- 📦 **JSON Minification** - Compress JSON to reduce file size
- 📁 **File Upload** - Upload and parse JSON files directly
- 🌳 **Tree View** - Visualize JSON structure in an interactive tree

### Advanced Features
- 🤖 **AI-Powered Error Explanation** - Get intelligent suggestions to fix JSON errors
- 🔄 **Multi-Format Conversion** - Convert JSON to YAML, XML, and TOML
- 🔒 **Security Scanner** - Detect sensitive data like API keys, passwords, and tokens
- ⚡ **Performance Analyzer** - Analyze JSON size and get optimization suggestions
- 💾 **Offline Support** - Works offline as a Progressive Web App (PWA)

### Developer Experience
- 🎯 **Professional Code Editor** - Syntax highlighting and line numbers
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🌙 **Dark Mode** - Eye-friendly dark theme
- ⌨️ **Keyboard Shortcuts** - Fast workflow with keyboard support
- 🚀 **Lightning Fast** - Built with Next.js 15 and React 18

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Centre-for-Information-Technology-India/JSONify.git
   cd JSONify
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **AI Integration:** [Google Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)
- **PWA:** [next-pwa](https://github.com/shadowwalker/next-pwa)

## 📁 Project Structure

```
JSONify/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout with SEO metadata
│   │   ├── page.tsx         # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── json/           # JSON tool components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Reusable UI components
│   └── ai/                 # AI flows and integrations
├── public/                 # Static assets
├── docs/                   # Documentation
└── README.md              # This file
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

## 📜 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by [Centre for Information Technology India](https://cit.org.in)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

- 🌐 Website: [https://jsonify.cit.org.in](https://jsonify.cit.org.in)
- 📧 Email: support@cit.org.in
- 🐛 Issues: [GitHub Issues](https://github.com/Centre-for-Information-Technology-India/JSONify/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Centre-for-Information-Technology-India/JSONify/discussions)

## 🌟 Star History

If you find JSONify useful, please consider giving it a star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=Centre-for-Information-Technology-India/JSONify&type=Date)](https://star-history.com/#Centre-for-Information-Technology-India/JSONify&Date)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/Centre-for-Information-Technology-India/JSONify?style=social)
![GitHub forks](https://img.shields.io/github/forks/Centre-for-Information-Technology-India/JSONify?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/Centre-for-Information-Technology-India/JSONify?style=social)

---

Made with ❤️ by the JSONify Team | © 2025 Centre for Information Technology India
