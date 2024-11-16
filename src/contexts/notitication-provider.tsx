import { createContext, useContext, useState } from "react";
export const NoticiationContext = createContext({} as any);

export const NotificationProvider = ({ children }) => {
  const [showNotification, setshowNotification] = useState(false);

  const setNotification = (value: boolean) => setshowNotification(value);

  return (
    <NoticiationContext.Provider value={{ setNotification }}>
      {showNotification && <div>I'm a notification</div>}
      {children}
    </NoticiationContext.Provider>
  );
};
export const useNotification = useContext(NoticiationContext);
