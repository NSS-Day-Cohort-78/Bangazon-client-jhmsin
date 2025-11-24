import { useEffect, useState } from "react"
import Filter from "../../components/filter"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { ProductCard } from "../../components/product/card"
import { getCategories, getProducts } from "../../data/products"
import { Category } from "../../components/product/category"

export default function Products() {
	const [products, setProducts] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [loadingMessage, setLoadingMessage] = useState("Loading products...")
	const [locations, setLocations] = useState([])
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getProducts()
			.then(data => {
				if (data) {
					const locationData = [
						...new Set(data.map(product => product.location))
					]
					const locationObjects = locationData.map(location => ({
						id: location,
						name: location
					}))

					setProducts(data)
					setIsLoading(false)
					setLocations(locationObjects)
				}
			})
			.catch(err => {
				setLoadingMessage(
					`Unable to retrieve products. Status code ${err.message} on response.`
				)
			})

		getCategories()
			.then(data => {
				if (data) {
					setCategories(data)
				}
			})
			.catch(err => {
				setLoadingMessage(
					`Unable to retrieve categories. Status code ${err.message} on response.`
				)
			})
	}, [])

	const searchProducts = event => {
		getProducts(event).then(productsData => {
			if (productsData) {
				setProducts(productsData)
			}
		})
	}

	if (isLoading) return <p>{loadingMessage}</p>

	return (
		<>
			<Filter
				productCount={products.length}
				onSearch={searchProducts}
				locations={locations}
			/>

			<div className="section ">
				{categories.map(c => (
					<Category key={c.id} category={c} products={products} />
				))}
			</div>
		</>
	)
}

Products.getLayout = function getLayout(page) {
	return (
		<Layout>
			<Navbar />
			{page}
		</Layout>
	)
}
