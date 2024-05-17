const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");

////////////////////////改以下參數即可////////////////////////
//一、選擇帳號，是否為測試環境
const MerchantID = "3002607"; //必填
const HashKey = "pwFHCqoQZGmho4w6"; //3002607
const HashIV = "EkRm7iFT261dpevs"; //3002607

let isStage = true;
const PlatformID = "";

// 二、Data 內的所有參數
let Data = {
  MerchantID: MerchantID,
  PlatformID: PlatformID,
  RememberCard: 0,
  PaymentUIType: 2,
  ChoosePaymentList: 1,
  OrderInfo: {
    MerchantTradeNo: "20240516aaa1",
    MerchantTradeDate: "2024/05/16 16:30:00",
    TotalAmount: 100,
    ReturnURL: "https://e60d-211-23-76-78.ngrok-free.app/AAAAA/returnurl.php",
    TradeDesc: "TestDesc",
    ItemName: "TestItemName",
  },
  CardInfo: {
    OrderResultURL: "https://e60d-211-23-76-78.ngrok-free.app/AAAAA/orderresultrurl.php",
  },
  ConsumerInfo: { Email: "customer@email.com" },
};

////////////////////////以下不用改////////////////////////
const stage = isStage ? "-stage" : "";
const APIURL = `https://ecpg${stage}.ecpay.com.tw/Merchant/GetTokenbyTrade`;
const algorithm = "aes-128-cbc";

// 加密函數
function encryptData(data, key, iv) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

// 解密函數
function decryptData(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

(async () => {
  try {
    let URLEncoded = encodeURIComponent(JSON.stringify(Data));
    let EncryptedData = encryptData(URLEncoded, HashKey, HashIV);

    const parameters = {
      PlatformID: PlatformID,
      MerchantID: MerchantID,
      RqHeader: {
        Timestamp: Math.floor(Date.now() / 1000),
      },
      Data: EncryptedData,
    };

    const response = await axios.post(APIURL, parameters);
    const ToBeDecrypted = response.data.Data;
    let DecryptedData = decryptData(ToBeDecrypted, HashKey, HashIV);

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>顯示文本</title>
</head>
<body>
<h1>綠界回傳：</h1>
    <p>${JSON.stringify(response.data, null, 2)}</p>
<h1>Data 解密後：</h1>
<p>${decodeURIComponent(DecryptedData)}</p>
</body>
</html>
`;
    const filePath = "output.html";
    fs.writeFile(filePath, htmlContent, async (err) => {
      if (err) throw err;
      console.log("HTML檔案已創建");
      const open =await import('open');
      open.default(filePath).catch((err) => console.error(err));
    });
  } catch (error) {
    console.error(error);
  }
})();
