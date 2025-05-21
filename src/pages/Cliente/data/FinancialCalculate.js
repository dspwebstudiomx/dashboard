import React from 'react'

export function FinancialCalculate(project, SERVICE_COSTS, SECTION_COSTS) {
    const totalServicios = Array.isArray(project.services)
        ? project.services.reduce(
            (sum, servicio) => sum + (SERVICE_COSTS[servicio] || 0),
            0
        )
        : 0;
    const totalSecciones = Array.isArray(project.sections)
        ? project.sections.reduce(
            (sum, seccion) => sum + (SECTION_COSTS[seccion] || 0),
            0
        )
        : 0;
    const total = totalServicios + totalSecciones;
    const impuestos = total * 0.16;
    const totalConImpuestos = total + impuestos;

    return {
        totalServicios,
        totalSecciones,
        total,
        impuestos,
        totalConImpuestos
    }
}
