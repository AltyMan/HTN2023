import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text} from 'react-native';
import axios from 'axios';

const getValue = async (title) => {
    const url = "APIENDPOINT";

    const data = {
        "query": title
    }

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

const AppraisalPage = ({navigation, route}) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchValue = async () => {
            const fetchedValue = await getValue(route.params.title);
            setValue(fetchedValue);
        }
        fetchValue();
    }, [route.params.title]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {value ? (
                    <>
                        <Text style={styles.basetext}>
                            <Text style={styles.boldtext}>C$ {value}</Text>
                        </Text>
                        <Text style={styles.basetext}>
                            <Text>{route.params.title}</Text>
                        </Text>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boldtext: {
        fontWeight: "bold",
    },
    basetext: {
        fontSize: 15,
    },
});

export default AppraisalPage;