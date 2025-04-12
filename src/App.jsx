import React, { useState } from "react";
import { Route,Routes } from "react-router-dom";

import Quiz from "./pages/Quiz";
import LeaderBoard from "./pages/Leaderboard.jsx";
import Para1 from "./pages/Para1.jsx";
import Question1 from "./pages/Question1.jsx";
import Para2 from "./pages/Para2.jsx";
import Question2 from "./pages/Question2.jsx";
import Para3 from "./pages/Para3.jsx";
import Question3 from "./pages/Question3.jsx";
import Para4 from "./pages/Para4.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
return(
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/para-1" element={<Para1 />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/para-2" element={<Para2 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/para-3" element={<Para3 />} />
        <Route path="/question6" element={<Question3 />} />
        <Route path="/para-4" element={<Para4 />} />
      </Routes>
    </div>
)
};

export default App;