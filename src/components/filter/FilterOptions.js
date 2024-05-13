export const filterConfig = {
	price: {
		label: "Price",
		type: "radio",
		options: [
			{ label: "Low to High", value: "lowToHigh" },
			{ label: "High to Low", value: "highToLow" }
		]
	},
	category: {
		label: "Category",
		type: "checkbox",
		options: []
	},
	rating: {
		label: "Rating",
		type: "radio",
		options: [
			{ label: "Low to High", value: "lowToHigh" },
			{ label: "High to Low", value: "highToLow" }
		]
	}
};
