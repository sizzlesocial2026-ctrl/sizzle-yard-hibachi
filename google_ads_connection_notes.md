# Google Ads / 商家页面接入说明

## 我现在可以直接接的网站端

已经完成：

- 电话：`(626) 681-5258`
- 地址：`317 S Covina Blvd, La Puente, CA 91746-2211`
- Stripe deposit link
- Google Ads / GA4 tracking 配置位
- 表单提交事件
- thank-you 转化页
- 电话点击事件
- 短信点击事件
- deposit 点击事件

## 当前 Google Ads / tracking 状态（2026-07-08）

已完成：

- Google Ads account：`Sizzle Yard Hibachi 140-928-8080`
- Google Ads ID：`AW-18300535067`
- Lead form conversion label：`-udBCPKQj8scEJuCsJZE`
- Phone click conversion label：`ET_PCNLU-8scEJuCsJZE`
- SMS click conversion label：`zPsiCNXU-8scEJuCsJZE`
- 配置位置：`script.js`，不再依赖 `config.js`，避免广告拦截器阻挡 lead/tracking 配置。
- Campaign：`Sizzle Yard - Search Leads - SoCal` 已发布，campaign ID `24017259817`。2026-07-10 后台仍显示 `有效（受限）`。

## 当前后台检查状态

2026-07-08 已切换并确认 Yard Ads account：`Sizzle Yard Hibachi 140-928-8080`。

2026-07-10 继续检查并处理：

- Yard Ads account settings 里 `致电和短信广告条款` 已接受。
- Yard Ads account settings 里 `潜在客户表单广告条款` 已接受。
- Campaign `Sizzle Yard - Search Leads - SoCal` 仍显示 `有效（受限）`，诊断里还有：
  - `转化：检测到问题`
  - `缺少足够的相关关键字`
- Conversion actions 当时检查结果：
  - `提交潜在客户表单`：等待转化记录。
  - `Sizzle Yard - SMS Click`：等待转化记录。
  - `Sizzle Yard - Phone Click`：配置有误。
- 已修复网站端电话转化代码：`script.js` 现在按 Google Ads “网站访问带来的来电 / 从网站中拨打的来电”类型发送 `phone_conversion_number` 配置，不再把电话点击硬发成普通 Ads conversion event。
- 已重新部署 production，Vercel deployment `dpl_FjrbfNmX5GSr98AcYbehdt5XA51E`，alias 到 `https://sizzleyardhibachi.com`。
- 已在 Google Ads 建议里只采纳高相关新关键字，未采纳竞品词 `mr hibachi at home`。优化得分从 `86.9%` 提高到 `88.1%`。
  - 本轮明确选中：`in home hibachi chef near me`、`hibachi at home chef`、`birthday hibachi`、`hibachi at home`、`hibachi party`、`mobile hibachi near me`、`hibachi at your house`、`hibachi catering near me`、`hibachi outdoor party`。
  - 新关键词初始状态可能显示 `审核中`，需要等 Google 审核完成。
- 2026-07-10 继续优化广告素材：
  - 已添加 campaign callouts：`Backyard Hibachi`、`Chef & Grill Included`、`Easy Online Booking`、`LA & OC Private Chef`。优化得分从 `88.1%` 提高到 `90.5%`。
  - 已添加 6 个 sitelinks：`Check Date` -> `/#book`、`Pricing` -> `/#pricing`、`What's Included` -> `/#included`、`Service Areas` -> `/#areas`、`LA Birthday Hibachi` -> `/birthday-hibachi-los-angeles.html`、`Orange County Hibachi` -> `/orange-county-hibachi-at-home.html`。优化得分提高到 `90.6%`。
  - 已补充 3 个 responsive search ad headlines：`Hibachi At Home LA`、`Mobile Hibachi Near Me`、`Private Hibachi Chef LA`。优化得分提高到 `90.7%`。
- 2026-07-10 复查 conversion actions（修复前/刚修复后状态）：
  - `提交潜在客户表单`：`网站 / 等待转化记录`。
  - `Sizzle Yard - SMS Click`：`网站 / 等待转化记录`。
  - `Sizzle Yard - Phone Click`：来源显示 `电话号码点击`，数据源显示 `网站访问带来的来电 / 从网站中拨打的来电`，当时仍为 `配置有误`。网站端 `phone_conversion_number` 配置已部署，下一步等待 Google 重新检测或产生真实/测试电话转化信号。
- 2026-07-10 广告客户验证已完成：
  - 用 IRS EIN notice 信息创建/确认客户资料：`SIZZLE YARD HIBACHI`，`317 S Covina Blvd, La Puente, CA 91746-2211`，`United States`。
  - Google Ads 验证页显示 `验证完成`，广告披露预览为 `SIZZLE YARD HIBACHI / United States`。
  - 已确认账号中不包含欧盟政治广告。
  - 已回答客户广告付款方问题，广告付费方显示为 `SIZZLE YARD HIBACHI`，已清除原先显示 `Sizzle Social Hibachi` 的冲突。
- 2026-07-10 测试后复查：
  - Recommendations 里 `完成广告客户验证` 建议已消失，campaign 优化得分提高到 `94.3%`。
  - Conversion actions 具体列表显示三项均为 `等待转化记录`：`提交潜在客户表单`、`Sizzle Yard - SMS Click`、`Sizzle Yard - Phone Click`。
  - `Sizzle Yard - Phone Click` 不再显示 `配置有误`。当前还未记录到转化次数，Google Ads 仍显示 `0.00`，需要等待测试事件/真实事件入账。

当前仍需注意：

- Google Ads 页面仍提示 ad blocker 可能影响后台显示；如后续要继续深度调试转化诊断，建议在 Chrome 里对 `ads.google.com` 暂时关闭广告拦截器。
- Yard Google Business/Profile 管理页曾显示 Social 广告摘要/赞助预览；这可能只是同 Google 账号下的摘要展示，但需要单独核查，不能把 Social campaign 设置混入 Yard。
- 电话转化已从 `配置有误` 变成 `等待转化记录`；后续继续观察是否开始记录真实转化次数。
- 关键字建议仍有 `mr hibachi at home` 等竞品/需筛选词，不能点 `全部采纳`。后续只从实际 search terms / campaign diagnostics 里继续挑高相关 Yard 搜索词。
- 广告客户验证已完成，Recommendations 里验证建议已消失。
- `选择启用 Google 搜索合作伙伴网络` 仍是建议项，会扩大流量来源；当前未开启，避免在没有效果数据前放宽流量。

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

检查日期：2026-07-08

已在 Google 搜索/Google Maps 公开资料确认：

```text
Business name: Sizzle Yard Hibachi – Hibachi at Home Los Angeles
Status: 已验证，可公开管理
Category: 饮食服务人员
Service area: Irvine, San Diego, and 4 other areas（如不接 San Diego，后续需移除）
Hours: 10:00-22:00
Phone shown: (626) 681-5258
Website shown: https://sizzleyardhibachi.com/
Maps link: https://maps.app.goo.gl/HuKRDXf7StnUpv5q8?g_st=ic
```

需要后续优化：

- 补充/确认服务区域、照片、菜单、服务项和 posts。
- 收集第一批真实 Google reviews。
- 单独核查为什么 Yard 管理页会显示 Social 广告摘要/预览；不要在 Yard 工作流里修改 Social campaign。
