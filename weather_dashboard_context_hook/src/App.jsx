import "./App.css";
import Header from "./components/Header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import { FavoriteProvider, WeatherProvider } from "./providers";

function App() {
  return (
    <WeatherProvider>
      <FavoriteProvider>
        <div className="">
          <Header />
          <main className="mt-20 2xl:mt-5 h-screen grid place-items-center">
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      </FavoriteProvider>
    </WeatherProvider>
  );
}

export default App;
