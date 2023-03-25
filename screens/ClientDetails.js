import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';

const ClientDetails = ({ route, navigation: { navigate } }) => {
    const { client } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);
    
    // Back Navigation
    const goBack = async () => {
        navigate("ViewAllClients");
    }
    
    return (
        <View style={styles.container}>
            {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
            <>
            <Text style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,
                fontFamily: Font["poppins-bold"],
                marginVertical: Spacing * 3,
                textAlign: 'center',
            }}>
                {client.firstName} {client.lastName}
            </Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Gender:</Text>
                <Text style={styles.value}>{client.gender}</Text>
                <Text style={styles.title}>NIC:</Text>
                <Text style={styles.value}>{client.nic}</Text>
                <Text style={styles.title}>Address:</Text>
                <Text style={styles.value}>{client.address}</Text>
                <Text style={styles.title}>Contact:</Text>
                <Text style={styles.value}>{client.mobile}</Text>
                <Text style={styles.title}>Email:</Text>
                <Text style={styles.value}>{client.email}</Text>
                <Text style={styles.title}>Registered Date:</Text>
                <Text style={styles.value}>{client.registerDate}</Text>
            </View>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() => goBack()}
                style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
            </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        height: Spacing * 8,
        flexDirection: 'row',
        paddingHorizontal: Spacing * 3,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        left: Spacing * 2,
    },
    backButtonText: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.small,
        color: Colors.primary,
    },
    detailsContainer: {
        flex: 1,
        padding: Spacing * 3,
    },
    title: {
        fontFamily: Font['poppins-bold'],
        fontSize: FontSize.medium,
        color: Colors.text,
        marginBottom: Spacing,
    },
    value: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.medium,
        color: Colors.text,
        marginBottom: Spacing * 2,
    },
});

export default ClientDetails;