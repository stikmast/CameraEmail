import React, {useState} from 'react';
import {ImageBackground, View, TouchableOpacity, Text, Alert, Image, ActivityIndicator} from "react-native";
import * as MailComposer from 'expo-mail-composer';
import {imagePreviewStyles} from "../styles/ImagePreviewStyles.js"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const ImagePreview = ({photo,setCapturedImage,setPreviewVisible,setStartCamera}) => {
  const [isLoading,setIsLoading]=useState(false)
  const [status,setStatus]=useState(null)
    const showAlert = async () =>
        Alert.alert(
            "Send a file",
            "Do you want to attach a file?", [
                {
                    text: "No",
                    onPress: async () => {
                        await sendEmail([])
                    },
                    style: "cancel"
                },
                {text: "Yes", onPress: sendEmailWithAttachment()}
            ]
        );
    const sendEmailWithAttachment = async () => {
        setIsLoading(true)
        try {


             sendEmail([photo]).then(r=>{

                 __retakePicture()
                 Alert.alert('Photo was sent successfully')
             })


        } catch (err) {
            Alert.alert(err)
        }

    }
    const sendEmail = async(file ) => {
        var options = {}
        if(file.length < 1){
            options = {
                subject: "Sending email with attachment",

                body: "Enter email body here..."
            }
        }else{
            options = {
                subject: "Sending email with attachment",

                body: "Enter email body here...",
                attachments: file
            }
            let promise = new Promise((resolve, reject) => {
                MailComposer.composeAsync(options)
                    .then((result) => {
                        resolve(result)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
            promise.then(

                result => setStatus("Status: email " + result.status),
                error => setStatus("Status: email " + error.status)
            )
        }}
    const __retakePicture = async () => {
        setCapturedImage(null)
        setPreviewVisible(false)
        setStartCamera(true)
    }

    return (
        <View
            style={imagePreviewStyles.previewContainer}
        >
            {
                isLoading?
                    <View style={{
                        flex: 1,
                        justifyContent: "center",
                    }}>
                        <ActivityIndicator size="large" color="black"/>
                    </View>:

                            <Image source={{ uri: photo }}  style={imagePreviewStyles.imageBlock} />

            }
            <View style={imagePreviewStyles.buttonsContainer}>
                <TouchableOpacity onPress={()=>showAlert()}   style={imagePreviewStyles.sendButton}>
                    <MaterialCommunityIcons name="email-send-outline" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>__retakePicture()}   style={imagePreviewStyles.sendButton}>
                    <MaterialIcons name="delete" size={30} color="black" />
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default ImagePreview;
