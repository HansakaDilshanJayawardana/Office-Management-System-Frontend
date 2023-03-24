import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../components/AppTextInput";
import { ScrollView } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation: { navigate } }) => {
  return (
    <ScrollView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <ImageBackground
            style={{
              height: height / 2,
            }}
            resizeMode="contain"
            source={require("../assets/images/officee.jpg")}
          />
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
                App Home Page
            </Text>
            
            <Text
            style={{
                fontSize: FontSize.small,
                fontFamily: Font["poppins-bold"],
                marginVertical: Spacing * 3,
            }}
            >
                Swipe to right for main menu --
            </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
