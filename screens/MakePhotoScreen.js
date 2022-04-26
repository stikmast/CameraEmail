import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ImageBackground, Alert,Text} from "react-native";
import {Camera} from 'expo-camera';
import ImagePreview from "../components/ImagePreview";
import * as FileSystem from "expo-file-system";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {Touchable} from "react-native-web";
import {CameraContext} from "../context/CameraContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const MakePhotoScreen = () => {
    const{startCamera,setStartCamera}=useContext(CameraContext)
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [previewVisible, setPreviewVisible] = useState(false)
    const [capturedImage, setCapturedImage] = useState(null)
    const cam=useRef(null)
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off)

    const __handleFlashMode = () => {
        if (flashMode === Camera.Constants.FlashMode.torch) {
            setFlashMode(Camera.Constants.FlashMode.off)
        } else if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.torch)
        }

    }
    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
            // start the camera
            setStartCamera(true)

        } else {
            Alert.alert('Access denied')
        }
    }

    useEffect(async () => {
        setStartCamera(false)
        try {
            await FileSystem.deleteAsync("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540serhio15210%252Fexpo-camera-app/Camera", {idempotent: true})
            console.log('deleted!')
        }catch (err){
            console.log(err)
        }
    },[])
    const __takePicture = async () => {
        try {
            const option={quality:0.5,base64: true,skipProcessing:true}
            const photo = await cam.current.takePictureAsync(option)
            setPreviewVisible(true)
            setCapturedImage(photo.uri.toString())
            console.log(photo.uri)
        }catch (err){
            console.log(err)
        }


    }
    const __switchCamera = () => {
        if (type === Camera.Constants.Type.back) {
            setType(Camera.Constants.Type.front)
        } else {
            setType(Camera.Constants.Type.back)
        }
    }
    return (
        previewVisible && capturedImage ?
                <ImagePreview photo={capturedImage}  setCapturedImage={setCapturedImage} setPreviewVisible={setPreviewVisible} setStartCamera={setStartCamera}  />:
            startCamera?
        <Camera  ref={cam} type={type} style={StyleSheet.absoluteFillObject} flashMode={flashMode} >
            <TouchableOpacity
                onPress={__handleFlashMode}
                style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                    borderRadius: 50,
                    height: 40,
                    width: 40,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Text
                    style={{
                        fontSize: 25
                    }}
                >
                    ⚡️
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={__switchCamera}
                style={{
                    position: 'absolute',
                    left: '5%',
                    top: '20%',
                    height: 40,
                    width: 40
                }}
            >

                    {type === Camera.Constants.Type.front ? <MaterialIcons name="camera-front" size={40} color="white" /> : <MaterialIcons name="photo-camera-back" size={40} color="white" />}

            </TouchableOpacity>
        <TouchableOpacity   style={{
            width: 100,
            height: 100,
            borderWidth: 2,
            borderColor: 'white',
            position:'absolute',
            bottom:50,
            borderRadius: 50,
            alignSelf: 'center'
        }} onPress={()=>__takePicture()}/>
        </Camera>:<TouchableOpacity style={{alignItems:'center',justifyContent:'center',flex:1}} onPress={()=>__startCamera()}>
                    <FontAwesome5 name="camera-retro" size={50} color="black" />
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Make a photo</Text>
                    <Text>(tap the screen to turn on the camera)</Text>
                </TouchableOpacity>
    );
};

export default MakePhotoScreen;
