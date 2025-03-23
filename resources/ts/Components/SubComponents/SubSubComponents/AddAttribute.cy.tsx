import React from "react";
import AddAttribute from './AddAttribute';
import { mount } from 'cypress/react'; // Import mount from 'cypress/react'

describe('AddAttribute.tsx', () => {
it('mounts', () => {
  mount(<AddAttribute value1={''} value2={''} />);
  //Stepper should have initial count of 0 (default)
  cy.get('#add_attribute').click({force:true}).then(() => {
 cy.get('#cell-attribute-modal').should('be.visible');
 });
  cy.get('#attribute-name').type('backgroundColor');
  cy.get('#attribute-value').type('#E1EFFE');
  cy.get('#addCellAttributeButton').click();
})});
