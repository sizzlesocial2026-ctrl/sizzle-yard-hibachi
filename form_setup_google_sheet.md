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

## 4. 填入网站配置

打开 [config.js](/Users/sizzlesocial/Documents/yard%20hibachi/config.js)，把：

```js
formEndpoint: ""
```

替换成：

```js
formEndpoint: "你的 Web App URL"
```

## 5. 电话信息

当前已设置为：

```js
phoneDisplay: "(626) 366-4111",
phoneE164: "+16263664111",
```

## 6. 测试

打开网站，提交一条测试 lead。确认：

- 页面跳到 `thank-you.html`
- Google Sheet 出现新行
- 电话和短信按钮打开正确号码
