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

const AddEmployee = ({ navigation: { navigate } }) => {
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
    Add Employee
            </Text>
            <Text
                style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
                }}
            >
                Add New Employee 
            </Text>
        </View>
        <View
        style={{
            marginVertical: Spacing * 3,
        }}
        >
        <AppTextInput placeholder="Name" />
        <AppTextInput placeholder="Gender" />
        <AppTextInput placeholder="NIC Number" />
        <AppTextInput placeholder="Address" />
        <AppTextInput placeholder="Contact Number" />
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
            View Employee
        </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddEmployee
