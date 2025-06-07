cd ..
del NumericalODE.exe
del NumericalODE_Linux_MacOS.zip
call neu.cmd build --release
cd desktop-app
"C:\Program Files (x86)\NSIS\makensis.exe" Launcher.nsi
move NumericalODE.exe ..
cd ..
move .\dist\NumericalODE-release.zip NumericalODE_Linux_MacOS.zip
rmdir /S /Q dist
cd desktop-app