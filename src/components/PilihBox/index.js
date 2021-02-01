import React, { createRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { Button, Text, Thumbnail } from 'native-base';
import checkout from './../../services/checkout';

const actionSheetRef = createRef();
const priceFormat = (price) => {
  if (!price) return '0';

  if (price.includes('.'))
    return price.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const PilihBox = ({ userData, cart, updateCart }) => {
  const [boxs, setBoxs] = React.useState();

  React.useEffect(() => {
    const getBox = async () => {
      const resp = await checkout.getBox();
      if (resp?.totalData) {
        setBoxs(resp.data);
      }
    };

    getBox();
  }, []);

  const handleShowSelectBox = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const handleSelectBox = async (index) => {
    const updateBox = await checkout.updateCart(
      userData.userId,
      boxs[index].box.id,
      'box'
    );

    if (updateBox?.respone) {
      updateCart();
      actionSheetRef.current?.setModalVisible(false);
    }
  };

  const selected = boxs?.find(
    ({ box }) => box?.id === parseInt(cart?.cartBox?.box_id)
  );

  return (
    <View
      style={{
        borderBottomColor: '#eaeaea',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        paddingBottom: 20,
        marginBottom: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Pilih Box</Text>
        <Button success small onPress={handleShowSelectBox}>
          <Text uppercase={false}>Pilih</Text>
        </Button>
      </View>
      {selected && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ccc',
              padding: 5,
              marginRight: 20,
            }}>
            <Thumbnail
              square
              style={{ width: 50, height: 50 }}
              source={{
                uri: selected?.box?.image?.replace(
                  'https://omiyago.com/',
                  'https://m.omiyago.com/public/'
                ),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <Text uppercase={false}>{selected?.box?.name}</Text>
            <Text uppercase={false}>
              Rp {priceFormat(selected?.box?.price)}
            </Text>
          </View>
        </View>
      )}

      <ActionSheet ref={actionSheetRef}>
        <View style={{ padding: 16 }}>
          <Text style={{ marginBottom: 16, fontWeight: 'bold', fontSize: 20 }}>
            Box Pengiriman
          </Text>
          {boxs &&
            boxs.map(({ box }, index) => (
              <TouchableOpacity
                key={box?.id}
                onPress={() => handleSelectBox(index)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#ccc',
                      padding: 5,
                      marginRight: 20,
                    }}>
                    <Thumbnail
                      square
                      style={{ width: 50, height: 50 }}
                      source={{
                        uri: box?.image?.replace(
                          'https://omiyago.com/',
                          'https://m.omiyago.com/public/'
                        ),
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text uppercase={false}>{box?.name}</Text>
                    <Text uppercase={false}>{priceFormat(box?.price)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ActionSheet>
    </View>
  );
};
export default PilihBox;
