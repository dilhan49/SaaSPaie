import { NextRequest, NextResponse } from 'next/server';

// Simule une base de données en mémoire
let templates: any[] = [];
let nextTemplateId = 1;

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: templates,
      message: 'Maquettes récupérées avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération des maquettes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const templateData = await request.json();

    // Validation des champs requis
    const requiredFields = ['templateName', 'targetPopulation'];
    const missingFields = requiredFields.filter(field => !templateData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Champs obligatoires manquants: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Vérifier si une maquette avec le même nom existe déjà
    const existingTemplate = templates.find(t => 
      t.templateName.toLowerCase() === templateData.templateName.toLowerCase()
    );

    if (existingTemplate) {
      return NextResponse.json(
        { success: false, message: 'Une maquette avec ce nom existe déjà' },
        { status: 409 }
      );
    }

    // Créer la nouvelle maquette
    const newTemplate = {
      id: nextTemplateId++,
      ...templateData,
      associatedEmployees: templateData.associatedEmployees || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    };

    // Ajouter à la "base de données"
    templates.push(newTemplate);

    console.log('Nouvelle maquette enregistrée:', newTemplate);

    return NextResponse.json({
      success: true,
      data: newTemplate,
      message: 'Maquette créée avec succès !'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de la maquette:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la création de la maquette' },
      { status: 500 }
    );
  }
}
