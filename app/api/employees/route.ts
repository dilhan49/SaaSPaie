import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: employees,
      message: 'Salariés récupérés avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des salariés:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des salariés' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const employeeData = await request.json();

    // Validation des champs requis
    const requiredFields = ['firstName', 'lastName', 'email', 'hireDate', 'position', 'grossSalary'];
    const missingFields = requiredFields.filter(field => !employeeData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employeeData.email)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingEmployee = await prisma.employee.findUnique({
      where: { email: employeeData.email }
    });

    if (existingEmployee) {
      return NextResponse.json(
        { success: false, message: 'Un salarié avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Créer le nouvel employé avec Prisma
    const newEmployee = await prisma.employee.create({
      data: {
        ...employeeData,
        contractStartDate: employeeData.hireDate, // Utiliser hireDate pour contractStartDate
      }
    });

    console.log('Nouveau salarié enregistré:', newEmployee);

    return NextResponse.json({
      success: true,
      data: newEmployee,
      message: `Salarié ${employeeData.firstName} ${employeeData.lastName} enregistré avec succès !`
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du salarié:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'enregistrement du salarié' },
      { status: 500 }
    );
  }
}
