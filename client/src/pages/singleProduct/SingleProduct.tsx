import React, {FC} from 'react'
import {useParams, useLocation} from "react-router-dom"
import './SingleProduct.scss'
import {useSingleProduct} from './useSingleProduct'

import BreakLine from "../../components/breakLine/BreakLine"
import Newsletter from "../../components/newsletter/Newsletter"

const SingleProduct: FC = () => {
    const
        {isMatchMedia, isClick, isZoom, setIsZoom, handlerClick, handlerMouseMove, magnifyingZoom, MdRemove, MdAdd, classScale, productItem}
    = useSingleProduct()

    return(
        <div className='product'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <div className="wrapper">
                <div
                    id='magnifying-area'
                    className="showcase"
                    style={isMatchMedia ? {cursor: !isZoom ? 'zoom-in' : 'zoom-out'} : undefined}
                    onClick={(e) => handlerClick(e)}
                    onMouseMove={e => handlerMouseMove(e)}
                    onMouseLeave={() => setIsZoom(false)}
                >
                    <img
                        id='magnifying-img'
                        src={productItem.img}
                        alt="..."
                        className={classScale}
                        style={
                            isClick && isZoom ?
                                {transform: `translate(-${magnifyingZoom.clientX}%, -${magnifyingZoom.clientY}%) scale(${magnifyingZoom.scale})`}  :
                                undefined
                        }
                    />
                </div>

                <div className="info">
                    <h1>{productItem.title}</h1>
                    <p>{productItem.desc}</p>
                    <span className='info-price'>$ {productItem.price}</span>

                    <div className="container-filter">
                        <div className="product-filter">
                            <h2>Color</h2>
                            {
                                productItem.color.map((i: string) => <div key={i} className="product-color" style={{backgroundColor: i}}/>)
                            }
                        </div>

                        <div className="product-filter">
                            <label>Size</label>
                            <select name="product-size">
                                {
                                    productItem.size.map((i: string) => {
                                        const sizes = {xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL'} as {[key: string]: string}
                                        return <option key={i} value={i}>{sizes[i]}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="container-add">
                        <div className="product-amount">
                            <MdRemove />
                            <span>1</span>
                            <MdAdd />
                        </div>

                        <button>add to cart</button>
                    </div>
                </div>
            </div>

            <Newsletter />
        </div>
    )
}

export default SingleProduct