import React, { Component } from 'react';
import { connect } from 'react-redux';
import midtransClient from 'midtrans-client';
import { WebView } from 'react-native-webview';
import { decode, encode } from 'base-64';
import { retrieveData, storeData } from '../../services/storage';
import payment from '../../services/payment';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const priceFormat = (price) => {
  if (!price) return '0';

  if (price.includes('.'))
    return price.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Midtrans = ({ cart, ...props }) => {
  const [token, setToken] = React.useState(null);
  const paymentSelected = props.navigation.getParam('payment', []);

  React.useEffect(() => {
    const midtransGetToken = () => {
      // initialize snap client object
      let snap = new midtransClient.Snap({
        isProduction: true,
        serverKey: 'VT-server-kSDATnS-AZl_FAAfK-vnEE9C',
        clientKey: 'VT-client-T62xXiubxOX09Nmh',
      });

      // prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
      let parameter = {
        transaction_details: {
          order_id: cart?.cartId,
          gross_amount: parseInt(cart?.cartTotal),
        },
        credit_card: {
          secure: true,
        },
        enabled_payments: paymentSelected,
      };

      // create transaction
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction token
          let transactionToken = transaction.token;
          setToken(transactionToken);

          // transaction redirect url
          let transactionRedirectUrl = transaction.redirect_url;
        })
        .catch((e) => {});
    };

    midtransGetToken();
  }, [cart, paymentSelected]);

  const handlePaymentProcess = async () => {
    const userData = await retrieveData('userData');
    const userNotif = await retrieveData('userNotif');
    let count = userNotif?.count ?? 0;
    count++;
    const storeNotif = await storeData('userNotif', JSON.stringify({ count }));
    const processTransaction = await payment.processTransaction(
      userData.userId
    );

    props.navigation.navigate('ThankyouPage', {
      total: priceFormat(cart?.cartTotal),
    });
  };

  return (
    <WebView
      originWhitelist={['*']}
      style={{ marginTop: 20 }}
      scalesPageToFit={false}
      onMessage={(event) => {
        handlePaymentProcess();
      }}
      source={{
        html:
          `
        <html>
          <body>

        <!-- TODO: Remove ".sandbox" from script src URL for production environment. Also input your client key in "data-client-key" -->
            <script src="https://app.midtrans.com/snap/snap.js" data-client-key="VT-client-T62xXiubxOX09Nmh"></script>
            <script type="text/javascript">
              
                snap.pay('` +
          token +
          `', {
                  // Optional
                  onSuccess: function(result){
                    window.ReactNativeWebView.postMessage("success")
                  },
                  // Optional
                  onPending: function(result){
                    window.ReactNativeWebView.postMessage("pending")
                  },
                  // Optional
                  onError: function(result){
                    window.ReactNativeWebView.postMessage("error")
                  }
                });
            </script>
          </body>
        </html>`,
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(Midtrans);
