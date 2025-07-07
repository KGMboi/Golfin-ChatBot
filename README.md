# Golfin-ChatBot

Golfin-ChatBot is a Node.js and MongoDB-powered chatbot designed to assist new users of the Golfin app. It provides instant answers to frequently asked questions and helps users navigate the app's features.

## Features

- **Interactive Chatbot**: Answers user questions using a knowledge base stored in MongoDB.
- **Modern Web UI**: Clean, responsive interface with chat history, new chat, save, and delete options.
- **Knowledge Base Management**: Easily add, update, or delete Q&A pairs in the database.
- **Persistent Chat History**: Save and load previous chat sessions using local storage.
- **REST API**: Simple API endpoint for chatbot interactions.

## Tech Stack

- **Backend**: Node.js, Express, Mongoose, MongoDB
- **Frontend**: HTML, CSS, JavaScript
- **Other**: dotenv, body-parser, cors

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```powershell
   git clone <repo-url>
   cd Golfin-ChatBot/Unit 3 Ev 2 - ChatBot
   ```

2. Install dependencies:

   ```powershell
   npm install
   ```

3. Create a `.env` file in the root directory and add:

   ```
   MONGO_URI=mongodb://localhost:27017/helpChatbot
   PORT=3000
   ```

4. Start the server:
   ```powershell
   npm start
   ```
   The app will be available at `http://localhost:3000`.

### Usage

- Open your browser and navigate to `http://localhost:3000`.
- Type your question in the chat input and receive instant answers.
- Use the sidebar to start a new chat, save, or delete chat history.

## Project Structure

```
Unit 3 Ev 2 - ChatBot/
├── models/         # Mongoose schemas for Knowledge and Message
├── public/         # Static frontend files (HTML, CSS, JS, images)
├── routes/         # Express route for chatbot API
├── Tests/          # Scripts for testing and managing the knowledge base
├── server.js       # Main server file
├── package.json
└── README.md
```

## Knowledge Base Management

- Add new Q&A pairs by inserting documents into the `Knowledge` collection.
- Use scripts in the `Tests/` folder:
  - `insertTest.js`: Insert sample questions and answers.
  - `deleteDocs.js`: Delete questions or tags from the database.
  - `testFindOne.js`: Test database queries.

## Example Q&A

- **What is the Golfin app?**

  > Golfin is a mobile app built with React Native and Expo for managing and playing mini interactive golf games, including features like user authentication, game lobbies, leaderboards, and player profiles.

- **How do I create an account or log in?**
  > On the login screen, you can enter your email and password to log in. If you are new, tap 'Are you new? Sign up' to switch to the registration form, fill in your details, and create an account.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[ISC](LICENSE)
