import { ThemeProvider } from 'react-bootstrap';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';


import { User, Users } from "./pages";


function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Users/>,
    },
    {
      path: "/:id",
      element: <User/>,
    },
  ]);

  return (
    <ThemeProvider
  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
  minBreakpoint="xxs"
>
  <RouterProvider router={router}/>
</ThemeProvider>
  )
}

export default App;
