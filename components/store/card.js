import Link from "next/link"
import { useEffect, useState } from "react"
import { getProducts } from "../../data/products"
import { ProductCard } from "../product/card"

export function StoreCard({ store, width = "is-half" }) {
	const [products, setProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		getProducts().then(data => {
			setProducts(data)
		})
	}, [])

	useEffect(() => {
		const filteredProdArr = products.filter(
			data => data.customer.id === store.customer.id
		)
		setFilteredProducts(filteredProdArr)
	}, [products, store])

	const quantity = () => {
		const quantity = store.customer.products
		let sum = 0

		for (let i = 0; i < quantity.length; i++) {
			sum += quantity[i].quantity
		}

		return sum
	}

	const quantitySum = quantity()

	return (
		<div className={`column ${width}`}>
			<div className="card">
				<header className="card-header">
					<p className="card-header-title">{store.name}</p>
				</header>
				<div className="card-content">
					<div className="content">{store.description}</div>
					<div className="content">
						Owner: {store.customer.user.first_name}{" "}
						{store.customer.user.last_name}
					</div>
					<div className="content">
						Available products: {quantitySum}
					</div>
				</div>
				<div className="columns is-multiline">
					{filteredProducts.map(product => (
						<ProductCard product={product} key={product.id} />
					))}
				</div>
				<footer className="card-footer">
					<Link
						href={`stores/${store.id}`}
						className="card-footer-item">
						View Store
					</Link>
				</footer>
			</div>
		</div>
	)
}
