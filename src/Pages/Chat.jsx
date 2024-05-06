import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  TextField,
  ListItemAvatar,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
const socket = io('http://localhost:3001'); // Adjust the URL to your server
import { useSelector } from 'react-redux';
function Sidebar({ conversations, setCurrentConversation }) {
  // Placeholder data

  return (
    <Box width="30%" bgcolor="#26364D">
      <List>
        {conversations.map((chat, index) => (
          <ListItem
            button
            key={index}
            onClick={() => setCurrentConversation(chat.id)}
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText sx={{ color: 'white' }} primary={chat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
function ChatWindow({ setMessage, messages, sendMessage, message, userId }) {
  return (
    <Box flex={1} display="flex" flexDirection="column">
      {/* Messages Display */}
      <Box flex={1} bgcolor="#ECE5DD" padding={2} overflow="auto">
        <List>
          {messages.map((msg, index) =>
            msg.from_user_id === userId ? (
              <ListItem
                key={index}
                alignItems="center"
                justifyContent={'flex-end'}
              >
                <ListItemText
                  sx={{
                    color: 'black',
                    width: '250px',
                    background: '#DCF8C6',
                  }}
                  primary={msg.content}
                />
                <ListItemAvatar>
                  <Avatar>{/* Avatar or initial of the sender */}</Avatar>
                </ListItemAvatar>
              </ListItem>
            ) : (
              <ListItem
                key={index}
                alignItems="center"
                justifyContent={'flex-end'}
              >
                <ListItemAvatar>
                  <Avatar>{/* Avatar or initial of the sender */}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    color: 'black',
                    width: 250,
                    background: '#FFFFFF',
                  }}
                  primary={msg.content}
                />
              </ListItem>
            )
          )}
        </List>
      </Box>

      {/* Message Input */}
      <Box display="flex" alignItems="center" padding={1} bgcolor="white">
        <TextField
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function Chat() {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState('');

  useEffect(() => {
    if (user.id) {
      socket.emit('register', user.id);
    }

    socket.emit('get conversations', user.id);
    if (users.length > 0) {
      socket.on('get conversations', (newMessage) => {
        const array = [];
        Object.keys(newMessage).map((key) => {
          array.push(users.find((user) => user.id === key));
        });
        setConversations(array);
        const messagesArray = [];
        if (currentConversation) {
          console.log(newMessage[currentConversation]);
          newMessage[currentConversation]?.map((value) => {
            const exists = messagesArray.some((p) => p.id === value.id);
            if (exists) {
              return;
            } else {
              messagesArray.push(value);
            }
          });
        }

        setMessages(messagesArray);
      });
    }
    const handleNewMessage = (newMessage) => {
      setMessages((messages) => [...messages, newMessage]);
    };
    socket.on('chat message', handleNewMessage);

    return () => {
      socket.off('message');
      socket.off('chat message', handleNewMessage);
    };
  }, [users, user, currentConversation]);
  const sendMessage = () => {
    socket.emit('chat message', {
      from_user_id: user.id,
      to_user_id: currentConversation,
      content: message.trim(),
    });
    setMessage('');
  };
  return (
    <Box display="flex" height="100vh">
      <Sidebar
        conversations={conversations}
        setCurrentConversation={setCurrentConversation}
      />
      <ChatWindow
        sendMessage={sendMessage}
        userId={user.id}
        messages={messages}
        message={message}
        setMessage={setMessage}
      />
    </Box>
  );
}

export default Chat;
