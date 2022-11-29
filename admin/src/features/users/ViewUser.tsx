import React from 'react'
import './style/editUser.scss';
import {IUser} from '../../static/types/typesMongo'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'

import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import spinner from '../../static/img/spinner.svg'

import { useUpdateUser } from './hooks/use-update-user'

interface IUserCard {item: IUser; titleCard: string}

const ViewUser: React.FC<IUserCard> = ({ item, titleCard }) => {
    const { _id, username, profilePic, status, email, isAdmin } = item

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
    } = useUpdateUser(profilePic, status, isAdmin);

    return (
        <>
            <div className={isEdit ? 'top editUser' : 'top'}>
                <div className={isEdit ? 'left containerUpd' : 'left'}>
                    <div className='info'>
                        <div
                            className='editButton'
                            onClick={() => {
                                if (!isEdit) setIsEdit(true);
                                if (isEdit) handleReset();
                            }}
                        >
                            {!isEdit ? 'Edit' : 'Reset'}
                        </div>

                        <h1 className='title'>{titleCard} information</h1>

                        <div className='item'>
                            <img
                                className={isEdit ? 'hide' : undefined}
                                src={profilePic}
                                alt='...'
                            />

                            <div className='details'>
                                <h1 className='itemTitle'>{username}</h1>

                                <div className='detailItem'>
                                    <span className='itemKey'>Email:</span>
                                    <span className='itemValue'>{email}</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Phone:</span>
                                    <span className='itemValue'>
                                        +1 2313 12 14
                                    </span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Address:</span>
                                    <span className='itemValue'>
                                        Elton St. 234 Garden Yd. NewYork
                                    </span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Country:</span>
                                    <span className='itemValue'>USA</span>
                                </div>

                                <div className='detailItem'>
                                    <span className='itemKey'>Status:</span>
                                    <span className='itemValue'>Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {isEdit && (
                        <div className='update'>
                            <div className='avatar'>
                                <div className='imgInput'>
                                    <label htmlFor='profilePic'>
                                        <img src={imgUrl} alt='img' />

                                        <div className='popup'>
                                            <MdOutlineDriveFolderUpload />
                                            <p>Select image</p>
                                        </div>
                                    </label>

                                    <input
                                        type='file'
                                        id='profilePic'
                                        name='profilePic'
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            handleChangeImg(e);
                                            handleUserAvatar(e);
                                        }}
                                    />
                                </div>

                                <button
                                    disabled={isLoading}
                                    className='upBtn'
                                    onClick={(e) =>
                                        handleUpdate(e, _id as string)
                                    }
                                >
                                    {isAllReady && !isLoading ? (
                                        'UPDATE'
                                    ) : isLoading && isAllReady ? (
                                        <img src={spinner} alt='spinner' />
                                    ) : (
                                        'CLOSE'
                                    )}
                                </button>
                            </div>

                            <form>
                                <div className='formInput'>
                                    <label htmlFor='username'>Username:</label>

                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        placeholder={username}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                <div className='formInput'>
                                    <label htmlFor='email'>Email:</label>

                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder={email}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                <div className='formInput'>
                                    <label htmlFor='password'>Password:</label>

                                    <input
                                        type='password'
                                        id='password'
                                        name='password'
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>

                                <div className='formInput select'>
                                    <label htmlFor='status'>Status</label>

                                    <select
                                        name='status'
                                        id='status'
                                        onChange={(e) => handleChange(e)}
                                        defaultValue={status}
                                    >
                                        <option value='Approved'>
                                            Approved
                                        </option>
                                        <option value='Pending'>Pending</option>
                                        <option value='Rejected'>
                                            Rejected
                                        </option>
                                    </select>
                                </div>

                                <div className='formInput select'>
                                    <label htmlFor='isAdmin'>Is Admin?</label>

                                    <select
                                        name='isAdmin'
                                        id='isAdmin'
                                        onChange={(e) => handleChange(e)}
                                        defaultValue={isAdmin}
                                    >
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
                        title='User Spending (Last 6 Months)'
                    />
                </div>
            </div>

            <div className='bottom'>
                <div className='title'>Last Transactions</div>
                <Table />
            </div>
        </>
    )
}

export default ViewUser
