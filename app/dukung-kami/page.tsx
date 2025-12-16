import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Heart, FileSpreadsheet, CreditCard } from "lucide-react"
import { BackgroundPattern } from "@/components/background-pattern"

export default function DukungKamiPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <BackgroundPattern />
      <MainNav categories={[]} />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Dukung Kami</h1>
            <p className="text-xl text-gray-400">
              Bantu kami melestarikan dan menyebarluaskan buku-buku langka Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <FileSpreadsheet className="w-6 h-6 mr-2 text-primary" />
                  Transparansi Keuangan
                </CardTitle>
                <CardDescription>Lihat bagaimana kami mengelola dana yang diterima</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Kami berkomitmen untuk menjaga transparansi dalam pengelolaan dana. Anda dapat melihat laporan
                  keuangan kami melalui tautan berikut:
                </p>
                <div className="flex items-center">
                  <Link
                    href="https://docs.google.com/spreadsheets/d/1CETy5qH19EtBDfjKw1YByKOtDOxJhebHy7tjre2lwZY/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <div className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>Lihat Laporan Keuangan</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <CreditCard className="w-6 h-6 mr-2 text-primary" />
                  Donasi
                </CardTitle>
                <CardDescription>Dukung kami secara finansial untuk melanjutkan misi ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  Dukungan finansial Anda sangat berarti bagi kami untuk terus mengembangkan dan memelihara proyek
                  Langka.
                </p>
                <div className="flex items-center">
                  <Link
                    href="https://logos-id.myr.id/payme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <div className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>Donasi Sekarang</span>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Terima Kasih atas Dukungan Anda</h2>
            <p className="text-gray-400">
              Setiap kontribusi, besar maupun kecil, membantu kami dalam misi pelestarian dan penyebarluasan buku-buku
              langka Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
