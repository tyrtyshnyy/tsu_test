import { ThemeProvider } from "react-bootstrap";
import { HashRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { User, Users } from "./pages";

function App() {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <HashRouter>
        <Routes>
          <Route index path="/" element={<Users />} />
          <Route path="/:id" element={<User />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
