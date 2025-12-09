import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { Strings } from "@/constants/strings";
import { formatRupiah } from "@/utils/scripts";
import { router } from "expo-router";
import { styles } from "@/styles/barang";

export default function BarangViewPage() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [visibleSnackbar, setVisibleSnackbar] = useState(false);

  const showSnackbar = () => setVisibleSnackbar(true);

  const hideSnackbar = () => setVisibleSnackbar(false);

  // buat react hook (useState)
  const [data, setData] = useState<
    { id: number; nama: string; kode: string; harga: number; satuan: string }[]
  >([]);

  // State untuk Pencarian
  const [search, setSearch] = useState("");

  // State filter data pencarian
  const [filter, setFilter] = useState<typeof data>([]);

  // state untuk simpan id barang
  const [id, setId] = useState(0);

  // State untuk loading
  const [loading, setLoading] = useState(false);

  // buat useRef untuk menampilkan pesan hapus data
  const message = useRef("");
  // buat useRef untuk menampilkan respon hapus data
  const messageResponse = useRef("");

  // buat react hook (useEffect)
  useEffect(() => {
    getDataBarang();

    // jika pencarian data diisi
    if (search.toLowerCase().trim() !== "") {
      // lakukan pencarian dan filter data
      // berdasarkan nama barang / harga barang
      const filter_data = data.filter((item) => {
        // filter nama dengan mengabaikan spasi
        const nama = item.nama.replace(/\s+/g, "").toLowerCase();
        // filter harga tanpa mengabaikan spasi
        // const harga = item.harga.toString().toLowerCase();
        const harga = String(item.harga).toLowerCase();

        // proses filter data
        return (
          nama.includes(search.replace(/\s+/g, "").toLowerCase()) ||
          harga.includes(search.toLowerCase())
        );
      });
      // tampilkan data barang berdasarkan pencarian
      setFilter(filter_data);
    }
    // jika pencarian data tidak diisi
    else {
      // tampilkan seluruh data barang
      setFilter(data);
    }
  }, [search, data]);

  // koneksi api dengan axios
  // buat fungsi koneksi api dengan axios
  const getDataBarang = async () => {
    try {
      setLoading(true);
      const response = await axios.get(Strings.api_barang); //membuat constans strings untuk api
      setData(response.data.barang);
    } catch (error) {
      console.error("Error fetching data:", error);
      messageResponse.current = "Gagal mengambil data";
      showSnackbar();
    } finally {
      setLoading(false);
    }
  };

  // buat pesan untuk menghapus data
  const setMessage = (text: string) => {
    message.current = "Data barang : " + text + " ingin dihapus ?";
  };

  // buat fungsi untuk hapus data
  const deleteDataBarang = async () => {
    try {
      const response = await axios.delete(
        `${Strings.api_barang}/${id}` // contans strings untuk api
      );

      // tampilkan response (message)
      messageResponse.current = response.data.message;
      showSnackbar();

      // Refresh data setelah berhasil hapus
      await getDataBarang();
    } catch (error) {
      console.error("Error deleting data:", error);
      messageResponse.current = "Gagal menghapus data";
      showSnackbar();
    } finally {
      setLoading(false);
      hideDialog();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", width: "100%" }}>
      {/* Area header */}
      <View style={styles.header_area}>
        <Text style={styles.header_title}>View Data Barang</Text>
      </View>

      {/* area pencarian */}
      <TextInput
        label="Cari Data Barang"
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="search"
                size={24}
                color="black"
                onPress={() => console.log("Search")}
              />
            )}
          />
        }
        style={{ fontSize: 16, backgroundColor: "#fff" }}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {/* area content */}
      <FlatList
        style={{ backgroundColor: "#a51c31" }}
        data={filter}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.nama}
              subtitle={formatRupiah(item.harga)}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            />
            <Card.Actions>
              <Button
                style={{ backgroundColor: "#a51c31" }}
                onPress={() => {
                  setId(item.id);
                  setMessage(item.nama);
                  showDialog();
                }}
                disabled={loading}
              >
                <MaterialIcons name="delete" size={24} color="white" />
              </Button>
              <Button
                style={{ backgroundColor: "white" }}
                onPress={() => console.log("Edit")}
              >
                <MaterialIcons name="edit" size={24} color="black" />
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* area FAB */}
      <FAB
        icon="plus"
        color="#fff"
        mode="flat"
        style={styles.fab}
        onPress={() => router.push("/barang/add")}
        // digunakan untuk kembali ke halaman home di device onPress={() => router.replace("/barang/add")}
      />

      {/* area dialog hapus data */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Informasi</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message.current}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteDataBarang}>Ya</Button>
            <Button onPress={hideDialog}>Tidak</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* area snackbar (respon dari hapus data) */}
      <Snackbar visible={visibleSnackbar} onDismiss={hideSnackbar}>
        {messageResponse.current}
      </Snackbar>
    </View>
  );
}

