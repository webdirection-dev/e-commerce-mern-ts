import React, {useState, useEffect} from "react"
import {storage} from "../../../static/configs/firebase"
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"

import {useAppDispatch} from "../../../static/hooks/hookRedux"
import {createMovie} from "../movies-slice"

import {noImg} from '../../../static/img'
import {movieInputs} from "../../../static/data/form-source"

const quantityInputs = movieInputs.data.length + movieInputs.loadingMedia.length

export type TFile = Blob | Uint8Array | ArrayBuffer

export interface IFiles {
    [key: string]: {localFile: {}, path: string}
}

interface IItem {
    [key: string]: string | number
}

export interface IUpload {
    file: TFile;
    label: string;
    path: string;
}

export type TypeInfoAboutItem = IItem[]

export const useUploadFirebase = () => {
    const dispatch = useAppDispatch()
    const [items, setItems] = useState({isSeries: 'false', genre: 'comedy'} as IItem) // isSeries НЕ УДАЛЯТЬ!!!
    const [files, setFiles] = useState({} as IFiles)

    const [isCheckItem, setIsCheckItem] = useState(false)
    const [isFilesLengthInItem, setIsFilesLengthInItem] = useState(false)
    const [isFilesFill, setIsFilesFill] = useState(false)
    const [isAllReady, setIsAllReady] = useState(false)

    const [movieAvatar, setMovieAvatar] = useState('' as string | File)
    const [infoAboutItem, setInfoAboutItem] = useState([] as TypeInfoAboutItem)
    const [snapshot, setSnapshot] = useState([] as TypeInfoAboutItem)

    const imgUrl = movieAvatar ? URL.createObjectURL(movieAvatar as Blob | MediaSource) : noImg

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

    const upload = (items: IUpload[]) => {
        let counter = 0
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
                            counter = counter + 1

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

                            if (counter === movieInputs.loadingMedia.length) setIsAllReady(true)
                        })
                }
            );
        })
    }

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        await upload([
            {
                file: files.img.localFile as TFile,
                label: 'img',
                path: files.img.path
            },
            {
                file: files.imgTitle.localFile as TFile,
                label: 'imgTitle',
                path: files.imgTitle.path
            },
            {
                file: files.imgSm.localFile as TFile,
                label: 'imgSm',
                path: files.imgSm.path
            },
            {
                file: files.trailer.localFile as TFile,
                label: 'trailer',
                path: files.trailer.path
            },
            {
                file: files.video.localFile as TFile,
                label: 'video',
                path: files.video.path
            },
        ])
    }

    const handleClearForm = () => {
        setItems({isSeries: 'false'})
        setFiles({})
        setIsCheckItem(false)
        setIsFilesLengthInItem(false)
        setIsFilesFill(false)
        setMovieAvatar('')
        setInfoAboutItem([])
        setSnapshot([])
        setIsAllReady(false)
    }

    const handleMovieAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setMovieAvatar(localFile[0])
        }
    }

    useEffect(() => {
        let counter = 0
        for (let key in files) {counter++}
        if (counter === movieInputs.loadingMedia.length) setIsFilesFill(true)
        else setIsFilesFill(false)
    }, [files])

    useEffect(() => {
        let counter = 0
        for (let key in items) {
            counter++

            if (
                (items.title && items.title !== '') &&
                (items.description && items.description !== '') &&
                (items.year && items.year !== '') &&
                (items.duration && items.duration !== '') &&
                (items.limit && items.limit !== '') &&
                (items.genre && items.genre !== '') &&
                (items.isSeries && items.isSeries !== '')
            ) setIsCheckItem(true)
            else setIsCheckItem(false)
        }

        if (counter === quantityInputs) {
            dispatch(createMovie(items))
        }
    }, [items])

    useEffect(() => {
        if (isCheckItem && isFilesFill) {
            const out = []
            for (let key in items) {
                out.push({name: key, value: items[key]})
            }

            for (let key in files) {
                out.push({name: 'Selected ' + key, value: files[key].path})
            }

            setInfoAboutItem(out)
        }
    }, [isCheckItem, isFilesFill, items, files])

    return {
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
        isFilesLengthInItem,
        isAllReady,
        snapshot,
    }
}