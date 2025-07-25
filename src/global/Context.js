import { createContext, useState } from "react";

export const ContextProvider = createContext();

const Context = (props) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [otp, setOtp] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [mapState, setMapState] = useState("");
  const [address, setAddress] = useState(null);

  const contextValue = {
    token,
    setToken,
    user,
    setUser,
    selectedLanguage,
    setSelectedLanguage,
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    selectedTab,
    setSelectedTab,
    mapState,
    setMapState,
    address,
    setAddress,
  };

  return (
    <ContextProvider.Provider value={contextValue}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default Context;
