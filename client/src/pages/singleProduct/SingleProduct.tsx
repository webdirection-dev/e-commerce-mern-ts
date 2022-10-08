import React, {FC} from 'react'
import './SingleProduct.scss'
import {useSingleProduct} from './useSingleProduct'

import BreakLine from "../../components/breakLine/BreakLine"
import Newsletter from "../../components/newsletter/Newsletter"

const SingleProduct: FC = () => {
    const {isMatchMedia, isClick, isZoom, setIsZoom, handlerClick, handlerMouseMove, magnifyingZoom, MdRemove, MdAdd, classScale} = useSingleProduct()

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
                        src="https://is4.fwrdassets.com/images/p/fw/z/HLSA-WS29_V1.jpg"
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
                    <h1>Denim Jumpsuit</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, fuga molestias nihil nostrum numquam odio officiis provident ut! Id maxime officiis praesentium sapiente? Consequuntur hic praesentium quasi repudiandae sapiente unde?</p>
                    <span className='info-price'>$ 20</span>

                    <div className="container-filter">
                        <div className="product-filter">
                            <h2>Color</h2>
                            <div className="product-color" style={{backgroundColor: 'black'}}/>
                            <div className="product-color" style={{backgroundColor: 'darkblue'}}/>
                            <div className="product-color" style={{backgroundColor: 'darkgreen'}}/>
                        </div>

                        <div className="product-filter">
                            <label>Size</label>
                            <select name="product-size">
                                <option value="xs">XS</option>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="x">XL</option>
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