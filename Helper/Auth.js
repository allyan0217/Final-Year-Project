import React, { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const Login = async (info) => {
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(info));
      setUserInfo(JSON.parse(await AsyncStorage.getItem("userInfo")));
    } catch (e) {
      console.log(e);
    }
  };
  const Logout = async () => {
    try {
      await AsyncStorage.clear();
      setUserInfo(null);
    } catch (e) {
      console.log(e);
    }
  };
  const checkLogin = async () => {
    const userInfo = await AsyncStorage.getItem("userInfo");
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
    setIsLoading(false);
  };
  React.useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLoading,
        Login,
        Logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
