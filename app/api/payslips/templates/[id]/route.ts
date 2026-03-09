import { NextRequest, NextResponse } from 'next/server';

// Simule une base de données en mémoire
let templates: any[] = [];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const template = templates.find(t => t.id === id);

    if (!template) {
      return NextResponse.json(
        { success: false, message: 'Maquette non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: template,
      message: 'Maquette récupérée avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération de la maquette' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const templateIndex = templates.findIndex(t => t.id === id);

    if (templateIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Maquette non trouvée' },
        { status: 404 }
      );
    }

    const updateData = await request.json();

    // Validation des champs requis
    if (updateData.templateName) {
      // Vérifier si une autre maquette avec le même nom existe déjà
      const existingTemplate = templates.find(t => 
        t.templateName.toLowerCase() === updateData.templateName.toLowerCase() && t.id !== id
      );

      if (existingTemplate) {
        return NextResponse.json(
          { success: false, message: 'Une maquette avec ce nom existe déjà' },
          { status: 409 }
        );
      }
    }

    // Mettre à jour la maquette
    const updatedTemplate = {
      ...templates[templateIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    templates[templateIndex] = updatedTemplate;

    console.log('Maquette mise à jour:', updatedTemplate);

    return NextResponse.json({
      success: true,
      data: updatedTemplate,
      message: 'Maquette mise à jour avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour de la maquette:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour de la maquette' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const templateIndex = templates.findIndex(t => t.id === id);

    if (templateIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Maquette non trouvée' },
        { status: 404 }
      );
    }

    const deletedTemplate = templates[templateIndex];
    templates.splice(templateIndex, 1);

    console.log('Maquette supprimée:', deletedTemplate);

    return NextResponse.json({
      success: true,
      data: deletedTemplate,
      message: 'Maquette supprimée avec succès !'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression de la maquette:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression de la maquette' },
      { status: 500 }
    );
  }
}
