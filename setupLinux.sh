#!/bin/bash

echo Creating and Accesing a Virtual Environment...
python3 -m venv .venv
source .venv/bin/activate

echo Installing libraries...
pip install -r requierements.txt

echo Done!