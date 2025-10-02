import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonEliminarProducto from "./BotonEliminarProducto";

const TablaClientes = ({ clientes, eliminarCliente }) => {
  return (
    <ScrollView horizontal style={{ marginTop: 10 }}>
      <View>
        {/* Encabezado */}
        <View style={[styles.fila, styles.encabezado]}>
          <Text style={styles.celda}>Nombre</Text>
          <Text style={styles.celda}>Apellido</Text>
          <Text style={styles.celda}>Teléfono</Text>
          <Text style={styles.celda}>Edad</Text>
          <Text style={styles.celda}>Acciones</Text>
        </View>

        {/* Filas */}
        {clientes.map((cliente) => (
          <View key={cliente.id} style={styles.card}>
            <Text style={styles.celda}>{cliente.nombre}</Text>
            <Text style={styles.celda}>{cliente.apellido}</Text>
            <Text style={styles.celda}>{cliente.telefono}</Text>
            <Text style={styles.celda}>{cliente.edad}</Text>
            <View style={styles.celda}>
              <BotonEliminarProducto id={cliente.id} eliminarProducto={eliminarCliente} />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fila: { flexDirection: "row" },
  encabezado: { backgroundColor: "#f0f0f0", padding: 10, borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  card: { flexDirection: "row", backgroundColor: "#fff", marginVertical: 5, padding: 12, borderRadius: 10, elevation: 2 },
  celda: { minWidth: 80, textAlign: "center", fontSize: 14 },
});

export default TablaClientes;
