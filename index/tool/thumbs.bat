::ffmpeg -ss 00:00:05 -i ../index/AKO-378.mp4 -frames:v 1 -q:v 2 ../thumbs/AKO-378.jpg

@REM ffmpeg -ss 955 -i "../index/VOSS-074.mp4" -frames:v 1 -q:v 2 -update 1 "../thumbs/VOSS-074.jpg" -y

set "fnamex=YMDD-106"
ffmpeg -ss 2611 -accurate_seek -i "..\index\%fnamex%.mp4" -frames:v 1 -q:v 1 -s 1920x1080 -f mjpeg "..\thumbs\%fnamex%.jpg" -y

@REM pause


@REM @echo off
@REM setlocal enabledelayedexpansion

@REM @chcp 65001 >nul

@REM REM 设置输入输出目录
@REM set "input_dir=..\temp\"
@REM @REM set "input_dir=."
@REM set "output_dir=..\Thumbs\"

@REM REM 创建输出目录
@REM if not exist "%output_dir%" (
@REM     mkdir "%output_dir%"
@REM )

@REM REM 遍历所有 mp4 文件
@REM for %%f in ("%input_dir%\*.mp4") do (
@REM     set "filename=%%~nf"
@REM     call :screenshot "%%~f" "%%~nf"
@REM )

@REM echo 全部截图完成。
@REM pause
@REM exit /b

@REM :screenshot
@REM REM 参数：%1 = 视频路径, %2 = 文件名（无扩展名）
@REM ffmpeg -ss 1811 -accurate_seek -i "..\index\%fnamex%.mp4" -frames:v 1 -q:v 1 -s 1920x1080 -f mjpeg "..\thumbs\%fnamex%.jpg" -y
@REM exit /b


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


@REM REM 设置输入视频目录和输出图片目录
@REM set "input_dir=..\index\"
@REM set "output_dir=..\Thumbs\"

@REM REM 创建输出目录（如果不存在）
@REM if not exist "%output_dir%" (
@REM     mkdir "%output_dir%"
@REM )

@REM REM 遍历所有 mp4 文件
@REM for %%f in ("%input_dir%\*.mp4") do (
@REM     REM 获取不带扩展名的文件名
@REM     set "filename=%%~nf"
@REM     call :process "%%f" "%%~nf"
@REM )

@REM echo 批量截图完成！
@REM pause
@REM exit /b

@REM :process
@REM REM 参数：%1 = 视频路径, %2 = 文件名（无扩展名）
@REM ffmpeg -y -ss 300 -i %1 -frames:v 1 -q:v 2 -f mjpeg "%output_dir%\%2.jpg"
@REM exit /b
