# Google Sheet 表单接收设置

目标：让网站表单提交后自动进入 Google Sheet。

## 1. 创建 Google Sheet

创建一个新的 Google Sheet，建议命名：

`Sizzle Yard Hibachi Leads`

## 2. 打开 Apps Script

在 Google Sheet 里：

Extensions -> Apps Script

把 [google_apps_script_form_receiver.gs](/Users/sizzlesocial/Documents/yard%20hibachi/google_apps_script_form_receiver.gs) 的内容复制进去。

## 3. 部署为 Web App

Apps Script 右上角：

Deploy -> New deployment -> Web app

设置：

- Execute as: Me
- Who has access: Anyone

部署后复制 Web App URL。

## 4. 当前网站配置

2026-07-08 更新：网站运行配置已移到 [script.js](/Users/sizzlesocial/Documents/yard%20hibachi/script.js)，不再依赖 `config.js`，避免广告拦截器阻挡表单和 tracking 配置。

当前已接入 Web App URL：

```js
formEndpoint: "https://script.google.com/macros/s/AKfycbwbIBuKgH286c8RTI8ebXUv90wqgo2p81oszPZNvNB4NO94NXmOXqeo-lsPLR0ykSglZg/exec"
```

如以后更换 Google Sheet / Apps Script，只改 `script.js` 里的 `formEndpoint`。

## 5. 电话信息

当前已设置为：

```js
phoneDisplay: "(626) 681-5258",
phoneE164: "+16266815258",
```

## 6. 测试

打开网站，提交一条测试 lead。确认：

- 页面跳到 `thank-you.html`
- Google Sheet 出现新行
- 电话和短信按钮打开正确号码

2026-07-08 已完成线上测试：测试 lead 成功写入 `Sizzle Yard Hibachi Leads`，验证后已删除测试行。
