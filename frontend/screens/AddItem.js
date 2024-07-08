import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const AddItem = ({ navigation }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert("Validation Error", "Name is required");
            return false;
        }
        if (!description.trim()) {
            Alert.alert("Validation Error", "Description is required");
            return false;
        }
        return true;
    };

    const addItem = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            console.log("Adding item: ", { name, description });
            const response = await axios.post("http://localhost:3000/items", { name, description });
            console.log("Add item response: ", response.data);
            Alert.alert("Success", "Item added successfully", [
                { 
                    text: "OK", 
                    onPress: () => {
                        navigation.goBack()
                        navigation.navigate("ItemList", { refresh: true});
                    }
                }
            ]);
        } catch (error) {
            console.error("Error adding item: ", error);
            Alert.alert("Error", "Failed to add item. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                accessibilityLabel="Name input"
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                accessibilityLabel="Description input"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button 
                    title="Submit" 
                    onPress={addItem}
                    accessibilityLabel="Add item button"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default AddItem;