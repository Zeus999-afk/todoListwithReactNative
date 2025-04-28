//CRUD Firebase from college

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config";
import { useEffect, useState } from 'react';

export default function App() {
  const [nama, setNama] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Ambil data dari Firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(userList);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Tambah data
  const addUser = async () => {
    if (nama.trim()) {
      await addDoc(collection(db, "users"), { nama });
      setNama("");
      fetchUsers();
    }
  };

  // Edit data
  const editUser = async () => {
    if (selectedId) {
      const userRef = doc(db, "users", selectedId);
      await updateDoc(userRef, { nama });
      setSelectedId(null);
      setNama("");
      fetchUsers();
    }
  };

  // Hapus data
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };


  return (
    <View style={{ padding: 20 }}>
    <TextInput
      placeholder="Masukkan Nama"
      value={nama}
      onChangeText={setNama}
      style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
    />
    <Button title={selectedId ? "Edit User" : "Tambah User"} onPress={selectedId ? editUser : addUser} />

    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1 }}>
          <TouchableOpacity onPress={() => { setNama(item.nama); setSelectedId(item.id); }}>
            <Text>{item.nama}</Text>
          </TouchableOpacity>
          <Button title="Hapus" color="red" onPress={() => deleteUser(item.id)} />
        </View>
      )}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
