import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/home";
import SearchScores from "./pages/SearchScores";
import Reports from "./pages/Reports";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 p-4 ml-64 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchscores" element={<SearchScores />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
    // <SearchScores />
  );
};


export default App;
