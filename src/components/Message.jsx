import React, { useCallback, useEffect, useState, useMemo } from "react";
import styles from './styles';
import { toast } from 'react-toastify';
import socket from "./socket";

const AllMessage = ({ theme, username, setUsername }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const userColors = useMemo(() => ({
    'Alice': '#FF5733',
    'Jack': '#33FF57',
    'Charlie': '#3357FF',
    'Anonymous': '#AAAAAA',
    'Evgenia': '#DB7093'
  }), []);

  const getUserColor = useCallback((user) => {
    return userColors[user] || '#FFDAB9';
  }, [userColors]);


  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (input.trim()) {
      const newName = username || 'Anonymous';
      const newMessage = { text: input, user: newName };
      socket.emit('sendMessage', newMessage);
      setInput('');
    }
  }, [input, username]);

  useEffect(() => {
    const handleHistory = (history) => setMessages(history);
    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      toast(`${message.user}: ${message.text}`);
    };

    socket.on('history', handleHistory);  
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('forceDisconnect', () => {
      socket.disconnect();
      toast('Ban');
      setMessages([]);
    });
    socket.on('deleteMessage', (updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      socket.off('history', handleHistory);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('forceDisconnect');
    };
  }, []);

 
  const renderedMessages = useMemo(() => {
    return messages.length === 0
      ? <p style={styles.noMessages(theme)}>No messages yet. Start the conversation!</p>
      : messages.map((msg, index) => (
          <div key={index} style={styles.messageContainer(theme)}>
            <div style={{ ...styles.avatar, backgroundColor: getUserColor(msg.user) }}>👤</div>
            <div style={{ ...styles.messageBubble(theme), borderColor: getUserColor(msg.user) }}>
              <span style={styles.messageUser}>{msg.user}:</span>
              <span style={styles.messageText}>{msg.text}</span>
            </div>
          </div>
        ));
  }, [messages, theme, getUserColor]);

  return (
    <>
      <h2 style={styles.title(theme)}>Chat Room</h2>
      <div style={styles.usernameContainer}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          style={styles.usernameInput}
        />
      </div>
      <div style={styles.messagesContainer}>
        {renderedMessages}
      </div>
      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </>
  );
};

export default AllMessage;
