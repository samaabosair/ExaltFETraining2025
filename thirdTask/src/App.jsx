import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar";
import CreatEvent from "./pages/CreatEvent";
import EventPage from "./pages/EventPage";
import './index.css';
function App() {
  return (
 <>    <Header />
    <div
  style={{
    display: "flex",
    marginTop: "40px",
    overflow: "visible",      
  }}
>
        <Sidebar />
     <main
    style={{
      flexGrow: 1,
      padding: "20px 0px",
      maxWidth: "none",
      minWidth:1100,
    }}
  >

<Routes>
  <Route path="/" element={<EventPage />} />
  <Route path="/create" element={<CreatEvent />} />
  <Route path="/edit/:id" element={<CreatEvent />} />
</Routes>


        </main>
      </div></>
  );
}

export default App;
