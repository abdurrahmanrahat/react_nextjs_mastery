import { useReducer } from "react";
import { ProfileContext } from "../context";
import {
  profileInitialState,
  profileReducer,
} from "../reducers/profileReducer";

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, profileInitialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
