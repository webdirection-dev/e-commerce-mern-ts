import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../static/hooks/hookRedux'

import { storage, noImg } from '../../../static/configs/firebase'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'

import {IObjString} from "../../../static/types/typeAnother"
import {TFile, IUpload} from "../../../static/types/typesFirebase"
import {updateProduct} from "../products-slice";

export const useUpdateProduct = (img: string, inStock: boolean) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isAllReady, setIsAllReady] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const [updProduct, setUpdProduct] = useState({inStock: String(inStock)} as IObjString)
    const [newImgProduct, setNewImgProduct] = useState({ localFile: {}, path: '' })
    const [updateId, setUpdateId] = useState('')
    const [productImg, setProductImg] = useState('' as string | File)
    const [snapshot, setSnapshot] = useState([] as {[key: string]: string | number}[])

    const imgUrl = productImg
        ? URL.createObjectURL(productImg as Blob | MediaSource)
        : img

    const handleUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const localFile = e.target.files;
        if (localFile !== null) {
            setProductImg(localFile[0]);
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setUpdProduct({
            ...updProduct,
            [name]: value,
        });
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.files;

        if (value !== null) {
            setNewImgProduct({
                localFile: value[0],
                path: value[0].name,
            });
        }
    }

    const deleteFirebase = async () => {
        if (img !== noImg) {
            const desertRef = ref(storage, img);
            await deleteObject(desertRef)
                .then(() => {})
                .catch((error) => {console.error(error)})
        } else return;
    }

    const upload = (product: IUpload) => {
        setIsLoading(true);

        const fileName =
            product.label +
            '-' +
            product.path.split('.')[0] +
            '-' +
            new Date().getTime();

        const storageRef = ref(storage, `/products/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, product.file);

        uploadTask.on(
            'state_changed',

            async (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                const elem = snapshot.ref.fullPath.split('/')[1].split('-')[0];

                switch (snapshot.state) {
                    case 'paused':
                        // setSnapshot((prev) => [
                        //     ...prev,
                        //     {
                        //         name: elem + 'Snapshot',
                        //         value: 'Upload is paused',
                        //     },
                        // ])
                        break
                    case 'running':
                        // setSnapshot((prev) => [
                        //     ...prev,
                        //     {
                        //         name: elem + 'Snapshot',
                        //         value: 'Upload is running',
                        //     },
                        // ])
                        break
                }

                // setSnapshot((prev) => [
                //     ...prev,
                //     {
                //         name: elem + 'Snapshot',
                //         value: 'Upload is ' + progress + '%',
                //     },
                // ])
            },

            (err) => console.error(err),

            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUpdProduct((prev) => ({
                        ...prev,
                        [product.label]: downloadURL,
                    }));

                    // setSnapshot((prev) => [
                    //     ...prev,
                    //     {
                    //         name: product.label + 'Successfully',
                    //         value: `Download completed successfully. File available: ${downloadURL}`,
                    //     },
                    // ])

                    setIsUploaded(true);
                    setIsLoading(false);
                });
            }
        );
    }

    const uploadFirebase = async () => {
        await upload({
            file: newImgProduct.localFile as TFile,
            label: 'img',
            path: newImgProduct.path,
        })
    }

    const handleUpdate = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        _id: string
    ) => {
        e.preventDefault();

        if (isAllReady) {
            if (newImgProduct.path !== '') {
                setUpdateId(_id);

                await deleteFirebase();
                await uploadFirebase();
            } else {
                dispatch(updateProduct({ _id, items: updProduct }))
                navigate('../');
            }
        } else navigate('../');
    }

    const handleReset = () => {
        navigate('../');
    }

    useEffect(() => {
        if (isUploaded) {
            dispatch(updateProduct({ _id: updateId, items: updProduct }))
            navigate('../');
        }
    }, [isUploaded])

    useEffect(() => {
        let counter = 0;

        for (let key in updProduct) {
            if (
                (updProduct.title && updProduct.title !== '') ||
                (updProduct.desc && updProduct.desc !== '') ||
                (updProduct.price && updProduct.price !== '')
            ) {
                counter++
            } else counter = 0
        }

        if (newImgProduct.path !== '' || counter > 1 || updProduct.inStock !== String(inStock)) setIsAllReady(true)
        else setIsAllReady(false);
    }, [updProduct, newImgProduct])

    return {
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
    }
}
