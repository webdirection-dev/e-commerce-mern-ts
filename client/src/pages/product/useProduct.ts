import {MouseEvent, useEffect, useState} from "react"

import { MdRemove, MdAdd } from "react-icons/md"

const initialArea = {
    offsetLeft: 0,
    offsetTop: 0,
    offsetWidth: 0,
    offsetHeight: 0,
}

const initialZoom = {
    clientX: 50,
    clientY: 50,
    scale: 1,
}

export const useProduct = () => {
    const [isZoom, setIsZoom] = useState(false)
    const [magnifyingArea, setMagnifyingArea] = useState(initialArea)
    const [magnifyingZoom, setMagnifyingZoom] = useState(initialZoom)
    const [classScale, setClassScale] = useState('')

    const handlerClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setIsZoom(!isZoom)
        setClassScale('click-scale')

        const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = magnifyingArea
        let
            clientX = e.clientX - offsetLeft,
            clientY = e.clientY - offsetTop

        // img.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`
        setMagnifyingZoom({
            clientX: clientX / offsetWidth * 100,
            clientY: clientY / offsetHeight * 100,
            scale: 2,
        })
    }

    const handlerMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        setClassScale('')
        if (isZoom) {
            const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = magnifyingArea
            let
                clientX = e.clientX - offsetLeft,
                clientY = e.clientY - offsetTop

            // img.style.transform = `translate(-${clientX}%, -${clientY}%) scale(2)`
            setMagnifyingZoom({
                clientX: clientX / offsetWidth * 100,
                clientY: clientY / offsetHeight * 100,
                scale: 2,
            })
        } else {
            // img.style.transform = 'translate(-50%, -50%) scale(1)'
            setMagnifyingZoom(initialZoom)
        }
    }

    useEffect(() => {
        const area = document.getElementById('magnifying-area')

        if (area) {
            setMagnifyingArea({
                offsetLeft: area.offsetLeft,
                offsetTop: area.offsetTop,
                offsetWidth: area.offsetWidth,
                offsetHeight: area.offsetHeight,
            })
        }
    }, [])

    useEffect(() => {
        if (!isZoom) {
            setMagnifyingZoom(initialZoom)
            setClassScale('click-scale')
        }
    }, [isZoom])

    return {isZoom, setIsZoom, handlerClick, handlerMouseMove, magnifyingZoom, MdRemove, MdAdd, classScale}
}