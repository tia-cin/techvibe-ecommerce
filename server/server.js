const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true, credentials: true }));

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const stripe = require("stripe")(
  "sk_test_51LqFYzENi5vsUdl188ugvsytoeQVvq0XPQKyLEZFQMzb1Dkw7uKiR3QzkEv3eoKYiu8L7KiVtBD86HFyTuqumADF00Ru0Gfppi"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.session.create({
      line_items: req.body.items.map((item) => ({
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      })),
      mode: "payment",
      success_url: "http://localhost:4201/success.html",
      cancel_url: "http://localhost:4201/cancel.html",
    });

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4201, () => console.log("Server is running in port 4201"));
