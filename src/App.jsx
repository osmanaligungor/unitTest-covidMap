import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Detail from "./pages/detail/index";
import Home from "./pages/home/index";
import Layout from "./components/layout";

// Route'ları tanımladık
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/detail/:code", element: <Detail /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className="flex flex-col min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/detail/:code" element={<Detail />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// };

export default App;
