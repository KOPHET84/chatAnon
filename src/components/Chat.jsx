import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin from './Admin';
import AllMessage from './Message';
import socket from './socket';
import Verify from './Verify';

const Chat = () => {
  const [username, setUsername] = useState('');
  const [client, setClient] = useState([]);
  const [theme, setTheme] = useState('light');
  const [adminId, setAdminId] = useState(false);

  const handleUserCount = useCallback((users) => {
    setClient(users);
  }, []);

  const handleVerify = useCallback((answer, Id) => {
    if (answer === true) {
      setAdminId(Id);
    } else {
      toast(`bad password or login`);
      setAdminId(false);
    }
  }, []);

  useEffect(() => {
    socket.on('numbersUsers', handleUserCount);
    socket.on('backVerify', handleVerify);

    return () => {
      socket.off('numbersUsers', handleUserCount);
      socket.off('backVerify', handleVerify);
    };
  }, [handleUserCount, handleVerify]);

  const containerStyle = useMemo(() => styles.container(theme), [theme]);

  return (
    adminId ? (
      <Admin Id={adminId} />
    ) : (
      <div style={containerStyle}>
        <Verify
          setTheme={setTheme}
          theme={theme}
          client={client}
        />
        <AllMessage
          theme={theme}
          username={username}
          setUsername={setUsername}
        />

        <ToastContainer
          limit={3}
          autoClose={1000}
          pauseOnFocusLoss={true}
          closeOnClick={false
          }
          pauseOnHover={true}
        />
      </div>
    )
  );
};

export default Chat;
