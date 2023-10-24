import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const adminList = ['JM', 'njcr', 'Vkook'];

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  const login = ({ username }) => {
    const isAdmin = adminList.find(admin => admin === username);
    const path = location.state?.from?.pathname || 'profile'
    return navigate(path,{ replace:true }),
    setUser({ username, isAdmin });
    /* navigate('/profile'); */
  };
  
  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const update = (data) => {
    setUser({ ...user, ...data})
  }

  const isLogged = user !==null;
  
  const auth = { user, login, logout, update, isLogged };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

function AuthRoute(props) {
  const auth = React.useContext(AuthContext);
  /* useAuth() */

  if (!auth.user){
    return <Navigate to='/login'/>
  }

  return props.children;
}



export {
  AuthProvider,
  useAuth,
  AuthRoute,
};