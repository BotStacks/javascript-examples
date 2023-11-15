import { useEffect, useState } from 'react';
import { InAppChatProvider, InAppChatUI, useChat } from '@inappchat/react';
import '@inappchat/react/dist/style.css';

const API_KEY = import.meta.env.VITE_IAC_API_KEY || '';
const ENV = import.meta.env.VITE_IAC_ENV || 'prod';

const users = {
  '1': {
    user_id: '1',
    username: 'harry.potter',
    email: 'harrypotter@hogwartz.co.uk',
    display_name: 'Harry Potter',
  },
  '2': {
    user_id: '2',
    username: 'hermoine.granger',
    email: 'hermoinegranger@hogwartz.co.uk',
    display_name: 'Hermoine Granger',
  },
  '3': {
    user_id: '3',
    username: 'ron.weasley',
    email: 'ronweasley@hogwartz.co.uk',
    display_name: 'Ron Weasley',
  },
  '4': {
    user_id: '4',
    username: 'luna.lovegood',
    email: 'lunalovegood@hogwartz.co.uk',
    display_name: 'Luna Lovegood',
  },
};

const Chat = ({ userId, onLogout }) => {
  const chat = useChat();
  useEffect(() => {
    if (userId) {
      chat.login(users[userId]);
    }
  }, [userId]);

  if (chat.loggingIn) {
    return <div>Logging in...</div>;
  }

  return <InAppChatUI onLogout={onLogout} />;
};

const LoginScreen = ({ onLogin }: { onLogin: (userId: string) => void }) => {
  return (
    <div className="login-screen">
      <div className="login-screen-header">Log In as...</div>
      <div className="login-screen-users-continer">
        {Object.keys(users).map((userId: string) => (
          <div
            key={userId}
            className="login-screen-user-card"
            onClick={() => onLogin(userId)}
          >
            {users[userId].display_name}
          </div>
        ))}
      </div>
    </div>
  );
};

export const App = () => {
  const [userId, setUserId] = useState('');
  if (API_KEY === '') {
    return <div>Please provide an api key!</div>;
  }

  const handleLogin = (userId: string) => {
    setUserId(userId);
  };

  return (
    <InAppChatProvider apiKey={API_KEY} env={ENV}>
      {userId ? (
        <Chat
          userId={userId}
          onLogout={() => {
            setUserId('');
          }}
        />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </InAppChatProvider>
  );
};
