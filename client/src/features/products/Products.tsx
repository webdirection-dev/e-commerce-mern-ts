import React, {FC, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useProducts} from './useProducts'
import './styles/Products.scss'

import Popup from "../../components/popup/Popup"
import ProductItem from "./ProductItem"
import {preloader} from "../../static/img"

import {IProductFromMongo} from "../../static/types/productTypes"
import AppSnackbar from "../../components/appSnackbar/AppSnackbar";

export interface IProductProps {
    category?: string;
    filter?: {[key: string]: string};
    sort?: string;
}

const Products: FC<IProductProps> = (props) => {
    const {productInfo, filteredProducts, isPopup, handlePopup} = useProducts({...props})
    const [isOpenWishlist, setIsOpenWishlist] = useState(false)

    return(
        <div className='products'>
            {
                productInfo.status !== 'received' || !Array.isArray(filteredProducts)
                ? <img className={'preloader'} src={preloader} alt="preloader"/>

                : productInfo.status === 'received' && productInfo.qty > 0 && filteredProducts.length > 0
                ? <motion.div layout className='products__wrapper'>
                        <AnimatePresence>
                            {
                                Array.isArray(filteredProducts) && filteredProducts.map((i: IProductFromMongo) => (
                                    <ProductItem key={i._id} productItem={i} handlePopup={handlePopup} setIsOpenWishlist={setIsOpenWishlist}/>
                                ))
                            }
                        </AnimatePresence>
                    </motion.div>

                : <span className='product-alert'>Unfortunately, this catalogue does not provide a description of the contents.</span>
            }

            <Popup isPopup={isPopup} handlePopup={handlePopup}/>
            <AppSnackbar isOpen={isOpenWishlist} setIsOpen={setIsOpenWishlist} txt='wishlist'/>
        </div>
    )
}

export default Products