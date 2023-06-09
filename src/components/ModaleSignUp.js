import { UserContext } from "../context/UserContext";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModaleSignUp() {
  /* states */
  const [errorMessage, setErrorMessage] = useState("");

  /* instances */
  const { modalsState, toggleModals, signUp } = useContext(UserContext);
  const navigate = useNavigate();

  /* refs */
  const inputs = useRef([]);
  const addInput = (element) => {
    if (element && !inputs.current.includes(element)) {
      inputs.current.push(element);
    }
  };
  const formRef = useRef();

  /* handlers */
  const submitHandler = async (event) => {
    event.preventDefault();

    /* check psw length and match */
    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      return setErrorMessage("Passwords need 6 characters minimum !");
    }
    if (inputs.current[1].value !== inputs.current[2].value) {
      return setErrorMessage("Passwords need to match !");
    }

    /* creating user, if ok go to "/private/private-home" */
    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      closeModalHandler();
      navigate("/private/private-home");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already in use !");
      }
      if (error.code === "auth/invalid-email") {
        setErrorMessage("Invalid email !");
      }
    }
  };

  /* reset ref, form, state before closing */
  const closeModalHandler = () => {
    formRef.current.reset();
    setErrorMessage("");
    inputs.current = [];
    toggleModals("close");
  };

  /* render */
  return (
    modalsState.signUpModal && (
      <>
        <div
          className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-black/[0.3]"
          onClick={closeModalHandler}
        ></div>

        <div className="min-w-[500px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="px-4 mt-4 flex justify-between">
            <h6>Sign Up</h6>
            <button onClick={closeModalHandler}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form
            ref={formRef}
            className="w-[80%] my-8 mx-auto"
            onSubmit={submitHandler}
          >
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="signUpEmail">E-mail</label>
              <input
                ref={addInput}
                type="text"
                id="signUpEmail"
                name="signUpEmail"
                placeholder="your@email.com"
                className="h-[30px] px-2 border-[1px] border-black border-solid"
              ></input>
            </div>

            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="signUpPsw">Password</label>
              <input
                ref={addInput}
                type="password"
                id="signUpPsw"
                name="signUpPsw"
                className="h-[30px] px-2 border-[1px] border-black border-solid"
              ></input>
            </div>

            <div className="mb-8 flex flex-col gap-1">
              <label htmlFor="signUpPswRepeat">Repeat password</label>
              <input
                ref={addInput}
                type="password"
                id="signUpPswRepeat"
                name="signUpPswRepeat"
                className="h-[30px] px-2 border-[1px] border-black border-solid"
              ></input>
            </div>

            <p className=" mb-4 -mt-4 text-red">{errorMessage}</p>

            <div className="flex justify-start items-center">
              <button
                type="submit"
                className="h-[30px] px-4 mr-4 text-white text-4 bg-green"
              >
                Submit
              </button>

              <button className="h-[30px] px-4 mr-4 text-white text-4 bg-red">
                Reset
              </button>

              <button
                type="button"
                onClick={() =>
                  console.log(
                    "inputs",
                    inputs.current.map((el) => el.value)
                  )
                }
              >
                inputs.current
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default ModaleSignUp;
