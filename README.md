# 小怪行囊 · Donlin Kit

AI、出海工具与自由生活实践。冬零小怪的数字生活指南。

面向第一次接触海外数字工具的中文读者。首页按基础账号、通信与内容平台、海外号码、VPS 与建站、AI 工具、支付与收款六类整理基础介绍、准备条件和常见问题。详细教程标注「文档待补充」，六篇早期 AI 资料稿保留在首页「早期文章」区域。

## 先读哪篇

1. [中国大陆上班族，如何选择适合自己的 AI 工具](articles/01-choose-ai_修正版.md)
2. [使用 AI 前，邮箱、账号和恢复方式怎么准备](articles/02-accounts_修正版.md)
3. [AI 工具订阅怎么付款，付款前检查什么](articles/03-payments_修正版.md)
4. [实例，用 AI 把技术资料整理成易读说明](articles/04-technical-case_修正版.md)
5. [实例，用 AI 完成一篇技术分享图文](articles/05-content-case_修正版.md)
6. [AI 使用常见问题，如何判断问题出在哪里](articles/06-troubleshooting_修正版.md)

网页入口是 [site/index.html](site/index.html)，本地双击即可阅读。完整计划见 [分阶段执行计划](plan/分阶段执行计划.md)，写作与证据边界见 [核查记录](editorial/写作与核查记录.md)。

## 状态说明

六篇是资料整理和教学稿，不代表作者已经完成真实工具横评、个人订阅测试、账号故障排查或四周实践。第 4、5 篇使用原创虚构教学卡，由助手演示，等待作者复现。实际问题记录初始为 0，不为凑十条编造故障。

## 如何更新

工具目录修改 content/navigation.json；首页布局由 homepage.cjs 生成，样式与交互分别在 assets/homepage.css、assets/homepage.js。修改后执行 node build.cjs，生成的 site/index.html 内嵌目录数据、样式和交互，可直接双击打开；旧文章的相对链接需与 site/articles/ 一起保留。首页默认跟随系统配色，手动选择保存在浏览器本地，禁用本地存储时仍可使用。

旧文章仍通过 content/articles.json 维护，构建时生成 articles/ 与 site/articles/。原始资料稿保留在 archive/research-drafts。没有第三方依赖，不需要安装包。官方截图放 assets/，配图 SVG 会由构建脚本重新生成。

若要本地预览，执行 node preview.cjs，再打开 http://127.0.0.1:4173/ 。仓库默认私人保存，不启用 GitHub Pages、公开发布或收款功能。

## 下一步

先选择现有的一款主工具，用 T-01 教学卡走完输入、原始输出、逐项核对和修订。复制 templates/本人实践记录.md 到仓库之外的私人目录填写。未符合条件的服务不进行付费测试。完成后再把有权公开且已脱敏的结果加入文章。

## 目录

- articles/ 六篇修订版 Markdown
- site/ 可离线阅读的静态网页
- assets/ 原创配图与官方公开截图
- content/ 可编辑内容源
- reference/ 官方来源索引
- editorial/ 写作、修改与核查记录
- templates/ 可编辑记录模板
- plan/ 首月与后续执行计划
- archive/ 早期研究稿留档

所有账号、恢复代码、密钥、付款资料、未脱敏截图和私人实践文件均不要提交。当前内容未加入推荐佣金链接；后续若有合作须在对应内容处说明。

原创文字和 SVG 由本项目整理；官方截图和商标归其原权利方。此仓库未授予第三方商业转载许可。
