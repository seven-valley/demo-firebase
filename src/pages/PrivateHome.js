import { UserContext } from "../context/UserContext";
import { useContext } from "react";

function PrivateHome() {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <>
      <h1 className="mt-20 text-center text-[4rem] font-bold">
        Private Home !!!
      </h1>
      <p className="text-center mt-8 text-2xl">All hail {currentUser.email}</p>
    </>
  );
}

export default PrivateHome;
