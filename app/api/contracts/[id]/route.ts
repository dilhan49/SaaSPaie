import { NextRequest, NextResponse } from 'next/server';

// Simule une base de données en mémoire
let contracts: any[] = [];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const contract = contracts.find(c => c.id === id);

    if (!contract) {
      return NextResponse.json(
        { success: false, message: 'Contrat non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contract,
      message: 'Contrat récupéré avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération du contrat' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const contractIndex = contracts.findIndex(c => c.id === id);

    if (contractIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Contrat non trouvé' },
        { status: 404 }
      );
    }

    const updateData = await request.json();

    // Validation des champs requis
    const requiredFields = ['employeeId', 'contractType', 'startDate', 'weeklyHours', 'grossSalary'];
    const missingFields = requiredFields.filter(field => !updateData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validation du salaire
    if (parseFloat(updateData.grossSalary) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Le salaire doit être supérieur à 0' },
        { status: 400 }
      );
    }

    // Mettre à jour le contrat
    const updatedContract = {
      ...contracts[contractIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    contracts[contractIndex] = updatedContract;

    console.log('Contrat mis à jour:', updatedContract);

    return NextResponse.json({
      success: true,
      data: updatedContract,
      message: 'Contrat mis à jour avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du contrat:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour du contrat' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const contractIndex = contracts.findIndex(c => c.id === id);

    if (contractIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Contrat non trouvé' },
        { status: 404 }
      );
    }

    const deletedContract = contracts[contractIndex];
    contracts.splice(contractIndex, 1);

    console.log('Contrat supprimé:', deletedContract);

    return NextResponse.json({
      success: true,
      data: deletedContract,
      message: 'Contrat supprimé avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du contrat:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression du contrat' },
      { status: 500 }
    );
  }
}
