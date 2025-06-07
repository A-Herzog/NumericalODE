/*
Copyright 2025 Alexander Herzog

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

export {language};

let lang;

/* German */

const languageDE={};
lang=languageDE;

lang.GUI={};
lang.GUI.appName="Numerische Lösung gewöhnlicher Differentialgleichungen";
lang.GUI.homeURL="warteschlangensimulation.de";
lang.GUI.imprint="Impressum";
lang.GUI.privacy="Datenschutz";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="Alle Berechnungen laufen vollständig im Browser ab.<br>Diese Webapp führt nach dem Laden des HTML- und Skriptcodes keine weitere Kommunikation mit dem Server durch.";
lang.GUI.simulators="Simulatoren";
lang.GUI.switchLanguage="Switch to <b>English</b>";
lang.GUI.switchLanguageHint="Switch to English";
lang.GUI.switchLanguageShort="English";
lang.GUI.switchLanguageMode='default';
lang.GUI.switchLanguageFile="index.html";
lang.GUI.tabColorMode="Farbmodus";
lang.GUI.tabColorModeLight="Hell";
lang.GUI.tabColorModeDark="Dunkel";
lang.GUI.tabColorModeSystemDefault="Systemvorgabe";
lang.GUI.downloadTitle="Download";
lang.GUI.downloadLabel="Diese Webapp steht auch als offline-nutzbare Anwendung zur Verfügung:";
lang.GUI.downloadButton="Download";
lang.GUI.downloadButtonExe="Windows-Anwendung (exe)";
lang.GUI.downloadButtonZip="Linux und MacOS-Anwendung (zip)";
lang.GUI.topInfo="<p>Bei <strong>gewöhnlichen Differentialgleichungen</strong> hängt die gesuchte Funktion lediglich von einer Veränderlichen ab. Es können also gewöhnliche Ableitungen der Funktion in dieser einen Variablen auftreten. Die Ordnung der Differentialgleichung entspricht der höchsten auftretenden Ableitung. Man unterscheidet zwischen expliziten und impliziten Differentialgleichungen, je nachdem, ob man die Gleichung nach der höchsten auftretenden Ableitung auflösen kann oder nicht.</p><p>In der Anwendung handelt es sich bei der Veränderlichen häufig um die Zeit. So beschreibt die Differentialgleichung das Änderungsverhalten der gesuchten Größen zueinander.</p><p>Nur für wenige Differentialgleichungen existieren explizite Algorithmen zur Lösung. Für viele Lösungen ist nicht einmal eine explizite Lösungsdarstellung möglich, so dass hier viel auf numerische Approximation zurückgegriffen wird.</p>";
lang.GUI.zoomInfo="Mit gedrückter <span class='border rounded-1 ps-1 pe-1 bg-light'><tt>Strg</tt></span>-Taste kann per Mausrad gezoomt werden und es können Zoom-Rahmen aufgezogen werden.";
lang.GUI.resetZoom="Standardzoom";
lang.GUI.copyDiagram="Kopieren";
lang.GUI.copyDiagramError="Ihr Browser unterstützt das Kopieren von Bildern leider nicht.";
lang.GUI.saveDiagram="Speichern";
lang.GUI.function="Funktion";
lang.GUI.stepWide="Schrittweite";
lang.GUI.exactSoluation="Exakte Lösung";
lang.GUI.method="Extrapolationsmethode";
lang.GUI.methodName=[];
lang.GUI.methodName.push("Explizites Eulerverfahren");
lang.GUI.methodName.push("Heun-Verfahren");
lang.GUI.methodName.push("Runge-Kutta-Verfahren 2. Ordnung");
lang.GUI.methodName.push("Runge-Kutta-Verfahren 3. Ordnung");
lang.GUI.methodName.push("Runge-Kutta-Verfahren 4. Ordnung");
lang.GUI.approxMethod=[];
lang.GUI.approxMethod.push("Näherung mit explizitem Eulerverfahren");
lang.GUI.approxMethod.push("Näherung mit Heun-Verfahren");
lang.GUI.approxMethod.push("Näherung mit Runge-Kutta-Verfahren 2. Ordnung");
lang.GUI.approxMethod.push("Näherung mit Runge-Kutta-Verfahren 3. Ordnung");
lang.GUI.approxMethod.push("Näherung mit Runge-Kutta-Verfahren 4. Ordnung");
lang.GUI.methodInfo=[];
lang.GUI.methodInfo.push(`
<p><b>Explizites Eulerverfahren</b></p>
<p>
Hierbei handelt es sich um die einfachste Form eines expliziten Einschrittverfahrens.
In jedem Schritt wird die durch die Differentialgleichung vorgegebene Änderung bestimmt und mit ihrer Hilfe der nächste Schritt bestimmt.
Anschaulich gesprochen wird die Änderungsvorschrift in jedem Schritt mithilfe der linksseitigen Rechteck-Regel integriert.
Das explizite Euler-Verfahren kann auch als Runge-Kutta-Verfahren der Ordnung 1 betrachtet werden.
</p>
<p>
f(x,y):=y'(x)<br>
y(x+h):=y(x)+h&middot;f(x,y(x))
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Heun-Verfahren</b></p>
<p>
Das Verfahren von Heun ist ein Einfaches aus der Klasse der Runge-Kutta-Verfahren.
Die Differentialgleichung wird nun in jedem Schritt mehrfach ausgewertet, nämlich an der aktuellen Stelle sowie an der vom expliziten Eulerverfahren vorgesehenen nächsten Stelle.
Beide Informationen werden gemittelt und gehen in den nächsten Schritt ein.
Anschaulich gesprochen wird die Änderungsvorschrift in jedem Schritt mithilfe der Trapez-Regel integriert.
Es handelt sich um ein 2-stufiges explizites Runge-Kutta-Verfahren der Ordnung 2.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h,y(x)+h&middot;k<sub>1</sub>)<br>
y(x+h):=y(x)+h&middot;(k<sub>1</sub>+k<sub>2</sub>)/2
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Runge-Kutta-Methode 2. Ordnung</b></p>
<p>
Ein weiteres Runge-Kutta-Verfahren 2. Ordnung.
Die Differentialgleichung wird nun in jedem Schritt mehrfach ausgewertet, nämlich an der aktuellen Stelle sowie an der vom expliziten Eulerverfahren vorgesehenen nächsten Stelle.
In den nächsten Schritt geht jedoch hier nur die letzte Auswertung ein (im Unterschied zum Verfahren von Heun).
Es handelt sich um ein 2-stufiges explizites Runge-Kutta-Verfahren der Ordnung 2.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h/2,y+h/2&middot;k<sub>1</sub>)<br>
y(x+h):=y(x)+h&middot;k<sub>2</sub>
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Runge-Kutta-Methode 3. Ordnung</b></p>
<p>
Die Differentialgleichung wird nun in jedem Schritt mehrfach ausgewertet, nämlich an der aktuellen Stelle, einem Zwischenschritt sowie an der nächsten Stelle.
Alle drei Informationen werden gewichtet und gehen in den nächsten Schritt ein.
Anschaulich gesprochen wird die Änderungsvorschrift in jedem Schritt mithilfe der Simpson-Regel integriert.
Es handelt sich um ein 3-stufiges explizites Runge-Kutta-Verfahren der Ordnung 3.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h/2,y+h/2&middot;k<sub>1</sub>)<br>
k<sub>3</sub>:=f(x+h,y-h&middot;k<sub>1</sub>+2&middot;h&middot;k<sub>2</sub>)<br>
y(x+h)=y(x)+h&middot;(1/6&middot;k<sub>1</sub>+4/6&middot;k<sub>2</sub>+1/6&middot;k<sub>3</sub>)
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Klassische Runge-Kutta-Methode 4. Ordnung</b></p>
<p>
Die Differentialgleichung wird nun in jedem Schritt mehrfach ausgewertet, nämlich an der aktuellen Stelle, zweimal an einem Zwischenschritt sowie an der nächsten Stelle.
Alle die vier Informationen werden gewichtet und gehen in den nächsten Schritt ein.
Es handelt sich um ein 4-stufiges explizites Runge-Kutta-Verfahren der Ordnung 4.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h/2,y+h/2&middot;k<sub>1</sub>)<br>
k<sub>3</sub>:=f(x+h/2,y+h/2&middot;k<sub>2</sub>)<br>
k<sub>4</sub>:=f(x+h,y+h&middot;k<sub>3</sub>)<br>
 y(x+h)=y(x)+h&middot;(1/6&middot;k<sub>1</sub>+1/3&middot;k<sub>2</sub>+1/3&middot;k<sub>3</sub>+1/6&middot;k<sub>4</sub>)
</p>
`);
lang.GUI.resultAbsoluteError="Absoluter Fehler";
lang.GUI.resultRelativeError="Relativer Fehler";
lang.GUI.resultErrorInfo="(Die Abweichung zwischen exakter Lösung und Näherung wird jeweils an den Stützstellen bestimmt. Zwischen den Stützstellen kann die Abweichung noch größer ausfallen.)";

