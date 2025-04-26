import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import { db } from './connect';
import { useEffect, useState } from 'react';

export default function App() {
    const [name, setName] = useState([""]);
    const [users, setUsers] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(userList)
    };

    useEffect(()=>{
      fetchUsers();
        }, []);
        const addUser =  async () => {
          if (name.trim()) {
            await addDoc(collection(db, "users"), { name});
            setName("");
            fetchUsers();
          }
        };
    
    //edit data
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, "users", id));
        fetchUsers();
    };

    return (
      <View style={{padding: 20 }}>
        <TextInput
        placeholder='Masukkan nama'
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
        <Button title={selectedId ? "Edit User" : "Tambah User"} onPress={selectedId ? editUser : addUser}/>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
              <TouchableOpacity onPress={() => { setName(item.name); setSelectedId(item.id); }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <Button title='Hapus' color="red" onPress={() => deleteUser(item.id)} />
            </View>
          )}
        ></FlatList>
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
