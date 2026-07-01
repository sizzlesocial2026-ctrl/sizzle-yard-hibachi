# Google Ads / 商家页面接入说明

## 我现在可以直接接的网站端

已经完成：

- 电话：`(626) 366-4111`
- 地址：`317 S Covina Blvd, La Puente, CA 91746-2211`
- Stripe deposit link
- Google Ads / GA4 tracking 配置位
- 表单提交事件
- thank-you 转化页
- 电话点击事件
- 短信点击事件
- deposit 点击事件

## 还需要从 Google Ads 后台拿到的信息

需要以下任意一种：

1. Google tag ID，例如 `G-XXXXXXXXXX`
2. Google Ads conversion ID，例如 `AW-XXXXXXXXXX`
3. Lead form conversion label
4. Phone click conversion label
5. SMS click conversion label

拿到后填入 [config.js](/Users/sizzlesocial/Documents/yard%20hibachi/config.js)。

## 当前后台检查状态

已尝试打开 Google Ads 转化页面。

看到的账号标题：

`转化操作 - sizzle social - Google Ads`

当前阻碍：

Google Ads 页面提示需要关闭 ad blocker，否则无法正常使用后台页面。

下一步：

- 在 Chrome 里对 `ads.google.com` 暂时关闭广告拦截器；或
- 直接从 Google Ads 后台复制 `AW-...` 和 conversion label 给我。

我不需要你的账号密码，也不会改广告预算或提交后台设置，除非你明确确认。

## Google Business Profile 建议链接

商家页面 Website URL 建议先放：

`https://你的域名/`

如果你先用静态页面或临时域名测试，Google Business Profile 里也可以先放临时落地页链接，等正式域名上线后再换。

## Google Ads 落地页建议

第一阶段不要把所有广告都进首页，建议：

- Birthday keywords -> `/birthday-hibachi-los-angeles.html`
- Pasadena keywords -> `/hibachi-at-home-pasadena.html`
- Arcadia keywords -> `/mobile-hibachi-arcadia.html`
- General keywords -> `/index.html`

## 我需要你确认的后台信息

- Google Ads account 是否已经有 conversion actions
- 是否已经有 GA4 property
- Google Business Profile 的 Website URL 现在是什么
- Ads 现在投向哪个网页
- 是否已有 Sizzle Yard Hibachi 专用域名

## Google Business Profile 当前发现

检查日期：2026-06-30

已在 Google 搜索的“我的商家”模块看到：

```text
Business name: Sizzle Yard Hibachi – Hibachi at Home Los Angeles
Status: 不公开显示 / 需要更多信息来验证管理权
Category: 饮食服务人员
Service area: Irvine, San Diego, and 4 other areas
Hours: 10:00-22:00
Phone shown: (626) 366-4111
Website shown: https://hibachi-at-home-la.carrd.co/
```

需要后续确认/更新：

- 网站、Google Business Profile、广告落地页电话统一为 `(626) 366-4111`
- 是否把 website 从 Carrd 换成 Vercel 正式网站
- 完成 Google Business Profile 验证
- 补充服务区域、照片、菜单、服务项和 posts
