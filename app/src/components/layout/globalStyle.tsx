import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        font-family : 'MICEGothic Bold', sans-serif;
    }
    @font-face {
        font-family: 'MICEGothic Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-01@1.0/MICEGothic Bold.woff2') format('woff2');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'NanumSquareNeo-Variable';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/NanumSquareNeo-Variable.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'IM_Hyemin-Bold';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/IM_Hyemin-Bold.woff2') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'HBIOS-SYS';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/HBIOS-SYS.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

`;

export default GlobalStyle;
