import {Alert} from "react-native";
import * as MailComposer from "expo-mail-composer";
import {useState} from "react";



export const sendEmail = async(file ) => {
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

    }}
