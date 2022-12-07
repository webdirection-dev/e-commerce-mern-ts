import React from 'react'
import '../users/style/editUser.scss'
import {IOrder} from '../../static/types/typesMongo'
import {IObjString} from "../../static/types/typeAnother"

interface IOrderCard {item: IOrder; titleCard: string}

const ViewProduct: React.FC<IOrderCard> = ({ item, titleCard }) => {
    const {_id, createdAt, userId, products, amount} = item

    return (
        <>
            <div className='top editUser'>
                <div className='left containerUpd' style={{flex: '0'}}>
                    <div className='info'>
                        <h1 className='title'>{titleCard} information</h1>

                        <div className='item'>
                            <div className='details'>
                                <h1 className='itemTitle'>ID:{_id}</h1>

                                <div className='detailItem'>
                                    <span className='itemKey'>Amount:</span>
                                    <span className='itemValue'>${amount}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Created:</span>
                                    <span className='itemValue'>{createdAt}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>UserId:</span>
                                    <span className='itemValue'>{userId}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Products:</span>
                                    {products.map((i: IObjString) => {
                                        return(
                                            <div key={i._id} className='detailItem' style={{marginBottom: '0'}}>
                                                <span className='itemValue'>product: {i._id}</span>
                                                <span className='itemValue'> = {i.quantity}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProduct
