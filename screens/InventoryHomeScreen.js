import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { ScrollView } from "react-native-gesture-handler";

const InventoryHomeScreen = ({ navigation: { navigate } }) => {
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
    Inventory Home Screen
            </Text>
            <Text
                style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
                }}
            >
                Welcome to the Inventories
            </Text>
        </View>

        {/* Button to navigate to the Add Inventory Screen */}
        <TouchableOpacity
        onPress={() => navigate("AddInventory")}
        style={{
            padding: Spacing * 2,
            backgroundColor: "#000080",
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
            Add Inventory
        </Text>
        </TouchableOpacity>

        {/* Button to navigate to the Inventory Cards Page */}
        <TouchableOpacity
        onPress={() => navigate("InventoryCard")}
        style={{
            padding: Spacing * 2,
            backgroundColor: "#b0c4de",
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
            View Inventories
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InventoryHomeScreen;
