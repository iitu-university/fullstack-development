@echo off
gradle wrapper --gradle-version 8.1.1
if errorlevel 1 exit /b 1
echo Gradle wrapper generated. You can now run gradlew.bat bootRun
