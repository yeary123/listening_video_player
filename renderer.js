// DOM 元素
const videoPlayer = document.getElementById('video-player');
const selectFileBtn = document.getElementById('select-file');
const playPauseBtn = document.getElementById('play-pause');
const filePathDisplay = document.getElementById('file-path');

// 从主进程导入 electron 模块
const { ipcRenderer } = require('electron');

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
    // 显示文件路径
    filePathDisplay.textContent = `当前文件: ${filePath}`;
    // 启用播放按钮
    playPauseBtn.disabled = false;
    playPauseBtn.textContent = '播放';
  }
});

// 视频播放结束时重置按钮文本
videoPlayer.addEventListener('ended', () => {
  playPauseBtn.textContent = '播放';
});