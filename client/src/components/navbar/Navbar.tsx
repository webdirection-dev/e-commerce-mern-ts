import React, { FC } from 'react'

import {useNavbar} from './useNavbar'

import {MdSearch, MdOutlineShoppingCart} from 'react-icons/md'
import {Container, Wrapper, Left, Language, SearchContainer, Input, Center, Logo, Right, MenuItem} from "./styledNavbar"
import Badge from '@mui/material/Badge'

interface INavbarProps {}

const Navbar: FC<INavbarProps> = () => {
    const {} = useNavbar

    return(
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>

                    <SearchContainer>
                        <Input />
                        <MdSearch style={{color: 'gray', marginLeft: '5px', fontSize: '16px'}} />
                    </SearchContainer>
                </Left>

                <Center>
                    <Logo>.STORE</Logo>
                </Center>

                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SING IN</MenuItem>

                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <MdOutlineShoppingCart
                                color="action"
                                style={{fontSize: '24px'}}
                            />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar