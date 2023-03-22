import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";

const DocumentHomeScreen = ({ navigation: { navigate } }) => {z
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
                Document Home Page
            </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DocumentHomeScreen;
