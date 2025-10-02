import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { db } from "../database/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioProductos = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const guardarProducto = async () => {
    if (!nombre || !precio) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: parseFloat(precio),
      });

      setNombre("");
      setPrecio("");
    } catch (error) {
      console.error("Error al registrar producto:", error);
      Alert.alert("Error", "No se pudo registrar el producto");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Productos</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <View style={styles.botonContainer}>
        <Button title="Guardar Producto" color="#4CAF50" onPress={guardarProducto} />
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

export default FormularioProductos;
