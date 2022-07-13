

describe('GET /characters', function () {

    const characters = [
        {
            name: 'Charles Xavier 2',
            alias: 'Professor',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Peter Parker',
            alias: 'Homem Aranha',
            team: ['x-men'],
            active: true
        }
    ]

    before(function () {
        
        cy.setToken()
        cy.populateCharacters(characters)


    })

    it('deve retornar uma lisa de personagens', function () {

        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array')
            expect(response.body.length).greaterThan(0)
        })

    })

    it('Deve buscar personagem pelo nome', function(){
        cy.searchCharacters('Charles Xavier 2').then(function(response){
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Professor')
        })
    })
})

describe.only('GET /characters/id', function () {

    before(function () {
        
        cy.setToken()
        


    })

    const tonyStark = {

        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team:	['Vingadores'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function(){
        before(function(){
            cy.postCharacter(tonyStark).then(function(response){
                Cypress.env('characterId', response.body.character_id)
            })

        })
        
        it('Deve buscar o personagem pelo id', function(){
            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')

            })

        })
    })

    it('Deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62cf2723aed38c1b46008bbd'
            cy.getCharacterById(id).then(function(response){
                expect(response.status).to.eql(404)
    })

})
})