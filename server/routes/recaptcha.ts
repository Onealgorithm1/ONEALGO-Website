import { Request, Response } from "express";

export async function handleVerifyRecaptcha(req: Request, res: Response) {
  try {
    const token = req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({ success: false, message: "Missing token" });
    }

    // Handle bypass token for when reCAPTCHA fails to load
    if (token === "bypass-recaptcha-error") {
      console.log("reCAPTCHA bypass used due to loading error");
      return res.json({
        success: true,
        bypass: true,
        message: "Verification bypassed due to reCAPTCHA loading error"
      });
    }

    const secret = process.env.RECAPTCHA_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({ success: false, message: "Recaptcha secret not configured" });
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await r.json();

    // data.success is boolean for v2
    if (data.success) {
      return res.json({ success: true, score: data.score, data });
    }

    return res.status(400).json({ success: false, data });
  } catch (error: any) {
    console.error("Recaptcha verification error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
