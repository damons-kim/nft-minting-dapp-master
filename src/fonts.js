import { createGlobalStyle } from 'styled-components'
import RenoMono from './fonts/MonumentExtended.otf'
import Upheaval from './fonts/MonumentExtended.otf';
import MonumentExtended from './fonts/MonumentExtended.otf';

// import Gumball from './Gumball.ttf';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Upheaval';
        src: url(${Upheaval}) format('truetype');
    }

    @font-face {
        font-family: 'Renomono';
        src: url(${RenoMono}) format('opentype');
    }

    @font-face {
        font-family: 'MonumentExtended';
        src: url(${MonumentExtended}) format('opentype');
    }
`;

// export const Renomono = createGlobalStyle`
//     @font-face {
//         font-family: 'Renomono';
//         src: url(${RenoMono}) format('opentype');
//     }
// `;

export default GlobalStyle;