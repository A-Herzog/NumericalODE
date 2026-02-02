cd ..
del NumericalODE.exe

call neu.cmd build --release --embed-resources

move .\dist\NumericalODE\NumericalODE-win_x64.exe NumericalODE.exe
rmdir /S /Q dist
cd desktop-app