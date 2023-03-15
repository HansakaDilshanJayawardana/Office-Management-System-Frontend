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

const AddInventory = ({ navigation: { navigate } }) => {
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
        <AppTextInput placeholder="Name" />
        <AppTextInput placeholder="Quantity" />
        <AppTextInput placeholder="Price" />
        <AppTextInput placeholder="Description" />
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
        <TouchableOpacity
        onPress={() => navigate("Login")}
        style={{
            padding: Spacing,
        }}
        >
        <Text
            style={{
            fontFamily: Font["poppins-semiBold"],
            color: Colors.text,
            textAlign: "center",
            fontSize: FontSize.small,
            }}
        >
            View Inventory
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddInventory;
