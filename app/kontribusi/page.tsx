import { MainNav } from "@/components/main-nav"
import { PenTool, Mail } from "lucide-react"

export default function KontribusiPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav categories={[]} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 flex items-center">
            <PenTool className="mr-4 h-10 w-10 text-[#E91E63]" />
            Bagaimana Cara Berkontribusi
          </h1>
          <div className="space-y-6 text-lg">
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
