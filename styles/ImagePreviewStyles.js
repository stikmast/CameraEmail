import {Dimensions, StyleSheet} from "react-native";

export const imagePreviewStyles = StyleSheet.create({
    previewContainer: {
        backgroundColor: '#F0E68C',
        flex: 1,
        width: '100%',
        height: '100%',
        display:'flex',
        padding:20,
        justifyContent:'center',
        alignItems:'center',

    },
    buttonsContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    sendButton: {
        borderWidth: 2,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 30,
        textAlign:'center',
        fontWeight:'bold'
    },
    imageBlock:{
        width:"100%",
        height:450,
        borderRadius:10,
        marginBottom:50,

    },

})

