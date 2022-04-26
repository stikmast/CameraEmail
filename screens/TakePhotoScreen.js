import React, {useContext, useEffect, useState} from 'react';
import {Alert, ImageBackground, Text, TouchableOpacity, View,Image} from "react-native";
import {imagePreviewStyles} from "../styles/ImagePreviewStyles";
import {Touchable} from "react-native-web";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {sendEmail} from "../Api/SendPhoto";
import * as MailComposer from "expo-mail-composer";
import {CameraContext} from "../context/CameraContext";

const TakePhotoScreen = () => {
    const{startCamera,setStartCamera}=useContext(CameraContext)
    const [image, setImage] = useState(null)
    const showAlert = async () =>
        Alert.alert(
            "Send a photo",
            "Do you want to attach a photo?", [
                {
                    text: "No",
                    onPress: async () => {
                        await sendEmail([])
                    },
                    style: "cancel"
                },
                {text: "Yes", onPress:  sendEmailWithAttachment()}
            ]
        );
    useEffect(()=>{
        setStartCamera(false)
    },[])
    const sendEmailWithAttachment = async() => {
        try{
            await sendEmail([image]); // file path

        }catch (err){
            Alert.alert(err)
        }


    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result)
            setImage(result.uri);
        }
    };

    return (
        <View
            style={imagePreviewStyles.previewContainer}
        >
            {image ?
                <Image source={{ uri: image }}  style={imagePreviewStyles.imageBlock} />:
                <TouchableOpacity style={{width:"100%",height:450,borderWidth:3,borderColor:'black',marginBottom:50,alignItems:'center',justifyContent:'center'}}
                                  onPress={pickImage}>
                    <MaterialIcons name="add" size={200} color="black" />
                </TouchableOpacity>
            }


            <View style={imagePreviewStyles.buttonsContainer}>
                <TouchableOpacity onPress={()=>showAlert()} style={imagePreviewStyles.sendButton}>
                    <MaterialCommunityIcons name="email-send-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setImage(null)}   style={imagePreviewStyles.sendButton}>
                    <MaterialIcons name="delete" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TakePhotoScreen;
