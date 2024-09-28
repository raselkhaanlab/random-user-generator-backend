const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { regions } = require("./configs/regions");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/api/regions-locales", (req, res) => {
  try {
    const supportedRegions = Object.keys(regions);
    const supportedLocales = Object.values(regions);
    return res.json({
      regionsLocales: regions,
      regions: supportedRegions,
      locale: supportedLocales,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 500, message: e?.message || "Something went wrong" });
  }
});

app.get("/", (_, res) => res.json({ status: 200, message: "server running" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
