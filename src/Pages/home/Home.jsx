import Banner from "../../components/banner/Banner";
import topbanner from "../../assests/top-banner.avif";
import InfoBanner from "../../components/infoBanner";
import Carousel from "../../components/carousel/Carousel";
import { useLoaderData } from "react-router-dom";
import Categories from "../../components/categories/Categories";

const Home = () => {
	const products = useLoaderData();
	// const [products, setProducts] = useState([]);

	return (
		<div className="container mx-auto px-4 py-8 space-y-3">
			<Banner imageUrl={topbanner} alt="Banner Image" />
			<div className="w-full py-8">
				<Categories />
			</div>
			<div className="w-full py-8">
				<Carousel products={products} heading="WHAT'S NEW" />
			</div>
			<div className="w-full py-8">
				<Carousel
					products={products.toReversed()}
					heading="OUR BEST SELLING PRODUCTS"
				/>
			</div>
			<InfoBanner />
		</div>
	);
};

export default Home;
