import { Request, Response, response } from "express";
import knex from "../database/connection";

class PointsController {
  async create(req: Request, res: Response) {
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

    const trx = await knex.transaction();

    const point = {
      image:
        "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=325&q=40",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const inserted = await trx("points").insert(point);
    const point_id = inserted[0];

    const pontItems = items.map((item_id: Number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pontItems);

    await trx.commit();

    res.json({
      id: point_id,
      ...point,
    });
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    res.json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found." });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("items.title");

    res.json({ point, items });
  }
}

export default PointsController;
