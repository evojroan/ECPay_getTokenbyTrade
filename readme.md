# 綠界金流站內付 2.0 廠商驗證碼
## 這是什麼？
本程式能夠取得綠界金流站內付 2.0 中，產生付款畫面所需的廠商驗證碼 (token)。

## 什麼是站內付 2.0？
綠界科技提供的金流服務共有「全方位金流」與「站內付 2.0」。
兩者的差別是，全方位金流於結帳時頁面會導轉到其專屬的付款頁面；站內付 2.0 則不用導轉到付款頁面，而是將付款畫面嵌入您的網站頁面內。

[站內付 2.0](https://developers.ecpay.com.tw/?p=8972) 的運作流程：
1. [呼叫「取得廠商驗證碼 / 付款」API，取得廠商驗證碼 (token)](https://developers.ecpay.com.tw/?p=9040)
2. [將該 Token 帶入 SDK 的 ECPay.createPayment，取得付款畫面](https://developers.ecpay.com.tw/?p=9003)
3. [於付款畫面付款完畢後，取得 PayToken](https://developers.ecpay.com.tw/?p=9008)
4. [將 PayToken 呼叫「付款 / 建立交易」API，完成付款](https://developers.ecpay.com.tw/?p=9053)

本程式僅完成前述第 1 步驟，取得 Token。

## 如何使用本程式？
 1. 請先確定有安裝 Node.js 以及以下套件：
``npm install crypto axios fs open``

 2. 執行 app.js，到「改以下參數即可」修改帳號、金鑰與 Data 參數。所有參數請參考[技術文件](https://developers.ecpay.com.tw/?p=9040)。
 
 3. 執行本程式碼後，會以瀏覽器自動展示結果，並取得 Token。

## 本程式使用的技術
JavaScript、Node.js、Axios、Restful API、AES 加解密。

## 本程式介紹文章
[Medium](https://medium.com/@roan6903/ecpay-gettokenbytrade-bac6be42294f)

## 本程式作者其他與綠界相關的程式 
1. 綠界科技全方位金流串接範例 
- [GitHub](https://github.com/evojroan/ECPay_AioCheckout) 
- [Medium](https://medium.com/@roan6903/ecpay-aioexampple-37073ceeb853) 

2. 電子發票前置作業與資料驗證 
- [GitHub](https://github.com/evojroan/ECPAy_EInvoice_Data_Verification) 
- [Medium](https://medium.com/@roan6903/ecpay-einvoice-data-verification-cbd212cb6d63) 

3. 綠界檢查碼與加密產生器
- [Github](https://github.com/evojroan/ECPay_CMVAEStools)
- [Medium](https://medium.com/@roan6903/hash-and-aes-encrypt-4229c1ba71a5)

## 本程式作者
Roan，專長是碎碎念。 
- [Roan 的網誌](https://medium.com/@roan6903) 
- [Roan 的 GitHub](https://github.com/evojroan) 
