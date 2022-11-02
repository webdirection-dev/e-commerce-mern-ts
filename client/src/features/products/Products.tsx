import React, {FC, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useProducts} from './useProducts'
import './styles/Products.scss'

import Popup from "../../components/popup/Popup"
import ProductItem from "./ProductItem"
import {IProductFromMongo} from "../../static/types/productTypes"

import {preloader} from "../../static/img"

export interface IProductProps {
    category?: string;
    filter?: {[key: string]: string};
    sort?: string;
}

const Products: FC<IProductProps> = (props) => {
    const [isPopup, setIsPopup] = useState(false)
    const {productInfo, filteredProducts} = useProducts({...props})

    const handlePopup = (act: string) => {
        console.log(act)
        document.body.style.overflow = `${act}`
        setIsPopup(!isPopup)
    }

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
                                    <ProductItem key={i._id} productItem={i} handlePopup={handlePopup}/>
                                ))
                            }
                        </AnimatePresence>
                    </motion.div>

                : <span className='product-alert'>Unfortunately, this catalogue does not provide a description of the contents.</span>
            }

            <div className="products__popup" style={{display: isPopup ? 'block' : 'none'}}>
                <Popup isPopup={isPopup} handlePopup={handlePopup}/>
            </div>
        </div>
    )
}

export default Products