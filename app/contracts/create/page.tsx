"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save, Users, FileText, Briefcase, Calendar, Building2, Euro, Clock, AlertCircle, MapPin } from "lucide-react";

export default function CreateContractPage() {
  const [formData, setFormData] = useState({
    // Salarié
    employeeId: "",
    
    // Informations générales
    contractType: "CDI",
    contractNumber: "",
    startDate: "",
    endDate: "",
    trialPeriod: "",
    trialPeriodEndDate: "",
    
    // Poste et rémunération
    position: "",
    department: "",
    workLocation: "",
    weeklyHours: "35",
    grossSalary: "",
    grossHourlyRate: "",
    
    // Convention collective
    collectiveAgreement: "",
    agreementCode: "",
    socialSecurityCategory: "A",
    
    // Classification
    qualificationLevel: "",
    coefficient: "",
    positionLevel: "",
    
    // Temps de travail
    workSchedule: "",
    breaks: "",
    overtimePolicy: "",
    
    // Avantages
    benefits: "",
    mealTickets: "",
    transportAllowance: "",
    healthInsurance: "",
    retirementPlan: "",
    
    // Congés
    leaveDays: "25",
    rttdays: "",
    
    // Préavis
    noticePeriodEmployee: "",
    noticePeriodEmployer: "",
    
    // Autres clauses
    nonCompetition: false,
    mobility: false,
    confidentiality: false,
    
    // Documents
    contractFile: "",
    
    // Notes
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données du contrat:", formData);
    // Ici vous ajouterez la logique pour sauvegarder le contrat
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
              <Link href="/contracts" className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Nouveau Contrat</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/payslips" className="text-gray-600 hover:text-blue-600 transition-colors">
                Bulletins
              </Link>
              <Link href="/employees" className="text-gray-600 hover:text-blue-600 transition-colors">
                Salariés
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
            <Link href="/contracts" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
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
                <span>Enregistrer le contrat</span>
              </button>
            </div>
          </div>

          {/* Salarié */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Users className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Salarié concerné</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Salarié *</label>
                <select
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Aucun salarié disponible</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Numéro de contrat</label>
                <input
                  type="text"
                  name="contractNumber"
                  value={formData.contractNumber}
                  onChange={handleInputChange}
                  placeholder="Ex: CDI-2024-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Informations générales</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Type de contrat *</label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Date de début *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Période d'essai</label>
                <input
                  type="text"
                  name="trialPeriod"
                  value={formData.trialPeriod}
                  onChange={handleInputChange}
                  placeholder="Ex: 3 mois"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Fin de période d'essai</label>
                <input
                  type="date"
                  name="trialPeriodEndDate"
                  value={formData.trialPeriodEndDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Poste et rémunération */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Poste et rémunération</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Poste *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Département</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Direction">Direction</option>
                  <option value="RH">Ressources Humaines</option>
                  <option value="Technique">Technique</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Production">Production</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Lieu de travail</label>
                <input
                  type="text"
                  name="workLocation"
                  value={formData.workLocation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Heures hebdomadaires</label>
                <input
                  type="number"
                  name="weeklyHours"
                  value={formData.weeklyHours}
                  onChange={handleInputChange}
                  min="1"
                  max="48"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Salaire brut mensuel *</label>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  placeholder="€"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Taux horaire brut</label>
                <input
                  type="number"
                  name="grossHourlyRate"
                  value={formData.grossHourlyRate}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="€/h"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Convention collective */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Convention collective</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Convention collective *</label>
                <select
                  name="collectiveAgreement"
                  value={formData.collectiveAgreement}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="Syntec">Syntec (Bureaux d'études techniques)</option>
                  <option value="HCR">HCR (Hôtels Cafés Restaurants)</option>
                  <option value="Commerce">Commerce de détail et de gros</option>
                  <option value="Industrie">Industrie métallurgique</option>
                  <option value="BTP">Bâtiment et travaux publics</option>
                  <option value="Transports">Transports routiers</option>
                  <option value="Santé">Santé privée</option>
                  <option value="Education">Enseignement privé</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Code IDCC</label>
                <input
                  type="text"
                  name="agreementCode"
                  value={formData.agreementCode}
                  onChange={handleInputChange}
                  placeholder="Ex: 1486"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Catégorie de sécurité sociale</label>
                <select
                  name="socialSecurityCategory"
                  value={formData.socialSecurityCategory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A">Catégorie A (Cadres)</option>
                  <option value="B">Catégorie B (Non cadres)</option>
                  <option value="C">Catégorie C (Assimilés cadres)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Briefcase className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Classification</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Niveau de qualification</label>
                <select
                  name="qualificationLevel"
                  value={formData.qualificationLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="I">Niveau I (Ingénieurs, cadres sup.)</option>
                  <option value="II">Niveau II (Cadres, techniciens sup.)</option>
                  <option value="III">Niveau III (Techniciens, agents de maîtrise)</option>
                  <option value="IV">Niveau IV (Employés qualifiés)</option>
                  <option value="V">Niveau V (Employés non qualifiés)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Coefficient</label>
                <input
                  type="text"
                  name="coefficient"
                  value={formData.coefficient}
                  onChange={handleInputChange}
                  placeholder="Ex: 250"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Niveau hiérarchique</label>
                <select
                  name="positionLevel"
                  value={formData.positionLevel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner...</option>
                  <option value="1">Niveau 1 (Direction générale)</option>
                  <option value="2">Niveau 2 (Direction de service)</option>
                  <option value="3">Niveau 3 (Encadrement)</option>
                  <option value="4">Niveau 4 (Professionnel)</option>
                  <option value="5">Niveau 5 (Employé)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Temps de travail */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Temps de travail</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Horaires de travail</label>
                <input
                  type="text"
                  name="workSchedule"
                  value={formData.workSchedule}
                  onChange={handleInputChange}
                  placeholder="Ex: 9h00-18h00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Pauses</label>
                <input
                  type="text"
                  name="breaks"
                  value={formData.breaks}
                  onChange={handleInputChange}
                  placeholder="Ex: 1h de pause déjeuner"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Politique heures supplémentaires</label>
                <textarea
                  name="overtimePolicy"
                  value={formData.overtimePolicy}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conditions et rémunération des heures supplémentaires..."
                />
              </div>
            </div>
          </div>

          {/* Avantages */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Euro className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Avantages sociaux</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Avantages</label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mutuelle, prévoyance, intéressement..."
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Tickets restaurant</label>
                <input
                  type="text"
                  name="mealTickets"
                  value={formData.mealTickets}
                  onChange={handleInputChange}
                  placeholder="Ex: 8€/jour"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Indemnité transport</label>
                <input
                  type="text"
                  name="transportAllowance"
                  value={formData.transportAllowance}
                  onChange={handleInputChange}
                  placeholder="Ex: 50%/mois"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Assurance santé</label>
                <input
                  type="text"
                  name="healthInsurance"
                  value={formData.healthInsurance}
                  onChange={handleInputChange}
                  placeholder="Nom de la mutuelle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2">Plan d'épargne retraite</label>
                <input
                  type="text"
                  name="retirementPlan"
                  value={formData.retirementPlan}
                  onChange={handleInputChange}
                  placeholder="PERCO, PERECO..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Congés et préavis */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Congés */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-blue-300" />
                <h2 className="text-xl font-semibold text-gray-900">Congés</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Jours de congés payés/an</label>
                  <input
                    type="number"
                    name="leaveDays"
                    value={formData.leaveDays}
                    onChange={handleInputChange}
                    min="0"
                    max="60"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Jours RTT/an</label>
                  <input
                    type="number"
                    name="rttdays"
                    value={formData.rttdays}
                    onChange={handleInputChange}
                    min="0"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Préavis */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
              <div className="flex items-center space-x-2 mb-6">
                <AlertCircle className="h-6 w-6 text-blue-300" />
                <h2 className="text-xl font-semibold text-gray-900">Préavis</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Préavis démission (jours)</label>
                  <input
                    type="text"
                    name="noticePeriodEmployee"
                    value={formData.noticePeriodEmployee}
                    onChange={handleInputChange}
                    placeholder="Ex: 1 mois"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Préavis licenciement (jours)</label>
                  <input
                    type="text"
                    name="noticePeriodEmployer"
                    value={formData.noticePeriodEmployer}
                    onChange={handleInputChange}
                    placeholder="Ex: 2 mois"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Clauses spéciales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Clauses spéciales</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="nonCompetition"
                  checked={formData.nonCompetition}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-blue-600">Clause de non-concurrence</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="mobility"
                  checked={formData.mobility}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-blue-600">Clause de mobilité</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="confidentiality"
                  checked={formData.confidentiality}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-blue-600">Clause de confidentialité</label>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-300" />
              <h2 className="text-xl font-semibold text-gray-900">Notes et observations</h2>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Informations complémentaires, clauses particulières..."
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
