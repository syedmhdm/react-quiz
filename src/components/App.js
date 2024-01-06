import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";
import data from "./questions.json";

export default function App() {
  const { status, dispatch } = useQuiz();

  useEffect(
    function () {
      // console.log(data);
      // fetch("./questions.json")
      //   .then((res) => res.json())
      //   .then((data) => {
      dispatch({ type: "dataReceived", payload: data.questions });
      // })
      // .catch((err) => {
      //   console.error(err.message);
      //   dispatch({ type: "dataFailed" });
      // });
    },

    [dispatch]
  );

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          // <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
          <StartScreen />
        )}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
