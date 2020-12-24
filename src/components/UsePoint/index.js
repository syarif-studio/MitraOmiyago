import React from "react"
import { View } from "react-native"
import { Button, Text, Card, Input, Toast } from "native-base"
import pointApi from "../../services/point"

const UsePoint = ({ userData, updateCart, onSetPoint }) => {
  const [isUsingPoint, setIsUsingPoint] = React.useState(false)
  const [point, setPoint] = React.useState("")
  const [userPoint, setUserPoint] = React.useState(0)
  const userId = userData?.userId

  React.useEffect(() => {
    const getUserPoin = async () => {
      const result = await pointApi.getPoint(userId)

      if (result?.data) {
        setUserPoint(result?.data?.point?.saldo)
      }
    }

    getUserPoin()
  }, [userId])

  const handleSetPoint = (value) => {
    if (parseInt(userPoint) >= value) {
      setPoint(value)
    } else {
      if (parseInt(userPoint) > 0) {
        Toast.show({
          type: "warning",
          text: `Maksimal poin yang bisa digunakan Rp ${userPoint}`,
          buttonText: "Okay",
          duration: 3000
        })
      }
      setPoint("")
    }
  }

  const handleUsePoint = async () => {
    if (isUsingPoint) {
      const result = await pointApi.unusePoint(userId)
      if (result?.cart_id) {
        setIsUsingPoint(false)
        setPoint("")
      }
    } else {
      const result = await pointApi.usePoint({ userId, nominal: point })
      if (result?.cart_id) {
        setIsUsingPoint(true)
        onSetPoint(point)
        Toast.show({
          type: "success",
          text: result.msg,
          buttonText: "Okay",
          duration: 3000
        })
      }
    }

    updateCart()
  }

  return (
    <View>
      <Card>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {!isUsingPoint ? (
            <Input
              onChangeText={(text) => handleSetPoint(text)}
              value={point?.toString()}
              style={{
                height: 32,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#01906e",
                marginRight: 10
              }}
            />
          ) : (
            <Text style={{ color: "#01906e", fontSize: 15 }}>{point}</Text>
          )}
          <Button small success onPress={handleUsePoint}>
            {isUsingPoint ? (
              <Text uppercase={false}>Batal</Text>
            ) : (
              <Text uppercase={false}>Gunakan Point</Text>
            )}
          </Button>
        </View>
      </Card>
    </View>
  )
}
export default UsePoint
