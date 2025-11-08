# Contributing to JSONify

First off, thank you for considering contributing to JSONify! It's people like you that make JSONify such a great tool for developers worldwide.

## 🌟 Ways to Contribute

There are many ways you can contribute to JSONify:

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share your ideas for new features
- 📝 **Improve documentation** - Help others understand the project better
- 🔧 **Submit code** - Fix bugs or implement new features
- 🎨 **Design improvements** - Enhance the UI/UX
- 🌍 **Translations** - Help make JSONify available in more languages
- ⭐ **Spread the word** - Star the repo and share with others

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- Git
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the repository**
   - Click the "Fork" button at the top right of the repository page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/JSONify.git
   cd JSONify
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Centre-for-Information-Technology-India/JSONify.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

6. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys to `.env.local`

7. **Start the development server**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Before You Start

1. Check existing [issues](https://github.com/Centre-for-Information-Technology-India/JSONify/issues) and [pull requests](https://github.com/Centre-for-Information-Technology-India/JSONify/pulls)
2. Create or comment on an issue to discuss your proposed changes
3. Wait for maintainer approval before starting work on major features

### Making Changes

1. **Keep changes focused** - One feature or fix per pull request
2. **Follow the code style** - Use the existing code style and conventions
3. **Write meaningful commits** - Use clear, descriptive commit messages
4. **Test your changes** - Ensure everything works as expected
5. **Update documentation** - Update README or docs if needed

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(converter): add JSON to CSV conversion
fix(validator): handle empty JSON input correctly
docs(readme): update installation instructions
style(editor): improve code formatting
```

### Code Style

- Use TypeScript for all new code
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use Tailwind CSS for styling
- Follow React best practices

### Testing

Before submitting your PR:

```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build the project
npm run build
```

## 🔄 Submitting a Pull Request

1. **Update your fork**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template completely
   - Link related issues

4. **PR Title Format**
   ```
   feat: Add JSON to CSV conversion
   fix: Resolve validation error for empty arrays
   docs: Update contributing guidelines
   ```

5. **PR Description Should Include:**
   - What changes were made
   - Why these changes were necessary
   - How to test the changes
   - Screenshots (if UI changes)
   - Related issue numbers

### PR Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged
4. Your contribution will be credited in the release notes

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

- Check if the bug has already been reported
- Ensure you're using the latest version
- Try to reproduce the bug in a clean environment

### How to Submit a Bug Report

Create an issue with the following information:

**Title:** Clear, descriptive title

**Description:**
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Error messages or console logs

**Template:**
```markdown
## Bug Description
A clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Version: 1.0.0

## Additional Context
Any other relevant information
```

## 💡 Suggesting Features

We love feature suggestions! Here's how to suggest one:

1. **Check existing feature requests** - Avoid duplicates
2. **Create a detailed issue** with:
   - Clear title
   - Problem you're trying to solve
   - Proposed solution
   - Alternative solutions considered
   - Additional context or mockups

## 📝 Documentation

Good documentation is crucial. You can help by:

- Fixing typos or unclear explanations
- Adding examples
- Improving code comments
- Creating tutorials or guides
- Translating documentation

## 🎨 Design Contributions

If you're a designer, you can contribute:

- UI/UX improvements
- Icons and graphics
- Color scheme suggestions
- Accessibility improvements
- Mobile responsiveness enhancements

## 🌍 Translation

Help make JSONify available in more languages:

1. Check if your language is already supported
2. Create a new translation file
3. Follow the existing translation structure
4. Submit a PR with your translations

## ⚖️ Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📞 Getting Help

If you need help:

- 💬 [GitHub Discussions](https://github.com/Centre-for-Information-Technology-India/JSONify/discussions)
- 📧 Email: support@cit.org.in
- 🐛 [GitHub Issues](https://github.com/Centre-for-Information-Technology-India/JSONify/issues)

## 🏆 Recognition

Contributors will be:

- Listed in the README
- Mentioned in release notes
- Given credit in the project

## 📜 License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing to JSONify! 🎉

Your contributions make the developer community better for everyone.
