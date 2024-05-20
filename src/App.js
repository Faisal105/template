import "./App.css";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
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

import SignUpPage from "./Pages/signUpPage/SignUpPage";

import LoginPage from "./Pages/loginPage/LoginPage";

import { SignUpAction } from "./Pages/signUpPage/SignUpPage";

import { LoginAction } from "./Pages/loginPage/LoginPage";
import Home from "./Pages/home/Home";

const Layout = ({ children }) => {
	const location = useLocation();

	const hideHeaderRoutes = ["/SignUpPage", "/LoginPage"];

	return (
		<>
			{!hideHeaderRoutes.includes(location.pathname) && <Header />}

			{children}
		</>
	);
};

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Navigate to="/Home" />,
		},
		{
			path: "/Home",
			element: (
				<Layout>
					<Home />
				</Layout>
			),
			loader: ProductListingPageLoaders,
			errorElement: <ErrorPage />,
		},
		{
			path: "/ProductListingPage",
			element: (
				<Layout>
					<ProductListingPage />
				</Layout>
			),
			loader: ProductListingPageLoaders,
			errorElement: <ErrorPage />,
		},
		{
			path: "/ProductDescriptionPage/:productId",
			element: (
				<Layout>
					<ProductDescriptionPage />
				</Layout>
			),
			loader: ProductDetailPageLoaders,
			errorElement: <ErrorPage />,
		},
		{
			path: "/CartPage",
			element: <CartPage />,
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
			<RouterProvider router={router} />
			<Cart />
		</CartProvider>
	);
}

export default App;
