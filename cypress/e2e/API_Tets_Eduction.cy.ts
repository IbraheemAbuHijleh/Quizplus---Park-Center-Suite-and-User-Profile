describe('Test API ',() =>{
 //   Cypress.on('uncaught:exception', (err, runnable) => {
    //    if (err.message.includes('Minified React error #418')) {
            // returning false here prevents Cypress from failing the test
           // return false;
      //  }
   // });
    it('API get All Eduction',() =>{

     //   cy.setCookie('user_preferred_language', 'en');

     //   cy.visit('https://jsonplaceholder.typicode.com/')

        cy.request("GET","https://jsonplaceholder.typicode.com/posts").then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.results).to.not.be.null
            console.log("Response body:", response.body);

        });

    });

    });
