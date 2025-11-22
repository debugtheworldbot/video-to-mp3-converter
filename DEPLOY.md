# GitHub Pages 部署指南

本文档将指导您如何将视频转MP3转换器部署到GitHub Pages。这是一个**纯前端应用**,所有视频转换都在浏览器中完成,无需后端服务器,非常适合部署到GitHub Pages。

## 前置要求

在开始之前,请确保您已经:

- 拥有GitHub账号
- 在本地安装了Git
- 在本地安装了Node.js (v22或更高版本)和pnpm

## 部署步骤

### 1. 创建GitHub仓库

首先,在GitHub上创建一个新的仓库来存放项目代码。

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 `+` 按钮,选择 `New repository`
3. 填写仓库信息:
   - **Repository name**: 例如 `video-to-mp3-converter`
   - **Description**: (可选) 视频转MP3转换器
   - **Public/Private**: 选择 `Public` (GitHub Pages免费版仅支持公开仓库)
   - 不要勾选 "Initialize this repository with a README"
4. 点击 `Create repository`

### 2. 推送代码到GitHub

在项目根目录下执行以下命令:

```bash
# 初始化Git仓库(如果还没有初始化)
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit"

# 添加远程仓库(替换为您的仓库URL)
git remote add origin https://github.com/YOUR_USERNAME/video-to-mp3-converter.git

# 推送到main分支
git branch -M main
git push -u origin main
```

### 3. 配置GitHub Pages

1. 在GitHub仓库页面,点击 `Settings` (设置)
2. 在左侧菜单中找到 `Pages`
3. 在 "Build and deployment" 部分:
   - **Source**: 选择 `GitHub Actions`
4. 保存设置

### 4. 触发自动部署

代码推送到main分支后,GitHub Actions会自动触发部署流程。您可以:

1. 在仓库页面点击 `Actions` 标签查看部署进度
2. 等待部署完成(通常需要2-5分钟)
3. 部署成功后,访问您的网站:
   - 项目仓库: `https://YOUR_USERNAME.github.io/video-to-mp3-converter/`
   - 用户/组织页面: `https://YOUR_USERNAME.github.io/`

## 配置说明

### Base Path配置

项目已经配置好自动检测base路径:

- **项目仓库部署** (例如 `username.github.io/repo-name/`): 自动设置为 `/repo-name/`
- **用户/组织页面** (例如 `username.github.io/`): 自动设置为 `/`
- **自定义域名**: 自动设置为 `/`

如果需要手动调整,可以修改 `.github/workflows/deploy.yml` 中的 `BASE_PATH` 环境变量。

### 自定义域名(可选)

如果您想使用自定义域名:

1. 在仓库的 `Settings` → `Pages` 中,找到 "Custom domain" 部分
2. 输入您的域名(例如 `converter.example.com`)
3. 在您的域名DNS设置中添加CNAME记录,指向 `YOUR_USERNAME.github.io`
4. 等待DNS生效(可能需要几分钟到几小时)
5. 勾选 "Enforce HTTPS" 以启用HTTPS

## 更新网站

当您需要更新网站内容时:

```bash
# 修改代码后,提交并推送
git add .
git commit -m "Update: 描述您的更改"
git push
```

GitHub Actions会自动重新构建并部署更新后的网站。

## 本地测试

在推送到GitHub之前,建议先在本地测试构建:

```bash
# 安装依赖
pnpm install

# 本地开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 故障排查

### 部署失败

如果GitHub Actions部署失败:

1. 检查 `Actions` 标签中的错误日志
2. 确保 `package.json` 中的依赖版本正确
3. 确保 `.github/workflows/deploy.yml` 配置正确
4. 检查仓库的 `Settings` → `Actions` → `General` 中是否启用了 "Read and write permissions"

### 页面404错误

如果访问页面时出现404错误:

1. 确认GitHub Pages已启用(Settings → Pages)
2. 检查部署是否成功完成
3. 确认访问的URL是否正确(注意base path)
4. 等待几分钟,GitHub Pages可能需要时间生效

### FFmpeg.wasm加载失败

如果转换功能无法使用:

1. 检查浏览器控制台是否有CORS错误
2. 确保网站通过HTTPS访问(GitHub Pages默认启用)
3. 检查 `vite.config.ts` 中的HTTP头配置是否正确

## 技术说明

### 为什么适合GitHub Pages?

本项目是一个**纯前端应用**,具有以下特点:

- **无服务端依赖**: 所有视频转换都通过FFmpeg.wasm在浏览器中完成
- **静态资源**: 构建后只有HTML、CSS、JavaScript和静态资源
- **隐私保护**: 文件不会上传到任何服务器,完全在用户浏览器中处理
- **免费托管**: GitHub Pages提供免费的静态网站托管服务

### 构建产物

运行 `pnpm build` 后,构建产物位于 `dist/public/` 目录,包含:

- `index.html` - 主页面
- `assets/` - JavaScript、CSS和其他静态资源
- 所有资源都经过优化和压缩

### HTTP头配置

项目配置了以下HTTP头以支持FFmpeg.wasm:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

这些头在开发服务器中自动配置。GitHub Pages默认不支持自定义HTTP头,但FFmpeg.wasm会自动降级到兼容模式。

## 支持与反馈

如果您在部署过程中遇到问题,可以:

- 查看GitHub Actions的日志输出
- 检查浏览器控制台的错误信息
- 参考 [GitHub Pages文档](https://docs.github.com/en/pages)
- 参考 [Vite部署文档](https://vitejs.dev/guide/static-deploy.html)

---

**祝您部署顺利!** 🚀
