import React, {useState} from "react";
import socket from './socket';
import styles from './styles';
const Verify = ({setTheme, theme, client})=>{
    const[inputLog, setInputLog] = useState('');
    const[inputPas, setInputPas] = useState('');
    const adminVerify =()=>{
     const newMessage = { login: inputLog, password: inputPas};
     console.log(newMessage)
     socket.emit('sendVerify', newMessage);
     setInputLog('');
     setInputPas('');
    };
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };
    return (      
    <>
    <input
        type="text"
        onChange={(e)=>setInputLog(e.target.value)}
        placeholder="Enter login"
        value = {inputLog}
        style={styles.inputV}
      />    
      <input
        type="password"
        onChange={(e)=>setInputPas(e.target.value)}
        placeholder="Enter password"
        value = {inputPas}
        style={styles.inputV}
     />
     <button onClick={adminVerify} style={styles.themeVer}>V</button>
      <div>
        <button onClick={toggleTheme} style={styles.themeToggle}>Toggle Theme</button>
        <span style={styles.clients(theme)}>Clients online: {client}</span>
      </div>
      </>
      )
}
export default Verify;
