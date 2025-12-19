# Shopping List App

A React Native shopping list application built with Expo, Redux Toolkit, and TypeScript. Manage your shopping items with features like adding, editing, deleting, marking as purchased, searching, sorting, and filtering.

## Features

- **Add Items**: Create shopping list items with names and quantities
- **Edit Items**: Update item names and quantities
- **Delete Items**: Remove items from your list with confirmation
- **Mark as Purchased**: Toggle items as purchased/unpurchased
- **Search**: Search for items by name
- **Sort**: Sort items by name, date, or purchase status
- **Filter**: Filter items by all, purchased, or unpurchased
- **Statistics**: View total items, purchased count, remaining count, and completion percentage
- **Persistence**: Data is automatically saved to local storage
- **Accessibility**: Full accessibility support with screen reader compatibility
- **Modern UI**: Beautiful gradient theme with black-to-purple colors and blue accents

## Prerequisites

- Node.js (v18.15.0 or higher recommended)
- npm or yarn package manager
- Expo CLI (installed globally or via npx)
- For iOS development: macOS with Xcode
- For Android development: Android Studio and Android SDK

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Jose-IDO/shopping-list-redux-app.git
cd shopping-list-redux-app
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start the Expo development server:
```bash
npm start
```

This will start the Metro bundler and display a QR code in the terminal.

### Run on different platforms:

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Web Browser:**
```bash
npm run web
```

### Using Expo Go App

1. Install the Expo Go app on your iOS or Android device
2. Scan the QR code displayed in the terminal with:
   - iOS: Camera app
   - Android: Expo Go app
3. The app will load on your device

## Project Structure

```
shopping-list-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── icons/          # SVG icon components
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Container.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Input.tsx
│   │   ├── ItemCard.tsx
│   │   ├── QuantityInput.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortFilterBar.tsx
│   │   ├── StatisticsCard.tsx
│   │   ├── Toast.tsx
│   │   └── ConfirmDialog.tsx
│   ├── screens/            # Screen components
│   │   └── ShoppingListScreen.tsx
│   ├── store/              # Redux store configuration
│   │   ├── slices/
│   │   │   └── shoppingListSlice.ts
│   │   └── store.ts
│   ├── theme/              # Theme configuration
│   │   └── colors.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
│       ├── storage.ts
│       └── urlPolyfill.ts
├── App.tsx                 # Root component
├── index.ts                # Entry point
├── package.json
├── tsconfig.json
└── app.json
```

## Technology Stack

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **Redux Toolkit**: State management
- **TypeScript**: Type-safe JavaScript
- **AsyncStorage**: Local data persistence
- **React Native SVG**: SVG icon support
- **Expo Linear Gradient**: Gradient backgrounds

## State Management

The application uses Redux Toolkit for state management. The shopping list state includes:
- Items array with id, name, quantity, purchased status, and creation date
- Loading and error states
- Sort and filter options

### Redux Actions

- `addItem`: Add a new item to the list
- `editItem`: Update an existing item
- `deleteItem`: Remove an item from the list
- `togglePurchased`: Toggle the purchased status of an item
- `setItems`: Set the entire items array (used for loading from storage)
- `setSortOption`: Change the sort option
- `setFilterOption`: Change the filter option

## Data Persistence

The app uses `@react-native-async-storage/async-storage` to persist shopping list data locally. Data is automatically saved whenever items are added, edited, or deleted, and loaded when the app starts.

## User Guide

### Adding an Item

1. Tap the "Add Item" button at the bottom of the screen
2. Enter the item name in the text field
3. Adjust the quantity using the + and - buttons
4. Tap "Add" to save the item

### Editing an Item

1. Find the item you want to edit in the list
2. Tap the "Edit" button on the item card
3. Modify the name or quantity
4. Tap "Update" to save changes

### Deleting an Item

1. Find the item you want to delete
2. Tap the "Delete" button on the item card
3. Confirm the deletion in the dialog that appears

### Marking Items as Purchased

1. Tap the checkbox next to an item name
2. The item will be marked as purchased and appear with a strikethrough
3. Tap the checkbox again to unmark it

### Searching Items

1. Use the search bar at the top of the list
2. Type the item name you're looking for
3. The list will filter automatically as you type
4. Tap the X icon to clear the search

### Sorting Items

1. Use the "Sort by" section in the sort/filter bar
2. Choose from:
   - **Name**: Alphabetical order
   - **Date**: Most recently added first
   - **Status**: Purchased items first

### Filtering Items

1. Use the "Filter" section in the sort/filter bar
2. Choose from:
   - **All**: Show all items
   - **To Buy**: Show only unpurchased items
   - **Bought**: Show only purchased items

### Viewing Statistics

The statistics card at the top shows:
- Total number of items
- Number of purchased items
- Number of remaining items
- Completion percentage

## Accessibility

The app includes full accessibility support:
- Screen reader labels for all interactive elements
- Proper accessibility roles (button, textbox, checkbox, etc.)
- Accessibility states for checkboxes and buttons
- Semantic HTML structure

## Development

### TypeScript

The project uses TypeScript for type safety. Type definitions are located in `src/types/index.ts`.

### Code Style

- Components are written in TypeScript with React.FC
- Props interfaces are defined for all components
- Reusable components are placed in `src/components/`
- Screen components are in `src/screens/`

### Adding New Features

1. Create or modify Redux actions in `src/store/slices/shoppingListSlice.ts`
2. Update the UI components in `src/screens/ShoppingListScreen.tsx`
3. Add new reusable components in `src/components/` if needed
4. Update types in `src/types/index.ts` if adding new data structures

## Troubleshooting

### Port Already in Use

If port 8081 is already in use, you can specify a different port:
```bash
npx expo start --port 8083
```

### Clear Cache

If you encounter bundling issues, clear the cache:
```bash
npx expo start --clear
```

### Reset Metro Bundler

If the app doesn't update after changes:
1. Stop the Metro bundler (Ctrl+C)
2. Clear the cache: `npx expo start --clear`
3. Restart the development server

## License

This project is private and not licensed for public use.

## Contact

For questions or issues, please contact the repository owner.

