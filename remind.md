# tips

1、本项目使用h5自带video，不支持某些编码的音频，所以如果你的视频播放出来没有声音，使用这个命令无损转码：ffmpeg -i input.mkv -c:v copy -c:a aac -b:a 192k output.mkv
