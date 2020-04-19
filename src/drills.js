require('dotenv').config();
const knex = require('knex');


const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

function searchByTerm (searchParameter) {
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchParameter}%`)
        .then(results => {
            console.log('results: ', results);
        });
}

//searchByTerm('bacon');

function getItemsPaginated (pgNum) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(6)
        .offset(6 * (pgNum - 1))
        .then(result => {
            console.log('result', result);
        });
}

//should return the second 6 items
//getItemsPaginated(2);

function getItemsAfterDate (daysAgo) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log('result: ', result);
        });
}

//getItemsAfterDate(3);

function getTotalCategoryCosts() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price')
        .then(result => {
            console.log(result)
        })
}

getTotalCategoryCosts();