import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type useAuthProps = {};

const useAuth = ({}: useAuthProps) => {
  return useContext(AuthContext);
};

export default useAuth;
