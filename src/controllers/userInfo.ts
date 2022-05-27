import { Request, Response } from "express";
import { connect } from "../database";

export function welcomeUserInfo(req: Request, res: Response) {
  return res.status(200).send("Welcome User Info");
}

export async function getUserInfo(req: Request, res: Response) {
  const conn = await connect();
  try {
    const getUserInfo = await conn.query("Select * FROM user_info");
    res.status(200).json(getUserInfo?.[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}

export async function addUserInfo(req: Request, res: Response) {
  const conn = await connect();
  try {
    await conn.query("INSERT INTO user_info SET ?", [req.body]);

    const getUserInfo = await conn.query("Select * FROM user_info");

    res.status(200).json({
      message: "User Info added successfully",
      users: getUserInfo?.[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}

export async function updateUserInfo(req: Request, res: Response) {
  const conn = await connect();
  try {
    await conn.query(
      " UPDATE user_info SET user=?, date=?, hours=?, note=? WHERE id=?",
      [req.body.user, req.body.date, req.body.hours, req.body.note, req.body.id]
    );

    const getUserInfo = await conn.query("Select * FROM user_info");

    res.status(200).json({
      message: "User Info Updated successfully",
      users: getUserInfo?.[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}

export async function removeUserInfo(req: Request, res: Response) {
  const conn = await connect();
  try {
    await conn.query("DELETE FROM user_info where id=?", [req.body.id]);

    const getUsersInfo = await conn.query("Select * FROM user_info");

    res
      .status(200)
      .json({ message: "User removed successfully", users: getUsersInfo?.[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error,
    });
  } finally {
    conn.end();
  }
}
