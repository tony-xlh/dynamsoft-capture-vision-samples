import { Image, StyleSheet, Text, Button, View, BackHandler } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useEffect, useState } from 'react';
import DocumentScanner from '@/components/Scanner';

export default function HomeScreen() {
  const [isScanning,setIsScanning] = useState(false);
  const [imageDataURL,setImageDataURL] = useState("");
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      if (!isScanning) {
        /**
         * When true is returned the event will not be bubbled up
         * & no other back action will execute
         */
        setIsScanning(false);
        return true;
      }
      /**
       * Returning false will let the event to bubble up & let other event listeners
       * or the system's default back action to be executed.
       */
      return false;
    });
  }, []);
  
  return (
    <>
      {isScanning && (
        <DocumentScanner
          license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAwMjI3NzYzLVRYbFhaV0pRY205cSIsIm1haW5TZXJ2ZXJVUkwiOiJodHRwczovL21sdHMuZHluYW1zb2Z0LmNvbSIsIm9yZ2FuaXphdGlvbklEIjoiMTAwMjI3NzYzIiwic3RhbmRieVNlcnZlclVSTCI6Imh0dHBzOi8vc2x0cy5keW5hbXNvZnQuY29tIiwiY2hlY2tDb2RlIjotMzg1NjA5MTcyfQ=="
          onClosed={()=>{setIsScanning(false)}}
          onScanned={(dataURL:string)=>{setImageDataURL(dataURL)}}
        ></DocumentScanner>
      )}
      {!isScanning && (
        <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.reactLogo}
            />
          }>
          <View>
            <Text>Smart Note Scanner</Text>
          </View>
          <Button title="Start Scanning" onPress={()=>{
            setIsScanning(true);
          }}></Button>
          {imageDataURL && (
            <Image
              source={{uri:imageDataURL}}
              style={styles.scanned}
            />  
          )}
        </ParallaxScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  scanned:{
    width: "100%",
    resizeMode: "contain"
  }
});
