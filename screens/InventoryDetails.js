import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';

const InventoryDetails = ({ route, navigation: { navigate } }) => {
    const { inventory } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);
    
    //Function to navigate to the Inventory Cards Screen
    const goBack = async () => {
        navigate("InventoryCard");
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
                {inventory.name}
            </Text>

            {/* Details of an individual Inventory Item */}
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Quantity:</Text>
                <Text style={styles.value}>{inventory.quantity}</Text>
                <Text style={styles.title}>Unit Price:</Text>
                <Text style={styles.value}>{inventory.price}</Text>
                <Text style={styles.title}>Description:</Text>
                <Text style={styles.value}>{inventory.description}</Text>
                <Text style={styles.title}>Added Date:</Text>
                <Text style={styles.value}>{inventory.createdAt}</Text>
            </View>
            <View style={styles.header}
            >
                {/* Button to navigate to the Inventory Card Screen */}
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

export default InventoryDetails;