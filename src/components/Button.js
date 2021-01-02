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