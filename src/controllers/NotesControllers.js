const knex = require('../database/knex/index');

class NotesController {
    async create(request, response){
        const {title, description, tags, links} = request.body;
        const {user_id} = request.params;

        //Inserindo a nota
        const note_id = await knex("notes").insert({
            title,
            description,
            user_id
        });

        //Inserindo os links
        const linksInsert = links.map(link => {
            return {
                note_id,
                url: link
            }
        });

        await knex("links").insert(linksInsert);

        //Inserindo os Tags
        const tagsInsert = tags.map(name => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();

    }   
}

module.exports = NotesController;