// insertTest.js
const mongoose = require('mongoose');
const Knowledge = require('../models/knowledge');

const docs = [
  {
    question: "What is the Golfin app?",
    answer: "Golfin is a mobile app built with React Native and Expo for managing and playing mini interactive golf games, including features like user authentication, game lobbies, leaderboards, and player profiles.",
    tags: ["golfin", "overview", "react-native", "expo"]
  },
  {
    question: "How do I create an account or log in?",
    answer: "On the login screen, you can enter your email and password to log in. If you are new, tap 'Are you new? Sign up' to switch to the registration form, fill in your details, and create an account.",
    tags: ["authentication", "signup", "login", "user"]
  },
  {
    question: "What technology stack does Golfin use?",
    answer: "Golfin uses React Native with Expo for the mobile frontend, and communicates with a backend server (such as Node.js or Spring Boot) via REST APIs. The backend can connect to a MongoDB database for data storage.",
    tags: ["technology", "stack", "react-native", "expo", "backend", "mongodb"]
  },
  {
    question: "How is my data stored?",
    answer: "Your data, such as user profiles, game stats, and scores, is sent from the app to the backend server, which stores it securely in a MongoDB database.",
    tags: ["data", "storage", "mongodb", "security"]
  },
  {
    question: "How do I start a new game or join a lobby?",
    answer: "After logging in, use the sidebar menu to select 'New Game' to create a lobby or join an existing one. Follow the on-screen instructions to invite friends or start playing.",
    tags: ["game", "lobby", "new game", "navigation"]
  },
  {
    question: "How does the point system work?",
    answer: "The Golfin app uses a point system where players earn points based on their performance in games. Points can be accumulated and displayed on leaderboards, allowing players to track their progress and compete with others.",
    tags: ["points", "sytem", "point"]
  },
  {
    question: "How does the karma system work?",
    answer: "This sytem works by activating the traps that are placed on the map. When a player activates a trap, they gain karma points which can be used to unlock special features or rewards in the app.",
    tags: ["karma", "sytem"]
  },
  {
    question: "What should I do if I encounter errors or issues?",
    answer: "If you experience problems such as login failures or app crashes, check your internet connection and try again. If issues persist, contact the app support team or check for updates.",
    tags: ["support", "troubleshooting", "errors", "help"]
  },
  {
    question: "Can I use Golfin on both Android and iOS?",
    answer: "Yes, Golfin is built with React Native and Expo, making it compatible with both Android and iOS devices.",
    tags: ["platform", "android", "ios", "compatibility"]
  },
  {
    question: "How do I get a code to join a lobby?",
    answer: "The host creates a lobby and shares the unique code with you. Enter this code in the 'Join Lobby' section of the app to connect to the game.",
    tags: ["code", "lobby"]
  },
    {
    question: "How do I create a lobby",
    answer: "To create a Lobby, you need an account. Once logged in, go to the 'New Game' section and follow the prompts to set up your lobby. You can then invite friends by sharing the lobby code.",
    tags: ["code", "lobby"]
  },
  {
    question: "What can you do?",
    answer:"I can help you with questions about the Golfin app, including how to create an account, start a game, and understand the point and karma systems. If you have any specific questions, feel free to ask!",
    tags: ["golfin", "help", "chatbot", "faq"]
  },
  {
    question: "Explain how to play",
    answer:"First, you join a party or create a new game. Once in the game, you can take turns hitting the ball into the holes on the course. The goal is to complete each hole in as few strokes as possible. You can also activate traps to gain karma points and prevent your friends from winning!.",
    tags: ["how to", "play", "golfin", "game"]
  }
];

const docss = [
    {
        question: "Que es karma",
        answer:"Karma es un sistema de puntos que se activa al pisar trampas en el juego. Cada vez que un jugador activa una trampa, gana puntos de karma que pueden usarse para desbloquear características especiales o recompensas en la aplicación.",
        tags: ["Golfin", "What is"]
    }
]


mongoose.connect('mongodb://localhost:27017/helpChatbot')
  .then(async () => {
    await Knowledge.insertMany(docss);
    console.log('Documents inserted!');
    mongoose.disconnect();
  });

// mongoose.connect('mongodb://localhost:27017/helpChatbot')
//   .then(async () => {
//     for (const doc of docs) {
//       await Knowledge.updateOne(
//         { question: doc.question },
//         { $set: doc },
//         { upsert: true }
//       );
//     }
//     console.log('Documents updated!');
//     mongoose.disconnect();
//   });