@echo off
echo Creating and Accesing a Virtual Environment...
call python -m venv .venv
call .venv/Scripts/activate

echo Installing libraries...
call python -m pip install -r requierements.txt

echo Done!