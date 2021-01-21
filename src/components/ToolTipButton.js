import React from 'react'
import { useAsync } from 'hooks/use-async'
import Tooltip from "@reach/tooltip";
import VisuallyHidden from "@reach/visually-hidden";
import "@reach/tooltip/styles.css";
import { StyledBookButton } from './Button';
import Spinner from 'assets/Spinner';
import Times from 'assets/Times';
import { theme } from 'styles';
import styled from 'styled-components';

const ToolTipButton = ({label, highlight, onClick, icon, ...rest}) => {
    const {isLoading, isError, error, run, reset} = useAsync();

    const handleClick = () => {
       if(isError){
         reset()
       }else{
        run(onClick())
       }
    }

    return (
      <Tooltip
        label={isError ? error.message : label}
        style={{
          height: "2rem",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <OverrideBookButton 
          disabled={isLoading}
          onClick={handleClick}
          aria-label={isError ? error.message : label}
          {...rest}
          isLoading={isLoading}
          isError={isError}
          highlight={highlight}
        >
          <VisuallyHidden>{isError ? error.message : label}</VisuallyHidden>
          {isLoading ? <Spinner /> : isError ? <Times /> : icon}
        </OverrideBookButton>
      </Tooltip>
    );
}

const OverrideBookButton = styled(StyledBookButton)`
  &:hover,&:focus{
      color: ${({isLoading, isError, highlight}) => isLoading ? theme.colors.grey : isError ? theme.colors.danger : highlight }
  }
`;

export default ToolTipButton
