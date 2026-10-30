# Prompt 菜市场

一个独立的中文职业角色提示词产品。它从公开授权的角色库中精选 108 个角色，提供搜索、收藏、任务填写、提示词复制和 Codex 技能包导出。

## 本地运行

```bash
npm install
npm run dev
```

生产构建与测试：

```bash
npm test
npm run build
```

## 部署

项目使用 Vite 构建，静态输出目录为 `dist/`。`wrangler.toml` 已配置为独立 Cloudflare Pages 项目 `prompt-market`：

```bash
npx wrangler pages deploy dist --project-name prompt-market
```

部署不会修改 `jizhe-ai-memory` 或其他已有 Pages 项目。

## 内容与许可

角色提示词基于 [jnMetaCode/agency-agents-zh](https://github.com/jnMetaCode/agency-agents-zh)，原作 Michael Sitarzewski，中文翻译与本地化由 jnMetaCode 提供，遵循 MIT 许可。完整上游许可见 `public/LICENSE-source.txt`。

页面界面、分类、任务示例、导出逻辑与卡通人物组件为本项目新增内容。使用角色内容时请保留上游许可与来源说明。
