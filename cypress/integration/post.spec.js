

describe('POST /characters', function () {

    before(function () {
        cy.setToken()


    })

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Charles Xavier 2',
            alias: 'Professor',
            team: ['x-men'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
            })

        
    })

    context('Quando o personagem já existe', function () {
        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores'],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)

            })


        })

        it('nõa deve cadastrar duplicado', function () {
            cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')


            })

        })
    })

})



