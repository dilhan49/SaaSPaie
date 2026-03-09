import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const payslips = await prisma.payslip.findMany({
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: payslips,
      message: 'Bulletins récupérés avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des bulletins:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des bulletins' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const payslipData = await request.json();

    // Validation des champs requis
    const requiredFields = ['employeeId', 'month', 'year', 'grossSalary', 'netSalary'];
    const missingFields = requiredFields.filter(field => !payslipData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validation des montants
    if (parseFloat(payslipData.grossSalary) <= 0 || parseFloat(payslipData.netSalary) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Les salaires doivent être supérieurs à 0' },
        { status: 400 }
      );
    }

    // Validation du mois et de l'année
    const month = parseInt(payslipData.month);
    const year = parseInt(payslipData.year);
    
    if (month < 1 || month > 12) {
      return NextResponse.json(
        { success: false, message: 'Le mois doit être entre 1 et 12' },
        { status: 400 }
      );
    }

    if (year < 2000 || year > 2100) {
      return NextResponse.json(
        { success: false, message: 'L\'année doit être entre 2000 et 2100' },
        { status: 400 }
      );
    }

    // Vérifier si un bulletin existe déjà pour ce salarié/mois/année
    const existingPayslip = await prisma.payslip.findUnique({
      where: {
        employeeId_month_year: {
          employeeId: parseInt(payslipData.employeeId),
          month,
          year
        }
      }
    });

    if (existingPayslip) {
      return NextResponse.json(
        { success: false, message: 'Un bulletin existe déjà pour ce salarié et cette période' },
        { status: 409 }
      );
    }

    // Vérifier que l'employé existe
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(payslipData.employeeId) }
    });

    if (!employee) {
      return NextResponse.json(
        { success: false, message: 'Employé non trouvé' },
        { status: 404 }
      );
    }

    // Créer le nouveau bulletin avec Prisma
    const newPayslip = await prisma.payslip.create({
      data: {
        employeeId: parseInt(payslipData.employeeId),
        month,
        year,
        grossSalary: payslipData.grossSalary,
        netSalary: payslipData.netSalary,
        socialCharges: payslipData.socialCharges,
        incomeTax: payslipData.incomeTax,
        overtimeHours: payslipData.overtimeHours,
        overtimeRate: payslipData.overtimeRate,
        benefits: payslipData.benefits,
        bonuses: payslipData.bonuses,
        deductions: payslipData.deductions,
      }
    });

    console.log('Nouveau bulletin enregistré:', newPayslip);

    return NextResponse.json({
      success: true,
      data: newPayslip,
      message: 'Bulletin généré avec succès !'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la génération du bulletin:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la génération du bulletin' },
      { status: 500 }
    );
  }
}
