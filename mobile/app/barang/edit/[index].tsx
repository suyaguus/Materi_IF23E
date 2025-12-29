import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { styles, styles_dropdown } from "@/styles/barang"; // import styles dari file styles/barang.ts
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button, Snackbar, TextInput } from "react-native-paper";
import {
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
} from "@/utils/scripts";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { Strings } from "@/constants/strings";
import CustomHeader from "@/components/ui/custom/CustomHeader";
import CustomButton from "@/components/ui/custom/CustomButton";
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

export default function BarangEditPage() {
  // buat hook untuk ambil nilai slug (id)
  const { index } = useLocalSearchParams();

  // buat state
  const [textKode, setTextKode] = useState("");
  const [textNama, setTextNama] = useState("");
  const [textHarga, setTextHarga] = useState("");
  const [textHargaRaw, setTextHargaRaw] = useState(0);
  // buat state untuk satuan
  const [textSatuan, setTextSatuan] = useState(null);

  // bagian useState untuk satuan
  const [value, setValue] = useState(null);

  // buat useRef untuk focus ke TextInput Kode Barang
  const refFocus = useRef<any>(null);

  // buat state untuk snackbar
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  // buat useRef untuk menampilkan respon simpan data
  const messageResponse = useRef("");

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
      satuan: value === null,
    };

    // update kondisi error setiap komponen
    setError(errorStatus);

    // const hasError =
    //   errorStatus.kode ||
    //   errorStatus.nama ||
    //   errorStatus.harga ||
    //   errorStatus.satuan;

    const hasError = Object.values(errorStatus).includes(true);

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

  // buat fungsi ambil data berdasarkan id
  const detailData = useCallback(async () => {
    try {
      // panggil service get Detail Data
      const response = await axios.get(`${Strings.api_barang}/${index}`);

      // jika data barang ditemukan
      if (response.data.barang) {
        // tampilkan data barang ke masing masing komponen
        setTextKode(response.data.barang.kode);
        setTextNama(response.data.barang.nama);
        setTextHargaRaw(Number(response.data.barang.harga));
        setTextHarga(formatRibuan(response.data.barang.harga));
        setTextSatuan(response.data.barang.satuan);
      }

      // jika data barang tidak ditemukan
      else {
        // tampilkan snackbar
        router.replace("/barang");
      }
    } catch (error) {
      console.log("Gagal Amnil Data!");
    }
  }, [index]);

  // panggil fungsi ambil data
  useEffect(() => {
    detailData();
  }, [detailData]);

  // buat fungsi edit data
  const editData = async () => {};

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
      <CustomHeader title="Ubah Barang" iconBack={true} onPress={() => router.replace("/barang")} />

      {/* <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        <MaterialIcons
          style={styles.header_title}
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => {
            router.back();
          }}
        />
        Halaman Ubah Data barang
      </Text> */}

      {/* area kode */}
      <TextInput
        label="Kode Barang..."
        style={styles.text_input}
        maxLength={15}
        value={textKode}
        ref={refFocus}
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
        keyboardType="number-pad"
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
        <CustomButton title="Simpan" onPress={saveData} icon="pencil"/>
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
