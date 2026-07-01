# Sizzle Yard Hibachi 广告追踪计划

## 主要转化

Primary conversions:

- `lead_form_submit`
- `phone_click`
- `sms_click`
- `deposit_click`

## 推荐 GA4 Events

| Event name | Trigger | Purpose |
|---|---|---|
| `lead_form_submit` | 表单提交并到达 thank-you 页面 | Google Ads 主转化 |
| `phone_click` | 点击 Call 按钮 | 电话线索 |
| `sms_click` | 点击 Text 按钮 | 短信线索 |
| `check_date_click` | 点击 Check Date / Check Availability | 页面兴趣 |
| `pricing_view` | 滚动到 pricing 区域 | 价格兴趣 |
| `faq_open` | 打开 FAQ | 犹豫/比较信号 |

## Google Ads 转化建议

主转化：

- Thank-you page visit

辅助转化：

- Phone click
- SMS click

## 网站端已预留的配置

打开 [config.js](/Users/sizzlesocial/Documents/yard%20hibachi/config.js)，填入：

```js
googleTagId: "G-XXXXXXXXXX",
googleAdsConversionId: "AW-XXXXXXXXXX",
googleAdsLeadConversionLabel: "lead conversion label",
googleAdsPhoneConversionLabel: "phone conversion label",
googleAdsSmsConversionLabel: "sms conversion label"
```

如果 Google Ads 只给了一个 `AW-XXXXXXXXXX/label`，前半段填到 `googleAdsConversionId`，斜杠后面的 label 填到对应的 `googleAdsLeadConversionLabel`。

当前网站脚本已经会追踪：

- 表单提交
- thank-you 页面访问
- 电话点击
- 短信点击
- deposit 点击
- check date 点击

## 第一版 UTM 规范

Google Search:

```text
utm_source=google
utm_medium=cpc
utm_campaign=birthday_hibachi_la
utm_term={keyword}
utm_content={creative}
```

Meta / Instagram:

```text
utm_source=meta
utm_medium=paid_social
utm_campaign=birthday_hibachi_la
utm_content={{ad.name}}
```

## 每天看什么

- Spend
- Clicks
- CTR
- Cost per click
- Form submits
- Phone clicks
- SMS clicks
- Qualified leads
- Deposits paid
- Booked revenue

## 先不要过度优化

前 30 天最重要的是确认：

- 哪些城市有真实需求
- 哪些关键词带来生日客户
- `$60/person` 是否能稳定成交
- 客户是否接受 10 guest minimum
- add-ons 是否能提高客单价
