import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../static/hooks/hookRedux'
import { updateUser } from '../users-slice'

import { storage, defaultAvatar } from '../../../static/configs/firebase'
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage'

import { IObjString } from '../../../static/types/typesMongo'
import {TFile, IUpload} from "../../../static/types/typesFirebase"

export const useUpdateUser = (profilePic: string, status: string, isAdmin: string) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isAllReady, setIsAllReady] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false)

    const [updUser, setUpdUser] = useState({status, isAdmin: String(isAdmin)} as IObjString)
    const [newImg, setNewImg] = useState({ localFile: {}, path: '' })
    const [updateId, setUpdateId] = useState('')
    const [userAvatar, setUserAvatar] = useState('' as string | File)
    const [snapshot, setSnapshot] = useState([] as {[key: string]: string | number}[])

    const imgUrl = userAvatar
        ? URL.createObjectURL(userAvatar as Blob | MediaSource)
        : profilePic

    const handleUserAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const localFile = e.target.files;
        if (localFile !== null) {
            setUserAvatar(localFile[0]);
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setUpdUser({
            ...updUser,
            [name]: value,
        });
    }

    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.files;

        if (value !== null) {
            setNewImg({
                localFile: value[0],
                path: value[0].name,
            });
        }
    }

    const deleteFirebase = async () => {
        if (profilePic !== defaultAvatar) {
            const desertRef = ref(storage, profilePic);
            await deleteObject(desertRef)
                .then(() => {})
                .catch((error) => {
                    console.error(error);
                });
        } else return;
    }

    const upload = (user: IUpload) => {
        setIsLoading(true);

        const fileName =
            user.label +
            '-' +
            user.path.split('.')[0] +
            '-' +
            new Date().getTime();

        const storageRef = ref(storage, `/avatars/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, user.file);

        uploadTask.on(
            'state_changed',

            async (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                const elem = snapshot.ref.fullPath.split('/')[1].split('-')[0];

                switch (snapshot.state) {
                    case 'paused':
                        setSnapshot((prev) => [
                            ...prev,
                            {
                                name: elem + 'Snapshot',
                                value: 'Upload is paused',
                            },
                        ]);
                        break;
                    case 'running':
                        setSnapshot((prev) => [
                            ...prev,
                            {
                                name: elem + 'Snapshot',
                                value: 'Upload is running',
                            },
                        ]);
                        break;
                }

                setSnapshot((prev) => [
                    ...prev,
                    {
                        name: elem + 'Snapshot',
                        value: 'Upload is ' + progress + '%',
                    },
                ]);
            },

            (err) => console.error(err),

            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUpdUser((prev) => ({
                        ...prev,
                        [user.label]: downloadURL,
                    }));

                    setSnapshot((prev) => [
                        ...prev,
                        {
                            name: user.label + 'Successfully',
                            value: `Download completed successfully. File available: ${downloadURL}`,
                        },
                    ]);

                    setIsUploaded(true);
                    setIsLoading(false);
                });
            }
        );
    }

    const uploadFirebase = async () => {
        await upload({
            file: newImg.localFile as TFile,
            label: 'profilePic',
            path: newImg.path,
        });
    }

    const handleUpdate = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        _id: string
    ) => {
        e.preventDefault();

        if (isAllReady) {
            if (newImg.path !== '') {
                setUpdateId(_id);

                await deleteFirebase();
                await uploadFirebase();
            } else {
                dispatch(updateUser({ _id, items: updUser }));
                navigate('../');
            }
        } else navigate('../');
    }

    const handleReset = () => {
        navigate('../');
    }

    useEffect(() => {
        if (isUploaded) {
            dispatch(updateUser({ _id: updateId, items: updUser }));
            navigate('../');
        }
    }, [isUploaded])

    useEffect(() => {
        let counter = 0;

        for (let key in updUser) {
            if (
                (updUser.username && updUser.username !== '') ||
                (updUser.email && updUser.email !== '') ||
                (updUser.password && updUser.password !== '')
            )
                counter++;
        }

        if (
            updUser.status !== status ||
            updUser.isAdmin !== String(isAdmin) ||
            newImg.path !== '' ||
            counter > 2
        )
            setIsAllReady(true);
        else setIsAllReady(false);
    }, [updUser, newImg])

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
