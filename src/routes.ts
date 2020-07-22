import express, { response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (req, resp) => {
  const items = await knex('items').select('*');

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/:${item.image}`,
    };
  });

  return resp.json(serializedItems);
});

routes.post('/points', async (req, res) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = req.body;

  const ids = await knex('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const pontItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id: ids[0],
    };
  });

  await knex('point_items').insert(pontItems);

  response.json({ sucess: true });
});

export default routes;
