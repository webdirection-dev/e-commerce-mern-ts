import React from "react"
import './style/user.scss'

import {useUsers} from "./hooks/use-users"
import {MdOutlineDriveFolderUpload} from "react-icons/md"
import spinner from "../../static-data/img/spinner.svg";

const NewUser: React.FC = () => {
    const {
        imgUrl,
        isAllReady,
        isLoading,

        handleChange,
        handleSubmit,
        handleUserAvatar,
        handleChangeFile,
        navigate,
    } = useUsers()

    return(
        <div className='user'>
            <div className="top">
                <h1 className="title">Add New User</h1>
            </div>

            <div className="bottom">
                <div className="avatar">
                    <div className="imgInput">
                        <label htmlFor='profilePic'>
                            <img src={imgUrl} alt="img"/>

                            <div className="popup">
                                <MdOutlineDriveFolderUpload />
                                <p>Select image</p>
                            </div>
                        </label>

                        <input
                            type='file'
                            id='profilePic'
                            name='profilePic'
                            style={{display: 'none'}}
                            onChange={(e) => {
                                handleChangeFile(e)
                                handleUserAvatar(e)
                            }}
                        />
                    </div>

                    <button
                        disabled={isLoading}
                        className='upBtn'
                        onClick={e => {
                            if (isAllReady) handleSubmit(e)
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
                        <label htmlFor='username'>Username:</label>

                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder='john-doe'
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor='email'>Email:</label>

                        <input
                            type='email'
                            id='email'
                            name='email'
                            placeholder='john.doe@gmail.com'
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="formInput">
                        <label htmlFor='password'>Password:</label>

                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={e => handleChange(e)}
                        />
                    </div>

                    <div className="formInput select">
                        <label htmlFor='status'>Status</label>

                        <select
                            name='status'
                            id='status'
                            onChange={e => handleChange(e)}
                            defaultValue='Approved'
                        >

                            <option value='Approved'>Approved</option>
                            <option value='Pending'>Pending</option>
                            <option value='Rejected'>Rejected</option>
                        </select>
                    </div>

                    <div className="formInput select">
                        <label htmlFor='isAdmin'>Is Admin?</label>

                        <select
                            name='isAdmin'
                            id='isAdmin'
                            onChange={e => handleChange(e)}
                            defaultValue='no'
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

export default NewUser