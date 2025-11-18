import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

// buat variable primsa client
const prisma = new PrismaClient

// buat fungsi get (ambil data)
// export async function GET() {
//     // return new Response("Test")

//      // json
//     return new NextResponse(JSON.stringify({
//          message: "Testing API",
//          success: true
//      }))

// }

export const GET = async() => {
    // return new NextResponse(JSON.stringify({
    //     message: "Test API",
    //     success: true
    // }))

    // ambil data dari tb_aarng

    const data = await prisma.tb_barang.findMany(
        {
        orderBy: {
            kode: "desc"
        },
        // where: {
        //     kode: "B01"
        // }
        }
    );
    // return new NextResponse(JSON.stringify(data));
    return NextResponse.json({
        barang: data
    });

}

// buat service post (simpan data)
export const POST = async (request: NextRequest) => {
  // baca data hasil reques
  // ubah dalam format json
  const data = await request.json();


  // Cek apakah kode barang  sudah pernah ada  / belum
  const check = await prisma.tb_barang.findFirst({
    where: {
      kode: data.kode
    },
    select: {
      kode: true
    }
  })

  // Jika kode barang ditemukan
  if (check) {
    return NextResponse.json({
      message: "Data Barang Gagal Disimpan ! (Kode Sudah Ada)",
      success: false
    })
    
  }

  // Jika kode barang tidak dutemukan 
  //else {
    
    //simpan data sesuai request
  await prisma.tb_barang.create({
    data: {
      kode: data.kode,  
      nama: data.nama ,
      harga: data.harga,
      satuan: data.satuan
    }

  })


  // tampilkan respon
  return NextResponse.json({
    message: "Data Barang Berhhasil Disimpan",
    success: true
  })
  
}