"use client";

import React from "react";
import styles from "../barang.module.css";
import Image from "next/image";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/scripts";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { API_BARANG } from "@/lib/strings";

// buat interface
interface ModelBarang {
  id: number;
  kode: string;
  nama: string;
  harga: number;
  satuan: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ViewBarangPage() {
  // buat variabel
  // const nama = "Teknokrat";
  // const motto = "Sang Juara";

  // swr digunakan untuk mengambil data
  const { data, error, isLoading, mutate } = useSWR(
    API_BARANG,
    fetcher
  );

  // buat fungsi untuk hapus data
  const deleteData = async (id: number) => {
    const response = await axios.delete(
      `${API_BARANG}/${id}`
    );

    // tampilkan hasil respon
    // console.log(response.data.message);

    // jika sukses == true
    if (response.data.success) {
      toast.success(response.data.message)
    }

    // jika sukses == false
    else {
      toast.error(response.data.message)
    }

    mutate(data);
  };
  // test
  // jsx ada di bagian return
  return (
    <>
      {/* <div style={{color: 'blue', backgroundColor: '#FFFFFF', padding: "10px"}}>
      Halaman View Barang {${nama} ${motto}}
    </div>

    <div className="tittle">Judul Halaman</div>

    <div className={styles.header}>Header Halaman</div> */}

      {/* header ada di file layout*/}


      {/* tombol tambah */}
      <nav className="mt-2.5 mx flex md:justify-end sm:justify-start justify-center">
        <Link href="/barang/add" className="sm:bg-sky-700 bg-rose-700 text-white py-2.5 px-5 rounded-full">
          Tambah Data
        </Link>
      </nav>

      {/* content */}
      <article className={styles.content}>
        {/* bagian error menggunakan ternary Operator */}
        {error ? (
          <div className="text-center text-black">Gagal Mengambil Data</div>
        ) : (
          <Table>
            <TableHeader>
              {/* bagian desain table #1*/}
              <TableRow>
                <TableHead className="text-center w-[10%] ">Aksi</TableHead>
                <TableHead className="text-center w-[10%] ">
                  Kode Barang
                </TableHead>
                <TableHead className="text-center w-auto ">
                  Nama Barang
                </TableHead>
                <TableHead className="text-center w-[15%] ">
                  Harga Barang
                </TableHead>
                <TableHead className="text-center w-[15%] ">Satuan</TableHead>
              </TableRow>

              {/* bagian desain table #2*/}
              {/* <TableRow>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
          <TableHead className="text-center">#</TableHead>
        </TableRow> */}
            </TableHeader>
            <TableBody>
              {/* bagian data */}
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu
                  </TableCell>
                </TableRow>
              ) : (
                data &&
                data.barang.map((item: ModelBarang) => (
                  // <div key={item.id}>
                  //   <p>{item.nama}</p>
                  // </div>
                  <TableRow key={item.id}>
                    <TableCell className="text-center bg-red-200">
                      {/* buat tombol edit */}
                      <button className={styles.btn_edit}>
                        <Pencil size={15} />
                      </button>

                      {/* buat tombol hapus */}
                      <AlertDialog>
                        <AlertDialogTrigger className={styles.btn_delete}>
                          <Trash size={15} color="white" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Apakah anda yakin ingin menghapus data ini?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Nama barang : {item.nama} ingin dihapus ?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteData(item.id);
                              }}
                            >
                              Ya
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell className="bg-purple-300">{item.kode}</TableCell>
                    <TableCell className="bg-red-200">{item.nama}</TableCell>
                    <TableCell className="text-right bg-purple-300">
                      {formatRupiah(item.harga)}
                    </TableCell>
                    <TableCell className="text-center bg-red-200">
                      {item.satuan}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </article>

      {/* footer ada di file layout*/}
      
    </>
  );
}
