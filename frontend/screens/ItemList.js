import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ItemList = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching items...');
            const response = await axios.get('http://localhost:3000/items');
            console.log('Items fetched:', response.data);
            setItems(response.data);
            await AsyncStorage.setItem('items', JSON.stringify(response.data));
        } catch (err) {
            console.error('Error fetching items:', err);
            setError('Failed to fetch items');
            Alert.alert('Error', 'Failed to fetch items. Please try again.');
            const cachedItems = await AsyncStorage.getItem('items');
            if (cachedItems) setItems(JSON.parse(cachedItems));
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchItems();
        }, [fetchItems])
    );

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/items/${id}`);
            Alert.alert('Success', 'Item deleted successfully.');
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'Failed to delete item. Please try again.');
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Item {index + 1}</Text>
            <Text style={styles.itemName}>Name: {item.name || 'N/A'}</Text>
            <Text style={styles.itemDescription}>Description: {item.description || 'N/A'}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('EditItem', { item })}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        Alert.alert(
                            'Delete Item',
                            'Are you sure you want to delete this item?',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'Delete', onPress: () => deleteItem(item.id) },
                            ]
                        );
                    }}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    if (loading) return <Text style={styles.centerText}>Loading items...</Text>;    // <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={ renderItem }
                ListEmptyComponent={<Text style={styles.centerText}>No items available</Text>}
            />
            <Button
                title="Add Item"
                onPress={() => navigation.navigate('AddItem')}
            />
            <Button
                title="Refresh Items"
                onPress={fetchItems}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    centerText: {
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      },
      editButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
      },
      deleteButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
});

export default ItemList;