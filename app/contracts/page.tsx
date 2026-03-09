import Link from "next/link";
import { Plus, FileText, Users, Calendar, Briefcase, Edit, Trash2, Building2 } from "lucide-react";

export default function ContractsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-800">
      {/* Header */}
      <header className="bg-blue-950 shadow-sm border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="text-blue-200 text-sm">Société Client</span>
              </div>
              <div className="h-6 w-px bg-blue-800"></div>
              <Link href="/contracts" className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-300" />
                <h1 className="text-2xl font-bold text-white">Contrats</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                Accueil
              </Link>
              <Link href="/payslips" className="text-blue-200 hover:text-white transition-colors">
                Bulletins
              </Link>
              <Link href="/employees" className="text-blue-200 hover:text-white transition-colors">
                Salariés
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Liste des Contrats</h2>
            <p className="text-blue-200 mt-1">Gérez tous vos contrats de travail</p>
          </div>
          <Link href="/contracts/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Créer un Contrat</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-blue-950 rounded-lg shadow-md p-6 mb-6 border border-blue-900">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Rechercher</label>
              <input
                type="text"
                placeholder="Salarié, type de contrat..."
                className="w-full px-3 py-2 bg-blue-900 border border-blue-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Type de contrat</label>
              <select className="w-full px-3 py-2 bg-blue-900 border border-blue-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tous les types</option>
                <option>CDI</option>
                <option>CDD</option>
                <option>Stage</option>
                <option>Alternance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">Statut</label>
              <select className="w-full px-3 py-2 bg-blue-900 border border-blue-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tous les statuts</option>
                <option>Actif</option>
                <option>En période d'essai</option>
                <option>Terminé</option>
                <option>Renouvelé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="bg-blue-950 rounded-lg shadow-md border border-blue-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-900 border-b border-blue-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Salarié
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Type de contrat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Période
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Poste
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Convention collective
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-800">
                {/* Empty State */}
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Aucun contrat</h3>
                    <p className="text-blue-200 mb-4">
                      Commencez par créer votre premier contrat
                    </p>
                    <Link href="/contracts/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Créer un Contrat
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
