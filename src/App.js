import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ProductDescriptionPage from "./Pages/productDescription/ProductDescriptionPage";
import ProductListingPage from "./Pages/productListing/ProductListingPage";
import Header from "./components/header/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/ProductListingPage" />,
    },
    {
      path: "/ProductListingPage",
      element: <ProductListingPage />,
    },
    {
      path: "/ProductDescriptionPage/:productId",
      element: <ProductDescriptionPage />,
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
