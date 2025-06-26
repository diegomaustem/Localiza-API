import { Router } from "express";

const routes = Router();

routes.get("/usuarios", (req, res) => {
  res.send("List of users");
});

routes.post("/usuario", (req, res) => {
  const user = req.body;
  res.status(201).send(`User ${user.name} created`);
});

export default routes;
