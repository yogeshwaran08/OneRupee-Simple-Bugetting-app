import React, {createContext, useState, useContext, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type FireBaseUserType = [FirebaseAuthTypes.User | null | undefined, boolean];

const AuthContext = createContext<FireBaseUserType>([undefined, true]);

interface ProviderType {
  children: JSX.Element;
}

export const AuthContextProvier: React.FC<ProviderType> = ({children}) => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FireBaseUserType>([null, initializing]);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    if (initializing) setInitializing(false);
    setUser([user, initializing]);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = (): FireBaseUserType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
