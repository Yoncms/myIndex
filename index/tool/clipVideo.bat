@echo off
setlocal enabledelayedexpansion

@chcp 65001 >nul

REM 设置输入输出路径
set "input_dir=..\temp\"
@REM set "input_dir=."
set "output_dir=..\files\"
if not exist "%output_dir%" mkdir "%output_dir%"

REM 遍历所有 mp4 文件
for %%f in ("%input_dir%\*.mp4") do (
    set "name=%%~nf"
    set "full=%%~f"

    REM 清理中间临时文件
    del /q /f "clip1.webm" "clip2.webm" "clip3.webm" "concat.txt" >nul 2>&1

    REM 截取多个不连续片段（示例：第5s-8s，第20s-25s，第40s-43s）
    ffmpeg -y -ss 405 -t 1 -i "!full!" -c:v libvpx-vp9 -b:v 1M -an clip1.webm
    ffmpeg -y -ss 805 -t 1 -i "!full!" -c:v libvpx-vp9 -b:v 1M -an clip2.webm
    ffmpeg -y -ss 1005 -t 1 -i "!full!" -c:v libvpx-vp9 -b:v 1M -an clip3.webm

    REM 创建 concat 列表
    echo file 'clip1.webm' > concat.txt
    echo file 'clip2.webm' >> concat.txt
    echo file 'clip3.webm' >> concat.txt

    REM 合并片段
    ffmpeg -y -f concat -safe 0 -i concat.txt -c copy "%output_dir%\!name!.webm"
)

REM 合并后删除中间文件
del /q /f "clip1.webm" "clip2.webm" "clip3.webm" "concat.txt" >nul 2>&1

echo 所有视频处理完成！
pause
