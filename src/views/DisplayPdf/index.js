import React from 'react';
import { WebView } from 'react-native-webview';
import config from '../../config';

export default function DisplayPdf() {
  const source = {
    uri: `http://docs.google.com/gview?url=${config.BROSUR_URL}`,
  };

  return (
    <WebView
      style={{ flex: 1, marginTop: 20 }}
      scalesPageToFit={false}
      source={source}
    />
  );
}
