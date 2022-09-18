import React, { FC } from 'react'

import './Footer.scss'

import { MdRoom, MdPhone, MdOutlineEmail } from "react-icons/md";
import { AiFillFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa";

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => (
    <footer className='footer'>
        <div className="footer__left">
            <h2 >.STORE</h2>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci commodi dicta dolorem ducimus, esse harum, optio placeat quis repudiandae, rerum sunt voluptate! Blanditiis dicta dolores eos fugit laborum sint, suscipit?
            </p>

            <ul>
                <li style={{backgroundColor: '#3B5999'}}><AiFillFacebook /></li>
                <li style={{backgroundColor: '#E4405F'}}><AiOutlineInstagram /></li>
                <li style={{backgroundColor: '#55ACEE'}}><AiOutlineTwitter /></li>
                <li style={{backgroundColor: '#E60023'}}><FaPinterest /></li>
            </ul>
        </div>

        <div className="footer__center">
            <h3>Useful Links</h3>

            <ul>
                <li>Home</li>
                <li>Cart</li>
                <li>Man Fashion</li>
                <li>Woman Fashion</li>
                <li>Accessories</li>
                <li>My Account</li>
                <li>Order Tracking</li>
                <li>Wishlist</li>
                <li>Terms</li>
            </ul>
        </div>

        <div className="footer__right">
            <h3>Contact</h3>
            <div className="footer__contact"><MdRoom /> 622 Dixie Path, South Tobinchester 98336</div>
            <div className="footer__contact"><MdPhone /> +1 234 5678</div>
            <div className="footer__contact"><MdOutlineEmail /> email@box.com</div>
            <img src="https://user-images.githubusercontent.com/52581/44384465-5e312780-a570-11e8-9336-7b54978a9e64.png" alt="..."/>
        </div>
    </footer>
)

export default Footer