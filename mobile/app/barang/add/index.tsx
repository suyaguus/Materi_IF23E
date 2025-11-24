import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/barang"; // import styles dari file styles/barang.ts
import { TextInput } from "react-native-paper";

// testing dorpdown
const data = [
  { label: "Unit", value: "Unit" },
  { label: "Pcs", value: "Pcs" },
  { label: "Kilogram", value: "Kg" },
];

export default function BarangAddPage() {
  // buat state
  const [textKode, setTextKode] = useState("");
  const [textNama, setTextNama] = useState("");
  const [textHarga, setTextHarga] = useState("");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
      }}
    >
      <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        Data barang
      </Text>

      {/* area kode */}
      <TextInput
        label="Kode Barang..."
        style={styles.text_input}
        maxLength={15}
        value={textKode}
        onChangeText={(text) => setTextKode(text)}
      />

      {/* area nama */}
      <TextInput
        label="Nama Barang..."
        style={styles.text_input}
        maxLength={50}
        value={textNama}
        onChangeText={(text) => setTextNama(text)}
      />

      {/* area harga */}
      <TextInput
        label="Harga Barang..."
        style={styles.text_input}
        maxLength={11}
        value={textHarga}
        onChangeText={(text) => setTextHarga(text)}
      />
      {/* area satuan */}
      {/* area tombol */}
    </View>
  );
}
