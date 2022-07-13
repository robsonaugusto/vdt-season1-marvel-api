describe('DELETE /characters/id', function () {

    before(function () {
        
        cy.setToken()
    })

    const tochaHumana = {

        name: 'Jhonny Storm',
        alias: 'Tocha Humana',
        team: ['Quarteto'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {
        before(function () {
            cy.postCharacter(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)
            })

        })

        it('Deve remover o personagem pelo id', function () {
            const id = Cypress.env('characterId')
            cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)

            })

        })
    })

    it('Deve retornar 404 ao remover por id não cadastrado', function () {
        const id = '62cf2723aed38c1b46008bbd'
        cy.getCharacterById(id).then(function (response) {
            expect(response.status).to.eql(404)
        })

    })
})