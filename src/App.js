
import "./App.css";
import LandingPage from "./LandingPage";
import MainPage from "./Portfolio/MainPage";

const injectedData = window.__PORTFOLIO_DATA__ || null;

function App() {
  if (injectedData) {
    return <MainPage responseData={injectedData} />;
  }
  
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
