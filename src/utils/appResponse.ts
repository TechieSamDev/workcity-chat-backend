import { Response } from "express";

export function AppResponse(
  res: Response,
  data: {
    statusCode?: number;
    data: Record<string, string[]> | unknown | string | null;
    message: string;
  }
) {
  res.status(data.statusCode ?? 200).json({
    status: "success",
    data: data ?? null,
    message: data.message ?? "Success",
  });
}
