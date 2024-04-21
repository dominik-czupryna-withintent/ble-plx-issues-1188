import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useBLE from "./src/hooks/useBLE";
import { useState } from "react";

const App = () => {
  const { requestPermissions } = useBLE();
  const [visible, setVisible] = useState(false);
  const connectedDevice = false;

  const scanForDevices = async () => {
  };
  const openModal = () => {
    scanForDevices();
    setVisible(true);
  };

  return (
      <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
          {connectedDevice ? (
                <>
                    <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
  {/* <Text style={styles.heartRateText}>{heartRate} bpm</Text> */}
  </>
) : (
      <Text style={styles.heartRateTitleText}>Please Connect to a Heart Rate Monitor</Text>
)}
  </View>
  <TouchableOpacity
  // onPress={connectedDevice ? disconnectFromDevice : openModal}
  onPress={openModal}
  style={styles.ctaButton}
  >
  <Text style={styles.ctaButtonText}>{connectedDevice ? "Disconnect" : "Connect"}</Text>
      </TouchableOpacity>
  {/* <DeviceModal
        closeModal={() => setVisible(false)}
        visible={visible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      /> */}
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default App;
