import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditItem = ({ route, navigation }) => {
    const { item } = route.params;
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);

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

    const updateItem = async () => {
        if (!validateForm()) return;

        try {
            await axios.put(`http://localhost:3000/items/${item.id}`, { name, description });
            Alert.alert('Success', 'Item updated successfully.');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating item:', error);
            Alert.alert('Error', 'Failed to update item. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                multiline
            />
            <Button 
                    title="Submit" 
                    onPress={updateItem}
                    accessibilityLabel="Add item button"
                />
        </View>
    );
};

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
    }
});

export default EditItem;