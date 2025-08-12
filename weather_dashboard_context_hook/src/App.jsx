import "./App.css";
import Header from "./components/Header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import { WeatherProvider } from "./providers";

function App() {
  return (
    <WeatherProvider>
      <div className="">
        <Header />
        <main className="mt-20 2xl:mt-5 h-screen grid place-items-center">
          <section>
            <WeatherBoard />
          </section>
        </main>
      </div>
    </WeatherProvider>
  );
}

export default App;
