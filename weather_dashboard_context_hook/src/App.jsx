import "./App.css";
import Header from "./components/Header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";

function App() {
  return (
    <div className="">
      <Header />
      <main className="mt-20 2xl:mt-5 h-screen grid place-items-center">
        <section>
          <WeatherBoard />
        </section>
      </main>
    </div>
  );
}

export default App;
