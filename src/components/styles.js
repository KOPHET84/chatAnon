const styles = {
    container: (theme) => ({
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      background: theme === 'light'
        ? 'linear-gradient(135deg, #6e45e2, #88d3ce)'
        : 'linear-gradient(135deg, #1e1e1e, #3e3e3e)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      transition: 'background 0.5s',
    }),
    themeToggle: {
      marginBottom: '10px',
      padding: '10px',
      marginRight:'10%',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    themeVer: {
      marginLeft:'5px',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: 'blue',
      color: '#fff',
      fontSize: '10px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },    
    inputV: {
      marginLeft:'3px',
      width:'125px',
      height:'28px',
      padding:'10px',
      borderRadius: '3px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
      
    },
    title: (theme) => ({
      margin: '0 0 10px 0',
      fontSize: '24px',
      color: theme === 'light' ? '#fff' : '#f1f1f1',
    }),
    clients: (theme) => ({
      margin: '0 0 10px 0',
      fontSize: '16px',
      color: theme === 'light' ? '#f1f1f1' : '#ccc',
    }),
    usernameContainer: {
      marginBottom: '10px',
    },
    usernameInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      boxSizing: 'border-box',
    },
    messagesContainer: {
      height: '400px',
      overflowY: 'scroll',
      border: '1px solid #ddd',
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#fff',
      borderRadius: '5px',
    },
    noMessages: (theme) => ({
      color: theme === 'light' ? '#888' : '#aaa',
      textAlign: 'center',
    }),
    messageContainer: (theme) => ({
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '10px',
      padding: '5px',
    }),
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginRight: '10px',
      border: '2px solid transparent', 
    },
    messageBubble: (theme) => ({
      maxWidth: '70%',
      padding: '10px',
      borderRadius: '15px',
      border: '2px solid transparent', 
      backgroundColor: theme === 'light' ? '#f1f1f1' : '#555',
      color: theme === 'light' ? '#000' : '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    messageUser: {
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    messageText: {
      lineHeight: '1.5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      marginBottom: '10px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    delete:{
        border: '0',
        color:'red',
        backgroundColor:'white',
        fontSize: '18px',
        cursor: "not-allowed",
      
    },
    admin:{
      color:'red'
    }
  };
export default styles