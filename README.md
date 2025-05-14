# Laravel Breeze for React Native (Expo)

This starter kit is an Expo-based mobile application solution inspired by Laravel Breeze, designed to work seamlessly with Laravel backends while maintaining flexibility for other backend technologies.

### Auth Screens

Login, Register and Forgot Password
![648shots_so](https://github.com/user-attachments/assets/e634f900-1fa4-4e60-a818-5d169a9bb3aa)

### Dashboard Screens

Home, Sidebar, and Profile Settings
![526shots_so](https://github.com/user-attachments/assets/ed4fcc44-f400-488c-9392-b9610cee2e5d)

## 🚀 Features

- User authentication (login, registration, password reset)
- Profile management
- Toast notifications
- Form error handling
- UI components
- TypeScript support
- TailwindCSS using TWRNC

## 📦 Installed Packages

- Expo
- React Native
- TypeScript
- KY
- TanStack Query
- React Hook Form
- Expo Icons

## 🛠️ Key Components

- `useStorageState`: Custom hook for managing state with secure storage
- `handleApiErrors`: Custom util function for handling API Form errors
- `useUserQuery` and `useUserMutation`: Hooks for user data fetching and mutation
- `useAuthMutations`: Hook for authentication-related mutations
- Toast context and components for notifications
- Session context for managing user tokens
- UI components
- Form Components

## 🌟 Inspiration

This starter kit draws inspiration from Laravel Breeze, aiming to provide a similar developer experience and feature set for Expo projects. It includes:

- A clean, minimal setup
- Pre-built authentication flows
- Profile management
- Easy-to-use form handling and validation

## 🔧 Backend Compatibility

While designed to work perfectly with Laravel-based backends, this starter kit can be adapted to work with any backend technology that follows similar patterns for authentication and data management.

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install` or `yarn install`
3. Configure your environment variables in `constants/config.ts`
4. Run the development server: `npm run start`

## 📂 Project Structure

```bash
.
├── app/                 # Entry point folders for Expo Router
│   ├── (app)/           # Main app screens
│   └── (auth)/          # Authentication screens (Login, Register, Forgot Password)
│
├── assets/
│   └── images/          # Static image assets (e.g., logos, backgrounds)
│
├── components/          # Reusable UI and form components
│   ├── form/            # Form input components (TextInput, Button, etc.)
│   └── ui/              # UI components like cards, modals, etc.
│
├── constants/
│   └── config/          # Configuration files (e.g., API base URL, app settings)
│
├── context/             # Global state using React Context
│   ├── session/         # Auth session handling (tokens, user info)
│   └── toast/           # Toast notifications context
│
├── features/            # Feature-based architecture
│   ├── auth/            # Auth-related hooks, queries, components
│   └── profile/         # User profile-related logic
│
├── hooks/               # Custom React hooks
│   └── useStorageState/ # Secure storage state management
│
└── utils/               # Utility functions
    ├── helpers.ts       # Common helper functions
    └── http.ts          # API request wrapper (e.g., Ky or Axios config)

```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/lucky-media/react-native-breeze/issues).

## Credits

This starter kit was brought to you by the lovely team at [Lucky Media](https://www.luckymedia.dev/). We are a digital agency focused on professional, innovative, user-oriented web design & development. If you have any project in mind, feel free to contact us.

## 📄 License

This project is MIT licensed.
