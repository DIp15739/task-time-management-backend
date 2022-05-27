import { Request, Response } from "express";
import { connect } from "../database";

export function welcomeUser(req: Request, res: Response) {
  return res.status(200).send("Welcome User");
}

export async function getUser(req: Request, res: Response) {
  const conn = await connect();
  try {
    const getUsers = await conn.query("Select * FROM user");
    res.status(200).json(getUsers?.[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}

export async function addUser(req: Request, res: Response) {
  const conn = await connect();
  try {
    await conn.query("INSERT INTO user SET ?", [req.body]);

    const getUsers = await conn.query("Select * FROM user");

    res
      .status(200)
      .json({ message: "User added successfully", users: getUsers?.[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}

export async function removeUser(req: Request, res: Response) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM user where id=?", [req.body.id]);

    const getUsers = await conn.query("Select * FROM user");

    res
      .status(200)
      .json({ message: "User removed successfully", users: getUsers?.[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}
