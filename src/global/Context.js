import { createContext, useState } from "react";
export const ContextProvider = createContext();

const Context = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    selectedLanguage,
    setSelectedLanguage,
  };

  return (
    <ContextProvider.Provider value={contextValue}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
