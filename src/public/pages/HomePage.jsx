import Navbar from "../components/Navbar";
import logo from "../../assets/logo.png"; // adapte chemen an si nesesè

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#050b18] to-[#0a1a33] text-white">

      <Navbar />

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 pt-20">

        <img
          src={logo}
          alt="JT.Dactech Logo"
          className="w-40 md:w-52 drop-shadow-[0_0_25px_rgba(0,180,255,0.6)]"
        />

        <h1 className="text-4xl md:text-6xl font-bold mt-8">
          JT.DACTECH HAÏTI
        </h1>

        <p className="text-blue-300 mt-4 text-lg md:text-xl max-w-2xl">
          Solutions informatiques • Réseaux • Sécurité • Développement logiciel
        </p>

        <div className="flex gap-4 mt-8">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg">
            Explorer Services
          </button>
          <button className="px-6 py-3 border border-blue-500 rounded-xl hover:bg-blue-900">
            Nous Contacter
          </button>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="grid md:grid-cols-3 gap-6 px-10 mt-20">

        <div className="bg-[#0b1220] p-6 rounded-2xl border border-blue-900">
          <h3 className="text-xl font-bold text-blue-400">💻 Développement</h3>
          <p className="text-gray-300 mt-2">
            Applications web, SaaS, ERP, CRM sur mesure.
          </p>
        </div>

        <div className="bg-[#0b1220] p-6 rounded-2xl border border-blue-900">
          <h3 className="text-xl font-bold text-blue-400">📡 Réseaux</h3>
          <p className="text-gray-300 mt-2">
            Installation réseaux informatiques professionnels.
          </p>
        </div>

        <div className="bg-[#0b1220] p-6 rounded-2xl border border-blue-900">
          <h3 className="text-xl font-bold text-blue-400">🎥 Sécurité</h3>
          <p className="text-gray-300 mt-2">
            Caméras de surveillance et systèmes intelligents.
          </p>
        </div>

      </div>

      {/* FOOTER CTA */}
      <div className="text-center mt-20 pb-16">
        <h2 className="text-2xl font-semibold">
          Prêt pou digitalize biznis ou ?
        </h2>

        <p className="text-gray-400 mt-2">
          JT.Dactech Haïti – Software Solutions
        </p>
      </div>

    </div>
  );
}