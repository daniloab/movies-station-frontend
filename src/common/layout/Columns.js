import React from 'react'
import styled from 'styled-components'

export const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Row = ({ children, ...props }) => <StyledRow {...props}>{children}</StyledRow>;

export const StyledCol = styled.div`
  width: calc((100% * ${props => props.span ? props.span : 12}) / 12);
  padding: 5px 5px 0px 5px;
  
  img {
    width: 100%;
    margin: auto;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    width: calc((100% * ${props => props.spanSm ? props.spanSm : 12}) / 12) !important;    
    max-width: calc((100% * ${props => props.spanSm ? props.spanSm : 12}) / 12) !important;
  }
`;

export const Col = ({ children, ...props }) => (
  <StyledCol {...props}>{children}</StyledCol>
);