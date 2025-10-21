#!/usr/bin/env ts-node
/**
 * Validation script for mock data integrity
 * Ensures all foreign key references are valid and calculated fields are correct
 */

import { mockCustomers, validateCustomerAddresses } from '../lib/data/mockCustomers';
import { mockInventory, validateInventory, calculateInventoryValue, calculateInventoryValueRetail } from '../lib/data/mockInventory';
import { mockPros, validateProMetrics } from '../lib/data/mockPros';

console.log('🔍 Validating Stonecoat MVP Mock Data...\n');

let hasErrors = false;

// Validate Customers
console.log('📋 Validating Customers...');
const customerValidation = validateCustomerAddresses();
if (customerValidation.valid) {
  console.log(`✅ All ${mockCustomers.length} customers valid`);
} else {
  console.log('❌ Customer validation errors:');
  customerValidation.errors.forEach(err => console.log(`   - ${err}`));
  hasErrors = true;
}

// Validate Inventory
console.log('\n📦 Validating Inventory...');
const inventoryValidation = validateInventory();
if (inventoryValidation.valid) {
  console.log(`✅ All ${mockInventory.length} products valid`);

  // Show inventory statistics
  const proCostValue = calculateInventoryValue();
  const retailValue = calculateInventoryValueRetail();
  console.log(`   📊 Total inventory value (pro cost): $${proCostValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  console.log(`   📊 Total inventory value (retail): $${retailValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
  console.log(`   📊 Potential profit margin: $${(retailValue - proCostValue).toLocaleString('en-US', { minimumFractionDigits: 2 })}`);
} else {
  console.log('❌ Inventory validation errors:');
  inventoryValidation.errors.forEach(err => console.log(`   - ${err}`));
  hasErrors = true;
}

// Validate Pros
console.log('\n👷 Validating Pros...');
const proValidation = validateProMetrics();
if (proValidation.valid) {
  console.log(`✅ All ${mockPros.length} pros valid with correct calculated metrics`);
} else {
  console.log('❌ Pro validation errors:');
  proValidation.errors.forEach(err => console.log(`   - ${err}`));
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('❌ VALIDATION FAILED - Fix errors above before proceeding');
  process.exit(1);
} else {
  console.log('✅ ALL VALIDATIONS PASSED - Mock data is production-ready');
  console.log('\n📊 Data Summary:');
  console.log(`   - ${mockCustomers.length} customers`);
  console.log(`   - ${mockPros.length} contractors`);
  console.log(`   - ${mockInventory.length} products`);
  process.exit(0);
}
