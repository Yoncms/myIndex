@echo off
setlocal enabledelayedexpansion

@chcp 65001 >nul

REM 设置输入输出路径
set "input_dir=..\temp\"
@REM set "input_dir=."
set "output_dir=..\temp\"
if not exist "%output_dir%" mkdir "%output_dir%"

REM 遍历所有 mp4 文件
for %%f in ("%input_dir%\*.mp4") do (
    set "name=%%~nf"
    set "full=%%~f"

    REM 截取多个不连续片段（示例：第1s-3000s）
    ffmpeg -y -ss 1 -t 3000 -i "!full!" -c:v libvpx-vp9 -b:v 1M -an clip1.webm
)

echo 所有视频处理完成！
pause
