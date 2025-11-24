import { View, Text } from "react-native";
import React, { useState } from "react";
import { styles } from "@/styles/barang"; // import styles dari file styles/barang.ts
import { TextInput } from "react-native-paper";

export default function BarangAddPage() {
  // buat state
  const [textKode, setTextKode] = useState("");
  const [textNama, setTextNama] = useState("");
  const [textHarga, setTextHarga] = useState("");

  return (
    <View style={{ flex: 1, justifyContent: "flex-start" }}>
      <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        Data barang
      </Text>

      {/* area kode */}
      <TextInput
        label="Kode Barang"
        value={textKode}
        onChangeText={(text) => setTextKode(text)}
      />

      {/* area nama */}
      <TextInput
        label="Nama Baranga"
        value={textNama}
        onChangeText={(text) => setTextNama(text)}
      />

      {/* area harga */}
      {/* area nama */}
      <TextInput
        label="Nama Baranga"
        value={textHarga}
        onChangeText={(text) => setTextHarga(text)}
      />
      {/* area satuan */}
      {/* area tombol */}
    </View>
  );
}
