const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(express.static(process.cwd() + "/angular-stocks/dist/angular-stocks/"));

const PORT = process.env.PORT || 8080; //process.env on a server
const TIINGO_TOKEN = "a31bb36383e10189e5a21467111d017951da9a60";
NEWS_TOKEN = "03c21d7ade98416ab898aecdbd7dc5e0";

app.get("/api/autocomplete", (req, res) => {
  query = req.query.search;
  if (query) {
    axios
      .get(
        "https://api.tiingo.com/tiingo/utilities/search?query=" +
          query +
          "&token=" +
          TIINGO_TOKEN
      )
      .then(function (response) {
        const tickers_name = response.data.map(({ ticker, name }) => ({
          ticker,
          name,
        }));
        res.json(tickers_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    axios
      .get(
        "https://api.tiingo.com/tiingo/utilities/search?query=" +
          query +
          "&token=" +
          TIINGO_TOKEN
      )
      .then(function (response) {
        const tickers_name = {};
        res.json(tickers_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});

// app.post("/api/stocklist", (req, res) => {
//   var stockList = [];
//   for (var i = 0; i < req.body.length; i++) {
//     ticker = req.body[i];
//     axios
//       .all([
//         axios.get(
//           "https://api.tiingo.com/tiingo/daily/" +
//             ticker +
//             "?token=" +
//             TIINGO_TOKEN
//         ),
//         axios.get(
//           "https://api.tiingo.com/iex/?tickers=" +
//             ticker +
//             "&token=" +
//             TIINGO_TOKEN
//         ),
//       ])
//       .then(
//         axios.spread((desc, lastPrice) => {
//           var stock = {
//             ...desc.data,
//             ...lastPrice.data[0],
//           };
//           stockList.push(stock);

//           if (stockList.length === req.body.length) {
//             res.json(stockList);
//           }
//         })
//       )
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// });

app.get("/api/stocklist", (req, res) => {
  var stockList = [];
  tickerList = req.query.ticker;

  if (!Array.isArray(tickerList)) {
    ticker = tickerList;
    axios
      .get("https://api.tiingo.com/iex/" + ticker + "?token=" + TIINGO_TOKEN)
      .then(function (response) {
        stockList.push(response.data[0]);
        res.json({ stocks: stockList });
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    for (var i = 0; i < tickerList.length; i++) {
      ticker = tickerList[i];
      axios
        .get(
          "https://api.tiingo.com/iex/?tickers=" +
            ticker +
            "&token=" +
            TIINGO_TOKEN
        )
        .then((response) => {
          stockList.push(response.data[0]);
          if (stockList.length === tickerList.length) {
            res.json({ stocks: stockList });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
});

app.get("/api/details", (req, res) => {
  ticker = req.query.ticker;
  axios
    .all([
      axios.get(
        "https://api.tiingo.com/tiingo/daily/" +
          ticker +
          "?token=" +
          TIINGO_TOKEN
      ),
      axios.get(
        "https://api.tiingo.com/iex/?tickers=" +
          ticker +
          "&token=" +
          TIINGO_TOKEN
      ),
    ])
    .then(
      axios.spread((desc, lastPrice) => {
        var stockDetails = {
          ...desc.data,
          ...lastPrice.data[0],
        };
        res.json(stockDetails);
      })
    )
    .catch(function (error) {
      res.json("invalid_ticker");
      console.log(error);
    });
});

app.get("/api/news", (req, res) => {
  ticker = req.query.ticker;
  axios
    .get(
      "https://newsapi.org/v2/everything?apiKey=" + NEWS_TOKEN + "&q=" + ticker
    )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/api/charts_daily", (req, res) => {
  date = req.query.date.slice(0, 10);
  //console.log(date);
  ticker = req.query.ticker;
  axios
    .get(
      "https://api.tiingo.com/iex/" +
        ticker +
        "/prices?startDate=" +
        date +
        "&resampleFreq=4min&token=" +
        TIINGO_TOKEN
    )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/api/charts2", (req, res) => {
  let today = new Date();
  today.setFullYear(today.getFullYear() - 2);
  date = today.toISOString().slice(0, 10);
  console.log(date);
  // date = req.query.date;
  ticker = req.query.ticker;
  console.log(ticker);

  axios
    .get(
      "https://api.tiingo.com/iex/" +
        ticker +
        "/prices?startDate=" +
        date +
        "&resampleFreq=12hour&token=" +
        TIINGO_TOKEN +
        "&columns=open,high,low,close,volume"
    )
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("*", (req, res) => {
  res.sendFile(
    process.cwd() + "/angular-stocks/dist/angular-stocks/index.html"
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
