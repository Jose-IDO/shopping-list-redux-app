# Shopping List App

A React Native shopping list application built with Expo, Redux Toolkit, and TypeScript. Manage your shopping items with features like adding, editing, deleting, marking as purchased, searching, sorting, and filtering.

## Download

Download the app from Google Drive:

[Download Shopping List App](https://drive.google.com/drive/folders/1UzeNfDEibrLLGFMeeY8Ajq-nGQUJQwei?usp=sharing)

## Features

### Core Functionality
- **Add Items**: Create shopping list items with names and quantities
  - Use the "Add Item" button at the bottom or the plus (+) button at the top (visible when list is empty)
  - Input validation ensures item names are 2-100 characters
  - Quantity can be set from 1 to 999
- **Edit Items**: Update item names and quantities
  - Tap "Edit" button on any item card
  - Modify name or quantity in the modal
  - Changes are saved automatically
- **Delete Items**: Remove items from your list with confirmation
  - Tap "Delete" button on any item card
  - Confirmation dialog prevents accidental deletion
- **Mark as Purchased**: Toggle items as purchased/unpurchased
  - Tap the checkbox next to any item
  - Purchased items show with strikethrough styling
  - Toggle again to unmark as purchased

### Advanced Features
- **Search**: Real-time search for items by name
  - Search bar appears when items are added
  - Filters results as you type
- **Sort**: Sort items by name, date, or purchase status
  - Name: Alphabetical order
  - Date: Most recently added first
  - Status: Purchased items first
- **Filter**: Filter items by all, purchased, or unpurchased
  - All: Show all items
  - To Buy: Show only unpurchased items
  - Bought: Show only purchased items
- **Statistics**: View shopping list statistics
  - Total number of items
  - Number of purchased items
  - Number of remaining items
  - Completion percentage

### Technical Features
- **Persistence**: Data is automatically saved to local storage using AsyncStorage
  - Data persists between app sessions
  - Automatic save on add, edit, or delete
  - Automatic load on app startup
  - Error handling with retry logic
- **Accessibility**: Full accessibility support with screen reader compatibility
  - Screen reader labels for all interactive elements
  - Proper accessibility roles (button, textbox, checkbox, etc.)
  - Accessibility states for checkboxes and buttons
  - Semantic structure throughout
- **User Feedback**: Visual feedback for all actions
  - Toast notifications for success/error/info messages
  - Error messages displayed for validation and storage issues
  - Loading indicators during data operations
- **Modern UI**: Beautiful gradient theme with black-to-purple colors and blue accents
  - SVG icons instead of emojis for better contrast
  - Responsive design for web and mobile
  - Empty state with helpful guidance

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

### Redux Store Structure

```typescript
{
  shoppingList: {
    items: ShoppingItem[],
    loading: boolean,
    error: string | null
  }
}
```

### Shopping Item Structure

```typescript
{
  id: string,           // Unique identifier
  name: string,         // Item name (2-100 characters)
  quantity: number,     // Quantity (1-999)
  purchased: boolean,  // Purchase status
  createdAt: string     // ISO timestamp
}
```

### Redux Actions

- `addItem`: Add a new item to the list
  - Payload: `{ name: string, quantity?: number }`
  - Automatically generates ID and timestamp
- `editItem`: Update an existing item
  - Payload: `{ id: string, name?: string, quantity?: number }`
- `deleteItem`: Remove an item from the list
  - Payload: `string` (item ID)
- `togglePurchased`: Toggle the purchased status of an item
  - Payload: `string` (item ID)
- `setItems`: Set the entire items array (used for loading from storage)
  - Payload: `ShoppingItem[]`
- `setLoading`: Set loading state
  - Payload: `boolean`
- `setError`: Set error message
  - Payload: `string | null`
- `clearError`: Clear error message

## Data Persistence

The app uses `@react-native-async-storage/async-storage` to persist shopping list data locally.

### Persistence Features
- **Automatic Saving**: Data is automatically saved whenever items are added, edited, or deleted
- **Automatic Loading**: Data is loaded automatically when the app starts
- **Error Handling**: Retry logic with 3 attempts and 500ms delay between retries
- **Data Validation**: Validates data format before loading to prevent corruption
- **Storage Limit**: Maximum data size of 10MB to prevent storage issues

### Storage Implementation
- Storage key: `@shopping_list_items`
- Data format: JSON array of ShoppingItem objects
- Error recovery: Invalid data is cleared and app starts with empty list
- Toast notifications inform users of any persistence issues

## User Guide

### Adding an Item

**Method 1: Using the bottom button**
1. Tap the "Add Item" button at the bottom of the screen
2. Enter the item name in the text field (2-100 characters required)
3. Adjust the quantity using the + and - buttons (1-999)
4. Tap "Add" to save the item

**Method 2: Using the top plus button (when list is empty)**
1. When your shopping list is empty, a plus (+) button appears next to "Shopping List" at the top
2. Tap the plus button to open the add item modal
3. Follow steps 2-4 above

**Note**: The top plus button automatically disappears once you add your first item. Use the bottom "Add Item" button for subsequent additions.

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

The app includes full accessibility support following React Native accessibility best practices:

### Accessibility Features
- **Screen Reader Labels**: All interactive elements have descriptive `accessibilityLabel` props
- **Accessibility Roles**: Proper roles assigned (button, textbox, checkbox, header, listitem, alert)
- **Accessibility States**: Checkboxes and buttons have proper state indicators (checked, disabled)
- **Semantic Structure**: Logical content hierarchy for screen readers
- **Modal Accessibility**: Modals properly marked with `accessibilityViewIsModal`
- **Touch Targets**: Minimum 44x44 touch target size for all interactive elements

### Examples
- Item cards: "Item name, quantity X, purchased/not purchased"
- Checkboxes: "Mark [item name] as purchased/not purchased"
- Buttons: Descriptive labels like "Add item", "Edit", "Delete"
- Input fields: "Item name input" with proper textbox role

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

## Technical Requirements Compliance

This app meets all specified technical requirements:

### User Interface ✅
- ✅ User-friendly interface for displaying shopping list
- ✅ Input fields for adding new items
- ✅ Buttons for editing and deleting existing items
- ✅ Checkboxes to mark items as purchased

### Redux Setup ✅
- ✅ Redux configured to manage shopping list state
- ✅ Actions defined for adding, editing, and deleting items
- ✅ Reducers handle actions and update state accordingly

### Shopping List Features ✅
- ✅ Display list of shopping items with checkboxes
- ✅ Input field and button for adding new items
- ✅ Edit name or quantity of items
- ✅ Delete items from the list

### State Management ✅
- ✅ Redux manages application state including shopping items
- ✅ Store updates appropriately when items are added, edited, or deleted

### Persistence ✅
- ✅ Local storage (AsyncStorage) implemented
- ✅ Data persists between app sessions
- ✅ Saved data loads when app reopens

### User Feedback ✅
- ✅ Visual feedback when items are added, edited, or deleted (toast notifications)
- ✅ Error messages displayed for issues with adding or editing items

### Accessibility ✅
- ✅ Accessible to users with disabilities
- ✅ Appropriate labels and accessibility attributes
- ✅ Usable with screen readers

### Testing ✅
- ✅ Application thoroughly tested
- ✅ All features work as expected
- ✅ Manual testing conducted (per project requirements)

### Documentation ✅
- ✅ Developer documentation for setup and running
- ✅ User guide for using the shopping list app

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

### App Crashes on Production Build

If the app crashes in production (especially when opening modals):
- Ensure you're using the latest build with fixed Modal structure
- The nested TouchableWithoutFeedback issue has been resolved
- Rebuild the app to get the latest fixes

## License

This project is private and not licensed for public use.

## Contact

For questions or issues, please contact the repository owner.



