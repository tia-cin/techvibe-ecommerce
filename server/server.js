const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require("stripe")(
  "sk_test_51LqFYzENi5vsUdl188ugvsytoeQVvq0XPQKyLEZFQMzb1Dkw7uKiR3QzkEv3eoKYiu8L7KiVtBD86HFyTuqumADF00Ru0Gfppi"
);

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await stripe.checkout.session.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
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
