## Documentation for Frontend Mobile App

### Overview

This mobile application is built using React Native. It is designed to be run locally on your machine, as it has not yet been published or hosted on any platforms like Vercel or Netlify.

### Prerequisites

Before you can build and run the app, ensure you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- React Native CLI or Expo CLI
- An Android emulator, iOS simulator, or the Expo Go app installed on your mobile device

### Project Structure

App.js: The main entry point of the application.
src/: Contains the core components, screens, and utilities of the app.
Inside the src/: there is the API folder with the api.js file, here is where you will replace my existing IP address with yours.

### Instructions to Build and Run the Mobile App

#### Step 1: Clone the Project

Clone the project from the public GitHub repository. Open your terminal and execute the following command:

```sh
git clone <repository-url>
```

#### Step 2: Navigate to the Project Directory

Change your directory to the project folder:

```sh
cd <project-directory>
```

#### Step 3: Install Dependencies

Install all the required dependencies using npm:

```sh
npm install
```

#### Step 4: Configure Local IP Address

To ensure the app connects correctly to your backend, replace any instances of my local IP address with yours. This is important because the app uses your local network to communicate with the backend.

- On Windows: Open Command Prompt and type `ipconfig` to find your local IP address.
- On Linux or Mac: Open Terminal and type `ifconfig` to find your local IP address.

Replace the IP address in the source code where necessary, usually in the API endpoints.

#### Step 5: Start the Development Server

Start the development server by running:

```sh
npm start
```

This command will open the Expo developer tools in your browser.

#### Step 6: Run the App on an Emulator or Device

You can run the app on an Android emulator, iOS simulator, or the Expo Go app on your mobile device.

- **Using Expo Go:**

  1. Download and install the Expo Go app from the App Store (iOS) or Google Play Store (Android).
  2. Scan the QR code displayed in the Expo developer tools with the Expo Go app.

- **Using an Emulator/Simulator:**
  1. Ensure you have an Android emulator or iOS simulator set up.
  2. Click on the appropriate option (Run on Android device/emulator or Run on iOS simulator) in the Expo developer tools.

### Additional Notes

- Ensure your mobile device or emulator is connected to the same local network as your development machine.
- If you encounter any issues with IP addresses or connectivity, verify that your local IP address in the project code matches the IP address of your development machine.
- For any additional configurations or environment-specific settings, refer to the project's README file or configuration files.
- Make sure your backend server is running and accessible via your local network.

By following these steps, you should be able to successfully build and run the mobile app locally on your machine. If you encounter any issues or have questions, feel free to reach out for support.

### Project Timeline

#### Day 1 - 3rd July

- Reviewed the project requirements and deliverables.
- Understood the scope and necessary functionalities.
- Began coding the backend, implementing the core logic and setting up initial endpoints.

#### Day 2 - 4th July

- Continued development of the backend, finalizing key features and ensuring endpoint functionality.
- Started designing the frontend using React Native, focusing on the layout and user interface components.

#### Day 3 - 5th July

- Progressed with frontend development, building out the main UI elements and integrating them with the backend services.
- Focused on creating a seamless and intuitive user experience.

#### Day 4 - 6th July

- Integrated the backend and frontend, ensuring smooth communication between the two.
- Conducted thorough testing of the app to verify that all endpoints and features function correctly.
- Documented the entire project, including setup instructions, and performed code cleanup to enhance readability and maintainability.
