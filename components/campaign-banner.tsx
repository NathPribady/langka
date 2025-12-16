export function CampaignBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
      <div className="bg-black rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-red-500/10 to-yellow-500/10"></div>
        <div className="relative z-10">
          <h2 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4">#BacaBukuLangka</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Bergabunglah dalam gerakan pelestarian warisan intelektual Indonesia
          </p>
        </div>
      </div>
    </div>
  )
}
