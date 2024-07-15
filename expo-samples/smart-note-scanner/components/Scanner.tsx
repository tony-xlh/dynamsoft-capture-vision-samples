import { StyleSheet, Text } from 'react-native';
import { useEffect,useState } from 'react';
import { Camera } from 'expo-camera';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
export interface ScannerProps {
  license?:string;
  onScanned?:(dataURL:string) => void;
  onClosed?:() => void;
}
export default function DocumentScanner(props:ScannerProps) {
  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const response  = await Camera.requestCameraPermissionsAsync();
      setHasPermission(response.granted);
    })();
  }, []);
  const getURI = () => {
    let URI = 'https://tony-xlh.github.io/dynamsoft-capture-vision-samples/smart-note-scanner.html?startScan=true&resolution=1920x1080';
    if (props.license) {
      URI = URI + "&license="+props.license;
    }
    return URI;
  }
  if (hasPermission) {
    return (
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <WebView
          style={styles.webview}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onMessage={(event) => {
            if (!event.nativeEvent.data) {
              if (props.onClosed) {
                props.onClosed();
              }
            }else{
              if (props.onScanned) {
                const dataURL = event.nativeEvent.data;
                props.onScanned(dataURL);
              }
            }
          }}
          source={{ uri: getURI() }}
        />
      </SafeAreaView>
    );
  }else{
    return <Text>No permission.</Text>
  }
}

const styles = StyleSheet.create({
  webview:{
    flex: 1,
  }
});