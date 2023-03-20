import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config';

const AddInventory = ({ navigation: { navigate } }) => {
  const [name, setName] = useState("");
  console.log(name);
  const [quantity, setQuantity] = useState("");
  console.log(quantity);
  const [price, setPrice] = useState("");
  console.log(price);
  const [description, setDescription] = useState("");
  console.log(description);

  const addInventory = async () => {
    const data = {
      name: name,
      quantity: quantity,
      price: price,
      description: description,
    };
 
    await axios.post(API_BASE_URL+'/inventory/add', data)
    .then((res) => {
      console.log(res.data);
      if(res.data.success === true){
        navigate("InventoryHomeScreen")
      }
    })
    .catch((err) => {
      console.log(err);
    })
    }

  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Text
    style={{
      fontSize: FontSize.xLarge,
      color: Colors.primary,
      fontFamily: Font["poppins-bold"],
      marginVertical: Spacing * 3,
    }}
  >
    Add Inventory
            </Text>
            <Text
                style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
                }}
            >
                Add your new inventory items
            </Text>
        </View>
        <View
        style={{
            marginVertical: Spacing * 3,
        }}
        >
        <AppTextInput placeholder="Name" onChangeText={ (e) => setName(e) } />
        <AppTextInput placeholder="Quantity" onChangeText={ (e) => setQuantity(e) } />
        <AppTextInput placeholder="Price" onChangeText={ (e) => setPrice(e) } />
        <AppTextInput placeholder="Description" onChangeText={ (e) => setDescription(e) } />
        </View>

        <TouchableOpacity
        style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
            width: 0,
            height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
        }}
        onPress={() => addInventory()}
        >
        <Text
            style={{
            fontFamily: Font["poppins-bold"],
            color: Colors.onPrimary,
            textAlign: "center",
            fontSize: FontSize.large,
            }}
        >
            Add Now
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddInventory;
