// const SubtitleManager = require('./subtitleManager.js')
// DOM 元素
const videoPlayer = document.getElementById('video-player');
const selectFileBtn = document.getElementById('select-file');
const playPauseBtn = document.getElementById('play-pause');
const filePathDisplay = document.getElementById('file-path');
const subSelect = document.getElementById('subtitle-select')

// 从主进程导入 electron 模块
const { ipcRenderer } = require('electron');

// 初始化字幕模块
// SubtitleManager.init(videoPlayer, subSelect)

// 选择文件按钮点击事件
selectFileBtn.addEventListener('click', () => {
  ipcRenderer.send('open-file-dialog');
});

// 播放/暂停按钮点击事件
playPauseBtn.addEventListener('click', () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playPauseBtn.textContent = '暂停';
  } else {
    videoPlayer.pause();
    playPauseBtn.textContent = '播放';
  }
});

// 监听视频文件选择结果
ipcRenderer.on('selected-file', (event, filePath) => {
  if (filePath) {
    // 设置视频源
    videoPlayer.src = filePath;
    // 确保音量设置正确
    videoPlayer.volume = 1.0; // 设置为最大音量
    videoPlayer.muted = false; // 确保不是静音状态
    // 显示文件路径
    filePathDisplay.textContent = `当前文件: ${filePath}`;
    // 启用播放按钮
    playPauseBtn.disabled = false;
    playPauseBtn.textContent = '播放';
    // 加载字幕（带错误处理）
    // try {
    //   const physicalPath = filePath.replace(/^file:\/\//, '');
    //   SubtitleManager.loadSubtitles(physicalPath); // 这里添加关键调用
    //   console.log('字幕加载成功');
    // } catch (error) {
    //   console.error('字幕加载失败:', error);
    // }
  }
});

// 视频播放结束时重置按钮文本
videoPlayer.addEventListener('ended', () => {
  playPauseBtn.textContent = '播放';
});