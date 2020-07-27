import { Request, Response } from "express";
import knex from "../database/connection";

interface Item {
  id: number;
  title: string;
  image: string;
}

class ItemsController {
  async index(req: Request, res: Response) {
    const items: Item[] = await knex("items").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.15.5:3333/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }

  async create(req: Request, res: Response) {
    const { title } = req.body;

    const item = {
      image: req.file.filename,
      title,
    };

    const inserted = await knex("items").insert(item);

    res.json({
      inserted,
    });
  }
}

export default ItemsController;
