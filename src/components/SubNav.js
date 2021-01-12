import React from 'react'
import styled from 'styled-components'
import { media, mixin, theme } from 'styles';
import {motion} from 'framer-motion';
import {parentVariants} from './Nav'
import {NavLink} from 'react-router-dom';



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
                    <MenuItems key={menuItem.link+index} title={menuItem.title} link={menuItem.link}/>
                ))}
            </motion.div>
        </StyledSubNav>
    )
}

const MenuItems = ({title, link}) => {
    function handleMouseleave(el) {
      el.currentTarget.classList.add("animate-out");
    }

    function handleTransEnd(el) {
      el.currentTarget.classList.remove("animate-out");
    }

    return (
      <StyledMenuItem
        onMouseLeave={handleMouseleave}
        onTransitionEnd={handleTransEnd}
        to={`/${link}`}
      >
        <motion.span variants={theme.variants}>{title}</motion.span>
      </StyledMenuItem>
    );
}

const StyledMenuItem = styled(NavLink)`
    font-size: 1.5rem;
    list-style: none;
    margin-right: 2.2rem;
    text-decoration: none;
    color: ${theme.colors.primary};
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

    &.animate-out::after{
        transition: transform 0.3s ${theme.easing};
        transform: translateX(100%);
    }

    &.active::after{
        transform: translateX(0);
    }

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
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 30;
    
    .nav-content{
        ${mixin.flexCenter};
        height: 100%;
        ${mixin.container}
        justify-content: flex-start;
        ${media.phone`justify-content: center;`}
    }
`;

export default SubNav
