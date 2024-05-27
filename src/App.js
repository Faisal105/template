import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
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
import { UserProvider } from "./contexts/UserContext";
import SignUpPage, { SignUpAction } from "./Pages/signUpPage/SignUpPage";
import LoginPage, { LoginAction } from "./Pages/loginPage/LoginPage";
import Home from "./Pages/home/Home";
import Footer from "./components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Navigate to="/Home" />,
				},
				{
					path: "/Home",
					element: <Home />,
					loader: ProductListingPageLoaders,
					errorElement: <ErrorPage />,
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
			],
		},
		{
			path: "/",
			element: <Navigate to="/Home" />,
		},
		{
			path: "/SignUpPage",
			element: <SignUpPage />,
			action: SignUpAction,
		},
		{
			path: "/LoginPage",
			element: <LoginPage />,
			action: LoginAction,
		},
	]);

  return (
    <CartProvider>
      <UserProvider>
        <RouterProvider router={router} />
        <Cart />
      </UserProvider>
    </CartProvider>
  );
}

export default App;
