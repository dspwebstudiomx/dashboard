import React from 'react'

export function FinancialCalculate(project, SERVICE_COSTS, SECTION_COSTS, discount) {
  const totalServices = (project.services || []).reduce((acc, service) => acc + (SERVICE_COSTS[service] || 0), 0);
  const totalSections = (project.sections || []).reduce((acc, section) => acc + (SECTION_COSTS[section] || 0), 0);

  const validDiscount = typeof discount === 'number' && discount >= 0 ? discount : 0;

  const netPayable = (totalServices + totalSections) - validDiscount;
  const baseRate = netPayable / 0.95332923754846;
  const ivaTax = baseRate * 0.16;
  const subtotal = baseRate + ivaTax;
  const ivaRetention = baseRate * 0.10667;
  const isrRetention = baseRate * 0.1;
  const isrTax = baseRate * 0.1;

  return {
    totalServices,
    totalSections,
    netPayable: isNaN(netPayable) ? 0 : netPayable,
    baseRate,
    ivaTax,
    subtotal,
    ivaRetention,
    isrRetention,
    isrTax,
    discount: validDiscount,
  };
}
