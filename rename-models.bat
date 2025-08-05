@echo off
REM This script renames model files to match the capitalized imports in controllers
REM Run this script before deploying to Render or any Linux-based environment

cd backend\models

REM Rename model files with proper capitalization
ren booking.js Booking.js.tmp
ren Booking.js.tmp Booking.js
ren test.js Test.js.tmp
ren Test.js.tmp Test.js
ren patient.js Patient.js.tmp
ren Patient.js.tmp Patient.js

echo Model files renamed successfully!
pause