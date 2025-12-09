import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { styles } from "@/styles/barang"; // import styles dari file styles/barang.ts
import { Button, Snackbar, TextInput } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dropdown } from "react-native-element-dropdown";
import { Strings } from "@/constants/strings";
import {
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
} from "@/utils/scripts";
import axios from "axios";
import { router } from "expo-router";

// testing dorpdown
const data = [
  { label: "Unit", value: "Unit" },
  { label: "Pcs", value: "Pcs" },
  { label: "Kilogram", value: "Kg" },
];

// buat interface untuk dropdown
interface DropdownItem {
  label: string;
  value: number;
}

export default function BarangAddPage() {
  // buat state
  const [textKode, setTextKode] = useState("");
  const [textNama, setTextNama] = useState("");
  const [textHarga, setTextHarga] = useState("");
  const [textHargaRaw, setTextHargaRaw] = useState(0);
  // buat state untuk satuan
  const [textSatuan, setTextSatuan] = useState(null);

  // bagian useState untuk satuan
  const [value, setValue] = useState(null);

  // buat state untuk snackbar
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  // buat useRef untuk menampilkan respon simpan data
  const messageResponse = useRef("");

  // buat useRef untuk focus ke TextInput Kode Barang
  const refFocus = useRef<any>(null);

  // buat fungsi untuk hide snackbar
  const hideSnackbar = () => setVisibleSnackbar(false);

  // buat state untuk cek error (jika ada salah komponen tidak di isi)
  // bentuk state berupa objek
  const [error, setError] = useState<{
    kode: boolean;
    nama: boolean;
    harga: boolean;
    satuan: boolean;
  }>({
    kode: false,
    nama: false,
    harga: false,
    satuan: false,
  });

  // buat fungsi untuk simpan data
  const saveData = async () => {
    // buat object errorStatus untuk menampung kondisi error setiap komponen
    const errorStatus = {
      kode: textKode === "",
      nama: textNama === "",
      harga: textHarga === "",
      satuan: textSatuan === null,
    };

    // update kondisi error setiap komponen
    setError(errorStatus);

    const hasError =
      errorStatus.kode ||
      errorStatus.nama ||
      errorStatus.harga ||
      errorStatus.satuan;

    // jika ada salah satu komponen tidak di isi
    if (hasError) {
      return;
    }

    // jika tidak error
    try {
      const response = await axios.post(Strings.api_barang, {
        kode: textKode,
        nama: textNama,
        harga: textHargaRaw,
        satuan: value,
      });

      // jika success == true
      if (response.data.success) {
        // reset form
        setTextKode("");
        setTextNama("");
        setTextHarga("");
        setTextHargaRaw(0);
        setTextSatuan(null);

        // pilih salah 1 opsi berikut setelah simpan data berhasil
        // 1. hilangkan focus
        // Keyboard.dismiss();
        // 2. alihkan focus ke TextInput Kode Barang
        refFocus.current.focus();
      }
      // isi respon
      messageResponse.current = response.data.message;
    } catch {
      // jika terjadi error
      // isi respon
      messageResponse.current = "Gagal Kirim Data !";
    } finally {
      // tampilkan snackbar
      setVisibleSnackbar(true);
    }
  };

  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles_dropdown.item}>
        <Text style={styles_dropdown.textItem}>{item.label}</Text>
        {item.value === textSatuan && (
          // <AntDesign
          //   style={styles.icon}
          //   color="black"
          //   name="Safety"
          //   size={20}
          // />
          <MaterialIcons
            name="search"
            style={styles_dropdown.icon}
            size={24}
            color="black"
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: "#fff",
      }}
    >
      <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        Halaman Tambah Data barang
      </Text>

      {/* area kode */}
      <TextInput
        label="Kode Barang..."
        style={styles.text_input}
        maxLength={15}
        value={textKode}
        onChangeText={(text) => {
          const result = filterKode(text);
          setTextKode(result);
        }}
      />

      {/* tampilkan error jika kode barang belum di isi */}
      {error.kode && (
        <View style={styles.error_area}>
          <MaterialIcons name="info-outline" size={16} color="#ff0000" />
          <Text style={styles.error}>Kode Barang Harus Di Isi !</Text>
        </View>
      )}

      {/* area nama */}
      <TextInput
        label="Nama Barang..."
        style={styles.text_input}
        maxLength={50}
        value={textNama}
        onChangeText={(text) => {
          const result = filterNama(text);
          setTextNama(result);
        }}
      />

      {/* tampilkan error jika nama barang belum diisi */}
      {error.nama && (
        <View style={styles.error_area}>
          <MaterialIcons name="info-outline" size={16} color="#ff0000" />
          <Text style={styles.error}>Nama Barang Harus Diisi !</Text>
        </View>
      )}

      {/* area harga */}
      <TextInput
        label="Harga Barang..."
        style={styles.text_input}
        maxLength={11}
        value={textHarga}
        onChangeText={(text) => {
          const result = formatRibuan(text);
          const result_raw = filterHargaRaw(text);
          setTextHarga(result);
          setTextHargaRaw(Number(result_raw));
        }}
      />

      {/* tampilkan error jika harga barang belum diisi */}
      {error.harga && (
        <View style={styles.error_area}>
          <MaterialIcons name="info-outline" size={16} color="#ff0000" />
          <Text style={styles.error}>Harga Barang Harus Diisi !</Text>
        </View>
      )}

      {/* area satuan */}
      <View style={styles.satuan_area}>
        <Dropdown
          style={styles_dropdown.dropdown}
          placeholderStyle={styles_dropdown.placeholderStyle}
          selectedTextStyle={styles_dropdown.selectedTextStyle}
          inputSearchStyle={styles_dropdown.inputSearchStyle}
          iconStyle={styles_dropdown.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Pilih Satuan"
          searchPlaceholder="Pilih..."
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            // <AntDesign
            //   style={styles_dropdown.icon}
            //   color="black"
            //   name="Safety"
            //   size={20}
            // />
            <MaterialIcons
              name="keyboard-arrow-down"
              style={styles_dropdown.icon}
              size={24}
              color="black"
            />
          )}
          renderItem={renderItem}
        />
      </View>

      {/* tampilkan error jika satuan barang belum diisi */}
      {error.satuan && (
        <View style={styles.error_area}>
          <MaterialIcons name="info-outline" size={16} color="#ff0000" />
          <Text style={styles.error}>Satuan Barang Harus Dipilih !</Text>
        </View>
      )}
      
      {/* area tombol */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          gap: 10,
        }}
      >
        <Button icon="check" mode="contained" onPress={saveData}>
          Simpan
        </Button>
        <Button icon="close" mode="outlined" onPress={() => router.back()}>
          Batal
        </Button>
      </View>

      {/* area snackbar (respon simpan data) */}
      <Snackbar visible={visibleSnackbar} onDismiss={hideSnackbar}>
        {messageResponse.current}
      </Snackbar>
    </View>
  );
}

const styles_dropdown = StyleSheet.create({
  dropdown: {
    margin: 0,
    height: 50,
    backgroundColor: "white",
    borderRadius: 0,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
