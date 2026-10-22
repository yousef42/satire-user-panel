import React, { useState } from "react";

export default (symbol) => {
  var script = document.createElement("script");
  script.src =
    "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
  script.type = "text/javascript";
  script.innerHTML = JSON.stringify({
    colorTheme: "dark",
    dateRange: "3M",
    showChart: true,
    locale: "EN",
    largeChartUrl: "",
    isTransparent: true,
    showSymbolLogo: false,
    width: "270",
    height: "200",
    plotLineColorGrowing: "rgba(250,70,22,0.6)",
    plotLineColorFalling: "rgba(250,70,22,0.6)",
    gridLineColor: "rgba(42, 46, 57, 0)",
    scaleFontColor: "rgba(120, 123, 134, 0)",
    belowLineFillColorGrowing: "rgba(234,228,225,0.3)",
    belowLineFillColorFalling: "rgba(234,228,225,0.3)",
    symbolActiveColor: "#FA4616",
    tabs: [
      {
        title: "Bonds",
        symbols: [
          {
            s: "BINANCE:" + symbol,
          },
        ],
        originalTitle: "Bonds",
      },
    ],
  });

  document.getElementById(symbol).appendChild(script);
};
