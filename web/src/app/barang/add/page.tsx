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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  filterHarga,
  filterHargaRaw,
  filterKode,
  filterNama,
  formatRibuan,
} from "@/lib/scripts";

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
          </div>
        </section>

        {/* area harga */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_harga">Harga Barang</Label>
            <Input
              type="number"
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
          </div>
        </section>

        {/* area tombol */}
        <section className="sm:justify-start justify-center flex">
          <Button
            className="rounded-full px-2.5 mr-1.5 w-[100px]"
            onClick={() => {
              console.log(`${formKode}, ${formNama}, ${formHarga}, ${formHargaRaw}`);
            }}
          >
            Simpan
          </Button>
          <Button
            className="rounded-full px-2.5 ml-1.5 w-[100px]"
            variant="secondary"
          >
            Batal
          </Button>
        </section>
      </article>
    </>
  );
}
