import { useState, createContext } from "react";

export const DealerAuthenticationContext = createContext();

export function DealerAuthenticationProvider(props) {
  const [dealerAuth, setDealerAuth] = useState(false);

  const DealerDataShare = {
    dealerAuth,
    setDealerAuth,
  };
  return (
    <DealerAuthenticationContext.Provider value={DealerDataShare}>
      {props.children}
    </DealerAuthenticationContext.Provider>
  );
}
