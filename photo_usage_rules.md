# Sizzle Yard Hibachi 素材使用规则

更新日期：2026-07-07

## 绝对不能直接使用

- Sizzle Social Hibachi 公司已经使用过的图片或视频。
- Sizzle Yard Hibachi 前一年已经用过、且客户可能记得的主视觉图片或视频。第二年素材要更新，不重复使用同一批主图或主视频。
- 图片或视频上出现 `Meet Hibachi` 字样、logo、衣服、banner、菜单、车辆贴纸等明显品牌标识的素材。
- 有小朋友清晰露脸的素材。
- 客户隐私明显暴露的素材，例如家庭地址、车牌、电话号码、私人文件、未授权客人正脸特写。
- 画面火焰过大、动作危险、桌面距离不清楚，容易让客户觉得不安全的素材。
- 太像高端私厨、餐厅广告、厨师个人秀的素材。Sizzle Yard 的主体应该是 birthday party 和客户开心互动。

## 可考虑二次处理后使用

### Sizzle Social 文件夹里未使用过的素材

可以考虑给 Sizzle Yard 使用，但必须同时满足以下条件：

- 没有被当前 Sizzle Social 网站页面引用。
- 没有出现在 Sizzle Social 的已上线广告、Google Business Profile、菜单图、社媒主素材或客户已看过的主视觉里。
- 没有 Sizzle Social logo、电话、菜单、二维码、制服、桌牌、旧品牌水印。
- 画面气质适合 Sizzle Yard：生日、后院、party、客户开心、安全小火 moment。
- 经过人工审核后，复制到 Sizzle Yard 自己的文件夹，不能直接从 Sizzle Social 路径引用。

使用流程：

1. 先用 `python3 scripts/audit_media_overlap.py --list-social-unused` 找候选素材。
2. 人工确认它确实没有被 Sizzle Social 使用过，且有使用权。
3. 复制到 `media/approved-yard-only/imported-from-social-unused/`。
4. 优化后放到 `media/optimized-web/` 或网站 `assets/` 目录。
5. 文件名改为 `sizzle-yard-...`，并在 `media/source_manifest.csv` 记录原始来源、审核状态和用途。
6. Yard 页面只引用 Yard 文件夹里的副本，不引用 `/Users/sizzlesocial/Documents/hibachi/...` 原路径。

### 出现 Meet Hibachi 字样

默认不用。

只有在确认满足以下条件时，才考虑编辑后使用：

- 原始素材是你自己拍摄或你有使用权。
- 不是竞争对手或第三方拥有版权的宣传素材。
- 画面主体适合 Sizzle Yard Hibachi。
- 可以彻底去掉旧文字、旧 logo 或旧品牌露出。

处理方式：

- 裁切掉旧标识。
- 遮挡旧标识。
- 替换为 `Sizzle Yard Hibachi`。
- 如果无法自然处理，直接弃用。

### 有小朋友

默认不用。

只有在画面特别有价值时，才考虑处理后使用：

- 模糊小朋友脸部。
- 避免使用单独特写。
- 优先使用背影、远景、手部、桌面、火焰、chef、食物等不暴露身份的画面。

## 优先使用的素材

- 小型、可控、适合家庭派对观感的 fire moment。
- Chef cooking。
- 后院桌子和 setup。
- 成人生日主角互动。
- 客人围坐但不暴露隐私的广角画面。
- 食物近景。
- Grill、工具、sauce、fried rice、protein 的清晰画面。
- 带 `Sizzle Yard Hibachi` logo 的 banner、围裙、菜单或桌牌。
- 跳舞、小游戏、唱生日歌、举手机拍摄、朋友鼓掌等 party 气氛画面。

## 视频使用规则

- 首页背景视频只使用 Sizzle Yard Hibachi 专属素材，不用 Sizzle Social 或其他品牌素材。
- 视频优先展示客户开心、后院氛围、食物和安全的小火 moment，不要 80% 都是厨师和火。
- 网站视频建议控制在 5-15 秒，静音、循环、压缩后再上线。
- 手机端必须有 poster 图片兜底，视频加载失败时不能白屏。
- 没有真实 Yard 视频前，不在网站上做假播放按钮，不让客户误以为图片可以播放。
- 每条视频上线前检查：品牌标识、电话、菜单、二维码、客户脸部、儿童隐私、火焰安全感、素材是否曾被 Sizzle Social 使用。

## 文件夹规则

- 原始 AirDrop 文件放在 `media/raw-inbox`
- 已审核可用素材放在 `media/approved-yard-only`
- 从 Sizzle Social 文件夹挑出的未使用素材放在 `media/approved-yard-only/imported-from-social-unused`
- 压缩优化后素材放在 `media/optimized-web`
- 被拒绝但需要留档的素材放在 `media/rejected-do-not-use`
- 所有外部/跨项目来源必须记录在 `media/source_manifest.csv`
- 不可用或需谨慎素材不要放进网站目录

## 上线前检查

每次把图片或视频放进网站前，必须确认：

- 这是 Sizzle Yard Hibachi 项目，不是 Sizzle Social Hibachi。
- 没有 Sizzle Social logo、旧电话、旧菜单、旧二维码、旧广告素材。
- 没有未经授权的客户正脸特写或儿童清晰露脸。
- 没有明显家庭地址、车牌、隐私文件。
- 画面符合 Sizzle Yard：生日、后院、party、开心、安全、小火 moment。
- 文件名使用 `sizzle-yard-` 前缀，避免以后混淆。
- 如果来源是 Sizzle Social 文件夹里的未使用素材，必须确认已经复制到 Yard 文件夹并写入 `media/source_manifest.csv`。

## 最终原则

宁可少用，也不要用有版权、品牌混淆、儿童隐私或客户隐私风险的素材。
