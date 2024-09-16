import { AUTH_PATH, MAIN_PATH, SELECT_PATH } from "constants/index";
import Container from "layouts/Container";
import { Auth, Main, Select } from "pages";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Auth />} />
        </Route>
        <Route path={SELECT_PATH()} element={<Select />} />
      </Routes>
    </div>
  );
}

export default App;
