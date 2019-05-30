import styled from 'styled-components';
import global from '../../helpers/Global'

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .81rem .7692rem;
    margin-left: .5rem;
    margin-right: .5rem;

    color: ${global.style.primaryColor};
    background: none;
    border: .1rem solid ${global.style.primaryColor};
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;
    
    &:hover {
        cursor: pointer;
        color: white;
        background: ${global.style.primaryColor};
      }
    }

    img {
        position: relative;
        top: 0.1em;
        line-height: .6;
        vertical-align: middle;
        margin-right: 0.4em;
    }
`

export default Button