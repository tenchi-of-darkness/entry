# Entry

Entry is a personal diary and wellness tracking application built with React Native and Expo. It allows users to log their daily mood, sleep patterns, and reading progress.

## Features

- **Mood Tracking:** Log your mood daily with a selection of expressive cat-themed icons.
- **Sleep Tracking:** Record your sleep duration and quality.
- **Book Tracking:** Keep a list of books you are currently reading and the pages you've read.
- **Diary:** Write down your thoughts and feelings for each day.
- **Data Persistence:** Your data is saved locally on your device using Async Storage.

## Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo Router](https://expo.github.io/router/) for navigation
- [Async Storage](https://react-native-async-storage.github.io/async-storage/) for local data storage
- [React Native Skia](https://shopify.github.io/react-native-skia/) for custom UI elements
- [date-fns](https://date-fns.org/) for date manipulation

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Node.js and npm/pnpm/yarn installed on your machine. You will also need the Expo Go app on your mobile device to run the app.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/tenchi-of-darkness/entry.git
    ```
2.  Install dependencies
    ```sh
    pnpm install
    ```

### Running the application

1.  Start the Expo development server
    ```sh
    pnpm start
    ```
2.  Scan the QR code with the Expo Go app on your Android or iOS device.

You can also run the app on an emulator or on the web:

-   Run on Android:
    ```sh
    pnpm android
    ```
-   Run on iOS:
    ```sh
    pnpm ios
    ```
-   Run on Web:
    ```sh
    pnpm web
    ```

## Folder Structure

    .
    ├── app                 # Expo Router app directory with all the screens
    ├── assets              # Images, fonts, and other static assets
    ├── components          # Reusable React components
    ├── constants           # Theme, colors, and other constant values
    ├── contexts            # React contexts for state management
    ├── hooks               # Custom React hooks
    ├── lib                 # Core application logic and data storage
    └── scripts             # Utility scripts for the project