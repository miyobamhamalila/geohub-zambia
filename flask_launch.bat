@echo off
chcp 65001 >nul
cd /d "C:\Users\liswa\OneDrive\Desktop\zambia geohub\geohub zambia 14.0"
set PYTHONIOENCODING=utf-8
python app.py > "C:\Users\liswa\OneDrive\Desktop\zambia geohub\geohub zambia 14.0\flask_run.log" 2>&1
