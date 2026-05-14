// frontend/src/pages/public/HomePage.jsx

import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const services = [
  {
    title: 'Développement Logiciel',
    desc: 'Applications web, ERP, CRM ak solisyon sou mezi.',
    icon: '💻',
  },
  {
    title: 'Vente de Matériel',
    desc: 'Ordinateurs, imprimantes, accessoires ak ekipman IT.',
    icon: '🖥️',
  },
  {
    title: 'Caméras de Surveillance',
    desc: 'Installation DVR, IP Camera ak monitoring à distance.',
    icon: '📹',
  },
  {
    title: 'Réseaux Informatiques',
    desc: 'Wi‑Fi Pro, firewall, switch ak maintenance.',
    icon: '🌐',
  },
];

const stats = [
  { label: 'Services actifs', value: '12+' },
  { label: 'Clients satisfaits', value: '250+' },
  { label: 'Projets livrés', value: '140+' },
  { label: 'Support', value: '24/7' },
];

const advantages = [
  'Solutions modernes',
  'Support rapide',
  'Sécurité avancée',
  'Prix accessibles',
  'Accompagnement personnalisé',
  'Technologies récentes',
];

export default function HomePage() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <Navbar />

      <section className='pt-32 pb-24 bg-gradient-to-br from-blue-50 via-white to-slate-100'>
        <div className='max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center'>
          <div>
            <span className='bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm'>
              SOLUTIONS TECHNOLOGIQUES POUR HAÏTI
            </span>

            <h1 className='text-5xl font-bold mt-6 mb-6'>
              Solutions Technologiques pour un avenir meilleur
            </h1>

            <p className='text-gray-600 text-lg mb-8'>
              Développement logiciel, vente de matériel informatique,
              caméras de surveillance ak solutions réseau pour entreprises.
            </p>

            <div className='flex gap-4 flex-wrap'>
              <Link
                to='/services'
                className='bg-blue-700 text-white px-7 py-3 rounded-2xl hover:bg-blue-800 transition'
              >
                Découvrir nos services
              </Link>

              <Link
                to='/contact'
                className='border px-7 py-3 rounded-2xl hover:border-blue-700'
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className='bg-white rounded-3xl shadow-xl p-8'>
            <div className='grid grid-cols-2 gap-4'>
              {stats.map((item)=>(
                <div key={item.label} className='bg-slate-50 p-6 rounded-2xl'>
                  <h3 className='text-3xl font-bold text-blue-700'>
                    {item.value}
                  </h3>
                  <p className='text-gray-500 mt-2'>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='py-24 bg-white'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold'>Nos Services</h2>
            <p className='text-gray-600 mt-4'>
              Solutions adaptées pour entreprises ak particuliers.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {services.map((service)=>(
              <div key={service.title}
              className='bg-slate-50 rounded-3xl p-8 hover:shadow-xl transition'>
                <div className='text-5xl mb-5'>
                  {service.icon}
                </div>
                <h3 className='text-xl font-semibold mb-4'>
                  {service.title}
                </h3>
                <p className='text-gray-600'>
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-24 bg-slate-100'>
        <div className='max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16'>
          <div>
            <h2 className='text-4xl font-bold mb-6'>
              À propos de JT.DACTECH Haiti
            </h2>

            <p className='text-lg text-gray-700 mb-6'>
              JT.DACTECH Haiti est une entreprise spécialisée dans les
              solutions numériques, les infrastructures réseau et les
              services informatiques modernes.
            </p>

            <p className='text-gray-600 mb-8'>
              Notre objectif est d'aider les entreprises à accélérer leur
              transformation digitale grâce à des solutions fiables,
              performantes et sécurisées.
            </p>

            <Link
              to='/contact'
              className='bg-blue-700 text-white px-7 py-3 rounded-2xl'
            >
              En savoir plus
            </Link>
          </div>

          <div className='grid sm:grid-cols-2 gap-5'>
            {advantages.map((item,index)=>(
              <div key={index}
              className='bg-white p-6 rounded-2xl shadow'>
                <div className='text-blue-700 text-2xl mb-3'>✓</div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-24 bg-blue-700 text-center text-white'>
        <div className='max-w-4xl mx-auto px-6'>
          <h2 className='text-5xl font-bold mb-6'>
            Prêt à digitaliser votre entreprise ?
          </h2>

          <p className='mb-10 text-blue-100'>
            Contactez JT.DACTECH Haiti pour une solution adaptée.
          </p>

          <Link
            to='/contact'
            className='bg-white text-blue-700 px-8 py-4 rounded-2xl font-semibold'
          >
            Contactez-nous
          </Link>
        </div>
      </section>

      <footer className='bg-slate-950 text-gray-300 py-14'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h3 className='text-2xl text-white font-bold'>JT.DACTECH Haiti</h3>
          <p className='mt-4'>
            Solutions numériques, développement logiciel ak services IT.
          </p>

          <div className='border-t border-slate-700 mt-8 pt-6 text-sm'>
            © 2026 JT.DACTECH Haiti — Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
