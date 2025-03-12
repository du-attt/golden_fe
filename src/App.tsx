import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home";
import SearchScores from "./pages/SearchScores";
import Reports from "./pages/Reports";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen w-screen">
        <Header />
        <div className="flex flex-row justify-between">
          <div className="md:w-[200px]">
            <Sidebar />
          </div>
          <div className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchscores" element={<SearchScores />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};


export default App;
