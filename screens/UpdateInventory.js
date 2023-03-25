import React from "react";
import {
    Text,
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

  const UpdateInventory = ({ route, navigation: { navigate } }) => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [inventoryId, setInventoryId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { inventory } = route.params;
        setName(inventory.name);
        setQuantity(inventory.quantity);
        setPrice(inventory.price);
        setDescription(inventory.description);
        setInventoryId(inventory._id)
        setLoading(false);
    }, []);

    //Function to Update the Inventory Items by Id
    const updateInventory = async () => {
        setLoading(true);
        const data = {
        name: name,
        quantity: quantity,
        price: price,
        description: description,
        };
    
        await axios.put(`${API_BASE_URL}/inventory/update/${inventoryId}`, data)
        .then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                alert("Inventory Updated Successfully!");
                navigate("InventoryHomeScreen");
            } 
        })
        .catch((err) => {
            console.log(err);
            alert(err.response.data.message);
        })
        .finally(() => setLoading(false));
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
        Update Inventory
                </Text>
                <Text
                    style={{
                    fontFamily: Font["poppins-regular"],
                    fontSize: FontSize.small,
                    maxWidth: "80%",
                    textAlign: "center",
                    }}
                >
                    Update your inventory here
                </Text>
            </View>

            {/* Form to Update Inventory Items */}
            <View
            style={{
                marginVertical: Spacing * 3,
            }}
            >
            <AppTextInput value={name} onChangeText={ (e) => setName(e) } />
            <AppTextInput value={quantity} onChangeText={ (e) => setQuantity(e) } />
            <AppTextInput value={price} onChangeText={ (e) => setPrice(e) } />
            <AppTextInput value={description} onChangeText={ (e) => setDescription(e) } />
            </View>
    
            {/* Button to Update Inventory Item and navigate to the Inventory Home Screen  */}
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
            onPress={() => updateInventory(inventoryId)}
            >
            <Text
                style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
                }}
            >
                Update
            </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
  };

  export default UpdateInventory;