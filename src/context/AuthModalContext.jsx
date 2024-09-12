import React, { createContext, useState, useContext } from 'react';

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login'); // 'login' or 'sign-up'

  const openAuthModal = (mode = 'login') => {
    setModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <AuthModalContext.Provider value={{ isAuthModalOpen, modalMode, openAuthModal, closeAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
