import { createContext, useState } from "react";

export const AdminAuthenticationContext = createContext();

export function AdminAuthenticationProvider(props) {
  const [adminAuth, setAdminAuth] = useState(false);

  const AdminDataShare = {
    adminAuth,
    setAdminAuth,
  };
  return (
    <AdminAuthenticationContext.Provider value={AdminDataShare}>
      {props.children}
    </AdminAuthenticationContext.Provider>
  );
}
