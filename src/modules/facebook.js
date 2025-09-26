const axios = require("axios");
require("dotenv").config();

const fbCapiBaseUrl = `https://graph.facebook.com/v20.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.FB_PIXEL_ACCESS_TOKEN}`;

const facebookEventHandler = async (req, res) => {
  try {
    const referer = req.get("referer");
    const eventTestCode = process.env.FB_EVENT_TEST_CODE;
    const url = fbCapiBaseUrl;
    const xForwardedFor = req.headers["x-forwarded-for"];
    const clientIp = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor?.split(",")[0] || req.socket.remoteAddress;

    // ✅ Extract User-Agent
    const userAgent = req.headers["user-agent"];

    const body = {
      data: [
        {
          event_name: req.params.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: req.params.eventId,
          event_source_url: referer || null,
          action_source: "website",
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            // em: [
            //   "309a0a5c3e211326ae75ca18196d301a9bdbd1a882a4d2569511033da23f0abd",
            // ],
            // ph: [
            //   "254aa248acb47dd654ca3ea53f48c2c26d641d23d7e2e93a1ec56258df7674c4",
            //   "6f4fcb9deaeadc8f9746ae76d97ce1239e98b404efe5da3ee0b7149740f89ad6",
            // ],
            fbc: req.cookies._fbc || null,
            fbp: req.cookies._fbp || null,
          },
          //   custom_data: {
          //     value: 100.2,
          //     currency: "USD",
          //     content_ids: ["product.id.123"],
          //     content_type: "product",
          //   },
          opt_out: false,
        },
      ],
    };

    if (eventTestCode) {
      body.test_event_code = eventTestCode;
    }

    const fbResponse = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(fbResponse.data);

    res.status(200).json({ success: true, message: "Tracking success." });
  } catch (error) {
    if (error.response) {
      // The request was made, and Facebook responded with an error
      console.error("❌ FB API error:", error.response.data);
      console.error("📌 Status:", error.response.status);
      console.error("📌 Headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response received
      console.error("⚠️ No response from FB:", error.request);
    } else {
      // Something else went wrong
      console.error("🚨 Error setting up request:", error.message);
    }

    res.status(500).json({ success: false, message: "Failed to track." });
  }
};

module.exports = { facebookEventHandler };
