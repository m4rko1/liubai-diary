# 留白日记

一个基于 Astro 的零数据库中文个人博客。文章以 Markdown 文件保存，适合部署到 Cloudflare Pages、GitHub Pages、Netlify 或其他静态托管服务。

## 本地运行

```powershell
npm.cmd install
npm.cmd run dev
```

生产构建：

```powershell
npm.cmd run build
```

生成的网站位于 `dist/`。

## 修改个人信息

- 站点名称、作者、简介和邮箱：`src/site.ts`
- 正式域名：`astro.config.mjs` 中的 `site`
- 关于页面：`src/pages/about.astro`
- 全局视觉样式：`src/styles/global.css`

## 发布新文章

在 `src/content/posts/` 新建 Markdown 文件：

```md
---
title: 文章标题
description: 用于列表和搜索引擎的简短摘要
published: 2026-07-15
tags: [写作, 生活]
image: /images/example.jpg
imageAlt: 图片内容描述
featured: false
---

从这里开始写正文。
```

图片放到 `public/images/`。将 `draft` 设为 `true` 可以保留草稿而不生成公开页面。

## 部署建议

静态托管的构建命令使用 `npm run build`，输出目录填写 `dist`。绑定正式域名后，记得同时更新 `astro.config.mjs` 中的示例地址。

示例图片来自 Unsplash，仅用于原型展示；正式发布前建议替换成自己的照片。
