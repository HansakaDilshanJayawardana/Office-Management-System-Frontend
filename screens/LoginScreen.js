import {React} from "react";
import {
  StyleSheet,
  Text,
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
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '../config';


const LoginScreen = ({ navigation: { navigate } }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Function to Login 
  const login = async () => {
    const data = {
      username: email,
      password: password,
    };
 

    console.log(API_BASE_URL+'user/login');
    await axios.post(API_BASE_URL+'/user/login', data)
    .then((res) => {
      console.log(res.data);
      if(res.data.success === true){
        navigate("HomeScreen")
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
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
            Login Here
          </Text>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>

        {/* Login Form */}
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput placeholder="Username" onChangeText={ (e) => setEmail(e) } />
          <AppTextInput placeholder="Password" onChangeText={(e) => setPassword(e)}/>
        </View>

        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </View>

        {/* Button to Login and navigate to the Home Screen */}
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
          onPress={() => login()}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>

        {/* Button to navigate to thr Register page */}
        <TouchableOpacity
          onPress={() => navigate("Register")}
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
            Create new account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* Button to continue with google */}
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
            name="logo-google"
            color={Colors.text}
            size={Spacing * 2}
          />
        </TouchableOpacity>

        {/* Button to continue with Apple ICloud */}
        <TouchableOpacity
          style={{
            padding: Spacing,
            backgroundColor: Colors.gray,
            borderRadius: Spacing / 2,
            marginHorizontal: Spacing,
          }}
        >
          <Ionicons
                name="logo-apple"
                color={Colors.text}
                size={Spacing * 2}
            />
            </TouchableOpacity>

            {/* Button to continue with Facebook */}
            <TouchableOpacity
            style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
            }}
            >
            <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
            />
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});