import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  StatusBar
} from 'react-native'
import FlashlightIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Torch from 'react-native-torch'

function App() {

  const [isTorchOn, setIsTorchOn] = useState(false)


  async function handleButtonPress() {
    if (Platform.OS === 'ios') {
      Torch.switchState(isTorchOn);
    } else {
      const cameraAllowed = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'ReactNativeCode Camera Permission',
          'message': 'ReactNativeCode App needs access to your Camera.'
        }
      )
      if (cameraAllowed) {
        setIsTorchOn(!isTorchOn)
        Torch.switchState(isTorchOn);
      }
    }


  }
  return (
    <>
      <StatusBar color="#00C5FF " />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleButtonPress}>
          <View style={styles.torchButtonContainer}>

            <FlashlightIcon name={isTorchOn ? "flashlight-off" : "flashlight"} color={isTorchOn ? "grey" : "#e0e0e0"} size={48} />
          </View>
        </TouchableOpacity>

      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#00EDFF',

  },
  torchButtonContainer: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10
  }
})

export default App