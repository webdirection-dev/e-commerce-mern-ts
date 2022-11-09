import React, {useEffect, useState} from "react"

import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {storage} from "../../../configs/firebase"

import {useNavigate} from "react-router-dom"
import {useAppDispatch} from "../../../hooks/hookRedux"
import {updateMovie} from "../movies-slice"

import {IFiles, TypeInfoAboutItem, IUpload, TFile} from "./use-upload-firebase"

interface IItemUpd {
    [key: string]: string
}

export const useUpdateMovie = (img: string, imgTitle: string, imgSm: string, trailer: string, video: string, genre: string, isSeries: string) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [isEdit, setIsEdit] = useState(false)
    const [movieAvatar, setMovieAvatar] = useState('' as string | File)
    const [updateId, setUpdateId] = useState('')
    const [isAllReady, setIsAllReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [items, setItems] = useState({isSeries, genre} as IItemUpd) // isSeries НЕ УДАЛЯТЬ!!!
    const [files, setFiles] = useState({} as IFiles)


    const [snapshot, setSnapshot] = useState([] as TypeInfoAboutItem)

    const handleMovieAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setMovieAvatar(localFile[0])
        }
    }

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault()
        const value = e.target.value
        const name = e.target.name

        setItems({
            ...items,
            [name]: value
        })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.files
        const name = e.target.name

        if (value !== null) {
            setFiles({
                ...files,
                [name]: {
                    localFile: value[0],
                    path: value[0].name
                }
            })
        }
    }

    const deleteFirebase = () => {
        for (let key in files) {
            if (files.img) deleteItemFirebase(img)
            if (files.imgTitle) deleteItemFirebase(imgTitle)
            if (files.imgSm) deleteItemFirebase(imgSm)
            if (files.trailer) deleteItemFirebase(trailer)
            if (files.video) deleteItemFirebase(video)
        }
    }

    const upload = (items: IUpload[]) => {
        setIsLoading(true)
        let counterUploaded = 0
        let counterFiles = 0
        for (let key in files) counterFiles++

        items.forEach((i) => {
            const fileName = i.label + '-' + i.path.split('.')[0] + '-' + new Date().getTime()

            const storageRef = ref(storage, `/movies/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, i.file)

            uploadTask.on(
                'state_changed',

                async (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


                    const elem = snapshot.ref.fullPath
                        .split('/')[1]
                        .split('-')[0]

                    switch (snapshot.state) {
                        case 'paused':
                            setSnapshot(prev => [
                                ...prev,
                                {
                                    name: elem + 'Snapshot',
                                    value: 'Upload is paused'
                                }
                            ])
                            break;
                        case 'running':
                            setSnapshot(prev => [
                                ...prev,
                                {
                                    name: elem + 'Snapshot',
                                    value: 'Upload is running'
                                }
                            ])
                            break;
                    }

                    setSnapshot(prev => [
                        ...prev,
                        {
                            name: elem + 'Snapshot',
                            value: 'Upload is ' + progress + '%'
                        }
                    ])
                },

                (err) => console.error(err),

                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            counterUploaded++

                            setItems(prev => (
                                {
                                    ...prev,
                                    [i.label]: downloadURL,
                                }
                            ))

                            setSnapshot(prev => [
                                ...prev,
                                {
                                    name: i.label + 'Successfully',
                                    value: `Download completed successfully. File available: ${downloadURL}`
                                }
                            ])

                            if (counterUploaded === counterFiles) setIsAllReady(true)
                        })
                }
            );
        })
    }

    const uploadFirebase = async () => {
        const out: IUpload[] = []

        for (let key in files) {
            out.push({
                file: files[key].localFile as TFile,
                label: key,
                path: files[key].path
            })
        }

        await upload(out)
    }

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string) => {
        e.preventDefault()
        let counter = 0
        for (let key in files) counter++

        if (counter > 0) {
            setUpdateId(_id)

            await deleteFirebase()
            await uploadFirebase()
        } else {
            dispatch(updateMovie({_id, items}))
            navigate('../')
        }
    }

    useEffect(() => {
        if (isAllReady) {
            dispatch(updateMovie({_id: updateId, items}))
            setIsLoading(false)
            navigate('../')
        }
    }, [isAllReady])

    return {
        isLoading,
        isEdit,
        setIsEdit,

        movieAvatar,
        handleMovieAvatar,

        handleChangeFile,
        handleChangeText,
        handleUpdate,

        navigate,
        files,
    }
}

//helpers
async function deleteItemFirebase(i: string) {
    const desertRef = ref(storage, i);
    await deleteObject(desertRef)
        .then(() => {})
        .catch((error) => {
            console.error(error)
        });
}