# 零成本发布指南

这套博客是纯静态站点，不需要购买服务器。构建后会生成 `dist/` 文件夹，上传到静态托管平台即可访问。

## 成本判断

- 完全 0 元：使用平台赠送的二级域名，例如 `liubai-diary.pages.dev`、`username.github.io`、`project.vercel.app`。
- 接近 0 元：托管免费，自己购买独立域名，例如 `yourname.com`，常见价格约几十元到一百多元/年。
- 不建议折腾免费一级域名：长期稳定性、所有权和续期规则都不可靠，个人博客不值得把根基放在这里。

## 推荐路线：Cloudflare Pages

Cloudflare Pages 适合 Astro 静态博客，免费额度对个人博客非常充足，并且会自动提供 HTTPS 和 `*.pages.dev` 地址。

1. 把项目放到 GitHub 仓库。
2. 打开 Cloudflare Dashboard，进入 `Workers & Pages`。
3. 选择 `Create application`，然后选择 `Pages`。
4. 连接 GitHub 仓库。
5. 构建设置填写：

```txt
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: 留空
Environment variable:
  SITE_URL=https://你的项目名.pages.dev
```

6. 第一次部署完成后，Cloudflare 会给你一个 `https://项目名.pages.dev` 地址。
7. 之后你只要更新文章并推送到 GitHub，Cloudflare 会自动重新发布。

## GitHub Pages 备选

GitHub Pages 也可以 0 元发布，地址一般是 `https://用户名.github.io/仓库名/`。它更简单，但对 Astro 项目通常需要配置 GitHub Actions；如果你追求省心，我更建议 Cloudflare Pages。

## Vercel 备选

Vercel 对前端项目很友好，免费计划会给 `*.vercel.app` 地址。个人博客可以用，但 Cloudflare Pages 的静态站托管和域名体系更适合长期放博客。

## 发布前要改的地方

- 站点正式地址：部署平台里设置 `SITE_URL`。
- 个人信息：[src/site.ts](src/site.ts)
- 关于页面：[src/pages/about.astro](src/pages/about.astro)
- 新文章目录：[src/content/posts/](src/content/posts/)

## 本地检查

```powershell
npm.cmd run build
```

构建成功后，`dist/` 就是可以发布的网站成品。
