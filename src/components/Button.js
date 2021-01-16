import styled from 'styled-components'
import { theme } from 'styles'

export const StyledButton = styled.button`
    padding: 1.5rem 5rem;
    border-radius: 4px;
    background-color: ${theme.colors.primary};
    font-size: 1.6rem;
    font-weight: 500;
    border: none;
    color: #fff;
    font-family: ${theme.fonts.Nunito};
    font-weight: 700;
    cursor: pointer;
    width: 100%;
`

export const StyledBookButton = styled.button`
    padding: 0;
    width: 80px;
    height: 40px;
    border-radius: .5rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: currentColor;
    border: 1px solid ${theme.colors.grey};
    cursor: pointer;

    svg{
        height: 2rem;
        width: 2rem;
        fill: currentColor;
        /* fill: ${theme.colors.grey}; */
    }
`