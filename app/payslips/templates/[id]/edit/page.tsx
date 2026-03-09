"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save, FileText, Users, Calendar, Euro, Building2, Calculator, Download, Briefcase, Eye, Copy, Trash2 } from "lucide-react";

export default function EditPayslipTemplatePage() {
  const [formData, setFormData] = useState({
    // Informations générales
    templateName: "Standard CDI",
    description: "Maquette pour employés CDI classiques",
    targetPopulation: "all",
    collectiveAgreement: "Syntec",
    
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
    
    // Salariés associés
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

  const handlePreviewPDF = () => {
    // Simuler la génération PDF
    console.log("Génération PDF de la maquette...");
    alert("Génération du PDF en cours... (Fonctionnalité à implémenter)");
  };

  const handleDuplicate = () => {
    // Simuler la duplication
    console.log("Duplication de la maquette...");
    alert("Maquette dupliquée avec succès !");
  };

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette maquette ?")) {
      console.log("Suppression de la maquette...");
      alert("Maquette supprimée !");
    }
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
                <h1 className="text-2xl font-bold text-gray-900">Éditer la Maquette</h1>
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
          {/* Actions Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/payslips/templates" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à la liste</span>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">{formData.templateName}</h2>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handlePreviewPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <Eye className="h-5 w-5" />
                <span>Aperçu PDF</span>
              </button>
              <button
                type="button"
                onClick={handleDuplicate}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Copy className="h-5 w-5" />
                <span>Dupliquer</span>
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Supprimer</span>
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="h-5 w-5" />
                <span>Sauvegarder</span>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Association avec les salariés */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Association avec les salariés</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sélection des salariés</label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="employee1"
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="employee1" className="text-gray-700">Jean Dupont - Développeur</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="employee2"
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="employee2" className="text-gray-700">Marie Martin - Comptable</label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="employee3"
                        className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="employee3" className="text-gray-700">Pierre Bernard - Commercial</label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statistiques</label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">0</div>
                    <div className="text-sm text-gray-600">Salariés associés</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Salariés disponibles</div>
                  </div>
                </div>
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
        </form>
      </main>
    </div>
  );
}
