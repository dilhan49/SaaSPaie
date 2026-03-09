"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save, FileText, Users, Calendar, Euro, Building2, Calculator, Download, Briefcase, Plus } from "lucide-react";

export default function CreatePayslipTemplatePage() {
  const [formData, setFormData] = useState({
    // Informations générales
    templateName: "",
    description: "",
    targetPopulation: "all",
    collectiveAgreement: "",
    
    // Structure du bulletin
    showEmployerInfo: true,
    showEmployeeInfo: true,
    showContractInfo: true,
    showWorkingTime: true,
    
    // Salaire brut
    baseSalaryEnabled: true,
    overtimeEnabled: true,
    benefitsEnabled: true,
    bonusesEnabled: true,
    
    // Cotisations sociales
    socialContributions: {
      healthInsurance: { enabled: true, rate: "7.50", label: "Assurance maladie" },
      unemploymentInsurance: { enabled: true, rate: "2.40", label: "Assurance chômage" },
      retirement: { enabled: true, rate: "10.55", label: "Retraite CNAV" },
      csg: { enabled: true, rate: "9.20", label: "CSG" },
      crds: { enabled: true, rate: "0.50", label: "CRDS" },
      pension: { enabled: false, rate: "0.86", label: "AGIRC-ARRCO" },
      accident: { enabled: true, rate: "1.00", label: "Accidents du travail" },
      contributionSolidarity: { enabled: false, rate: "0.30", label: "Contribution solidarité" }
    },
    
    // Impôts
    incomeTaxEnabled: true,
    
    // Avantages spécifiques
    mealTicketsEnabled: false,
    transportEnabled: false,
    healthInsuranceEnabled: false,
    retirementPlanEnabled: false,
    
    // Congés
    leaveManagementEnabled: true,
    
    // Notes et mentions
    customNotesEnabled: false,
    legalMentionsEnabled: true,
    
    // Association avec les salariés
    associatedEmployees: [] as string[],
    
    // Design
    templateStyle: "standard"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: checked
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else if (name.includes('.')) {
      const [parent, child, grandChild] = name.split('.');
      if (grandChild) {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: {
              ...(prev as any)[parent][child],
              [grandChild]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...(prev as any)[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données de la maquette:", formData);
    // Ici vous ajouterez la logique pour sauvegarder la maquette
  };

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
              <div className="h-6 w-px bg-blue-200"></div>
              <Link href="/payslips/templates" className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Nouvelle Maquette</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/employees" className="text-gray-600 hover:text-blue-600 transition-colors">
                Salariés
              </Link>
              <Link href="/contracts" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contrats
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Boutons d'action */}
          <div className="flex justify-between items-center">
            <Link href="/payslips/templates" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>Retour à la liste</span>
            </Link>
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-blue-600 text-gray-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Créer la maquette</span>
              </button>
            </div>
          </div>

          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Informations générales</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la maquette *</label>
                <input
                  type="text"
                  name="templateName"
                  value={formData.templateName}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Standard CDI"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Population cible *</label>
                <select
                  name="targetPopulation"
                  value={formData.targetPopulation}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les salariés</option>
                  <option value="cadres">Cadres</option>
                  <option value="non-cadres">Non cadres</option>
                  <option value="commercial">Commerciaux</option>
                  <option value="technique">Technique</option>
                  <option value="stage">Stagiaires</option>
                  <option value="alternance">Alternants</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Convention collective</label>
                <select
                  name="collectiveAgreement"
                  value={formData.collectiveAgreement}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Syntec">Syntec</option>
                  <option value="HCR">HCR</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Industrie">Industrie</option>
                  <option value="BTP">BTP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Description de la maquette..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Structure du bulletin */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Structure du bulletin</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="showEmployerInfo"
                  checked={formData.showEmployerInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Infos employeur</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="showEmployeeInfo"
                  checked={formData.showEmployeeInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Infos salarié</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="showContractInfo"
                  checked={formData.showContractInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Infos contrat</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="showWorkingTime"
                  checked={formData.showWorkingTime}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Temps de travail</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="leaveManagementEnabled"
                  checked={formData.leaveManagementEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Gestion des congés</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="legalMentionsEnabled"
                  checked={formData.legalMentionsEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Mentions légales</label>
              </div>
            </div>
          </div>

          {/* Salaire brut */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Euro className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Éléments du salaire brut</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="baseSalaryEnabled"
                  checked={formData.baseSalaryEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Salaire de base</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="overtimeEnabled"
                  checked={formData.overtimeEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Heures supplémentaires</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="benefitsEnabled"
                  checked={formData.benefitsEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Avantages en nature</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="bonusesEnabled"
                  checked={formData.bonusesEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Primes</label>
              </div>
            </div>
          </div>

          {/* Cotisations sociales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Cotisations sociales</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(formData.socialContributions).map(([key, contribution]) => (
                <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name={`socialContributions.${key}.enabled`}
                      checked={contribution.enabled}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{contribution.label}</div>
                      <div className="text-xs text-gray-500">Taux: {contribution.rate}%</div>
                    </div>
                  </div>
                  <input
                    type="text"
                    name={`socialContributions.${key}.rate`}
                    value={contribution.rate}
                    onChange={handleInputChange}
                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="%"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Avantages spécifiques */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Avantages spécifiques</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="mealTicketsEnabled"
                  checked={formData.mealTicketsEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Tickets restaurant</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="transportEnabled"
                  checked={formData.transportEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Indemnité transport</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="healthInsuranceEnabled"
                  checked={formData.healthInsuranceEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Assurance santé</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="retirementPlanEnabled"
                  checked={formData.retirementPlanEnabled}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-gray-700">Plan d'épargne</label>
              </div>
            </div>
          </div>

          {/* Association avec les salariés */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Association avec les salariés</h2>
            </div>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun salarié disponible</h3>
              <p className="text-gray-600 mb-4">
                Créez d'abord des salariés pour pouvoir les associer à cette maquette
              </p>
              <Link
                href="/employees/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Créer un salarié</span>
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
