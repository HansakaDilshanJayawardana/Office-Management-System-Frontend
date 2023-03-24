import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import axios from "axios";
import { API_BASE_URL } from '../config';
import { Picker } from '@react-native-picker/picker';

const UpdateClient = ({ route, navigation: { navigate } }) => {
    const { client } = route.params;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [nic, setNic] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [clientId, setClientId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFirstName(client.firstName);
        setLastName(client.lastName);
        setGender(client.gender);
        setNic(client.nic);
        setAddress(client.address);
        setMobile(client.mobile);
        setEmail(client.email);
        setClientId(client._id);
        setLoading(false);
    }, []);

    const updateClient = async () => {
        setLoading(true);
        const data = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        nic: nic,
        address: address,
        mobile: mobile,
        email: email
        };
    
        await axios.put(`${API_BASE_URL}/client/update/${clientId}`, data)
        .then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                alert("Client Updated Successfully!");
                navigate("ClientHomeScreen");
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
            <View style={{ padding: Spacing * 2 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        fontSize: FontSize.xLarge,
                        color: Colors.primary,
                        fontFamily: Font["poppins-bold"],
                        marginVertical: Spacing * 3
                        }}>
                        Update Client
                    </Text>
                    <Text style={{
                        fontFamily: Font["poppins-regular"],
                        fontSize: FontSize.small,
                        maxWidth: '80%',
                        textAlign: 'center'
                        }}>
                        Fill in the form with updated Client Details
                    </Text>
                </View>
                <View style={{ marginVertical: Spacing * 3 }}>
                    <AppTextInput value={firstName} onChangeText={(text) => setFirstName(text)} />
                    <AppTextInput value={lastName} onChangeText={(text) => setLastName(text)} />
                    <Picker
                        selectedValue={gender}
                        onValueChange={(value) => setGender(value)}
                        style={{ fontFamily: Font["poppins-regular"],
                        fontSize: FontSize.small, 
                        height: 65, padding: Spacing * 2, 
                        backgroundColor: Colors.lightPrimary, 
                        marginVertical: Spacing,}}
                    >
                        <Picker.Item label="Select Gender" value="" style={{color: Colors.darkText}} />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <AppTextInput value={nic} onChangeText={(text) => setNic(text)} />
                    <AppTextInput value={address} onChangeText={(text) => setAddress(text)} />
                    <AppTextInput value={mobile} onChangeText={(text) => setMobile(text)} />
                    <AppTextInput value={email} onChangeText={(text) => setEmail(text)} />
                </View>
                <TouchableOpacity style={{
                    padding: Spacing * 2,
                    backgroundColor: Colors.primary,
                    marginVertical: Spacing * 3,
                    borderRadius: Spacing,
                    shadowColor: Colors.primary,
                    shadowOffset: {
                    width: 0,
                    height: Spacing
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing
                }}
                onPress={() => updateClient(clientId)}
                >
                    <Text
                        style={{
                        fontFamily: Font["poppins-bold"],
                        color: Colors.onPrimary,
                        textAlign: "center",
                        fontSize: FontSize.large,
                        }}
                    >
                        Update Now
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default UpdateClient;