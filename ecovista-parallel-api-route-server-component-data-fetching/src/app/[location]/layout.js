import "../globals.css";


export const metadata = {
    title: "EcoVista",
    description: "One Place Dashboard for Eco Information",
};

export default function LocationLayout({ children, weather, aqi, wind, temperature }) {
  return (
    
      <div
        className="wrapper"
      >
        {children}
        {weather}
        {aqi}
        {wind}
        {temperature}
      </div>
    
  );
}
