import { useReducer, useState } from "react";
import "./App.css";
import { MovieContext, ThemeContext } from "./contexts";
import Page from "./Page";
import { cartReducer, initialState } from "./reducers/cartReducer";

function App() {
  // const [cartData, setCartData] = useState([]);
  const [darkMood, setDarkMood] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <>
      <ThemeContext.Provider value={{ darkMood, setDarkMood }}>
        <MovieContext.Provider value={{ state, dispatch }}>
          <Page />
        </MovieContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
