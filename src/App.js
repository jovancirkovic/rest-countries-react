import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Country from "./components/Country";
import Header from "./components/Header";
import Input from "./components/Input";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [country, setCountry] = useState("");

  const onClickHandler = (data) => {
    setIsClicked(data);
  };

  const onNameHandler = (data) => {
    setCountry(data);
  };

  return (
    <>
      <Header onClickHandler={onClickHandler} />
      <Routes>
        <Route
          path="/"
          element={
            <Input isClicked={isClicked} onNameHandler={onNameHandler} />
          }
        />
        <Route
          path="/country/:name"
          element={<Country country={country} isClicked={isClicked} />}
        />
      </Routes>
    </>
  );
}

export default App;
