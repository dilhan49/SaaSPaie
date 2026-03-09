import { NextRequest, NextResponse } from 'next/server';

// Simule une base de données en mémoire
let contracts: any[] = [];
let nextContractId = 1;

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: contracts,
      message: 'Contrats récupérés avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des contrats' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contractData = await request.json();

    // Validation des champs requis
    const requiredFields = ['employeeId', 'contractType', 'startDate', 'weeklyHours', 'grossSalary'];
    const missingFields = requiredFields.filter(field => !contractData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Validation des dates
    const startDate = new Date(contractData.startDate);
    if (contractData.endDate) {
      const endDate = new Date(contractData.endDate);
      if (endDate <= startDate) {
        return NextResponse.json(
          { success: false, message: 'La date de fin doit être postérieure à la date de début' },
          { status: 400 }
        );
      }
    }

    // Validation du salaire
    if (parseFloat(contractData.grossSalary) <= 0) {
      return NextResponse.json(
        { success: false, message: 'Le salaire doit être supérieur à 0' },
        { status: 400 }
      );
    }

    // Créer le nouveau contrat
    const newContract = {
      id: nextContractId++,
      ...contractData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };

    // Ajouter à la "base de données"
    contracts.push(newContract);

    console.log('Nouveau contrat enregistré:', newContract);

    return NextResponse.json({
      success: true,
      data: newContract,
      message: 'Contrat enregistré avec succès !'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du contrat:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'enregistrement du contrat' },
      { status: 500 }
    );
  }
}
