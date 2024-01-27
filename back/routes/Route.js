const { Router } = require("express");

const D2players = require("../models/D2players");


const router = Router();

router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const skipNumberOfItems = (page - 1) * limit;

  const numberOfItems = await D2players.countDocuments();

  const totalPages = Math.ceil(numberOfItems / limit);

  const d2players = await D2players.find().skip(skipNumberOfItems).limit(limit);

  const isPrev = page > 1;
  const isNext = page < totalPages;

  const responseObject = {
    isNext,
    isPrev,
    numberOfPages: totalPages,
    data: d2players,
  };

  res.json(responseObject);
});

router.get("/:d2playersId", async (req, res) => {
  const { d2playersId } = req.params;

  const thisd2playersId = await Manga.findById(d2playersId);

  res.json(thisd2playersId);
});

router.post("/", async (req, res) => {
  const data = req.body;

  if (!data.title) {
    throw new Error("No title has passed");
  }

  const newD2players = new D2players({
    ...data,
  });

  const dbResponse = await newD2players.save();

  res.json({ status: "ok", data: dbResponse });
});

router.delete("/:d2playersId", async (req, res) => {
  const { d2playersId } = req.params;

  const dbResponse = await Manga.deleteOne({ _id: d2playersId });

  res.json({ status: "ok", data: dbResponse });
});
module.exports = router;
