import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const employee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!employee) {
      return NextResponse.json(
        { success: false, message: 'Salarié non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: employee,
      message: 'Salarié récupéré avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du salarié:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération du salarié' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const updateData = await request.json();

    // Validation des champs requis
    const requiredFields = ['firstName', 'lastName', 'email', 'hireDate', 'position', 'grossSalary'];
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

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updateData.email)) {
      return NextResponse.json(
        { success: false, message: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà (en excluant l'employé actuel)
    const existingEmployee = await prisma.employee.findFirst({
      where: { 
        email: updateData.email,
        id: { not: id }
      }
    });

    if (existingEmployee) {
      return NextResponse.json(
        { success: false, message: 'Un salarié avec cet email existe déjà' },
        { status: 409 }
      );
    }

    // Mettre à jour l'employé avec Prisma
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: {
        ...updateData,
        contractStartDate: updateData.hireDate, // Utiliser hireDate pour contractStartDate
      }
    });

    console.log('Salarié mis à jour:', updatedEmployee);

    return NextResponse.json({
      success: true,
      data: updatedEmployee,
      message: `Salarié ${updateData.firstName} ${updateData.lastName} mis à jour avec succès !`
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du salarié:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour du salarié' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    // Vérifier si l'employé existe
    const existingEmployee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { success: false, message: 'Salarié non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer l'employé (cascade supprimera aussi les contrats et bulletins associés)
    const deletedEmployee = await prisma.employee.delete({
      where: { id }
    });

    console.log('Salarié supprimé:', deletedEmployee);

    return NextResponse.json({
      success: true,
      data: deletedEmployee,
      message: `Salarié ${deletedEmployee.firstName} ${deletedEmployee.lastName} supprimé avec succès !`
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du salarié:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression du salarié' },
      { status: 500 }
    );
  }
}
