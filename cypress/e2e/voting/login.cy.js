/// <reference types="cypress" />

describe('Login', () => {
    it('should be able to login using usn account', () => {
      cy.visit('http://localhost:3000/')
  
      cy.get('input[name=USN]').type('23000909100')
  
      cy.get('input[name=password]').type('123456')

      cy.get('button').click()

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/voting')
      })
    })
  })
  
