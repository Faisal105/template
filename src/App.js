import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProductDescriptionPage, {
  ProductDetailPageLoaders,
} from "./Pages/productDescription/ProductDescriptionPage";
import ProductListingPage, {
  ProductListingPageLoaders,
} from "./Pages/productListing/ProductListingPage";
import Header from "./components/header/Header";
import ErrorPage from "./Pages/errorPage/ErrorPage";
import CartPage from "./Pages/cartPage/CartPage";
import Cart from "./components/cart";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/ProductListingPage" />,
    },
    {
      path: "/ProductListingPage",
      element: <ProductListingPage />,
      loader: ProductListingPageLoaders,
      errorElement: <ErrorPage />,
    },
    {
      path: "/ProductDescriptionPage/:productId",
      element: <ProductDescriptionPage />,
      loader: ProductDetailPageLoaders,
      errorElement: <ErrorPage />,
    },
    {
      path: "/CartPage",
      element: <CartPage />,
    },
  ]);

  return (
    <CartProvider>
      <Header />
      <RouterProvider router={router} />
      <Cart />
    </CartProvider>
  );
}

export default App;
