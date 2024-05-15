import "./App.css";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import ProductDescriptionPage from "./Pages/productDescription/ProductDescriptionPage";
import ProductListingPage, {
	ProductListingPageLoaders,
} from "./Pages/productListing/ProductListingPage";
import Header from "./components/header/Header";
import ErrorPage from "./Pages/errorPage/ErrorPage";
import CartPage from "./Pages/cartPage/CartPage";
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
		},
		{
			path: "/CartPage",
			element: <CartPage />,
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
