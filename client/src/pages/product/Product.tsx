import React, { FC } from 'react'
import './Product.scss'
import {useProduct} from './useProduct'

import BreakLine from "../../components/breakLine/BreakLine"
import Newsletter from "../../components/newsletter/Newsletter"

import { MdRemove, MdAdd } from "react-icons/md"

interface IProductProps {}

const Product: FC<IProductProps> = () => {
    const {} = useProduct

    return(
        <div className='product'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <div className="wrapper">
                <div className="showcase">
                    <img src="https://is4.fwrdassets.com/images/p/fw/z/HLSA-WS29_V1.jpg" alt="..."/>
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

export default Product