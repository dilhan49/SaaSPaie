"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeft, Save, User, Phone, Mail, MapPin, Calendar, Briefcase, Users, Building2, FileText, CreditCard, GraduationCap, Heart, AlertCircle, CheckCircle, XCircle } from "lucide-react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  socialSecurityNumber: string;
  email: string;
  phone: string;
  mobilePhone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  employeeNumber: string;
  hireDate: string;
  position: string;
  department: string;
  manager: string;
  workLocation: string;
  contractType: string;
  contractStartDate: string;
  contractEndDate: string;
  trialPeriod: string;
  weeklyHours: string;
  grossSalary: string;
  salaryFrequency: string;
  bankName: string;
  iban: string;
  bic: string;
  educationLevel: string;
  diploma: string;
  maritalStatus: string;
  numberOfChildren: string;
  emergencyContact: string;
  emergencyPhone: string;
  notes: string;
}

export default function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const employeeId = resolvedParams.id;
  
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    birthPlace: "",
    nationality: "Française",
    socialSecurityNumber: "",
    email: "",
    phone: "",
    mobilePhone: "",
    address: "",
    postalCode: "",
    city: "",
    country: "France",
    employeeNumber: "",
    hireDate: "",
    position: "",
    department: "",
    manager: "",
    workLocation: "",
    contractType: "CDI",
    contractStartDate: "",
    contractEndDate: "",
    trialPeriod: "",
    weeklyHours: "35",
    grossSalary: "",
    salaryFrequency: "Mensuel",
    bankName: "",
    iban: "",
    bic: "",
    educationLevel: "",
    diploma: "",
    maritalStatus: "Célibataire",
    numberOfChildren: "0",
    emergencyContact: "",
    emergencyPhone: "",
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, [employeeId]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`);
      const result = await response.json();
      
      if (response.ok) {
        setFormData(result.data);
      } else {
        setMessage({ type: 'error', text: result.message || 'Erreur lors du chargement du salarié' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Validation des champs requis
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.hireDate || !formData.position || !formData.grossSalary) {
        setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires' });
        setIsSubmitting(false);
        return;
      }

      // Appel à l'API backend pour la mise à jour
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage({ type: 'error', text: result.message || 'Erreur lors de la mise à jour' });
        setIsSubmitting(false);
        return;
      }

      setMessage({ type: 'success', text: result.message });
      
      // Rediriger vers la liste après 2 secondes
      setTimeout(() => {
        router.push('/employees');
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'appel API:', error);
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

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
              <Link href="/employees" className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Éditer le Salarié</h1>
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/payslips" className="text-gray-600 hover:text-blue-600 transition-colors">
                Bulletins
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
              <Link href="/employees" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à la liste</span>
              </Link>
              <h2 className="text-2xl font-bold text-gray-900">{formData.firstName} {formData.lastName}</h2>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-blue-600 text-gray-600 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => router.push('/employees')}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                <span>{isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour'}</span>
              </button>
            </div>
          </div>

          {/* Informations Personnelles */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Informations Personnelles</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
