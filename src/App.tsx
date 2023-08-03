import { useEffect, useState } from "react";
import ActionButton from "./components/Button";

function App() {
  const [realMS, setRealMS] = useState(0);
  const [displayedMS, setDisplayedMS] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [parsedTime, setParsedTime] = useState("00:00.000");
  const [laps, setLaps] = useState<number[]>([]);

  // Initialize timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRealMS((prev) => prev + 10);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  // Update displayed time if the stopwatch is running
  useEffect(() => {
    if (stopwatchRunning) {
      setDisplayedMS((prev) => prev + 10);
    }
  }, [realMS]);

  // Parse time function
  const parseTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms - minutes * 60000) / 1000);
    const milliseconds = ms - minutes * 60000 - seconds * 1000;

    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }.${milliseconds}`;
  };

  useEffect(() => {
    setParsedTime(parseTime(displayedMS));
  }, [displayedMS]);

  return (
    <>
      <h1 className="text-center text-5xl font-bold mt-12">Stopwatch</h1>
      <span className="text-9xl font-light flex justify-center mb-6">
        {parsedTime}
      </span>

      <div className="flex flex-row gap-6 justify-center">
        <ActionButton
          action={() => setStopwatchRunning((prev) => !prev)}
          color={stopwatchRunning ? `bg-red-500` : `bg-green-500`}
        >
          {stopwatchRunning ? "Stop" : "Start"}
        </ActionButton>
        <ActionButton
          action={() => {
            setDisplayedMS(0);
            setStopwatchRunning(false);
          }}
          disabled={stopwatchRunning}
          color="bg-red-500"
        >
          Reset
        </ActionButton>
        <ActionButton
          action={() => setLaps((prev) => [...prev, displayedMS])}
          color="bg-blue-500"
        >
          Lap
        </ActionButton>
      </div>

      <hr className="my-6"></hr>

      <div className="mx-12">
        <span
          className={`text-2xl text-gray-500 italic font-light ${
            laps.length > 0 ? `hidden` : ``
          }`}
        >
          It looks like you don't have any laps. Get to stepping!
        </span>
        <ol className="list-decimal">
          {laps.map((lap, index) => (
            <li key={index} className="text-2xl">
              <button
                onClick={() =>
                  setLaps((prev) => prev.filter((_, i) => i !== index))
                }
                className="bg-red-500 text-white p-3 rounded-lg shadow-lg mb-5"
              >
                X
              </button>{" "}
              {parseTime(lap)}
            </li>
          ))}
        </ol>
      </div>

      <hr className="my-6"></hr>

      <span className="text-2xl text-gray-500 italic font-light flex justify-center mb-6">
        Made by Cerqiest for The Coding Empire&apos;s fourtneeth weekly challenge
        (hard).
      </span>
    </>
  );
}

export default App;
