import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, createContext, useState } from "react";
export const CurrentUserContext = createContext({ currentUser: null });

export const CurrentUserContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      user && setCurrentUser(user);
    };

    fetchCurrentUser();
  }, []);

  return <CurrentUserContext.Provider value={{ currentUser }}>{children}</CurrentUserContext.Provider>;
};
