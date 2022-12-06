import React from 'react'
import '../users/style/editUser.scss'
import {IProduct} from '../../static/types/typesMongo'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'

import {useUpdateProduct} from "./hooks/use-update-product"
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import spinner from '../../static/img/spinner.svg'

interface IUserCard {item: IProduct; titleCard: string}

const ViewProduct: React.FC<IUserCard> = ({ item, titleCard }) => {
    const {_id, img, title, desc, price, inStock} = item

    const {
        imgUrl,
        isEdit,
        setIsEdit,
        isLoading,
        isAllReady,

        handleChangeImg,
        handleUserAvatar,
        handleChange,
        handleUpdate,
        handleReset,
    } = useUpdateProduct(img, inStock);

    return (
        <>
            <div className={isEdit ? 'top editUser' : 'top'}>
                <div className={isEdit ? 'left containerUpd' : 'left'}>
                    <div className='info'>
                        <div className='editButton'
                            onClick={() => {
                                if (!isEdit) setIsEdit(true)
                                if (isEdit) handleReset()
                            }}
                        >{!isEdit ? 'Edit' : 'Reset'}</div>

                        <h1 className='title'>{titleCard} information</h1>

                        <div className='item'>
                            <img
                                className={isEdit ? 'hide' : undefined}
                                src={img}
                                alt='...'
                            />

                            <div className='details'>
                                <h1 className='itemTitle'>{title}</h1>

                                <div className='detailItem'>
                                    <span className='itemKey'>Desc:</span>
                                    <span className='itemValue'>{desc}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Price:</span>
                                    <span className='itemValue'>${price}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Stock:</span>
                                    <span className='itemValue'>{String(inStock)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isEdit && (
                        <div className='update'>
                            <div className='avatar'>
                                <div className='imgInput'>
                                    <label htmlFor='productImg'>
                                        <img src={imgUrl} alt='img' />
                                        <div className='popup'>
                                            <MdOutlineDriveFolderUpload />
                                            <p>Select image</p>
                                        </div>
                                    </label>
                                    <input type='file' id='productImg' name='img' style={{ display: 'none' }}
                                        onChange={(e) => {
                                            handleChangeImg(e);
                                            handleUserAvatar(e);
                                        }}
                                    />
                                </div>

                                <button disabled={isLoading} className='upBtn' style={{marginTop: '40px'}}
                                    onClick={(e) => handleUpdate(e, _id as string)}
                                >
                                    {
                                        isAllReady && !isLoading ? 'UPDATE' : isLoading && isAllReady ? <img src={spinner} alt='spinner' /> : 'CLOSE'
                                    }
                                </button>
                            </div>

                            <form>
                                <div className='formInput'>
                                    <label htmlFor='username'>Title:</label>
                                    <input type='text' id='username' name='title' placeholder={title} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className='formInput'>
                                    <label htmlFor='descProd'>Description:</label>
                                    <input type='text' id='descProd' name='desc' placeholder={desc} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className='formInput'>
                                    <label htmlFor='priceProduct'>Price:</label>
                                    <input type='text' id='priceProduct' name='price' placeholder={String(price)} onChange={(e) => handleChange(e)} />
                                </div>

                                <div className='formInput select'>
                                    <label htmlFor='inStock'>In Stock?</label>
                                    <select name='inStock' id='inStock' defaultValue={String(inStock)} onChange={(e) => handleChange(e)} >
                                        <option value='false'>No</option>
                                        <option value='true'>Yes</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div className='right'>
                    <Chart
                        aspect={3 / 1}
                        title='Price statistic'
                        myDataKey='Cost $'
                        stat={[{name: 'Last Month', 'Cost $': price - ( price * 0.2)}, {name: 'This Month', 'Cost $': price}]}
                    />
                </div>
            </div>
        </>
    )
}

export default ViewProduct
