import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { db } from "./src/database/firebaseconfig";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // === Obtener productos con subcolección sabores ===
        const querySnapshot = await getDocs(collection(db, "productos"));
        const data = querySnapshot.docs.map(async (doc) => {
          const productoData = { id: doc.id, ...doc.data() };

          // Subcolección sabores
          const saboresSnapshot = await getDocs(
            collection(db, `productos/${doc.id}/sabores`)
          );
          productoData.sabores = saboresSnapshot.docs.map((subDoc) => ({
            id: subDoc.id,
            ...subDoc.data(),
          }));

          return productoData;
        });
        const productosConSabores = await Promise.all(data);
        setProductos(productosConSabores);

        // === Obtener clientes ===
        const clientesSnapshot = await getDocs(collection(db, "clientes"));
        const clientesData = clientesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClientes(clientesData);
      } catch (error) {
        console.error("Error al obtener documentos: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View>
          <Text style={styles.titulo}>👤 Lista de Clientes</Text>
          {clientes.map((cliente) => (
            <View key={cliente.id} style={styles.cardCliente}>
              <Text style={styles.nombreCliente}>
                {cliente.nombre} {cliente.apellido}
              </Text>
            </View>
          ))}
          <Text style={styles.titulo}>🛒 Lista de Productos</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.cardProducto}>
          <Text style={styles.nombreProducto}>
            {item.nombre} <Text style={styles.precio}>${item.precio}</Text>
          </Text>
          {item.sabores?.length > 0 &&
            item.sabores.map((subItem) => (
              <Text key={subItem.id} style={styles.subItem}>
                • {subItem.sabor}
              </Text>
            ))}
        </View>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#F8F9FA",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#2C3E50",
  },
  cardCliente: {
    backgroundColor: "#E3F2FD",
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
  },
  nombreCliente: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1565C0",
  },
  cardProducto: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  nombreProducto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  precio: {
    fontSize: 16,
    fontWeight: "600",
    color: "#D32F2F",
  },
  subItem: {
    fontSize: 15,
    marginLeft: 10,
    color: "#616161",
  },
});
