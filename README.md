# 视频转MP3转换器 / Video to MP3 Converter

一个纯前端的视频转MP3转换工具,支持在浏览器中直接将视频文件转换为MP3音频,无需上传到服务器,完全保护您的隐私。

A pure frontend video to MP3 converter that converts video files to MP3 audio directly in your browser, with no server upload required, completely protecting your privacy.

## ✨ 特性 / Features

- 🔒 **隐私保护** - 所有转换都在浏览器中完成,文件不会上传到任何服务器
- 🎵 **多格式支持** - 支持MP4、M4A、AVI、MOV、WEBM、MKV等多种视频和音频格式
- 🎨 **现代化UI** - 响应式设计,支持明暗主题切换
- 🌍 **多语言** - 支持中文和英文,自动检测浏览器语言
- ⚡ **高质量输出** - 192kbps比特率和44.1kHz采样率
- 📱 **跨平台** - 支持桌面和移动设备

---

- 🔒 **Privacy Protection** - All conversions are completed in your browser, files are not uploaded to any server
- 🎵 **Multi-Format Support** - Supports MP4, M4A, AVI, MOV, WEBM, MKV and other video and audio formats
- 🎨 **Modern UI** - Responsive design with light/dark theme support
- 🌍 **Multi-Language** - Supports Chinese and English, auto-detects browser language
- ⚡ **High Quality Output** - 192kbps bitrate and 44.1kHz sample rate
- 📱 **Cross-Platform** - Supports desktop and mobile devices

## 🚀 在线演示 / Live Demo

访问在线版本 / Visit the live version: [GitHub Pages部署后的URL]

## 🛠️ 技术栈 / Tech Stack

- **React 19** - UI框架 / UI Framework
- **TypeScript** - 类型安全 / Type Safety
- **Vite** - 构建工具 / Build Tool
- **Tailwind CSS 4** - 样式框架 / Styling Framework
- **FFmpeg.wasm** - 浏览器中的视频处理 / Video Processing in Browser
- **shadcn/ui** - UI组件库 / UI Components

## 📦 本地开发 / Local Development

### 前置要求 / Prerequisites

- Node.js 22+
- pnpm 10+

### 安装 / Installation

```bash
# 克隆仓库 / Clone the repository
git clone https://github.com/YOUR_USERNAME/video-to-mp3-converter.git
cd video-to-mp3-converter

# 安装依赖 / Install dependencies
pnpm install

# 启动开发服务器 / Start development server
pnpm dev
```

访问 `http://localhost:3000` 查看应用。

Visit `http://localhost:3000` to view the application.

### 构建 / Build

```bash
# 构建生产版本 / Build for production
pnpm build

# 预览构建结果 / Preview build
pnpm preview
```

### 测试 / Testing

```bash
# 运行测试 / Run tests
pnpm exec vitest run

# 监听模式 / Watch mode
pnpm exec vitest
```

## 🌐 部署 / Deployment

本项目可以部署到任何静态网站托管服务:

This project can be deployed to any static hosting service:

- **GitHub Pages** - 查看 [DEPLOY.md](./DEPLOY.md) 获取详细说明 / See [DEPLOY.md](./DEPLOY.md) for details
- **Vercel** - 连接GitHub仓库自动部署 / Connect GitHub repo for auto-deployment
- **Netlify** - 拖拽 `dist/public` 目录即可 / Drag and drop `dist/public` folder
- **Cloudflare Pages** - 连接GitHub仓库自动部署 / Connect GitHub repo for auto-deployment

## 📝 使用说明 / Usage

1. **选择文件** - 拖拽或点击上传区域选择视频文件
2. **开始转换** - 点击"开始转换"按钮
3. **等待完成** - 查看转换进度
4. **下载MP3** - 转换完成后点击下载按钮

---

1. **Select File** - Drag and drop or click the upload area to select a video file
2. **Start Conversion** - Click the "Start Conversion" button
3. **Wait for Completion** - View the conversion progress
4. **Download MP3** - Click the download button after conversion is complete

## 🔧 配置 / Configuration

### 支持的格式 / Supported Formats

**视频格式 / Video Formats:**
- MP4, M4V, MOV, AVI, WEBM, MKV, FLV, WMV, MPEG, MPG

**音频格式 / Audio Formats:**
- MP3, M4A, WAV, AAC, OGG, FLAC

### 文件大小限制 / File Size Limit

最大文件大小: 500MB

Maximum file size: 500MB

### 输出质量 / Output Quality

- 比特率 / Bitrate: 192kbps
- 采样率 / Sample Rate: 44.1kHz
- 声道 / Channels: 立体声 / Stereo (2)

## 🤝 贡献 / Contributing

欢迎贡献! 请随时提交Pull Request。

Contributions are welcome! Feel free to submit a Pull Request.

## 📄 许可证 / License

MIT License - 详见 [LICENSE](./LICENSE) 文件

MIT License - See [LICENSE](./LICENSE) file for details

## 🙏 致谢 / Acknowledgments

- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) - 浏览器中的FFmpeg / FFmpeg in browser
- [shadcn/ui](https://ui.shadcn.com/) - 精美的UI组件 / Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架 / Utility-first CSS framework

## 📞 支持 / Support

如果您遇到任何问题或有任何建议,请:

If you encounter any issues or have suggestions, please:

- 提交Issue / Submit an Issue
- 发送邮件 / Send an email
- 查看文档 / Check the documentation

---

**Made with ❤️ by Manus AI**
