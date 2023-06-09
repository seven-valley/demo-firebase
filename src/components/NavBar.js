import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import ModaleSignUp from "./ModaleSignUp";
import ModaleSignIn from "./ModaleSignIn";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase-config";

function NavBar() {
  const { toggleModals } = useContext(UserContext);

  /* instances */
  const navigate = useNavigate();

  /* handlers */
  const signUpModalHandler = () => {
    toggleModals("signUp");
  };

  const signInModalHandler = () => {
    toggleModals("signIn");
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  /* render */
  return (
    <>
      <header className="bg-grey">
        <nav className="px-12 py-8 flex justify-between">
          <div>
            <h1 className="font-bold">Navigation</h1>
          </div>
          <div>
            <button
              className="h-[30px] px-4 ml-4 text-white text-4 bg-green rounded-xl"
              onClick={signUpModalHandler}
            >
              Sign Up
            </button>
            <button
              className="h-[30px] px-4 ml-4 text-white text-4 bg-green rounded-xl"
              onClick={signInModalHandler}
            >
              Sign In
            </button>
            <button
              className="h-[30px] px-4 ml-4 text-white text-4 bg-red rounded-xl"
              onClick={signOutHandler}
            >
              Log Out
            </button>
          </div>
        </nav>
      </header>
      <ModaleSignUp />
      <ModaleSignIn />
    </>
  );
}

export default NavBar;
