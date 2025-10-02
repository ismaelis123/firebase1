import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioClientes = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const guardarCliente = async () => {
    if (!nombre || !apellido || !telefono || !edad) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "clientes"), {
        nombre,
        apellido,
        telefono,
        edad: parseInt(edad),
      });
      setNombre("");
      setApellido("");
      setTelefono("");
      setEdad("");
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      Alert.alert("Error", "No se pudo registrar el cliente");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Clientes</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <View style={styles.botonContainer}>
        <Button title="Guardar Cliente" color="#4CAF50" onPress={guardarCliente} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", borderRadius: 10, marginBottom: 20, elevation: 3 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 12, padding: 12, borderRadius: 8, fontSize: 16 },
  botonContainer: { marginTop: 10, borderRadius: 8, overflow: "hidden" },
});

export default FormularioClientes;
