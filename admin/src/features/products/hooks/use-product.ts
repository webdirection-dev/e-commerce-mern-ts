import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"

import {useAppDispatch} from "../../../static/hooks/hookRedux"
import {createProduct} from "../products-slice"

import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage"
import {storage} from "../../../static/configs/firebase"
import {noImg} from "../../../static/configs/firebase"

import {IObjString} from "../../../static/types/typeAnother"

const init: IObjString = {
    img: noImg,
    inStock: 'true',
    // active: 'true',
}

export const useProduct = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    //todo что сохраниться в inStock монги строка 'false' или булинов тип?
    const [newProduct, setNewProduct] = useState(init)
    const [newPic, setNewPic] = useState({localFile: {}, path: ''})
    const [productImg, setProductImg] = useState('' as string | File)

    const [isAllReady, setIsAllReady] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const imgUrl = productImg ? URL.createObjectURL(productImg as Blob | MediaSource) : noImg

    const handleProductImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const localFile = e.target.files
        if (localFile !== null) {
            setProductImg(localFile[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target

        setNewProduct({
            ...newProduct,
            [name]: value
        })
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.files

        if (value !== null) {
            setNewPic({
                localFile: value[0],
                path: value[0].name
            })
        }
    }

    const handleUpload = async () => {
        setIsLoading(true)

        const fileName = 'img-' + newPic.path.split('.')[0] + '-' + new Date().getTime()

        const storageRef = ref(storage, `/products/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, newPic.localFile as Blob | Uint8Array | ArrayBuffer)

        await uploadTask.on(
            'state_changed',

            async (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

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
                        setNewProduct(prev => (
                            {
                                ...prev,
                                img: downloadURL,
                            }
                        ))

                        setIsLoading(false)
                        setIsUploaded(true)
                    })
            }
        )
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        if (newPic.path !== '') {
            handleUpload()
        } else {
            dispatch(createProduct(newProduct))
            navigate('../')
        }
    }

    useEffect(() => {
        if (
            (newProduct.title && newProduct.title !== '') &&
            (newProduct.desc && newProduct.desc !== '') &&
            (newProduct.price && newProduct.price !== '')
        ) setIsAllReady(true)
        else setIsAllReady(false)
    }, [newProduct])

    useEffect(() => {
        if (isUploaded) {
            dispatch(createProduct(newProduct))
            navigate('../')
        }
    }, [isUploaded])

    return {
        navigate,
        imgUrl,
        isAllReady,
        isLoading,
        handleProductImg,
        handleChange,
        handleChangeFile,
        handleSubmit,
    }
}
