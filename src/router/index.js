import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import homeImage from '../assets/img/home.png';
import promoImage from '../assets/img/promo.png';
import akunImage from '../assets/img/akun.png';
import keranjangImage from '../assets/img/icons8-buy-40.png';
import HomeAuth from '../views/HomeAuth';
import Home from '../views/Home';
import Promo from '../views/Promo';
import Keranjang from '../views/Keranjang';
import SearchBar from '../components/SearchBar';
import SearchDetail from '../components/SearchDetail';
import Akun from '../views/Akun';
import AkunHeader from '../components/AkunHeader';
import ProductDetail from '../views/ProductDetail';
import CategoryDepan from '../views/Category/Depan';
import ProductCategory from '../views/Category/ProductCategory';
import Login from '../views/Login';
import Daftar from '../views/Daftar';
import Faq from '../views/Faq';
import Checkout from '../views/Checkout';
import FaqDetail from '../views/FaqDetail';
import KeranjangBelanja from '../views/KeranjangBelanja';
import Wishlist from '../views/Wishlist';
import RiwayatBelanja from '../views/RiwayatBelanja';
import RiwayatDetail from '../views/RiwayatDetail';
import Payment from '../views/Payment';
import Search from '../views/Search';
import ThankyouPage from '../views/ThankyouPage';
import FlashSale from '../views/FlashSale';
import AuthLoading from '../views/AuthLoading';
import ForgotPassword from '../views/ForgotPassword';
import Notification from '../views/Notification';
import Midtrans from '../views/Payment/Midtrans';
import { connect } from 'react-redux';
import Kupon from '../views/Kupon';
import Poin from '../views/Poin';
import RiwayatPoin from '../views/RiwayatPoin';
import DisplayPdf from '../views/DisplayPdf';

const HomeStack = createStackNavigator(
  {
    Home: Home,
    CategoryDepan: CategoryDepan,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) tabBarVisible = false;

  return { tabBarVisible };
};
CategoryDepan.navigationOptions = ({ navigation }) => ({
  header: null,
});

const PromoStack = createStackNavigator(
  {
    Promo: {
      screen: Promo,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#009975',
      },
    },
  }
);

const KeranjangStack = createStackNavigator(
  {
    Keranjang: { screen: Keranjang },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AkunStack = createStackNavigator(
  {
    Akun: { screen: Akun },
  },
  {
    defaultNavigationOptions: {
      header: ({ navigation }) => <AkunHeader navigation={navigation} />,
    },
  }
);

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const CartIcon = connect(mapStateToProps)((props) => {
  const cartCount =
    props.cart && Array.isArray(props.cart.data) ? props.cart.totalData : 0;
  return (
    <View>
      <Image source={props.iconName} style={{ height: 25, width: 25 }} />
      <View style={styles.badge}>
        <Text style={{ fontSize: 9, color: '#fff', position: 'relative' }}>
          {cartCount}
        </Text>
      </View>
    </View>
  );
});

const MainRouter = createStackNavigator(
  {
    BottomNavigation: createBottomTabNavigator(
      {
        Home: {
          screen: HomeStack,
        },
        Promo: { screen: PromoStack },
        Keranjang: {
          screen: KeranjangStack,
          navigationOptions: {
            tabBarVisible: false,
          },
        },
        Akun: { screen: AuthLoading },
      },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = homeImage;
            } else if (routeName === 'Promo') {
              iconName = promoImage;
            } else if (routeName === 'Keranjang') {
              return <CartIcon iconName={keranjangImage} />;
            } else if (routeName === 'Akun') {
              iconName = akunImage;
            }
            return (
              <Image source={iconName} style={{ height: 25, width: 25 }} />
            );
          },
        }),
        tabBarOptions: {
          activeTintColor: '#009975',
          inactiveTintColor: 'gray',
        },
        lazy: false,
        resetOnBlur: true,
      }
    ),
    HomeAuth: HomeAuth,
    Detail: ProductDetail,
    Login: Login,
    Daftar: Daftar,
    Faq: Faq,
    Checkout: Checkout,
    FaqDetail: FaqDetail,
    Keranjang: KeranjangStack,
    KeranjangBelanja: KeranjangBelanja,
    Wishlist: Wishlist,
    RiwayatBelanja: RiwayatBelanja,
    RiwayatDetail: RiwayatDetail,
    Payment: Payment,
    Search: Search,
    ThankyouPage: ThankyouPage,
    ProductCategory: ProductCategory,
    FlashSale: FlashSale,
    ForgotPassword: ForgotPassword,
    Notification: Notification,
    Midtrans: Midtrans,
    DisplayPdf: DisplayPdf,
    RiwayatPoin: RiwayatPoin,
    Kupon: {
      screen: Kupon,
      navigationOptions: {
        headerShown: true,
      },
    },
    Poin: {
      screen: Poin,
      navigationOptions: {
        headerShown: true,
      },
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
    initialRouteName: 'HomeAuth',
  }
);

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 7,
    width: 14,
    height: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default createAppContainer(MainRouter);
