import Image from "next/image";
import styles from "../barang.module.css";
import React from "react";
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

export default function AddBarangPage() {
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
            />
          </div>
        </section>

        {/* area satuan */}
        <section>
          <Select>
            <Label htmlFor="txt_satuan">Satuan Barang</Label>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        {/* area tombol */}
        <section>Tombol</section>
      </article>
    </>
  );
}
