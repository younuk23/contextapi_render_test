import "./styles.css";
import { createContext, useContext, useEffect, useState } from "react";

const NumberContext = createContext(null);
const TextContext = createContext(null);
const MergedContext = createContext(null);

const MergedContextProvider = ({ children }) => {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");

  return (
    <MergedContext.Provider value={{ number, setNumber, text, setText }}>
      {children}
    </MergedContext.Provider>
  );
};

const NumberProvider = ({ children }) => {
  const [number, setNumber] = useState(0);

  return (
    <NumberContext.Provider value={{ number, setNumber }}>
      {children}
    </NumberContext.Provider>
  );
};

const TextProvider = ({ children }) => {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};

export default function App() {
  return (
    <MergedContextProvider>
      <NumberProvider>
        <TextProvider>
          <NumberComp />
          <TextComp />
        </TextProvider>
      </NumberProvider>
    </MergedContextProvider>
  );
}

const NumberComp = () => {
  const { number, setNumber } = useContext(MergedContext);
  useEffect(() => {
    console.log("NumberComp Renderd");
  });

  return (
    <div style={{ marginBottom: "50px" }}>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>Increase Number</button>
    </div>
  );
};

const TextComp = () => {
  const { text, setText } = useContext(MergedContext);

  useEffect(() => {
    console.log("Text Comp Rendered");
  });

  return <input onChange={(e) => setText(e.target.value)} value={text} />;
};
