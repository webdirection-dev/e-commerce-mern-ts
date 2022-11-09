import React, {useEffect, useState} from "react"
import './style/movie.scss'

import NewLoading from "../../components/newForm/NewLoading"
import NewItem from "../../components/newForm/NewItem"
import PopupSubmitMovie from "./PopupSubmitMovie"

import {INewFormInput} from "../../types/types"

import {useUploadFirebase} from "./hooks/use-upload-firebase"

interface INewForm {
    inputs: INewFormInput;
}

const NewMovie: React.FC<INewForm> = ({inputs}) => {
    const {title, data} = inputs
    const [isResetMedia, setIsResetMedia] = useState(false) // Перерендер для очистки формы
    const [isShowPopup, setIsShowPopup] = useState(false)
    const {
        imgUrl,
        files,
        infoAboutItem,
        handleChangeText,
        handleChangeFile,
        handleMovieAvatar,
        handleClearForm,
        handleUpload,
        isFilesFill,
        isCheckItem,
        isAllReady,
        snapshot,
    } = useUploadFirebase()

    const handleSwitchPopup = () => {
        setTimeout(() => {
          setIsShowPopup(false)
        }, 10)

        handleClearForm()
    }

    useEffect(() => {
        setIsResetMedia(false)
    }, [isResetMedia])

    return(
        <div className='new'>
            <div className="top">
                <h1 className="title">Add New {title}</h1>
            </div>

            <div className="bottom">
                <div className="left">
                    <img src={imgUrl} alt="img"/>

                    {
                        !isResetMedia && (
                            <>
                                <NewLoading
                                    handleChangeFile={handleChangeFile}
                                    handleMovieAvatar={handleMovieAvatar}
                                    files={files}
                                />

                                {!isFilesFill && <button className='disabled'>DISABLED</button>}
                                {isFilesFill && <button className='disabled'>READY</button>}
                            </>
                        )
                    }
                </div>

                <div className="right">
                    <form>
                        {
                            !isResetMedia &&
                            data.map(i => <NewItem key={i.id} handleChangeText={handleChangeText} {...i}/>)
                        }
                    </form>

                    {!isCheckItem && <button className='disabled'>DISABLED</button>}
                    {isCheckItem && isFilesFill && <button onClick={() => setIsShowPopup(true)}>SEND</button>}
                    {isCheckItem && !isFilesFill && <button className='disabled'>READY</button>}
                </div>
            </div>

            {isShowPopup &&
                <PopupSubmitMovie
                    handleSwitchPopup={handleSwitchPopup}
                    setIsShowPopup={setIsShowPopup}
                    setIsResetMedia={setIsResetMedia}
                    handleUpload={handleUpload}
                    infoAboutItem={[...[...snapshot].reverse(), ...infoAboutItem]} //реверс объектаов-логов в массиве
                    isAllReady={isAllReady}
                />
            }
        </div>
    )
}

export default NewMovie