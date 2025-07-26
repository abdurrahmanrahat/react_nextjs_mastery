import { useContext } from "react";
import MovieList from "./components/Cine/MovieList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { ThemeContext } from "./contexts";

const Page = () => {
  const { darkMood } = useContext(ThemeContext);

  return (
    <div className={`h-full w-full ${darkMood ? "dark" : ""}`}>
      <Header />
      <main>
        <div className="container mx-auto grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
          <Sidebar />
          <MovieList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Page;
