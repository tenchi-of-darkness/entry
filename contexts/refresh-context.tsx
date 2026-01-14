import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RefreshContextType {
  refreshCount: number;
  triggerRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const triggerRefresh = () => {
    setRefreshCount(prevCount => prevCount + 1);
  };

  return (
    <RefreshContext.Provider value={{ refreshCount, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
