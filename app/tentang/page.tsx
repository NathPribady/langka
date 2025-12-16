"use client"

import { useState, useEffect } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabaseClient"
import { MainNav } from "@/components/main-nav"
import { Book, PenTool, Mail } from "lucide-react"

interface Category {
  id: string
  name: string
}

export default function TentangPage() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data, error } = await supabase.from("categories").select("*")
        if (error) throw error
        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav categories={categories} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 flex items-center">
            <Book className="mr-4 h-10 w-10 text-[#E91E63]" />
            Tentang Kami
          </h1>
          <div className="space-y-6 text-lg">
            <p>
              Projek ini dibuat oleh sekelompok mahasiswa Indonesia yang berkuliah di Columbia University. Kami
              menemukan bahwa banyak buku langka Indonesia di perpustakaan Columbia yang mulai rapuh.
            </p>
            <p>
              Setelah ditelusuri, ternyata buku-buku ini hampir mustahil ditemukan di tempat lain karena banyak alasan.
              Lambat laun, kami menyadari bahwa banyak "sejarah tersembunyi" dan banyak tulisan para intelektual
              Indonesia yang sirna dari peredaran.
            </p>
            <p>
              Dengan projek ini, kami berharap bahwa kita dapat mempelajari kembali harta karun intelektual Indonesia
              yang hampir saja hilang selamanya.
            </p>
            <p>
              Projek "Langka" dibuat, dikembangkan, dan didanai oleh individu yang tidak terafiliasi dengan partai
              politik atau organisasi politik apapun.
            </p>
            <p>
              Harapan kami hanya satu, membuka kembali lembaran sejarah intelektual yang hilang, memperluas diskusi
              akademik tanpa ada penyensoran terhadap ilmu pengetahuan, dan bebaskan buku!
            </p>
            <p>Beberapa situs juga membantu memperlengkapi koleksi buku di sini, beberapa di antaranya adalah:</p>
            <ul className="list-disc list-inside pl-4 space-y-2">
              <li>
                <a href="https://www.catatannusantara.com" className="text-[#E91E63] hover:underline">
                  Catatan Nusantara
                </a>
              </li>
              <li>
                <a href="https://www.ulmwp.org/" className="text-[#E91E63] hover:underline">
                  ULMWP
                </a>
              </li>
              <li>
                <a href="https://tengkuputeh.com/" className="text-[#E91E63] hover:underline">
                  Tengku Puteh
                </a>
              </li>
              <li>
                <a href="https://tapol.org/" className="text-[#E91E63] hover:underline">
                  TAPOL
                </a>
              </li>
            </ul>
            <p>
              Beberapa individu juga telah menyumbangkan koleksi bukunya, kami ucapkan terima kasih kepada Akbar
              Rafsanjani, Lucia Aryani (Lucy) (HPI-01-07-0146), dan kontributor lain yang tidak mau disebutkan namanya.
            </p>
            <h1 className="text-3xl font-bold mt-12 mb-6 flex items-center">
              <PenTool className="mr-4 h-8 w-8 text-[#E91E63]" />
              Bagaimana Cara Berkontribusi
            </h1>
            <p>
              Apabila kamu memiliki atau menemukan buku langka Indonesia, kamu bisa melakukan scan keseluruhan isi buku
              dan mengirimkan file PDF-nya ke email kami. Berikut adalah langkah-langkah untuk berkontribusi:
            </p>
            <ol className="list-decimal list-inside pl-4 space-y-4">
              <li>
                <strong>Scan Buku:</strong> Lakukan scan keseluruhan isi buku dengan kualitas yang baik.
              </li>
              <li>
                <strong>Kirim Email:</strong> Kirimkan file PDF hasil scan ke alamat email:
                <div className="mt-2 p-4 bg-gray-900 rounded-lg flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-[#E91E63]" />
                  <span className="font-mono">dearnathanael at gmail dot com</span>
                </div>
              </li>
              <li>
                <strong>Subjek Email:</strong> Gunakan format subjek email:{" "}
                <span className="font-mono">[SCAN] - Judul Buku</span>
              </li>
            </ol>
            <p className="mt-8">
              Apabila kamu ingin mengubah file PDF menjadi bentuk tulisan seperti yang dapat terlihat di{" "}
              <a href="https://www.marxists.org/archive/malaka/index.htm" className="text-[#E91E63] hover:underline">
                marxists.org
              </a>
              , silakan kirim email dengan subjek:
            </p>
            <div className="mt-2 p-4 bg-gray-900 rounded-lg font-mono">[KONTRIBUSI] Text Editor</div>
          </div>
        </div>
      </div>
    </div>
  )
}
