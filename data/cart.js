import { fetchWithoutResponse } from "./fetcher"

export const deleteCart = cartId => {
	return fetchWithoutResponse(`cart/${cartId}`, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${localStorage.getItem("token")}`
		}
	})
}
