import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Main } from "./pages/Main";
import { Stats } from "./pages/Stats";
import { Changelog } from "./pages/Changelog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/changelog" element={<Changelog />} />
      </Route>
    </Routes>
  );
}

export default App;
