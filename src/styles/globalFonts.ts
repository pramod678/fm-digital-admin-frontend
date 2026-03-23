import { createGlobalStyle } from 'styled-components';

export const GlobalFonts = createGlobalStyle`
  /* Poppins is imported via index.css using Google Fonts */

  /* You can add more global font styles here */
  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
`;
