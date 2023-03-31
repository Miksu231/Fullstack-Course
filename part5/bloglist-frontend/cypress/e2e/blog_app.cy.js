describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Administrator',
      username: 'Admin',
      password: 'password'
    }
    const user2 = {
      name: 'User',
      username: 'User',
      password: 'password'
		}
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Admin')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Admin logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('Admin')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Incorrect username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username: 'Admin', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('')
      })
    })

    it('A blog can be created', function () {
      cy.get('#openToggle').click()
      cy.get('#title').type('Cypress Test Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()

      cy.contains('Cypress Test Blog John Doe')
      cy.contains('view')
    })
    it('A blog can be liked', function () {
      cy.get('#openToggle').click()
      cy.get('#title').type('Test Liking Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()

      cy.get('#open-button').click()
      cy.get('#like-button').click()

      cy.contains('likes 1')
    })
    it('Can delete your own blog', function () {
      cy.get('#openToggle').click()
      cy.get('#title').type('Test Deleting Blog')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()

      cy.get('#open-button').click()
      cy.get('#remove-button').click()

      cy.get('Test Deleting Blog').should('not.exist')
    })
    it('Can not delete others\' blogs', function () {
      // Create a blog and logout
      cy.get('#openToggle').click()
      cy.get('#title').type('Admin Blog')
      cy.get('#author').type('Administator')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()
      cy.get('#logout-button').click()
      // Sign in as different user
      cy.get('#username').type('User')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('User logged in')
      cy.get('#open-button').click()
      cy.get('#remove-button').should('not.exist')
    })
    it('Blogs are ordered correctly', function () {
      cy.get('#openToggle').click()
      cy.get('#title').type('Cypress Test Blog 1')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()
      cy.contains('Cypress Test Blog 1')
      cy.get('.openButton').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.get('#like-button').click()
      cy.contains('likes 2')
      cy.get('.closeButton').click()

      cy.get('#openToggle').click()
      cy.get('#title').type('Cypress Test Blog 2')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()
      cy.contains('Cypress Test Blog 2')
      cy.get('.openButton').eq(1).click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
      cy.get('#like-button').click()
      cy.contains('likes 2')
      cy.get('#like-button').click()
      cy.contains('likes 3')
      cy.get('.closeButton').eq(0).click()

      cy.get('#openToggle').click()
      cy.get('#title').type('Cypress Test Blog 3')
      cy.get('#author').type('John Doe')
      cy.get('#url').type('https://www.testurl.com')
      cy.get('#submit').click()
      cy.contains('Cypress Test Blog 3')

      cy.get('.blog').eq(0).should('contain', 'Cypress Test Blog 2')
      cy.get('.blog').eq(1).should('contain', 'Cypress Test Blog 1')
      cy.get('.blog').eq(2).should('contain', 'Cypress Test Blog 3')
    })
  })
})