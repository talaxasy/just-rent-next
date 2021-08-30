import NextDocument, {Html, Head, Main, NextScript} from 'next/document';
import {ColorModeScript} from '@chakra-ui/react';
import {GOOGLE_API_KEY} from '../utils/constants';

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <script src={GOOGLE_API_KEY}></script>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
