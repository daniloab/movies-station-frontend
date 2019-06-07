import { createGlobalStyle  } from 'styled-components';
import global from '../../helpers/Global'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html,
    body,
    #root{        
        height: 100%;
    }

    html {
        font-size: 62.5%
    }

    body {    
        margin: 0;
        overflow-x: hidden;
        background: #f4f4f4;
        font-family: ${global.style.fontFamily};
        overflow: hidden;
    }

    .Modal {
        @media only screen and (max-width: 468px) {
            top: 4.8rem !important;
        }
    }

    @media screen and (max-width: 960px) {
        body {
            font-size: 1rem;
        }
    }
`;

export default GlobalStyle;