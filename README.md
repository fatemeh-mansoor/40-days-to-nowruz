# Nowruz Countdown

https://40daystonowruz.com/

A 40-day countdown to Nowruz (Persian New Year) with daily spring preparation tasks. 
Built(Mostly through vibe coding 🤖) with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🌸 40-day countdown to Nowruz with daily tasks
- 🌍 Multi-language support (English, Persian, Spanish, Catalan)
- 📱 Responsive design with RTL/LTR support
- 💾 Progress tracking with localStorage
- ♿ Accessible with ARIA labels and keyboard navigation
- 📦 No external dependencies for i18n or state management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
40-days-to-nowruz/
├── public/
│   └── translations/
│       ├── locales/              # UI translations (en, fa, es, ca)
│       └── task-lists/           # Daily task content
│           └── traditional-spring-cleaning/
│               ├── traditional-spring-cleaning.json  # Main file (fa)
│               └── translations/                      # Translations (en, es, ca)
├── src/
│   ├── components/               # React components
│   ├── hooks/
│   │   └── useI18n.ts           # i18n & task list loading
│   ├── utils/
│   │   ├── dateUtils.ts         # Date calculations
│   │   ├── storage.ts           # localStorage helpers
│   │   └── linkify.tsx          # URL to clickable links
│   ├── App.tsx
│   └── index.css                # Global styles + CSS variables
└── index.html
```

## How It Works

- **Date Calculation**: Uses exact Spring Equinox times to calculate days remaining
- **Progressive Unlocking**: Days unlock as the countdown progresses (Day 1 = 40 days before)
- **Single Card View**: One task at a time with navigation between days
- **i18n System**: Loads UI text from `locales/` and task content from `task-lists/`
- **Persistence**: Completed days saved to localStorage

## Contributing

Contributions welcome! Open a PR and we can discuss any changes. See [/public/translations/task-lists/README.md](public/translations/task-lists/README.md) for task list structure.

## License

MIT License

---

**Happy Nowruz!** 🌱✨
