import slider1 from './main-slider-1.jpg'
import slider2 from './main-slider-2.jpg'
import slider3 from './main-slider-3.jpg'

import sliderMini1 from './main-slider-mini-1.jpg'
import sliderMini2 from './main-slider-mini-2.jpg'
import sliderMini3 from './main-slider-mini-3.jpg'

import bgReg from './bg-register.jpg'
import bgRegMini from './bg-register-mini.jpg'

import bgLog from './bgLogin.jpg'
import bgLogMini from './bgLogin-mini.jpg'

import load from './preloader.gif'
import iconSelected from './iconSelected.svg'

export const slider = {
    imgNormal: [slider1, slider2, slider3],
    imgMini: [ sliderMini1, sliderMini2, sliderMini3],
}

export const bgRegister = {
    imgNormal: [bgReg],
    imgMini: [bgRegMini],
}

export const bgLogin = {
    imgNormal: [bgLog],
    imgMini: [bgLogMini],
}

export const preloader = load
export const closeIcon = iconSelected