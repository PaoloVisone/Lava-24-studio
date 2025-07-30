import { createGlobalStyle } from 'styled-components';

const GlobalScrollbarStyles = createGlobalStyle`
  /* WebKit-based browsers */
  ::-webkit-scrollbar {
    width: 8px;
    background-color: #000; /* sfondo nero */
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #333; /* thumb grigio scuro */
    border-radius: 4px;
    border: 2px solid #000; /* evitare che il thumb tocchi i bordi */
  }

  /* Firefox */
  html {
    scrollbar-width: thin;
    scrollbar-color: #333 #000;
  }
`;

export default GlobalScrollbarStyles;