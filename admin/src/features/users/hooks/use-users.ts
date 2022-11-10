import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {useAppDispatch} from "../../../hooks/hookRedux"
import {createUser} from "../users-slice"

import {noImg} from '../../../static/img'

import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {storage} from "../../../configs/firebase"

interface INewUser {
    [key: string]: string
}

const init: INewUser = {
    isAdmin: 'false',
    status: 'Approved',
}

export const useUsers = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [newUser, setNewUser] = useState(init)
    const [newImg, setNewImg] = useState({localFile: {}, path: ''})
    const [userAvatar, setUserAvatar] = useState('' as string | File)

    const [isAllReady, setIsAllReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const imgUrl = userAvatar ? URL.createObjectURL(userAvatar as Blob | MediaSource) : noImg

    const handleUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setUserAvatar(localFile[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setNewUser({
            ...newUser,
            [name]: value
        })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.files

        if (value !== null) {
            setNewImg({
                localFile: value[0],
                path: value[0].name
            })
        }
    }

    const handleUpload = async () => {
        setIsLoading(true)

        const fileName = 'profilePic-' + newImg.path.split('.')[0] + '-' + new Date().getTime()

        const storageRef = ref(storage, `/avatars/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, newImg.localFile as Blob | Uint8Array | ArrayBuffer)

        await uploadTask.on(
            'state_changed',

            async (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


                const elem = snapshot.ref.fullPath
                    .split('/')[1]
                    .split('-')[0]

                switch (snapshot.state) {
                    case 'paused':
                        // console.log('paused')
                        break;
                    case 'running':
                        // console.log('running')
                        break;
                }
            },

            (err) => console.error(err),

            async () => {
                // Upload completed successfully, now we can get the download URL
                await getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setNewUser(prev => (
                            {
                                ...prev,
                                profilePic: downloadURL,
                            }
                        ))

                        setIsLoading(false)
                        setIsUploaded(true)
                    })
            }
        );
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (newImg.path !== '') {
            handleUpload()
        } else {
            dispatch(createUser(newUser))
            navigate('../')
        }
    }

    useEffect(() => {
        if (
            (newUser.username && newUser.username !== '') &&
            (newUser.email && newUser.email !== '') &&
            (newUser.password && newUser.password !== '')
        ) setIsAllReady(true)
        else setIsAllReady(false)
    }, [newUser])

    useEffect(() => {
        if (isUploaded) {
            dispatch(createUser(newUser))
            navigate('../')
        }
    }, [isUploaded])

    return {
        imgUrl,
        isAllReady,
        isLoading,

        handleChange,
        handleSubmit,
        handleUserAvatar,
        handleChangeFile,
        navigate,
    }
}