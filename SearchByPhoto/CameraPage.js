import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import axios from 'axios';
import { OAuthManager } from 'react-native-oauth';

const CameraPage = ({ navigation }) => {

  const [accessToken, setAccessToken] = useState(null);

  const [hasPermission, setHasPermission] = useState(null);

  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const [isPreview, setIsPreview] = useState(false);

  const [isCameraReady, setIsCameraReady] = useState(false);

  const [imageBase64, setImageBase64] = useState(null);

  const cameraRef = useRef();

  useEffect(() => {async function initFcn () {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  }; initFcn()}, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const identify = async (imageBase64) => {
    const response = await axios.post('https://vision.googleapis.com/v1/images:annotate?key=APIKEYHERE', {
      requests: [{
        image: {
          content: imageBase64
        },
        features: [{
          type: "LABEL_DETECTION",
          maxResults: 3
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });


    var responseArray = response.data.responses[0];

    
    var labels = responseArray.labelAnnotations

    console.log(labels);
  
    return labels;
  }
  

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      if (data && data.base64) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        setImageBase64(data.base64)
      }
    };
  }

  const movePage = async () => {
    const labels = await identify(imageBase64);

    let title = labels.map(item => item.description).join(", ");

    navigation.navigate('Appraisal', {'title': title});
  }
  

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
    prevCameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const renderPreviewButtons = () => (
    <View>
      <TouchableOpacity onPress={cancelPreview} style={[styles.closeButton, styles.choiceButton]}>
        <View style={[styles.choiceCross, { transform: [{ rotate: "45deg" }] }]} />
        <View style={[styles.choiceCross, { transform: [{ rotate: "-45deg" }] }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={movePage} style={[styles.confirmButton, styles.choiceButton]}>
        <Text style={styles.text}>✔️</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderCaptureControl = () => (
    <View style={styles.control}>
      <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
        <Text style={styles.text}>{"Flip"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takePicture}
        style={styles.capture}
      />
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <Text style={styles.text}>No access to camera</Text>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={cameraType}
        flashMode={Camera.Constants.FlashMode.off}
        onCameraReady={onCameraReady}
        onMountError={(error) => { console.log("camera error", error); }}
      />
      <View style={styles.container}>
        {isPreview && renderPreviewButtons()}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
  );
}

const WINDOW_HEIGHT = Dimensions.get("window").height;

const WINDOW_WIDTH = Dimensions.get("window").width

const choiceButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);

const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5
  },
  choiceButton: {
    height: choiceButtonSize,
    width: choiceButtonSize,
    borderRadius: Math.floor(choiceButtonSize / 2),
    opacity: 1,  
    zIndex: 10,  
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    backgroundColor: "#FF0000", 
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    position: "absolute",
    top: 35,
    right: 15,
    backgroundColor: "#008000",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  choiceCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  choiceHalfCross: {
    width: "34%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "#f5f6f5",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },  
  text: {
    color: "#fff",
  },
});

export default CameraPage