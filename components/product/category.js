import React from "react"
import { ProductCard } from "./card"

export const Category = ({ category, products }) => {
	return (
		<div className="">
			<div className="my-6 has-text-centered">
				<h2 className="title">{category.name}</h2>
			</div>
			<div className="is-flex  is-flex-wrap-wrap is-justify-content-start">
				{products
					.filter(p => p.category.name === category.name)
					.slice(0, 5)
					.map(product => (
						<ProductCard product={product} key={product.id} />
					))}
			</div>
		</div>
	)
}
