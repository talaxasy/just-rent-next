import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';


export default class Document extends NextDocument {

  render() {
    return (
      <Html>
        <Head>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4BAtvI2pcZ256O76D2S61ZFz4UBafK3c&libraries=geometry,drawing,places"></script>
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />

        </body>
      </Html>
    )
  }
}
