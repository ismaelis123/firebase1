import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BotonEliminarProducto from "./BotonEliminarProducto";

const TablaProductos = ({ productos, eliminarProducto }) => {
  return (
    <ScrollView horizontal style={{ marginTop: 10 }}>
      <View>
        <View style={[styles.fila, styles.encabezado]}>
          <Text style={styles.celda}>Nombre</Text>
          <Text style={styles.celda}>Precio</Text>
          <Text style={styles.celda}>Acciones</Text>
        </View>

        {productos.map((producto) => (
          <View key={producto.id} style={styles.card}>
            <Text style={styles.celda}>{producto.nombre}</Text>
            <Text style={styles.celda}>{producto.precio}</Text>
            <View style={styles.celda}>
              <BotonEliminarProducto id={producto.id} eliminarProducto={eliminarProducto} />
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
  celda: { minWidth: 100, textAlign: "center", fontSize: 14 },
});

export default TablaProductos;
