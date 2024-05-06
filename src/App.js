import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import ProductDescriptionPage from "./Pages/productDescription/ProductDescriptionPage";
import ProductListingPage from "./Pages/productListing/ProductListingPage";
import Header from "./components/header/Header";

function App() {
	return (
		<>
		<Header></Header>
		<Router>
			<Routes>
				<Route path="/" element={<Navigate to="/ProductListingPage" />} />
				<Route path="/ProductListingPage" element={<ProductListingPage />} />
				<Route
					path="/ProductDescriptionPage/:productId"
					element={<ProductDescriptionPage />}
				/>
			</Routes>
		</Router>
		</>
	);
}

export default App;
