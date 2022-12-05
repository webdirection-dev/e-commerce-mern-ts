import '../users/style/user.scss'

import {useProduct} from "./use-product"
import {MdOutlineDriveFolderUpload} from "react-icons/md"
import spinner from "../../static/img/spinner.svg"

const NewCart = () => {
    const {
        navigate,
        imgUrl,
        isAllReady,
        isLoading,
        handelProductImg,
        handelChange,
        handelChangeFile,
        handelSubmit,
    } = useProduct()

    return(
        <div className='user'>
            <div className="top">
                <h1 className="title">Add New Product</h1>
            </div>

            <div className="bottom">
                <div className="avatar">
                    <div className="imgInput">
                        <label htmlFor='productPic'>
                            <img src={imgUrl} alt="img"/>

                            <div className="popup">
                                <MdOutlineDriveFolderUpload />
                                <p>Select image</p>
                            </div>
                        </label>

                        <input type='file' id='productPic' name='productPic'
                            style={{display: 'none'}}
                            onChange={(e) => {
                                handelChangeFile(e)
                                handelProductImg(e)
                            }}
                        />
                    </div>

                    <button disabled={isLoading} className='upBtn'
                        onClick={e => {
                            if (isAllReady) handelSubmit(e)
                            else navigate('../')
                        }}
                    >
                        {
                            !isAllReady && !isLoading ? 'CLOSE AND EXIT' :
                            isAllReady && !isLoading ? 'CREATE' :
                            <img src={spinner} alt='spinner'/>
                        }
                    </button>
                </div>

                <form>
                    <div className="formInput">
                        <label htmlFor='productTitle'>Title:</label>

                        <input
                            type='text'
                            id='productTitle'
                            name='title'
                            placeholder='product'
                            onChange={e => handelChange(e)}
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor='descProduct'>Description:</label>

                        <input
                            type='text'
                            id='descProduct'
                            name='desc'
                            placeholder='...'
                            onChange={e => handelChange(e)}
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor='priceProduct'>Price:</label>

                        <input
                            type='text'
                            id='priceProduct'
                            name='price'
                            placeholder='$'
                            onChange={e => handelChange(e)}
                        />
                    </div>

                    <div className="formInput select">
                        <label htmlFor='inStock'>In Stock</label>

                        <select
                            name='inStock'
                            id='inStock'
                            onChange={e => handelChange(e)}
                            defaultValue='no'
                        >

                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </div>

                    <div className="formInput select">
                        <label htmlFor='isStock'>Active</label>

                        <select
                            name='active'
                            id='active'
                            onChange={e => handelChange(e)}
                            defaultValue='true'
                        >

                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewCart
