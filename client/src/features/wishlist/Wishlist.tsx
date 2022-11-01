import './Wishlist.scss'
import BreakLine from "../../components/breakLine/BreakLine"
import WishlistItem from "./WishlistItem"
import {useAppSelector} from "../../store";
import {selectWishlistInfo} from "./wishlist-slice"
import {Reorder, AnimatePresence} from 'framer-motion'
import {useState} from "react";

const Wishlist = () => {
    const {items} = useAppSelector(store => selectWishlistInfo(store))
    const [list, setList] = useState(items)


    const removeFromList = (id: string) => {
        setList(list.filter(i => i._id !== id))
    }

    return(
        <div className='wishlist'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <Reorder.Group
                className="wishlist__wrapper"
                axis='y'
                values={list}
                onReorder={setList}
            >
                <h1>your wishlist {list.length < 1 ? 'is empty' : ''}</h1>

                <AnimatePresence initial={false}>
                    {list.map(i => <WishlistItem key={i._id} item={i} removeFromList={removeFromList}/>)}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    )
}

export default Wishlist