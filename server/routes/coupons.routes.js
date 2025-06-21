import express from "express";
const router = express.Router();

const coupons = [
  { codigo: "DISCOUNT10", discount: 10, activo: true },
  { codigo: "DISCOUNT20", discount: 20, activo: true },
];

router.get("/validar", (req, res) => {
  const { codigo } = req.query;
  const coupon = coupons.find(
    (c) => c.codigo === codigo?.toUpperCase() && c.activo
  );
  if (coupon) {
    res.json({ valido: true, discount: coupon.discount });
  } else {
    res.json({ valido: false });
  }
});

export default router;