"use client";
import Image from "next/image";
import styles from "../barang.module.css";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  filterHarga,
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
} from "@/lib/scripts";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

// display satuan
const satuan = [
  {
    value: "Pcs",
    label: "Pcs",
  },
  {
    value: "Kg",
    label: "Kilogram",
  },
  {
    value: "Unit",
    label: "Unit",
  },
];

export default function AddBarangPage() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // buat state untuk kode
  const [formKode, setFormKode] = useState("");
  const [formNama, setFormNama] = useState("");
  const [formHarga, setFormHarga] = useState("");
  const [formHargaRaw, setFormHargaRaw] = useState(0);

  // buat state untuk cek error (jika ada salah komponen tidak diisi)
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
      kode: formKode === "",
      nama: formNama === "",
      harga: formHarga === "",
      satuan: value === "",
    };

    // update kondisi error setiap komponen
    setError(errorStatus);

    const hasError =
      errorStatus.kode ||
      errorStatus.nama ||
      errorStatus.harga ||
      errorStatus.satuan;

    // jika ada salah satu komponen tidak diisi
    if (hasError) {
      return;
    }

    // jika tidak error (seluruh komponen sudah diisi)
    //  simpan data
    try {
      const response = await axios.post(`http://localhost:3001/api/barang`, {
        kode: formKode,
        nama: formNama,
        harga: formHargaRaw,
        satuan: value,
      });
      // jika success == true
      if (response.data.success) {
        toast.success(response.data.message);

        // kosongkan isi komponen
        setFormKode("");
        setFormNama("");
        setFormHarga("");
        setFormHargaRaw(0);
        setValue("");
      }
      // jika success == false
      else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error(`Gagal Kirim Data !`);
    }
  };

  return (
    <>
      <article className={`${styles.content} grid sm:grid-cols-2 gap-5`}>
        {/* area kode */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_kode">Kode Barang</Label>
            <Input
              type="text"
              id="txt_kode"
              placeholder="Isi Kode Barang"
              maxLength={15}
              value={formKode}
              onChange={(event) => {
                // buat variable untuk filterkode
                const result = filterKode(event.target.value);
                // simpan data input ke state
                setFormKode(result);
              }}
            />

            {/* tampilkan error jika kode barang belum di isi */}
            {error.kode && (
              <Label className={styles.error}>
                <Info size={14} />
                Kode Barang Harus Di Isi!!!
              </Label>
            )}
          </div>
        </section>

        {/* area nama */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_nama">Nama Barang</Label>
            <Input
              type="text"
              id="txt_nama"
              placeholder="Isi Nama Barang"
              maxLength={50}
              value={formNama}
              onChange={(event) => {
                // buat variable untuk filterkode
                const result = filterNama(event.target.value);
                // simpan data input ke state
                setFormNama(result);
              }}
            />

            {/* tampilkan error jika nama barang belum di isis */}
            {error.nama && (
              <Label className={styles.error}>
                <Info size={14} /> Nama Barang Harus Diisi !
              </Label>
            )}
          </div>
        </section>

        {/* area harga */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_harga">Harga Barang</Label>
            <Input
              type="text"
              id="txt_harga"
              placeholder="Isi Harga Barang"
              maxLength={11}
              value={formHarga}
              onChange={(event) => {
                // buat variable untuk filterkode
                const result = formatRibuan(filterHarga(event.target.value));
                // buat variable untuk filterHargaRaw
                const resultRaw = filterHargaRaw(event.target.value);
                // simpan data input ke state
                setFormHarga(result);
                setFormHargaRaw(Number(resultRaw));
              }}
            />
            {/* tampilkan error jika harga barang belum diisi */}
            {error.harga && (
              <Label className={styles.error}>
                <Info size={14} /> Harga Barang Harus Diisi !
              </Label>
            )}
          </div>
        </section>

        {/* area satuan */}
        <section>
          {/* <Select>
            <Label htmlFor="txt_satuan">Satuan Barang</Label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih satuan barang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Pilih Satuan Barang</SelectLabel>
                <SelectItem value="pcd">Pcs</SelectItem>
                <SelectItem value="kg">Kg</SelectItem>
                <SelectItem value="unit">Unit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="txt_satuan">Satuan Barang</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? satuan.find((data_satuan) => data_satuan.value === value)
                        ?.label
                    : "Pilih Satuan Barang..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder="Cari Satuan Barang"
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>Data tidak ditemukan!</CommandEmpty>
                    <CommandGroup>
                      {satuan.map((data_satuan) => (
                        <CommandItem
                          key={data_satuan.value}
                          value={data_satuan.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          {data_satuan.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === data_satuan.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* tampilkan error jika satuan barang belum dipilih */}
            {error.satuan && (
              <Label className={styles.error}>
                <Info size={14} /> Satuan Barang Harus Dipilih !
              </Label>
            )}
          </div>
        </section>

        {/* area tombol */}
        <section className="sm:justify-start justify-center flex">
          <Button
            className="rounded-full px-2.5 mr-1.5 w-[100px]"
            // onClick={() => {
            //   console.log(
            //     `${formKode}, ${formNama}, ${formHarga}, ${formHargaRaw}`
            //   );
            // }}
            onClick={saveData}
          >
            Simpan
          </Button>
          <Button
            className="rounded-full px-2.5 ml-1.5 w-[100px]"
            variant="secondary"
          >
            <Link href="/">Batal</Link>
          </Button>
        </section>
      </article>
    </>
  );
}
