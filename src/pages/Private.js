import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

function Private() {
  const { currentUser } = useContext(UserContext);

  /* access denied if no currentUser */
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  /* access to <PrivateHome /> */
  return (
    <>
      <Outlet />
    </>
  );
}

export default Private;
