import './SingleProduct.scss'
import {useAppDispatch, useAppSelector} from "../../store"
import {useSingleProduct} from './useSingleProduct'

import BreakLine from "../../components/breakLine/BreakLine"
import Newsletter from "../../components/newsletter/Newsletter"
import {MdAdd, MdFavorite, MdFavoriteBorder, MdRemove} from "react-icons/md"
import {addToWishlist, selectFindById} from "../../features/wishlist/wishlist-slice"
import {selectProductsInfo} from "../../features/products/product-slice"

import AppSnackbar from "../../components/appSnackbar/AppSnackbar"
import {preloader} from "../../static/img"

const SingleProduct = () => {
    const
        {
            isMatchMedia,
            isClick,
            isZoom,
            setIsZoom,
            isOpenCart,
            setIsOpenCart,
            isOpenWishlist,
            setIsOpenWishlist,

            handlerClick,
            handlerMouseMove,
            handleClickButton,

            magnifyingZoom,

            MdRemove,
            MdAdd,

            classScale,
            singleProduct,

            quantity,
            setQuantity,
            setColor,
            setSize,
        } = useSingleProduct()

    const dispatch = useAppDispatch()
    const {isUnique} = useAppSelector(store => selectFindById(store, singleProduct._id))
    const {status} = useAppSelector(store => selectProductsInfo(store))

    return(
        <div className='product'>
            <BreakLine txt='Super Deal! Free Shipping on Orders Over $50' fs={14}/>

            <div className="wrapper">
                {status !== 'loading' ? (
                    <>
                        <div
                            id='magnifying-area'
                            className="showcase"
                            style={isMatchMedia ? {cursor: !isZoom ? 'zoom-in' : 'zoom-out'} : undefined}
                            onClick={(e) => handlerClick(e)}
                            onMouseMove={e => handlerMouseMove(e)}
                            onMouseLeave={() => setIsZoom(false)}
                        >
                            {singleProduct._id && (
                                <img
                                    id='magnifying-img'
                                    src={singleProduct.img}
                                    alt="..."
                                    className={classScale}
                                    style={
                                        isClick && isZoom ?
                                            {transform: `translate(-${magnifyingZoom.clientX}%, -${magnifyingZoom.clientY}%) scale(${magnifyingZoom.scale})`}  :
                                            undefined
                                    }
                                />
                            )}
                        </div>

                        <div className="info">
                            <div className='info__about'>
                                {
                                    singleProduct._id && (
                                        <>
                                            <h1>{singleProduct.title}</h1>
                                            <p>{singleProduct.desc}</p>
                                            <span className='info-price'>$ {singleProduct.price}</span>

                                            <div className="container-filter">
                                                <div className="product-filter">
                                                    <h2>Color</h2>
                                                    {
                                                        singleProduct.color.map((i: string) => {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="product-color"
                                                                    style={{backgroundColor: i}}
                                                                    onClick={() => setColor(i)}
                                                                />
                                                            )
                                                        })
                                                    }
                                                </div>

                                                <div className="product-filter">
                                                    <label>Size</label>
                                                    <select name="product-size" onChange={(e) => setSize(e.target.value)}>
                                                        {
                                                            singleProduct.size.map((i: string) => {
                                                                const sizes = {xs: 'XS', s: 'S', m: 'M', l: 'L', xl: 'XL'} as {[key: string]: string}
                                                                return (
                                                                    <option key={i} value={i}>{sizes[i]}</option
                                                                    >
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>

                            <div className="container-add">
                                <div className="product-amount">
                                    <MdRemove onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}/>
                                    <span>{quantity}</span>
                                    <MdAdd onClick={() => setQuantity(quantity + 1)}/>
                                </div>

                                <button
                                    className='btn-add-to-card'
                                    onClick={() => {
                                        handleClickButton()
                                        setIsOpenCart(true)
                                    }}
                                >add to cart</button>

                                <button
                                    className="btn-add-to-wishlist"
                                    onClick={() => {
                                        dispatch(addToWishlist(singleProduct))
                                        if (!isUnique) setIsOpenWishlist(true)
                                    }}
                                >
                                    {
                                        isUnique
                                            ? <MdFavorite style={{color: 'red'}}/>
                                            : <MdFavoriteBorder />
                                    }
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <img className={'preloader'} src={preloader} alt="preloader"/>
                )}
            </div>

            <Newsletter />
            <AppSnackbar isOpen={isOpenCart} setIsOpen={setIsOpenCart} txt='cart'/>
            <AppSnackbar isOpen={isOpenWishlist} setIsOpen={setIsOpenWishlist} txt='wishlist'/>
        </div>
    )
}

export default SingleProduct