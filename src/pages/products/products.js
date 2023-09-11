import { useEffect, useState } from "react"
import { FakeStoreApi } from "../../services/fake-store-api"
import { useSearchParams } from "react-router-dom"
import { Item } from "../../components/item/item"
import { useCart } from "../../context/cart"


const Products = () => {

    const [loading, setLoading] = useState(true);   // jab bhi page loading ho rha hoga tab loading state ko true rakhna hai
    const [products, setProducts] = useState([]);  //  jab hame api call se empty products milega ye usko array me store kar ke rakhega
    const [query] = useSearchParams();            //   jab user search me kuch input likhega usko (?q=product) is q ki value ko get karne ke liye maine useSearchParams() ka use kar rhe hai aur usko query me store kar rhe hai

    const { addToCart } = useCart()

    const searchQuery = query.get('q');  // query me (?q=productname) q ki kya value hai usko get kar ke mai searchQuery me store kar rha hu


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // jab loading true ho
            const products = searchQuery ? await FakeStoreApi.fetchProductsBySearchQuery(searchQuery) : await FakeStoreApi.fetchAllProducts(); // ternary operator se condition di hai ki searchQuery true ho to mujhe fakeAPI se searchQuery ko call karna hai aur agar false ho to fetch all Products ko call kar dena hai
            setProducts(products); // ye sab hone ke baad jo yaha ka local produts hai usme tumko setProducts me "produts" ko update kar dena hai
            setLoading(false) // aur loading ko false kar dena hai quki mujhe products ki value mil chuki hai
        }
        fetchProducts().catch(console.error) // aur agar kahi koi error aaya ho to mujhe console me error show kar de
    }, [searchQuery])


    if (!loading && searchQuery && !products.length) { // agar loading false ho aur searchQuery me kuch input data bhi ho aur !products.lengh matlv ki products ki lengh me match na ho matlv product match na ho to phir mujhe niche ki div return kar do
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="products my-5">
                    <div className="grid">
                        {loading ? (
                            <div className="loader" />
                        ) : (
                            products.map((product) => (
                                <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products;