import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [User, setUser] = useState(null);
  const [languagesSetup, setLanguageSetup] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  return (
    <AuthContext.Provider value={{ 
      User, 
      setUser, 
      languagesSetup, 
      setLanguageSetup,
      selectedLanguages,
      setSelectedLanguages
    }}>
      {children}
    </AuthContext.Provider>
  );
}
