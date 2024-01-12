describe('Login test', () => {
  beforeEach(() => {
    cy.visit('https://plus.b1nk.uz/authorize/login')
  })
  it('Contains correct header text in languages', () => {
    cy.get(`[dv="login"] h2`).should('contain.text', 'Войдите в свой аккаунт')

    cy.get(`[class="ant-btn ant-dropdown-trigger d-flex align-center h-auto ant-btn-link ant-btn-circle"]`).click()
    cy.get(`[class="lang mr-2 uz"]`).click()
    
    cy.get(`[dv="login"] h2`).should('contain.text', 'Hisobingizga kiring')

    cy.get(`[class="ant-btn ant-dropdown-trigger d-flex align-center h-auto ant-btn-link ant-btn-circle"]`).click()
    cy.get(`[class="en lang mr-2"]`).click()
    
    cy.get(`[dv="login"] h2`).should('contain.text', 'Sign in to your account')
  })
  it('INN or PNFL test', () => {
    cy.contains(/INN/i).should('not.exist')
    cy.get(`[id="username"]`).type('123456789')
    cy.contains(/INN/i)
    cy.get(`[id="username"]`).type('12345678912345')
    cy.contains(/pnfl/i)
  })
  it('Password type test', () => {
    cy.get('alert > nz-alert').should('not.exist')
    cy.get(`[id="username"]`).type('123456789')
    cy.get(`[type="password"]`).type('12345678')
    cy.get(`[dv="login_f_b"]`).click()
    cy.get('alert > nz-alert').should('contain.text', 'Логин или пароль неверный!')
    cy.wait(2000)
    cy.get('alert > nz-alert').should('not.exist')
  })
  it.only('Register button', () => {
    cy.get(`[class="m-0 ng-tns-c173-2"]`).should('not.exist')
    cy.get(`[class="mt-4 text-center ng-tns-c172-0"] span`).should('contain.text', 'Зарегистрироваться')
    cy.get(`[class="mt-4 text-center ng-tns-c172-0"] a span`).click()

    cy.get(`[class="m-0 ng-tns-c173-2"]`).should('contain.text', 'Зарегистрируйтесь на нашем сервере')
  })
})