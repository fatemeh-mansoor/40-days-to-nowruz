# Task Lists

Task lists for the 40 days leading up to Nowruz. Each task list has a main file and optional translation files.

## Structure

```
translations/task-lists/
└── task-list-name/
    ├── task-list-name.json          # Main file
    └── translations/                 # Optional translations
        ├── en.json
        ├── fa.json
        ├── es.json
        └── ca.json
```

## Main File Format

```json
{
  "id": "my-task-list",
  "name": "Task List Name",
  "description": "Brief description of this task list.",
  "mainLanguage": "en",
  "days": [
    {
      "day": 1,
      "title": "Day 1 Title",
      "description": "Day 1 description."
    }
    // ... 40 days total
  ]
}
```

## Translation File Format

```json
{
  "name": "Translated Task List Name",
  "description": "Translated description.",
  "days": [
    {
      "day": 1,
      "title": "Translated Day 1 Title",
      "description": "Translated Day 1 description."
    }
    // ... 40 days total
  ]
}
```

## How It Works

1. App loads the main file
2. If user's language differs from `mainLanguage`, it loads the translation file
3. Translation content overrides main content where available
4. Falls back to main language if no translation exists

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

## Questions?

Open an issue on GitHub if you have questions about creating or translating task lists!
