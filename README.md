# Movies Inc.

## Overview
This project is a mobile application built using React Native and Expo. Follow the steps below to install, set up, and run the app on your local machine or device.

---

## Features

- **Playing Movies**
- **Rating Movies**
- **Favorite Movies**
- **Similar Movies**

---

## Project Structure

- `app/` - Contains all source code.
  - `components/` - Reusable components.
  - `config/` - Configuration files.
  - `contexts` - Contexts for handling global state
  - `screens/` - App screens.
  - `services` - External dependencies

---


## Prerequisites

Make sure you have the following installed on your system:

1. **Node.js** (version 14 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** or **yarn** (comes with Node.js)
3. **Expo CLI** - Install globally by running:
   ```bash
   npm install -g expo-cli
   ```
4. A smartphone with the **Expo Go** app installed (available on [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)).
5. An emulator or simulator (optional, for testing on your computer):
   - Android Studio (for Android)
   - Xcode (for iOS)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Running the App

### On a Physical Device:

1. Start the development server:
   ```bash
   expo start
   ```

2. Open the **Expo Go** app on your smartphone.

3. Scan the QR code displayed in your terminal or browser (make sure your computer and phone are on the same Wi-Fi network).

### On an Emulator/Simulator:

1. Ensure your emulator/simulator is running.

2. Start the app:
   ```bash
   expo start
   ```

3. In the Expo Developer Tools (browser window or terminal), select:
   - **"Run on Android device/emulator"** for Android
   - **"Run on iOS simulator"** for iOS

---


## Troubleshooting

- If you encounter issues with dependencies, try:
  ```bash
  npm install --force
  # or
  yarn install --force
  ```

- For network issues, ensure your computer and device are on the same network.

- Visit the [Expo Documentation](https://docs.expo.dev/) for additional help.

---