/* English */

const languageEN={};
lang=languageEN;

lang.GUI={};
lang.GUI.appName="Numerical ordinary differential equation solver";
lang.GUI.homeURL="queueingsimulation.de";
lang.GUI.imprint="Imprint";
lang.GUI.privacy="Privacy";
lang.GUI.privacyInfo1="Info";
lang.GUI.privacyInfo2="All calculations are performed entirely in the browser.<br>This Webapp does not perform any further communication with the server after loading the HTML and script code.";
lang.GUI.simulators="Simulators";
lang.GUI.switchLanguage="Auf <b>Deutsch</b> umschalten";
lang.GUI.switchLanguageHint="Auf Deutsch umschalten";
lang.GUI.switchLanguageShort="Deutsch";
lang.GUI.switchLanguageMode='de';
lang.GUI.switchLanguageFile="index_de.html";
lang.GUI.tabColorMode="Color mode";
lang.GUI.tabColorModeLight="Light";
lang.GUI.tabColorModeDark="Dark";
lang.GUI.tabColorModeSystemDefault="System default";
lang.GUI.downloadTitle="Download";
lang.GUI.downloadLabel="This webapp is also available as an offline usable application:";
lang.GUI.downloadButton="Download";
lang.GUI.downloadButtonExe="Windows-Anwendung (exe)";
lang.GUI.downloadButtonZip="Linux und MacOS-Anwendung (zip)";
lang.GUI.topInfo="<p>In <strong>ordinary differential equations</strong> the unknown function depends only on one variable. Therefore only ordinary derivatives of the function in this one variable can occur. The order of the differential equation is the highest occurring derivative. One differentiates between explicit and implicit differential equations, depending on whether you can solve the equation for the highest occurring derivative or not.</p><p>In application, often the time is the variable. Thus, the differential equation describing the changing behavior of the required quantities.</p><p>Only for a few differential equations exist explicit algorithms to solve. For many solutions is not even an explicit solution representation possible so that here much resorting to numerical approximation.</p>";
lang.GUI.zoomInfo="By holding down the <span class='border rounded-1 ps-1 pe-1 bg-light'><tt>Ctrl</tt></span> key, the mouse wheel can be used to zoom in and out, and zoom frames can be drawn.";
lang.GUI.resetZoom="Reset zoom";
lang.GUI.copyDiagram="Copy";
lang.GUI.copyDiagramError="Your browser does not support copying images to clipboard.";
lang.GUI.saveDiagram="Save";
lang.GUI.function="Function";
lang.GUI.stepWide="Step wide";
lang.GUI.exactSoluation="Exact solution";
lang.GUI.method="Extrapolation method";
lang.GUI.methodName=[];
lang.GUI.methodName.push("Explicit Euler method");
lang.GUI.methodName.push("Heun method");
lang.GUI.methodName.push("Runge-Kutta method of 2nd order");
lang.GUI.methodName.push("Runge-Kutta-method of 3rd order");
lang.GUI.methodName.push("Runge-Kutta method of 4th order");
lang.GUI.approxMethod=[];
lang.GUI.approxMethod.push("Approximation with explicit Euler method");
lang.GUI.approxMethod.push("Approximation with Heun method");
lang.GUI.approxMethod.push("Approximation with Runge-Kutta method of 2nd order");
lang.GUI.approxMethod.push("Approximation with Runge-Kutta-method of 3rd order");
lang.GUI.approxMethod.push("Approximation with Runge-Kutta method of 4th order");
lang.GUI.methodInfo=[];
lang.GUI.methodInfo.push(`
<p><b>Explicit Euler method</b></p>
<p>
This is the simplest form of an explicit step process.
In each step, the change predetermined by the differential equation is determined and with their help the next step is calculated.
Figuratively speaking, the change rule is integrated in each step using the left-hand rectangle rule.
The explicit Euler method can also be considered as Runge-Kutta methods of 1st order.
</p>
<p>
f(x,y):=y'(x)<br>
y(x+h):=y(x)+h&middot;f(x,y(x))
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Heun method</b></p>
<p>
The method of Heun is a simple from the class of Runge-Kutta methods.
The differential equation is now repeatedly evaluated in each step, namely, at the current location as well as foreseen by the forward Euler method next point.
Both pieces of information are averaged and are included in the next step.
Figuratively speaking, the change rule is integrated in each step using the trapezoidal rule.
It is a 2-stage explicit Runge-Kutta method of 2nd order.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h,y(x)+h&middot;k<sub>1</sub>)<br>
y(x+h):=y(x)+h&middot;(k<sub>1</sub>+k<sub>2</sub>)/2
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Runge-Kutta method of 2nd order</b></p>
<p>
Another Runge-Kutta method of 2nd order.
The differential equation is now repeatedly evaluated in each step, namely, at the current location as well as foreseen by the forward Euler method next point.
In the next step, however, only the last evaluation is used (in contrast to the method of Heun).
It is a 2-stage explicit Runge-Kutta methods of 2nd order.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h/2,y+h/2&middot;k<sub>1</sub>)<br>
y(x+h):=y(x)+h&middot;k<sub>2</sub>
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Runge-Kutta method of 3rd order</b></p>
<p>
The differential equation will now be evaluated several times in each step, namely, at the current position, an intermediate step and at the next location.
All three pieces of information are weighted and are included in the next step.
Figuratively speaking, the change rule is integrated in each step using Simpson's rule.
It is a 3-stage explicit Runge-Kutta methods of 3rd order.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h,y(x)+h&middot;k<sub>1</sub>)<br>
y(x+h):=y(x)+h&middot;(k<sub>1</sub>+k<sub>2</sub>)/2
</p>
`);
lang.GUI.methodInfo.push(`
<p><b>Runge-Kutta method of 4th order</b></p>
<p>
The differential equation will now be evaluated several times in each step, namely, at the current position, twice at an intermediate step and at the next location.
All the four information are weighted and are included in the next step.
It is a 4-stage explicit Runge-Kutta methods of 4th order.
</p>
<p>
f(x,y):=y'(x)<br>
k<sub>1</sub>:=f(x,y)<br>
k<sub>2</sub>:=f(x+h/2,y+h/2&middot;k<sub>1</sub>)<br>
k<sub>3</sub>:=f(x+h/2,y+h/2&middot;k<sub>2</sub>)<br>
k<sub>4</sub>:=f(x+h,y+h&middot;k<sub>3</sub>)<br>
 y(x+h)=y(x)+h&middot;(1/6&middot;k<sub>1</sub>+1/3&middot;k<sub>2</sub>+1/3&middot;k<sub>3</sub>+1/6&middot;k<sub>4</sub>)
</p>
`);
lang.GUI.resultAbsoluteError="Absolute error";
lang.GUI.resultRelativeError="Relative error";
lang.GUI.resultErrorInfo="(The difference between exact solution and approximation is determined in each case at the support points. The difference can be even greater between the support points.)";

/* Activate language */

const language=(document.documentElement.lang=='de')?languageDE:languageEN;
