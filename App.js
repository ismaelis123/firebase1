import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { db } from "./src/database/firebaseconfig";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

import FormularioProductos from "./src/componentes/FormularioProducto";
import TablaProductos from "./src/componentes/TablaProductos";
import FormularioClientes from "./src/componentes/FormularioClientes";
import TablaClientes from "./src/componentes/TablaClientes";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const unsubscribeProductos = onSnapshot(collection(db, "productos"), (snapshot) => {
      setProductos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribeProductos();
  }, []);

  useEffect(() => {
    const unsubscribeClientes = onSnapshot(collection(db, "clientes"), (snapshot) => {
      setClientes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribeClientes();
  }, []);

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, "productos", id));
  };

  const eliminarCliente = async (id) => {
    await deleteDoc(doc(db, "clientes", id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Productos */}
      <FormularioProductos />
      <TablaProductos productos={productos} eliminarProducto={eliminarProducto} />

      {/* Clientes */}
      <FormularioClientes />
      <TablaClientes clientes={clientes} eliminarCliente={eliminarCliente} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
});
