import Link from 'next/link';

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-green-50 to-white bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/farm-bg.jpg')", // ✅ Replace with your image path
      }}
    >
      <header className="bg-green-600 text-white py-6 shadow-lg bg-opacity-90">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Rythu Saathi - రైతు సాథి</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 text-center bg-white/70 rounded-2xl shadow-md mt-10">
        <h2 className="text-5xl font-bold mb-6">Welcome to Rythu Saathi</h2>
        <p className="text-2xl mb-8 font-telugu">రైతు సాథి - మీ వ్యవసాయ మిత్రుడు</p>
        <h1 style={{fontSize:20}}>  Ask your queries in multiple languages⬇️ </h1>

        <div className="grid md:grid-cols-3 gap-6 my-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-5xl mb-3 font-telugu">తె</div>
            <h3 className="font-bold text-xl">తెలుగు</h3>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-5xl mb-3 font-hindi">हि</div>
            <h3 className="font-bold text-xl">हिन्दी</h3>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-5xl mb-3">En</div>
            <h3 className="font-bold text-xl">English</h3>
          </div>
        </div>

        <Link
          href="/chat"
          className="inline-block bg-green-600 text-white px-10 py-5 rounded-xl text-xl font-semibold hover:bg-green-700 transition"
        >
          Start Chatting 💬
        </Link>
      </div>
    </main>
  );
}
