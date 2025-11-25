import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../../../components/layout"
import Navbar from "../../../components/navbar"
import { ProductCard } from "../../../components/product/card"
import Detail from "../../../components/store/detail"
import { useAppContext } from "../../../context/state"
import { deleteProduct } from "../../../data/products"
import {
	favoriteStore,
	getStoreById,
	unfavoriteStore
} from "../../../data/stores"

export default function StoreDetail() {
	const { profile } = useAppContext()
	const router = useRouter()
	const { id } = router.query
	const [store, setStore] = useState({})
	const [isOwner, setIsOwner] = useState(false)

	useEffect(() => {
		if (id) {
			refresh()
		}
		if (parseInt(id) === profile.store?.id) {
			setIsOwner(true)
		}
	}, [id, profile])

	const refresh = () =>
		getStoreById(id).then(storeData => {
			if (storeData) {
				setStore(storeData)
			}
		})

	const removeProduct = productId => {
		deleteProduct(productId).then(refresh)
	}

	const favorite = () => {
		favoriteStore(id).then(refresh)
	}

	const unfavorite = () => {
		unfavoriteStore(id).then(refresh)
	}

	return (
		<>
			<Detail
				store={store}
				isOwner={isOwner}
				favorite={favorite}
				unfavorite={unfavorite}
			/>
			<div className="section is-flex is-flex-direction-column is-justify-content-center">
				<div className="container has-text-centered">
					<h2 className="title ">Selling</h2>
					<div className="is-flex is-flex-wrap-wrap">
						{store.customer?.products
							?.filter(p => p.number_sold === 0)
							.map(product => (
								<ProductCard
									product={product}
									key={product.id}
									isOwner={isOwner}
									removeProduct={removeProduct}
								/>
							))}
					</div>
				</div>
				<div className="container has-text-centered">
					<h2 className="title ">Sold</h2>
					<div className="is-flex is-flex-wrap-wrap">
						{store.customer?.products
							?.filter(p => p.number_sold > 0)
							.map(product => (
								<ProductCard
									product={product}
									key={product.id}
									isOwner={isOwner}
									removeProduct={removeProduct}
								/>
							))}
					</div>
				</div>

				{store.products?.length === 0 ? (
					<p>There's no products yet</p>
				) : (
					<></>
				)}
			</div>
		</>
	)
}

StoreDetail.getLayout = function getLayout(page) {
	return (
		<Layout>
			<Navbar />
			{page}
		</Layout>
	)
}
