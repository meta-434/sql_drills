const ShoppingListService = {
    //create => insert
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => rows[0]);
    },
    //read => select
    getAllItems(knex) {
        return knex
            .select('*')
            .from('shopping_list');
    },
    getById(knex, id) {
        return knex
            .select('*')
            .from('shopping_list')
            .where('id', id)
            .first();
    },
    //update => update
    updateItem(knex, id, newData) {
        return knex('shopping_list')
            .where({id})
            .update(newData);
    },
    //delete => delete
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({id})
            .delete();
    }
};

module.exports = ShoppingListService;