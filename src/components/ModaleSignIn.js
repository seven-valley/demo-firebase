import { UserContext } from "../context/UserContext";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ModaleSignIn() {
  /* instances */
  const { modalsState, toggleModals, signIn } = useContext(UserContext);
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

    /* signing in */
    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      closeHandler();
      navigate("/private/private-home");
    } catch (error) {
      console.log("error");
    }
  };

  const closeHandler = () => {
    formRef.current.reset();
    toggleModals("close");
  };

  /* render */
  return (
    modalsState.signInModal && (
      <>
        <div
          className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-black/[0.3]"
          onClick={closeHandler}
        ></div>

        <div className="min-w-[500px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="px-4 mt-4 flex justify-between">
            <h6>Sign In</h6>
            <button onClick={closeHandler}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form
            className="w-[80%] my-8 mx-auto"
            ref={formRef}
            onSubmit={submitHandler}
          >
            <div className="mb-4 flex flex-col gap-1">
              <label htmlFor="signInEmail">E-mail</label>
              <input
                ref={addInput}
                type="text"
                id="signInEmail"
                name="signInEmail"
                placeholder="your@email.com"
                className="h-[30px] px-2 border-[1px] border-black border-solid"
              ></input>
            </div>
            <div className="mb-8 flex flex-col gap-1">
              <label htmlFor="signInPsw">Password</label>
              <input
                ref={addInput}
                type="password"
                id="signInPsw"
                name="signInPsw"
                placeholder="your password"
                className="h-[30px] px-2 border-[1px] border-black border-solid"
              ></input>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="h-[30px] px-4 mr-4 text-white text-4 bg-green"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default ModaleSignIn;
