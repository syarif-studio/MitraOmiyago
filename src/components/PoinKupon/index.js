import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { retrieveData } from '../../services/storage';
import point from '../../services/point';

const PoinKupon = ({ navigation }) => {
  const [userPoint, setUserPoint] = React.useState(0);
  const [poinData, setPoinData] = React.useState();
  const userIdRef = React.useRef();
  const userId = userIdRef.current;

  React.useEffect(() => {
    const getUserPoin = async () => {
      const result = await point.getPoint(userId);

      if (result?.data) {
        setUserPoint(result?.data?.point?.saldo);
        setPoinData(result?.data);
      }
    };

    getUserPoin();
  }, [userId]);

  React.useEffect(() => {
    const getUserId = async () => {
      const userData = await retrieveData('userData');
      userIdRef.current = userData.userId;
    };

    getUserId();
  });

  return (
    <View style={styles.container}>
      <View style={styles.poinContainer}>
        <FontAwesomeIcon icon={faMoneyBillAlt} style={styles.icon} size={24} />
        <TouchableWithoutFeedback
          onPress={() => navigation.push('Poin', { poinData, userId })}>
          <View>
            <Text style={styles.textBold}>{`Rp ${userPoint ?? 0}`}</Text>
            <Text style={styles.textLink}>Top Up</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.separator} />
      <View style={styles.kuponContainer}>
        <FontAwesomeIcon icon={faTag} style={styles.icon} size={20} />
        <TouchableWithoutFeedback onPress={() => navigation.push('Kupon')}>
          <View>
            <Text style={styles.textBold}>Kupon Saya</Text>
            <Text style={styles.textLink}>2 Kupon Baru</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default PoinKupon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 8,
    justifyContent: 'space-around',
    borderRadius: 8,
    borderColor: '#EBECF0',
    borderWidth: 2,
  },
  poinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: '100%',
    borderRightColor: '#EBECF0',
    borderRightWidth: 2,
  },
  kuponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
    color: 'green',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#444',
  },
  textLink: {
    color: 'green',
    fontSize: 12,
  },
});
