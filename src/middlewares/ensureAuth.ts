import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ error: "Missing Token" });
  }

  const [, token] = authToken.split(" ");
  try {
    const { sub } = verify(
      token,
      "f635e1d3b45e50b96b572ea3be47c923"
    ) as IPayload;

    req.user_id = sub;

    return next();
  } catch {
    return res.status(401).json({ error: "Invalid Token" });
  }
}
