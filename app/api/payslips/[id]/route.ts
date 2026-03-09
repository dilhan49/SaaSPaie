import { NextRequest, NextResponse } from 'next/server';

// Simule une base de données en mémoire
let payslips: any[] = [];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const payslip = payslips.find(p => p.id === id);

    if (!payslip) {
      return NextResponse.json(
        { success: false, message: 'Bulletin non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: payslip,
      message: 'Bulletin récupéré avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération du bulletin' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const payslipIndex = payslips.findIndex(p => p.id === id);

    if (payslipIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Bulletin non trouvé' },
        { status: 404 }
      );
    }

    const updateData = await request.json();

    // Validation des montants
    if (updateData.grossSalary && parseFloat(updateData.grossSalary) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Le salaire brut doit être supérieur à 0' },
        { status: 400 }
      );
    }

    if (updateData.netSalary && parseFloat(updateData.netSalary) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Le salaire net doit être supérieur à 0' },
        { status: 400 }
      );
    }

    // Mettre à jour le bulletin
    const updatedPayslip = {
      ...payslips[payslipIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    payslips[payslipIndex] = updatedPayslip;

    console.log('Bulletin mis à jour:', updatedPayslip);

    return NextResponse.json({
      success: true,
      data: updatedPayslip,
      message: 'Bulletin mis à jour avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du bulletin:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour du bulletin' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const payslipIndex = payslips.findIndex(p => p.id === id);

    if (payslipIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Bulletin non trouvé' },
        { status: 404 }
      );
    }

    const deletedPayslip = payslips[payslipIndex];
    payslips.splice(payslipIndex, 1);

    console.log('Bulletin supprimé:', deletedPayslip);

    return NextResponse.json({
      success: true,
      data: deletedPayslip,
      message: 'Bulletin supprimé avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du bulletin:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression du bulletin' },
      { status: 500 }
    );
  }
}
