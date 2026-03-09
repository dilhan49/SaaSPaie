import Link from "next/link";
import { Users, FileText, Building2, Settings, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-gray-600 text-sm">Société Client</span>
              </div>
              <div className="h-6 w-px bg-blue-800"></div>
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SaaS Paie</h1>
            </div>
            <nav className="flex space-x-4">
              <Link href="/payslips" className="text-gray-600 hover:text-blue-600 transition-colors">
                Bulletins
              </Link>
              <Link href="/employees" className="text-gray-600 hover:text-blue-600 transition-colors">
                Salariés
              </Link>
              <Link href="/contracts" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contrats
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-blue-600 transition-colors">
                Paramètres
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Gestion de Paie Simplifiée
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une solution complète pour gérer vos bulletins de paie, salariés et contrats en toute conformité avec la législation française.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/payslips" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-200">
            <FileText className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulletins de Paie</h3>
            <p className="text-gray-600 text-sm">
              Générez et consultez tous vos bulletins de paie
            </p>
          </Link>

          <Link href="/employees" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-200">
            <Users className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Salariés</h3>
            <p className="text-gray-600 text-sm">
              Gérez votre base de données salariés
            </p>
          </Link>

          <Link href="/contracts" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-200">
            <Building2 className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contrats</h3>
            <p className="text-gray-600 text-sm">
              Suivez tous vos contrats de travail
            </p>
          </Link>

          <Link href="/settings" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-blue-200">
            <Settings className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Paramètres</h3>
            <p className="text-gray-600 text-sm">
              Configurez vos préférences et options
            </p>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-8 border border-blue-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">0</div>
              <div className="text-gray-600">Bulletins générés</div>
            </div>
            <div>
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">0</div>
              <div className="text-gray-600">Salariés actifs</div>
            </div>
            <div>
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-gray-900">0</div>
              <div className="text-gray-600">Contrats en cours</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
