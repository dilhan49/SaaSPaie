"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, FileText, Users, Calendar, Euro, Building2, Calculator, Download, CheckCircle, XCircle } from "lucide-react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export default function CreatePayslipPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    // Informations générales
    employeeId: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    payDate: "",
    contractType: "CDI",
    
    // Salaire
    grossSalary: "",
    netSalary: "",
    
    // Cotisations et impôts
    socialCharges: "",
    incomeTax: "",
    
    // Heures supplémentaires et avantages
    overtimeHours: "",
    overtimeRate: "",
    benefits: "",
    bonuses: "",
    deductions: "",
    
    // Informations employeur
    employerName: "Société Client",
    employerAddress: "123 Rue de la Paie, 75001 Paris",
    siret: "12345678901234",
    
    // Convention collective
    collectiveAgreement: "",
    
    // Notes
    notes: ""
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const result = await response.json();
      
      if (response.ok) {
        setEmployees(result.data);
      } else {
        console.error('Erreur lors du chargement des employés:', result.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateTotals = () => {
    const grossSalary = parseFloat(formData.grossSalary) || 0;
    const socialCharges = parseFloat(formData.socialCharges) || 0;
    const tax = parseFloat(formData.incomeTax) || 0;
    
    const netSalary = grossSalary - socialCharges - tax;
    
    return {
      grossSalary: grossSalary.toFixed(2),
      totalContributions: socialCharges.toFixed(2),
      netSalary: netSalary.toFixed(2)
    };
  };

  const totals = calculateTotals();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Validation des champs requis
      if (!formData.employeeId || !formData.grossSalary || !formData.netSalary) {
        setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires' });
        setIsSubmitting(false);
        return;
      }

      // Appel à l'API backend
      const response = await fetch('/api/payslips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: result.message || 'Erreur lors de la génération du bulletin' });
        setIsSubmitting(false);
        return;
      }

      setMessage({ type: 'success', text: result.message });
      
      // Rediriger vers la liste après 2 secondes
      setTimeout(() => {
        router.push('/payslips');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsSubmitting(false);
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
              <Link href="/payslips" className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Bulletin de Paie</h1>
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
          {/* Message de validation */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/payslips" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à la liste</span>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">Générer un Bulletin de Paie</h2>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-blue-600 text-gray-600 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => router.push('/payslips')}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                <span>{isSubmitting ? 'Génération en cours...' : 'Générer le Bulletin'}</span>
              </button>
            </div>
          </div>

          {/* Informations générales */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Informations générales</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salarié *</label>
                <select
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un salarié</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} - {employee.position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Période *</label>
                <input
                  type="month"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de paiement *</label>
                <input
                  type="date"
                  name="payDate"
                  value={formData.payDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de contrat</label>
                <select
                  name="contractType"
                  value={formData.contractType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                  <option value="Alternance">Alternance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Aperçu du bulletin */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-blue-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Aperçu du bulletin</h2>
              </div>
              <button
                type="button"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Télécharger PDF</span>
              </button>
            </div>

            {/* En-tête du bulletin */}
            <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">EMPLOYEUR</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>{formData.employerName}</strong></p>
                    <p>{formData.employerAddress}</p>
                    <p>SIRET: {formData.siret}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">SALARIÉ</h3>
                  <div className="text-sm space-y-1">
                    <p><strong>Nom du salarié</strong></p>
                    <p>Adresse du salarié</p>
                    <p>Matricule: EMP001</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center border-t border-b border-gray-300 py-2">
                <h3 className="font-bold text-lg">BULLETIN DE PAIE</h3>
                <p className="text-sm">Période: {formData.period || "MM/YYYY"}</p>
              </div>
            </div>

            {/* Salaire brut */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">SALAIRE BRUT</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Base</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Taux</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Salaire de base</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">151.67h</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.baseSalary || "0.00"}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.baseSalary || "0.00"}€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Heures supplémentaires</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.overtimeHours || "0"}h</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.overtimeRate || "25"}%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{(parseFloat(formData.overtimeHours || "0") * parseFloat(formData.overtimeRate || "25")).toFixed(2)}€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Avantages en nature</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.benefits || "0.00"}€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Primes</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">-</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.bonuses || "0.00"}€</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-2" colSpan={3}>TOTAL BRUT</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cotisations sociales */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3">COTISATIONS SOCIALES</h4>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Base</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Taux</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Assurance maladie</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">7.50%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Assurance chômage</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">2.40%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Retraite CNAV</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">10.55%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">CSG</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">9.20%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">CRDS</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.50%</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-2" colSpan={3}>TOTAL COTISATIONS</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.totalContributions}€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Impôts et net */}
            <div className="mb-6">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Impôt sur le revenu (prélevé à la source)</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{formData.incomeTax || "0.00"}€</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-2">NET À PAYER</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">{totals.netSalary}€</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Congés */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="border border-gray-300 rounded p-3">
                <p className="font-semibold">Congés acquis</p>
                <p>{formData.accruedLeave || "2.5"} jours</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <p className="font-semibold">Congés pris</p>
                <p>{formData.takenLeave || "0"} jours</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <p className="font-semibold">Solde</p>
                <p>{formData.remainingLeave || "2.5"} jours</p>
              </div>
            </div>
          </div>

          {/* Formulaire d'édition */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <Calculator className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Paramètres du bulletin</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salaire brut (€)</label>
                <input
                  type="number"
                  name="grossSalary"
                  value={formData.grossSalary}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="2500.00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heures supplémentaires</label>
    </div>
    <button
      type="button"
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
    >
      <Download className="h-5 w-5" />
      <span>Télécharger PDF</span>
    </button>
  </div>

  {/* En-tête du bulletin */}
  <div className="border-2 border-gray-300 rounded-lg p-6 mb-6">
    <div className="grid md:grid-cols-2 gap-8 mb-6">
      <div>
        <h3 className="font-bold text-lg mb-2">EMPLOYEUR</h3>
        <div className="text-sm space-y-1">
          <p><strong>{formData.employerName}</strong></p>
          <p>{formData.employerAddress}</p>
          <p>SIRET: {formData.siret}</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">SALARIÉ</h3>
        <div className="text-sm space-y-1">
          <p><strong>Nom du salarié</strong></p>
          <p>Adresse du salarié</p>
          <p>Matricule: EMP001</p>
        </div>
      </div>
    </div>
    
    <div className="text-center border-t border-b border-gray-300 py-2">
      <h3 className="font-bold text-lg">BULLETIN DE PAIE</h3>
      <p className="text-sm">Période: {formData.month}/{formData.year}</p>
    </div>
  </div>

  {/* Salaire brut */}
  <div className="mb-6">
    <h4 className="font-bold text-gray-900 mb-3">SALAIRE BRUT</h4>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Base</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Taux</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Salaire de base</td>
          <td className="border border-gray-300 px-4 py-2 text-right">151.67h</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.baseSalary || "0.00"}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.baseSalary || "0.00"}€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Heures supplémentaires</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.overtimeHours || "0"}h</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.overtimeRate || "25"}%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{(parseFloat(formData.overtimeHours || "0") * parseFloat(formData.overtimeRate || "25")).toFixed(2)}€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Avantages en nature</td>
          <td className="border border-gray-300 px-4 py-2 text-right">-</td>
          <td className="border border-gray-300 px-4 py-2 text-right">-</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.benefits || "0.00"}€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Primes</td>
          <td className="border border-gray-300 px-4 py-2 text-right">-</td>
          <td className="border border-gray-300 px-4 py-2 text-right">-</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.bonuses || "0.00"}€</td>
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td className="border border-gray-300 px-4 py-2" colSpan={3}>TOTAL BRUT</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Cotisations sociales */}
  <div className="mb-6">
    <h4 className="font-bold text-gray-900 mb-3">COTISATIONS SOCIALES</h4>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2 text-left">Désignation</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Base</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Taux</th>
          <th className="border border-gray-300 px-4 py-2 text-right">Montant</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Assurance maladie</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">7.50%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Assurance chômage</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">2.40%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Retraite CNAV</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">10.55%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">CSG</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">9.20%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">CRDS</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.grossSalary}€</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.50%</td>
          <td className="border border-gray-300 px-4 py-2 text-right">0.00€</td>
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td className="border border-gray-300 px-4 py-2" colSpan={3}>TOTAL COTISATIONS</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.totalContributions}€</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Impôts et net */}
  <div className="mb-6">
    <table className="w-full border-collapse">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Impôt sur le revenu (prélevé à la source)</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{formData.incomeTax || "0.00"}€</td>
        </tr>
        <tr className="bg-gray-100 font-bold">
          <td className="border border-gray-300 px-4 py-2">NET À PAYER</td>
          <td className="border border-gray-300 px-4 py-2 text-right">{totals.netSalary}€</td>
        </tr>
      </tbody>
    </table>
  </div>

  {/* Congés */}
  <div className="grid md:grid-cols-3 gap-4 text-sm">
    <div className="border border-gray-300 rounded p-3">
      <p className="font-semibold">Congés acquis</p>
      <p>{formData.accruedLeave || "2.5"} jours</p>
    </div>
    <div className="border border-gray-300 rounded p-3">
      <p className="font-semibold">Congés pris</p>
      <p>{formData.takenLeave || "0"} jours</p>
    </div>
    <div className="border border-gray-300 rounded p-3">
      <p className="font-semibold">Solde</p>
      <p>{formData.remainingLeave || "2.5"} jours</p>
    </div>
  </div>
