import { createContext, useContext, useState } from "react";

export const HeaderContext = createContext({});
export const useHeaderConfig = () => useContext(HeaderContext);

export function HeaderConfigProvider({children}) {
  const [rightContent, setRightContent] = useState(null);

  return (
    <HeaderContext.Provider value={{rightContent, setRightContent}}>
      {children}
    </HeaderContext.Provider>
  );
}