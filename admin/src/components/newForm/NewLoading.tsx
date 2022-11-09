import React from "react"
import {MdOutlineDriveFolderUpload, MdCheck} from "react-icons/md"

import {movieInputs} from "../../static-data/data/form-source"
import {IFiles} from "../../features/movies/hooks/use-upload-firebase"

interface IPropsLoading {
    handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleMovieAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    files: IFiles;
}

const NewLoading: React.FC<IPropsLoading> = ({handleChangeFile, handleMovieAvatar, files}) => {
    return(
        <>
            <div className="loadImg">
                {
                    movieInputs.loadingMedia.map(i => {

                        if (i.flag === 'image') {
                            return (
                                <div key={i.id} className='inputMedia'>
                                    {files[i.htmlId] && <MdCheck className='check'/>}

                                    <label htmlFor={i.htmlId} className='img'>
                                        {i.label} <MdOutlineDriveFolderUpload className='icon'/>
                                    </label>

                                    <input
                                        type='file'
                                        id={i.htmlId}
                                        name={i.htmlId}
                                        style={{display: 'none'}}
                                        onChange={(e) => {
                                            if (i.htmlId === 'img') {
                                                handleChangeFile(e)
                                                handleMovieAvatar(e)
                                            } else handleChangeFile(e)
                                        }}
                                    />
                                </div>
                            )
                        } else return null
                    })
                }
            </div>

            <div className="loadVideo">
                {
                    movieInputs.loadingMedia.map(i => {
                        if (i.flag === 'media') {
                            return (
                                <div key={i.id} className="loadVideoForm">
                                    {files[i.htmlId] && <MdCheck className='check'/>}

                                    <label htmlFor={i.htmlId}>{i.label}</label>
                                    <input
                                        type='file'
                                        id={i.htmlId}
                                        name={i.htmlId}
                                        onChange={(e) => handleChangeFile(e)}
                                    />
                                </div>
                            )
                        } else return null
                    })
                }
            </div>
        </>
    )
}

export default NewLoading