</div>

{/* Formulaire d'édition */}
<div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
  <div className="flex items-center space-x-2 mb-6">
    <Calculator className="h-6 w-6 text-blue-600" />
    <h2 className="text-xl font-semibold text-gray-900">Paramètres du bulletin</h2>
  </div>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Salaire brut (€)</label>
      <input
        type="number"
        name="grossSalary"
        value={formData.grossSalary}
        onChange={handleInputChange}
        step="0.01"
        placeholder="2500.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Heures supplémentaires</label>
      <input
        type="number"
        name="overtimeHours"
        value={formData.overtimeHours}
        onChange={handleInputChange}
        step="0.01"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Taux heures sup. (€)</label>
      <input
        type="number"
        name="overtimeRate"
        value={formData.overtimeRate}
        onChange={handleInputChange}
        step="0.01"
        placeholder="25.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Primes (€)</label>
      <input
        type="number"
        name="bonuses"
        value={formData.bonuses}
        onChange={handleInputChange}
        step="0.01"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Avantages (€)</label>
      <input
        type="number"
        name="benefits"
        value={formData.benefits}
        onChange={handleInputChange}
        step="0.01"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Déductions (€)</label>
      <input
        type="number"
        name="deductions"
        value={formData.deductions}
        onChange={handleInputChange}
        step="0.01"
        placeholder="0.00"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Impôts */}
  <div className="mt-6">
    <h3 className="font-semibold text-gray-900 mb-4">Impôts et retenues</h3>
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Impôt sur le revenu (€)</label>
        <input
          type="number"
          name="incomeTax"
          value={formData.incomeTax}
          onChange={handleInputChange}
          step="0.01"
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Total cotisations (€)</label>
        <input
          type="number"
          name="socialCharges"
          value={formData.socialCharges}
          onChange={handleInputChange}
          step="0.01"
          placeholder="0.00"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
          </div>
        </form>
      </main>
    </div>
  );
}
