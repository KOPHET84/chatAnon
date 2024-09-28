import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from './styles';
import socket from "./socket";

const AdminPanel = (props) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [readUser, setReadUser] = useState(false);
  const [readMessage, setReadMessage] = useState(false);
  let Id = props.Id;
  useEffect(() => {
    socket.on('sendMass', (message) => {
      setMessage(message);
    });
    return () => {
      socket.off('sendMass');
    };
  }, []);

  useEffect(() => {
    const handleUsers = (user) => {
      setUsers(user);
    };
    socket.on('sendUsers', handleUsers);
    return () => {
      socket.off('sendUsers', handleUsers);
    };
  }, []);

    const DeleteUsers = useCallback((mass, user) => {
      const newUsers = mass.filter((e) => e !== user);
      setUsers(newUsers);
      socket.emit('removeUser', user);
    }, []);

  const ShowUsers = useMemo(() => {
    return readUser&&!readMessage && users.map((el, index) => (
      <div style={users[index] === Id ? styles.admin : null} key={users[index]}>
        <button style={styles.delete} onClick={() => DeleteUsers(users, users[index])}>&#x2717;</button>
        User {index + 1} id: {users[index]}
      </div>
    ));
  }, [users, readMessage, Id, DeleteUsers, readUser]);

  const DeleteMessage = useCallback((mass, index) => {
    const newMessages = mass.filter((el, ind) => ind !== index);
    setMessage(newMessages);
    socket.emit('deleteMessage', newMessages);
  }, []);

  const ShowMessage = useMemo(() => {
    return readMessage&&!readUser && message.map((el, index) => (
      <div key={index}>
        <button style={styles.delete} onClick={() => DeleteMessage(message, index)}>&#x2717;</button>
        <span>{el.user}:</span>
        <span>{el.text}</span>
      </div>
    ));
  }, [message, readUser, DeleteMessage, readMessage]);

  const handleManageUsers = useCallback(() => {
    socket.emit('showUsers');
    setReadUser(true);
    setReadMessage(false);
  }, []);

  const handleViewReports = useCallback(() => {
    socket.emit('showMessage');
    setReadUser(false);
    setReadMessage(true);
  }, []);

  const backChat = useCallback(() => {
    socket.emit('returnVerify');
  }, []);

  const Panel = () => (
    <>
      <h2>Admin Panel</h2>
      <h3>admin id: {Id}</h3>
      <button style={styles.button} onClick={handleManageUsers}>Show Users</button>
      <button style={styles.button} onClick={handleViewReports}>Show Messages</button>
      <button style={styles.button} onClick={backChat}>Return</button>
    </>
  );

  return (
    <div className="admin-panel" style={styles.container('light')}>
      <Panel />
      <div style={styles.messagesContainer}>
        {ShowUsers}
        {ShowMessage}
      </div>
    </div>
  );
};

export default AdminPanel;