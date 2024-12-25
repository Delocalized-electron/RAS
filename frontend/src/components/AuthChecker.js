import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth";
import Loading from "../pages/Loading";

const AuthChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/current-user`,
          {
            withCredentials: true, // Include cookies in the request
          }
        );
        if (response.status === 200) {
          console.log("User is authenticated");
          dispatch(authActions.login());
        }
      } catch (error) {
        console.error("User is not authenticated", error);
        dispatch(authActions.logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Loading />; // Or any loading spinner
  }

  return <>{children}</>;
};

export default AuthChecker;
