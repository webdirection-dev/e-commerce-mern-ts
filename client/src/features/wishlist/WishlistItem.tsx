import React, {FC} from "react"
import {useAppDispatch} from "../../store"
import {removeFromWishlist} from "./wishlist-slice"
import {MdOutlineRemoveRedEye, MdDeleteOutline} from "react-icons/md"
import {IProductFromMongo} from "../../static/types/productTypes"
import {Link} from "react-router-dom"
import {Reorder} from 'framer-motion'

interface IWishlistItem {
    item: IProductFromMongo;
    removeFromList: (id: string) => void
}

const variants = {
    initial: {opacity: 0, height: 0},
    animate: {opacity: 1, height: 'auto'},
    exit: {opacity: 0, height: 0},
}

const WishlistItem: FC<IWishlistItem> = ({item, removeFromList}) => {
    const dispatch = useAppDispatch()
    const {_id, img, title, price, size, color} = item

    return(
        <Reorder.Item
            key={_id}
            className="wishlist__item"
            value={item}
            whileDrag={{
                scale: 1.1,
                boxShadow: 'rgba(0, 0, 0, .12) 0 1px 3px, rgba(0, 0, 0, .24) 0 1px 2px'
            }}
            {...variants}
        >
            <Link to={`/product/${_id}`}>
                <img src={img} alt={title}/>
            </Link>

            <ul>
                <li><b>product:</b> {title}</li>

                <li className='wrapper-color'>
                    <b>size:</b>
                    {size.map((i, index, array) => {
                        return(
                            <div key={i} style={{marginLeft: '5px'}}>
                                {i}{index !== array.length -1 ? ',' : ''}
                            </div>
                        )
                    })}
                </li>

                <li className='wrapper-color'>
                    <b>color:</b>
                    {color.map(i => <div key={i} className='color' style={{backgroundColor: `${i}`}}></div>)}
                </li>

                <li><b>id:</b> {_id}</li>
            </ul>

            <div className="price">
                <span>$ {price}</span>

                <Link to={`/product/${_id}`}>
                    <MdOutlineRemoveRedEye />
                </Link>

                <MdDeleteOutline onClick={() => {
                    dispatch(removeFromWishlist(_id))
                    removeFromList(_id)
                }}/>
            </div>
        </Reorder.Item>
    )
}

export default WishlistItem