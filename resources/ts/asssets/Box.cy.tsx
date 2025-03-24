import Box from './Box';
import React from 'react';
import { mount } from 'cypress/react';

// filepath: c:\Users\Arif Irawan\Downloads\httpdocs\resources\ts\assets\Box.cy.test.tsx

/**
 * Test file for Box.tsx.
 */
describe('Box.tsx', () => {
  it('mounts', () => {
    mount(<Box props={{}}/>);
  });

});