window.addEventListener('DOMContentLoaded', function() {
  const messagesDiv = document.getElementById('messages');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const inputArea = document.getElementById('inputArea');
  const newChatBtn = document.getElementById('newChatBtn');
  const deleteChatBtn = document.getElementById('deleteChatBtn');
  const saveChatBtn = document.getElementById('saveChatBtn');
  const chatHistoryList = document.getElementById('chatHistoryList');

  // This is the chat history array
  let chatHistory = [];
  let activeChatIdx = null; // null = unsaved session, number = saved chat

  // Load session or first saved chat
  function loadInitialChat() {

    let savedChats = JSON.parse(localStorage.getItem('golfinSavedChats') || '[]');

    if (savedChats.length > 0) {
      activeChatIdx = 0;
      chatHistory = savedChats[0].history;
    } else {
      activeChatIdx = null;
      chatHistory = JSON.parse(localStorage.getItem('golfinChatHistory') || '[]');
    }
    renderMessages();
    renderChatHistoryList();
  }
  loadInitialChat();

  // This is an event listner for when the chat input form is submitted
  // it doesn't reload the page and in return manages the chat history
  inputArea.onsubmit = async function(eventHandler) {
    eventHandler.preventDefault();

    const text = userInput.value.trim();

    if (!text) return;
    addMessage(text, 'user');
    userInput.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    addMessage('Thinking...', 'bot', true); // Temporary bot message

    // El famosísimo try catch con el post method
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      removeLastBotThinking();
      addMessage(data.reply, 'bot');
    } catch (err) {
      removeLastBotThinking();
      addMessage('Error connecting to chatbot.', 'bot');
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  function addMessage(text, sender, isThinking = false) {
    const msg = { text, sender, timestamp: new Date().toLocaleTimeString(), isThinking };
    // This push is an append to the chat history
    chatHistory.push(msg);
    if (activeChatIdx === null && !isThinking) saveSession();
    else if (!isThinking) saveActiveChat();
    renderMessages();
  }

  function removeLastBotThinking() {
    const indx = chatHistory.findIndex(message => message.isThinking);
    if (indx !== -1) chatHistory.splice(indx, 1);
    renderMessages();
  }

  function renderMessages() {
    messagesDiv.innerHTML = '';
    // Here I display the chat history
    // If the chat is saved, it will show the date and time of the message
    const isHistory = activeChatIdx !== null;
    chatHistory.forEach(({ text, sender, timestamp, isThinking }) => {
      const div = document.createElement('div');
      div.className = `msg ${sender}`;
      if (isHistory && sender === 'user' && !isThinking) {
        let now = new Date();
        let dateStr = '';
        if (timestamp) {
          let parsed = Date.parse(timestamp);
          if (!isNaN(parsed)) now = new Date(parsed);
        }
        dateStr = `the day ${now.toLocaleDateString()} at ${now.toLocaleTimeString()}`;
        div.innerHTML = `<span>You asked: <b>${text}</b> ${dateStr}</span><span class="timestamp">${timestamp || ''}</span>`;
      } else if (isHistory && sender === 'bot' && !isThinking) {
        div.innerHTML = `<span>I answered: <b>${text}</b></span><span class="timestamp">${timestamp || ''}</span>`;
      } else {
        div.innerHTML = `<span>${text}</span><span class="timestamp">${isThinking ? '' : timestamp}</span>`;
      }
      messagesDiv.appendChild(div);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function saveSession() {
    localStorage.setItem('golfinChatHistory', JSON.stringify(chatHistory));
  }

  function saveActiveChat() {
    let savedChats = JSON.parse(localStorage.getItem('golfinSavedChats') || '[]');
    if (activeChatIdx !== null && savedChats[activeChatIdx]) {
      savedChats[activeChatIdx].history = chatHistory;
      localStorage.setItem('golfinSavedChats', JSON.stringify(savedChats));
    }
  }

  newChatBtn.onclick = () => {
    chatHistory = [];
    activeChatIdx = null;
    saveSession();
    renderMessages();
    renderChatHistoryList();
  };

  deleteChatBtn.onclick = () => {
    if (activeChatIdx !== null) {
      let savedChats = JSON.parse(localStorage.getItem('golfinSavedChats') || '[]');
      if (confirm('Delete this saved chat?')) {
        savedChats.splice(activeChatIdx, 1);
        localStorage.setItem('golfinSavedChats', JSON.stringify(savedChats));
        // After delete, load first saved chat or session
        if (savedChats.length > 0) {
          activeChatIdx = 0;
          chatHistory = savedChats[0].history;
        } else {
          activeChatIdx = null;
          chatHistory = [];
          saveSession();
        }
        renderMessages();
        renderChatHistoryList();
      }
    } else {
      if (confirm('Delete current chat session?')) {
        chatHistory = [];
        saveSession();
        renderMessages();
      }
    }
  };

  // This is my event listener for the send button when clicking the enter button
  userInput.addEventListener('keydown', function(enterBtn) {
    if (enterBtn.key === 'Enter' && !enterBtn.shiftKey) {
      enterBtn.preventDefault();
      sendBtn.click();
    }
  });

  // Modal for notifications
  function showModal(message) {
    let modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#fff';
    modal.style.padding = '32px 24px';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 4px 24px rgba(34,77,32,0.18)';
    modal.style.zIndex = '9999';
    modal.style.textAlign = 'center';
    modal.style.fontSize = '1.1rem';
    modal.innerHTML = `<div style='margin-bottom:16px;'>${message}</div><button id='closeModalBtn' style='padding:8px 18px; border-radius:8px; background:#2f855a; color:#fff; border:none; font-size:1rem; cursor:pointer;'>OK</button>`;
    document.body.appendChild(modal);
    document.getElementById('closeModalBtn').onclick = () => modal.remove();
  }

  function renderChatHistoryList() {
    let savedChats = JSON.parse(localStorage.getItem('golfinSavedChats') || '[]');
    chatHistoryList.innerHTML = '';
    savedChats.forEach((chat, idx) => {
      const li = document.createElement('li');
      // Use the chat name as the label, fallback to Unnamed Chat
      let chatLabel = chat.name || 'Unnamed Chat';
      li.textContent = chatLabel;
      if (activeChatIdx === idx) li.classList.add('active');
      li.onclick = () => {
        chatHistory = chat.history;
        activeChatIdx = idx;
        renderMessages();
        renderChatHistoryList();
      };
      // Added a delete icon
      const del = document.createElement('i');
      del.className = 'fa fa-trash';
      del.title = 'Delete this chat';
      del.onclick = (eventHandler) => {
        eventHandler.stopPropagation();
        savedChats.splice(idx, 1);
        localStorage.setItem('golfinSavedChats', JSON.stringify(savedChats));
        if (activeChatIdx === idx) {
          activeChatIdx = null;
          chatHistory = [];
          saveSession();
          renderMessages();
        }
        renderChatHistoryList();
      };
      li.appendChild(del);
      chatHistoryList.appendChild(li);
    });
  }

  saveChatBtn.onclick = () => {
    if (chatHistory.length === 0) {
      showModal('No chat to save!');
      return;
    }
    const name = prompt('Enter a name for this chat:') || `Chat ${new Date().toLocaleString()}`;
    let savedChats = JSON.parse(localStorage.getItem('golfinSavedChats') || '[]');
    savedChats.push({ name, history: chatHistory });
    localStorage.setItem('golfinSavedChats', JSON.stringify(savedChats));
    showModal('Chat saved! You can access it in the history section of the nav bar.');
    activeChatIdx = savedChats.length - 1; // Set new chat as active
    renderChatHistoryList();
    renderMessages();
  };

  // -------------------- Responsive Sidebar Logic --------------------
  const sidebar = document.querySelector('.sidebar');
  const sidebarHamburger = document.getElementById('sidebarHamburger');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('sidebar-open');
    sidebar.classList.remove('sidebar-closed');
    document.body.classList.add('sidebar-open');
    if (sidebarOverlay) sidebarOverlay.style.display = 'block';
  }
  function closeSidebar() {
    sidebar.classList.remove('sidebar-open');
    sidebar.classList.add('sidebar-closed');
    document.body.classList.remove('sidebar-open');
    if (sidebarOverlay) sidebarOverlay.style.display = 'none';
  }

  // Hamburger click opens sidebar
  if (sidebarHamburger) {
    sidebarHamburger.addEventListener('click', openSidebar);
  }
  // Overlay click closes sidebar
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }
  // Close sidebar with ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSidebar();
  });

  // Real-time sidebar/hamburger state on resize
  function adjustSidebarOnResize() {
    if (window.innerWidth > 700) {
      // Desktop: show sidebar, hide hamburger, hide overlay
      sidebar.classList.remove('sidebar-closed');
      sidebar.classList.remove('sidebar-open');
      if (sidebarOverlay) sidebarOverlay.style.display = 'none';
      document.body.classList.remove('sidebar-open');
    } else {
      // Mobile: hide sidebar, show hamburger
      closeSidebar();
    }
  }
  window.addEventListener('resize', adjustSidebarOnResize);
  // Initial check
  adjustSidebarOnResize();
  // Start with sidebar closed on mobile
  if (window.innerWidth <= 700) {
    closeSidebar();
  } else {
    sidebar.classList.remove('sidebar-closed');
    sidebar.classList.remove('sidebar-open');
    if (sidebarOverlay) sidebarOverlay.style.display = 'none';
    document.body.classList.remove('sidebar-open');
  }
});