import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {Dimensions, Text, View,Image} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MakePhotoScreen from "../screens/MakePhotoScreen";
import TakePhotoScreen from "../screens/TakePhotoScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";



const Tab = createBottomTabNavigator();


const Tabs = () => {

    return (
        <Tab.Navigator initialRouteName="MakePhotoScreen" screenOptions={{
            tabBarShowLabel:false,
            tabBarLabelStyle: {
                color:'white'
            },
            headerStyle:{
                backgroundColor:'black',

            },
            tabBarStyle: {
                height: 80,

                backgroundColor: "#F0E68C"
            },

            tabBarItemStyle: {
                borderWidth:2,
                borderColor:'black',

            },

            headerTitle: () => (
                <View style={{
                    width: "100%",
                    alignItems:'center',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignSelf:'center',
                    top:30,

                }}>
                    <View></View>
                    <View style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        borderColor: "black",
                        borderWidth: 2,
                        backgroundColor: "#F0E68C",
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <FontAwesome5 name="camera-retro" size={50} color="black" />
                    </View>
                    <View></View>

                </View>
            )
        }}
        >

            <Tab.Screen name={"MakePhotoScreen"} component={MakePhotoScreen} options={{
                title:'Make Photo',
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: 150,

                        }}>
                        <MaterialIcons name="camera" size={40} color="black" style={{
                            textAlign: "center",
                            color:focused?"black":"gray"}} />
                        <Text style={{
                            color:focused?"black":"gray",
                            fontSize: 11,
                            textAlign: "center",
                            top:10
                        }}>Make Photo</Text>
                    </View>
                ),
            }} >

            </Tab.Screen>


            <Tab.Screen name={"TakePhotoScreen"} component={TakePhotoScreen} options={{
                title:'',
                tabBarIcon: ({ focused }) => (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: 150,
                            borderColor:'#F0E68C',


                        }}>
                        <MaterialIcons name="add-photo-alternate" size={40} color="black" style={{
                            textAlign: "center",
                            color:focused?"black":"gray"}} />

                        <Text style={{
                            color:focused?"black":"gray",
                            fontSize: 11,
                            textAlign: "center",
                            top:10
                        }}>Take Photo</Text>
                    </View>
                ),
            }}

                 />


        </Tab.Navigator>
    );
};

export default Tabs;
