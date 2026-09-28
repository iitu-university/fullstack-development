#!/usr/bin/env sh
set -eu
gradle wrapper --gradle-version 8.1.1
printf '%s\n' 'Gradle wrapper generated. You can now run ./gradlew bootRun'
