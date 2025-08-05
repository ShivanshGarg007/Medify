#!/bin/bash

# This script renames model files to match the capitalized imports in controllers
# Run this script before deploying to Render or any Linux-based environment

cd backend/models

# Rename model files with proper capitalization
mv booking.js Booking.js.tmp && mv Booking.js.tmp Booking.js
mv test.js Test.js.tmp && mv Test.js.tmp Test.js
mv patient.js Patient.js.tmp && mv Patient.js.tmp Patient.js

echo "Model files renamed successfully!"