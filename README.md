# Nowruz Countdown

A 40-day countdown to Nowruz (Persian New Year) with daily spring preparation tasks. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 🌸 **40-day countdown** to Nowruz with daily tasks
- 🌍 **Multi-language support**: English, Persian (Farsi), Spanish, Catalan
- ♿ **Fully accessible** with ARIA labels and keyboard navigation
- 🎨 **Spring-themed design** using CSS variables
- 📱 **Responsive** design for mobile and desktop
- 💾 **Progress tracking** with localStorage (no backend needed)
- 🔄 **RTL/LTR support** for different languages
- 📦 **No external dependencies** for i18n or state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
nowruz-countdown/
├── translations/
│   ├── locales/           # UI translations
│   │   ├── en.json       # English UI text
│   │   ├── fa.json       # Persian UI text
│   │   ├── es.json       # Spanish UI text
│   │   └── ca.json       # Catalan UI text
│   └── task-lists/       # Daily task content (community-editable)
│       └── traditional-spring-cleaning.json
├── src/
│   ├── components/       # React components
│   │   ├── DayCardCentered.tsx  # Single centered day card
│   │   ├── Header.tsx           # App header with countdown
│   │   └── LanguageSwitcher.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useI18n.ts  # Internationalization & task list loading
│   ├── utils/          # Utility functions
│   │   ├── dateUtils.ts  # Date calculations with exact equinox times
│   │   └── storage.ts    # localStorage helpers
│   ├── App.tsx         # Main application
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles + CSS variables
├── index.html
├── package.json
└── README.md
```

## Contributing

We welcome contributions! This project is designed to be beginner-friendly.

### How to Add a Language

1. **Create a new JSON file** in `/translations/locales`:
   - Name it with the language code (e.g., `de.json` for German, `ar.json` for Arabic)
   
2. **Copy an existing file** (like `en.json`) as a template

3. **Translate all UI text fields**:
   - `lang`: Language code (ISO 639-1)
   - `dir`: Text direction (`"ltr"` or `"rtl"`)
   - `title`, `subtitle`, `description`: App text
   - UI labels: `markComplete`, `previousDay`, `nextDay`, etc.

4. **Update the language list** in `src/components/LanguageSwitcher.tsx`:
   ```typescript
   const languages = [
     // ... existing languages
     { code: 'de', name: 'German', nativeName: 'Deutsch' },
   ];
   ```

5. **Update the Language type** in `src/hooks/useI18n.ts`:
   ```typescript
   export type Language = 'en' | 'fa' | 'es' | 'ca' | 'de';
   ```

6. **Add translations to existing task lists** in `/translations/task-lists`:
   - Open each task list file (e.g., `traditional-spring-cleaning.json`)
   - Add your language code to the `title` and `description` objects for each day:
   ```json
   {
     "day": 1,
     "title": {
       "en": "Begin Spring Cleaning",
       "fa": "شروع خانه‌تکانی",
       "de": "Frühjahrsputz Beginnen"
     },
     "description": {
       "en": "Start with a small area...",
       "fa": "با یک فضای کوچک...",
       "de": "Beginnen Sie mit einem kleinen Bereich..."
     }
   }
   ```

### How to Add/Edit Day Tasks

**Option 1: Edit an Existing Task List**

1. **Open a task list file** in `/translations/task-lists` (e.g., `traditional-spring-cleaning.json`)

2. **Find the day** you want to edit in the `days` array

3. **Update the task** in all supported languages:
   ```json
   {
     "day": 5,
     "title": {
       "en": "Your Task Title",
       "fa": "عنوان کار شما",
       "es": "Tu Título de Tarea",
       "ca": "El Teu Títol de Tasca"
     },
     "description": {
       "en": "Detailed description...",
       "fa": "توضیحات دقیق...",
       "es": "Descripción detallada...",
       "ca": "Descripció detallada..."
     }
   }
   ```

**Option 2: Create a New Task List**

1. **Create a new JSON file** in `/translations/task-lists`
   - Name it descriptively (e.g., `modern-minimalist.json`, `family-focused.json`)

2. **Use this structure**:
   ```json
   {
     "id": "your-task-list-id",
     "name": "Task List Display Name",
     "description": "Brief description of this task list theme",
     "days": [
       {
         "day": 1,
         "title": {
           "en": "English Title",
           "fa": "عنوان فارسی"
         },
         "description": {
           "en": "English description",
           "fa": "توضیحات فارسی"
         }
       }
       // ... continue for all 40 days
     ]
   }
   ```

3. **All task lists must have exactly 40 days** (days 1-40)

4. **Each day must include translations** for all supported languages

**Task List Guidelines:**
- Keep tasks simple and achievable
- Focus on spring preparation themes:
  - Spring cleaning and organization
  - Nowruz traditions (Haft-Sin preparation)
  - Family and community activities
  - Personal renewal and reflection
- Be culturally sensitive and inclusive

### Code Style Guidelines

- **Comments**: Add comments to explain complex logic
- **Accessibility**: Include ARIA labels and keyboard support
- **TypeScript**: Use proper types (no `any`)
- **Simple code**: Prioritize readability over cleverness
- **No external libraries**: Keep the project minimal

### Accessibility Checklist

When contributing, ensure:
- [ ] All interactive elements have proper `aria-label` or visible text
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] Screen reader announcements are clear

## How It Works

### Date Calculation & Equinox Times

The app calculates the exact date and time of the Spring Equinox (Nowruz):
- Stores precise equinox times in UTC for years 2024-2030
- Calculates days remaining until the exact moment
- Days unlock progressively:
  - Day 1 unlocks when 40 days remain
  - Day 2 unlocks when 39 days remain
  - And so on...
- If more than 40 days remain, only Day 1 is shown
- Users can navigate backward to review previous days

The exact equinox time is displayed in the header with local timezone conversion.

### Single Card Interface

The app shows **one task at a time** in a large, centered card:
- Current day is shown by default
- Navigation arrows allow moving between days
- Previous days can be revisited at any time
- Future days show as locked until their unlock date
- Decorative spring-themed design with flowers and plants

### Task List System

The app supports **multiple task lists** that communities can create:
- Task lists are stored in `/translations/task-lists/`
- Each list contains 40 days of tasks in multiple languages
- Communities can create themed lists (traditional, modern, minimalist, etc.)
- Users can switch between task lists (infrastructure ready for UI)
- All lists follow the same 40-day countdown structure

### Internationalization (i18n)

The app uses a simple, custom i18n system:
1. **UI translations** are stored in `/translations/locales/` (buttons, labels, etc.)
2. **Task content** is stored in `/translations/task-lists/` (day titles and descriptions)
3. The `useI18n` hook loads both files based on user preference
4. The `dir` attribute automatically switches between RTL and LTR
5. No external libraries needed!

### Data Persistence

Completed days are saved to `localStorage`:
```javascript
{
  "1": true,
  "2": true,
  "5": true
}
```

This allows users to track progress without a backend.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage support

## License

MIT License - see [LICENSE]() file for details

## Acknowledgments

- Inspired by the Persian tradition of spring cleaning (خانه‌تکانی)
- Built for the global Nowruz community
- Contributions welcome from everyone! 🌸

## Questions?

Open an issue on GitHub or start a discussion. We're here to help!

---

**Happy Nowruz!** 🌱✨
