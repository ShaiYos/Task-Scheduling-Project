# Task Scheduling Project

A full-featured **Task Scheduler** web application designed to help users manage and organize their tasks effectively. Users can add, edit, and delete tasks on an interactive calendar and customize their schedules based on specific dates and times. The app supports both light and dark themes and saves user data to ensure persistent access across sessions.

## Table of Contents

- [Features](#features)
- [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Interactive Calendar** – View, add, and edit tasks directly on a full calendar.
- **Task Editing** – Click on any task to view and update its details, including date, time, and description.
- **Responsive Design** – Adjusts seamlessly to light or dark mode based on user preference.
- **User-Specific Data** – Each user can view only their personal tasks upon login.
- **Persistent Storage** – Task data is saved and remains available across sessions.
- **Real-Time Updates** – Drag-and-drop functionality to rearrange tasks, with automatic date updates.
- **Motivational Quotes** – Display motivational quotes fetched from the API Ninjas service.

## Built With

- **Frontend:** React, Material-UI, CSS, FullCalendar component for calendar views
- **Backend:** Node.js, Express, MongoDB (using MongoDB Atlas for cloud database storage)
- **API Integration:** API Ninjas for fetching motivational quotes

## Installation

To set up the project locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/ShaiYos/Task-Scheduling-Project.git
   ```
   
2. Navigate into the project folder:
   ```bash
   cd Task-Scheduling-Project/MySchedule
   ```

3. Install dependencies for both the server and client:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```

4. Set up your environment variables:
   - In the **`server`** directory, create a `.env` file and add the following:
     - `MONGODB_URI` - Your MongoDB connection string.
     - `PORT` - The port number for the backend server (default: 3000).
     
   - In the **`client`** directory, create a `.env` file and add the following:
     - `VITE_X_API_KEY` - Your API key from [API Ninjas](https://api-ninjas.com) for fetching motivational quotes.
     - `VITE_BACKEND_URL` - The URL for your backend API (e.g., `http://localhost:3000`).

5. Start the development environment:
   - Open a terminal in the `server` folder and run:
     ```bash
     npm run server
     ```
   - Open another terminal in the `client` folder and run:
     ```bash
     npm run dev
     ```

6. Access the application at ` http://localhost:5173` in your web browser.

## Usage

1. **Login** to start managing your tasks.
2. **Add Tasks** by clicking on the desired date in the calendar, filling out the time and details, and saving.
3. **Edit or Delete Tasks** by clicking on a specific task and making your desired changes.
4. **Switch Themes** – Toggle between light and dark modes for a comfortable viewing experience.
5. **Motivational Quotes** – Quotes are fetched from the API Ninjas service. Ensure your API key is correctly set up in the environment variables to display them.
6. **Profile Page** – The user can view and manage their personal details on the profile page.

## Project Structure

- **Frontend Components:** `TaskCalendar`, `TaskForm`, and other React components located in the `src` directory. Material-UI is used for styling components and ensuring a responsive design.
- **API Endpoints:** Node.js/Express routes for handling tasks and user-specific data storage.
- **Database:** MongoDB stores user data and task information securely.

## Future Improvements

- **Notifications and Reminders** – Enable users to receive reminders for upcoming tasks.
- **Task Categories and Filters** – Allow task categorization and filtering for enhanced organization.
- **Recurring Tasks** – Implement the option for setting recurring tasks on a daily, weekly, or monthly basis.

## Contributing

Feel free to fork the repository and submit pull requests for any new features, bug fixes, or improvements!

## License

Distributed under the MIT License. See `LICENSE` for more information.
