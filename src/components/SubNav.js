import React from 'react'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles';
import {motion} from 'framer-motion';
import {parentVariants} from './Nav'



const SubNav = () => {

    const subMenus = [
        {
            title: 'Discover',
            link: 'discover',
        }, 
        {
            title: 'Finished Books',
            link: 'finished'
        },
        {
            title: 'Reading List',
            link: 'list',
        }
    ]
    return (
        <StyledSubNav>
            <motion.div 
            className="nav-content" 
            initial="initial"
            animate="enter"
            exit="exit" variants={parentVariants}>
                {subMenus && subMenus.map((menuItem, index) => (
                    <MenuItems key={menuItem.link+index} title={menuItem.title} link={menuItem.link} active={index === 0 ? 'active' : null}/>
                ))}
            </motion.div>
        </StyledSubNav>
    )
}

const MenuItems = ({title, link, active}) => (
    <StyledMenuItem className={active ? 'active-menu': null}>
        <motion.span variants={theme.variants}>{title}</motion.span>
    </StyledMenuItem>
)

const StyledMenuItem = styled.a`
    font-size: 1.5rem;
    list-style: none;
    margin-right: 2.2rem;
    cursor: pointer;
    letter-spacing: 0.5px;
    line-height: 2.2rem;
    white-space: nowrap;
    ${mixin.flexCenter};
    height: 100%;
    text-align: center;
    font-weight: 700;
    position: relative;
    overflow: hidden;

    &::after{
        display: block;
        content: '';
        height: 2px;
        background-color: ${theme.colors.primary};
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: translateX(-101%);
    }

    &:hover::after{
        transition: transform 0.3s ${theme.easing};
        transform: translateX(0);
    }

    .active-menu::after{
        transition: transform 0.3s ${theme.easing};
        transform: translateX(100%);
    }

    /* border-bottom: ${props => props.active ? `3px solid ${theme.colors.primary}` : null}; */


    &:first-child{
        padding-left: 0;
    }

    ${media.phone`margin-right: 1rem; font-size: 1.3rem`}
`;

const StyledSubNav = styled.div`
    height: 5rem;
    border-top: 1px solid ${theme.colors.primary};
    box-shadow: rgba(0, 0, 0, 0.03) 0px 9px 9px;
    border-bottom: 0.5px solid rgba(25, 39, 45, 0.1);
    
    .nav-content{
        ${mixin.flexCenter};
        height: 100%;
        ${mixin.container}
        justify-content: flex-start;
        ${media.phone`justify-content: center;`}
    }
`;

export default SubNav
