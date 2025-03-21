# CliMate

CliMate is an AI-driven weather website that provides real-time weather updates, forecasts, and personalized activity suggestions based on weather conditions. Built with **React.js**, **Tailwind CSS**, **OpenWeatherMap API**, **Gemini API**, and **Axios**, CliMate offers a seamless user experience for weather tracking and recommendations.

## Features

- 🌤 **Real-time Weather Data**: Fetches and displays current weather conditions, forecasts, and historical data for selected cities using the OpenWeatherMap API.
- 🏙 **City Selection**: Users can search and select cities to view detailed weather information.
- 🤖 **AI-Powered Suggestions**: Utilizes Gemini API to analyze user queries and suggest activities based on weather conditions.
- 🎨 **Intuitive UI**: Built with React.js and styled using Tailwind CSS for a modern and responsive design.
- ⚡ **Optimized Performance**: Efficient API handling with Axios ensures smooth and fast data retrieval.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **APIs**: OpenWeatherMap API, Gemini API
- **Data Fetching**: Axios

## Installation & Setup

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Steps to Run Locally

1. **Clone the Repository**
   ```sh
   git clone https://github.com/tharikashree/CliMate.git
   cd CliMate
   ```

2. **Install Dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory and add your API keys:
   ```sh
   REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the Development Server**
   ```sh
   npm start  # or yarn start
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000/` to access CliMate.

## Usage
- Search for a city in the search bar.
- View real-time weather data and forecasts.
- Get AI-powered activity suggestions based on weather conditions.

## Screenshots
![Screenshot 2025-03-21 200727](https://github.com/user-attachments/assets/9d151a5b-8a32-4ddb-96d9-3d2b94d724b5)
![Screenshot 2025-03-21 200737](https://github.com/user-attachments/assets/ba8a8ff1-b8e5-48e6-b1df-958ec60d2978)

## Future Enhancements
- 🌎 **Multi-language support** for global users.
- 📍 **User location-based weather updates**.
- 📊 **Graphical representation of weather trends**.

