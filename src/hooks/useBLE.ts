import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import * as ExpoDevice from "expo-device";

interface BluetoothLowEnergyApi {
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice: (deviceId: Device) => Promise<void>;
    connectedDevice: Device | null;
}

function useBLE(): BluetoothLowEnergyApi {
    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN, {
            title: "Scan Permission",
            message: "App requires Bluetooth Scanning",
            buttonPositive: "OK",
        });

        const bluetoothConnectPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Connecting Permission",
                message: "App requires Bluetooth Connecting",
                buttonPositive: "OK",
            }
        );

        const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Fine Location",
                message: "App requires Fine Location",
                buttonPositive: "OK",
            }
        );

        return (
            bluetoothScanPermissions === "granted" &&
            bluetoothConnectPermissions === "granted" &&
            bluetoothFineLocationPermissions === "granted"
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android") {
            if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: "Location Permission",
                    message: "Bluetooth requires Location",
                    buttonPositive: "OK",
                });

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
                return isAndroid31PermissionsGranted;
            }
        } else {
            return true;
        }
    };

    const isDuplicatedDevice = (devices: Device[], nextDevice: Device) =>
        devices.some((device) => device.id === nextDevice.id);

    const scanForPeripherals = () => {
    };

    const connectToDevice = async (device: Device) => {
    };

    return { scanForPeripherals, requestPermissions, allDevices, connectToDevice, connectedDevice };
}

export default useBLE;
