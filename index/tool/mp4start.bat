@echo off

:: 文件的编码是utf-8   65001
:: 将命令行窗口的活动代码页切换为 UTF-8，转gbk是 chcp 936
@chcp 65001 >nul
@echo off
@echo ^> -------- 批量把MP4文件转为可以立刻播放的视频文件 --------
@echo.
@echo ^> Author：Yoncms/Zhangrongquan
@echo.

@echo off
setlocal enabledelayedexpansion

REM 设置工作目录（可选），否则默认当前目录
::set "WORKDIR=%cd%"
::cd /d "%WORKDIR%"
set "WORKDIR=..\temp\"

for %%F in (*.mp4) do (
    echo 正在处理：%%F
    REM  -c:v h264_amf 是显式指定GPU执行       -y -loglevel error
    ffmpeg -i "%%F" -c:v h264_amf -movflags faststart "converted_%%F"
    if exist "converted_%%F" (
        del "%%F"
        ren "converted_%%F" "%%F"
        echo 已完成：%%F
    ) else (
        echo 转换失败：%%F
    )
)

echo 所有文件处理完成
pause
