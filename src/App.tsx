import { Routes, Route } from "react-router-dom";
import { Changelog } from "./pages/Changelog";
import { Main } from "./pages/Main";
import { Layout } from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/changelog" element={<Changelog />} />
      </Route>
    </Routes>
  );
}

export default App;
