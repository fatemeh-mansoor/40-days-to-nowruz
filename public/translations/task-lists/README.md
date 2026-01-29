# Task Lists

This directory contains task lists for the 40 days leading up to Nowruz. Each task list is organized in its own folder with a main file and optional translation files.

## Structure

Each task list follows this structure:

```
translations/task-lists/
└── task-list-name/
    ├── task-list-name.json          # Main file with primary language
    └── translations/                 # Optional translations
        ├── en.json                   # English translation (if main isn't English)
        ├── fa.json                   # Persian translation
        ├── es.json                   # Spanish translation
        └── ca.json                   # Catalan translation
```

## Creating a New Task List

### Step 1: Create the Main File

Create a new folder and main JSON file with your task list in your native language:

```json
{
  "id": "my-task-list",
  "mainLanguage": "en",
  "days": [
    {
      "day": 1,
      "title": "Day 1 Title",
      "description": "Day 1 description with details about the task."
    },
    {
      "day": 2,
      "title": "Day 2 Title",
      "description": "Day 2 description."
    }
    // ... continue for all 40 days
  ]
}
```

**Important fields:**
- `id`: Unique identifier for your task list (kebab-case)
- `mainLanguage`: The language code of this file's content (en, fa, es, ca)
- `days`: Array of exactly 40 days, numbered 1-40

### Step 2: Add Translations (Optional)

If you or contributors want to add translations, create a `translations` folder and add language files:

```json
{
  "day1": {
    "title": "Translated Day 1 Title",
    "description": "Translated Day 1 description."
  },
  "day2": {
    "title": "Translated Day 2 Title",
    "description": "Translated Day 2 description."
  }
  // ... continue for all 40 days
}
```

**Translation file naming:**
- `en.json` - English
- `fa.json` - Persian (Farsi)
- `es.json` - Spanish
- `ca.json` - Catalan

## Benefits of This Structure

1. **Easy to Start**: Create a task list in just your language without needing to provide all translations
2. **Community Friendly**: Others can add translations without editing the original file
3. **Optional Translations**: Not every task list needs every language
4. **Clear Separation**: Main content and translations are separate for easier management

## How It Works

When the app loads:
1. It loads the main task list file (e.g., `traditional-spring-cleaning.json`)
2. If the user's selected language matches `mainLanguage`, it uses that content directly
3. If not, it tries to load the corresponding translation file from the `translations/` folder
4. If no translation exists, it falls back to the main language

## Example: Traditional Spring Cleaning

The included `traditional-spring-cleaning` task list demonstrates this structure:

- Main file: English content (`mainLanguage: "en"`)
- Translations: Persian (`fa.json`), Spanish (`es.json`), Catalan (`ca.json`)

When viewing in Persian, the app merges:
- Structure from `traditional-spring-cleaning.json`
- Content from `translations/fa.json`

If a translation is incomplete, missing days fall back to English.

## Contributing

To add a translation to an existing task list:

1. Navigate to the task list folder (e.g., `traditional-spring-cleaning/`)
2. Check the `mainLanguage` field in the main JSON file
3. Create a new file in the `translations/` folder with your language code
4. Translate all 40 days using the format shown above
5. Submit a pull request!

To create a new task list:

1. Create a new folder with your task list name (kebab-case)
2. Create the main JSON file with your content in your language
3. Set `mainLanguage` to your language code
4. Optionally add a `translations/` folder with other languages
5. Submit a pull request!

## Translation Tips

- Keep titles concise (3-7 words)
- Descriptions can be more detailed but should fit in a card
- Maintain the cultural significance while being accessible
- Respect the 40-day countdown tradition
- Tasks should build toward Nowruz celebration

## Questions?

Open an issue on GitHub if you have questions about creating or translating task lists!
