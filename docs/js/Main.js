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

export {isDesktopApp, initApp};

import {language} from "./Language.js";

/**
 * Example functions
 */
const demoFunctions=[
  {
    displayFunction: "3*x^2*y+2*x^2",
    displaySolution: "(b+2/3)/exp(a<sup>3</sup>)*exp(x<sup>3</sup>)-2/3",
    calcFunction: "3*x^2*y+2*x^2",
    calcSolution: "(b+2/3)/exp(a^3)*exp(x^3)-2/3"
  },
  {
    displayFunction: "y",
    displaySolution: "b/exp(a)*exp(x)",
    calcFunction: "y",
    calcSolution: "b/exp(a)*exp(x)"
  },
  {
    displayFunction: "-2*y",
    displaySolution: "exp(-2*(x-a))*b",
    calcFunction: "-2*y",
    calcSolution: "exp(-2*(x-a))*b"
  },
  {
    displayFunction: "y-x",
    displaySolution: "exp(x)*((b-a-1)/exp(a))+x+1",
    calcFunction: "y-x",
    calcSolution: "exp(x)*((b-a-1)/exp(a))+x+1"
  }
];

/**
 * Is the system running as Neutralions desktop app (true) or as a web page (false)?
 */
const isDesktopApp=(typeof(NL_OS)!='undefined');
if (isDesktopApp) {
  Neutralino.init();
  Neutralino.events.on("windowClose",()=>Neutralino.app.exit());
}

/**
 * Fills in the language strings to the GUI elements.
 */
function initGUILanguage() {
  /* Header */
  appName1.innerHTML=language.GUI.appName;
  languageButton.title=language.GUI.switchLanguageHint;
  languageButton.querySelector('.menuButtonTitleShort').innerHTML=language.GUI.switchLanguageShort;
  languageButton.querySelector('.menuButtonTitleLong').innerHTML=language.GUI.switchLanguage;
  languageButton.onclick=()=>{
    localStorage.setItem('selectedLanguage',language.GUI.switchLanguageMode);
    document.location.href=language.GUI.switchLanguageFile;
  }

  menuColorMode.title=language.GUI.tabColorMode;
  menuColorModeLight.innerHTML=language.GUI.tabColorModeLight;
  menuColorModeDark.innerHTML=language.GUI.tabColorModeDark;
  menuColorModeSystemDefault.innerHTML=language.GUI.tabColorModeSystemDefault;

  let selectedColorMode=localStorage.getItem('selectedColorMode');
  if (selectedColorMode==null) {
    menuColorModeSystemDefault.classList.add("bi-check");
    const mode=(document.documentElement.dataset.bsTheme=='dark')?language.GUI.tabColorModeDark:language.GUI.tabColorModeLight;
    menuColorModeSystemDefault.innerHTML=menuColorModeSystemDefault.innerHTML+" ("+mode+")";
  } else {
    if (document.documentElement.dataset.bsTheme=='dark') menuColorModeDark.classList.add("bi-check"); else menuColorModeLight.classList.add("bi-check");
  }

  /* Content */
  topInfo.innerHTML=language.GUI.topInfo;
  zoomInfo.innerHTML=language.GUI.zoomInfo;
  diagramResetZoomButton.innerHTML=" "+language.GUI.resetZoom;
  diagramResetZoomButton.onclick=()=>{
    chart.resetZoom();
  };
  diagramCopyButton.innerHTML=" "+language.GUI.copyDiagram;
  diagramCopyButton.onclick=()=>{
    if (typeof(ClipboardItem)!="undefined") {
      chartCanvas.toBlob(blob=>navigator.clipboard.write([new ClipboardItem({"image/png": blob})]));
    } else {
      alert(language.GUI.copyDiagramError);
    }
  };
  diagramSaveButton.innerHTML=" "+language.GUI.saveDiagram;
  diagramSaveButton.onclick=()=>{
    const element=document.createElement("a");
    element.href=chartCanvas.toDataURL("image/png");
    element.download="diagram.png";
    element.click();
  };
  selectFunctionLabel.innerHTML=language.GUI.function+":&nbsp";
  for (let i=0;i<demoFunctions.length;i++) {
    const option=document.createElement("option");
    option.innerHTML="y'(x):="+demoFunctions[i].displayFunction;
    option.value=i;
    option.selected=(i==0);
    selectFunction.appendChild(option);
  }
  labelShowDirectionField.innerHTML=language.GUI.showDirectionField;
  const freeOption=document.createElement("option");
  freeOption.innerHTML="y'(x):=";
  freeOption.value=demoFunctions.length;
  selectFunction.appendChild(freeOption);
  selectMethodLabel.innerHTML=language.GUI.method+":&nbsp";
  for (let i=0;i<language.GUI.methodName.length;i++) {
    const option=document.createElement("option");
    option.innerHTML=language.GUI.methodName[i];
    option.value=i;
    option.selected=(i==0);
    selectMethod.appendChild(option);
  }
  inputX0.value=(-1.5).toLocaleString();
  inputY0.value=(-0.4).toLocaleString();

  /* Footer */
  appName2.innerHTML=language.GUI.appName;
  linkImprint.innerHTML=language.GUI.imprint;
  linkPrivacy.innerHTML=language.GUI.privacy;
  linkMainHome.innerHTML=language.GUI.homeURL;
  linkMainHome.href="https://"+language.GUI.homeURL;
  infoLocalDataOnly2.querySelector("h3").innerHTML=language.GUI.privacyInfo1;
  infoLocalDataOnly2.querySelector("div").innerHTML=language.GUI.privacyInfo2;
  infoSimulators.innerHTML=language.GUI.simulators;
}

let chartOptions;
let chartData={};
let chart;

let compiledFunction=null;

/**
 * Initializes the GUI elements
 */
function initGUI() {
  chartOptions={
    scales: {
      x: {
        type: "linear",
        title: {display: true, text: "x"},
        min: 0,
        max: 10
      },
      y: {
        title: {display: true, text: "y(x)"},
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: "ctrl",
          },
          pinch: {
            enabled: true
          },
          drag: {
            enabled: true,
            modifierKey: "ctrl",
          },
          mode: 'xy',
        }
      },
    },
    animation: {duration: 0}
  };
  const chartPlugins=[{
    id: 'customText',
    afterDraw: (chart)=>drawVectorField(chart)
  }];
  const setup={type: 'line', data: chartData, options: chartOptions, plugins: chartPlugins};
  chart=new Chart(chartCanvas,setup);

  selectFunction.onchange=updateResults;
  checkboxShowDirectionField.onchange=updateResults;
  inputFunction.oninput=updateResults;
  inputX0.oninput=updateResults;
  inputY0.oninput=updateResults;
  inputXMax.oninput=updateResults;
  rangeStepWide.oninput=updateResults;
  selectMethod.onchange=updateResults;
  updateResults();
}

/**
 * Draws the vector field in the background of the chart.
 * @param {Object} chart Chart.js object
 */
function drawVectorField(chart) {
  if (compiledFunction==null) return;
  if (!checkboxShowDirectionField.checked) return;

  const xSteps=20;
  const ySteps=20;

  const xAxis=chart.scales['x'];
  const yAxis=chart.scales['y'];
  const minx=xAxis.min;;
  const maxx=xAxis.max;
  const miny=yAxis.min;
  const maxy=yAxis.max;
  const xUnit=(xAxis.getPixelForValue(maxx)-xAxis.getPixelForValue(minx))/xSteps;
  const yUnit=(yAxis.getPixelForValue(maxy)-yAxis.getPixelForValue(miny))/ySteps;

  for (let i=1;i<xSteps;i++) for (let j=1;j<ySteps;j++) { /* skip borders */
    const x=minx+i/20*(maxx-minx);
    const y=miny+j/20*(maxy-miny);

    /* Start point */
    const px=xAxis.getPixelForValue(x);
    const py=yAxis.getPixelForValue(y);

    /* End point */
    const dy=compiledFunction.evaluate({x: x, y: y});
    const angle=math.atan2(dy,1);
    const qx=px+0.5*xUnit*math.cos(angle);
    const qy=py+0.5*yUnit*math.sin(angle);

    /* Arrow */
    const a1x=qx-0.2*xUnit*math.cos(angle-math.pi/6);
    const a1y=qy-0.2*yUnit*math.sin(angle-math.pi/6);
    const a2x=qx-0.2*xUnit*math.cos(angle+math.pi/6);
    const a2y=qy-0.2*yUnit*math.sin(angle+math.pi/6);

    chart.ctx.strokeStyle="rgba(80,80,80,0.3)";

    chart.ctx.beginPath();
    chart.ctx.moveTo(px,py);
    chart.ctx.lineTo(qx,qy);
    chart.ctx.stroke();

    chart.ctx.beginPath();
    chart.ctx.moveTo(qx,qy);
    chart.ctx.lineTo(a1x,a1y);
    chart.ctx.stroke();

    chart.ctx.beginPath();
    chart.ctx.moveTo(qx,qy);
    chart.ctx.lineTo(a2x,a2y);
    chart.ctx.stroke();
  }
}

/**
 * Loads the data from the GUI.
 * @returns Object containing the data from GUI or null in case of an error
 */
function getData() {
  /* Mode */
  const mode=parseInt(selectFunction.value);
  const isExact=(mode<demoFunctions.length);
  inputFunction.style.display=isExact?"none":"inline-block";

  /* Function */
  compiledFunction=null;
  if (isExact) {
    /* Needed to draw the vector field */
    const parsed=math.parse(demoFunctions[mode].calcFunction);
    compiledFunction=parsed.compile();
  } else {
    inputFunction.classList.remove("is-invalid");
    try {
      const func=inputFunction.value.replace(new RegExp('\\,|\\;','g'),match=>match===','?'.':',');
      const parsed=math.parse(func);
      compiledFunction=parsed.compile();
    } catch (err) {
      compiledFunction=null;
      inputFunction.classList.add("is-invalid");
    }
  }

  /* x0 */
  const x0=parseFloat(inputX0.value.replaceAll(",","."));
  if (isNaN(x0)) {
    inputX0.classList.add("is-invalid");
  } else {
    inputX0.classList.remove("is-invalid");
  }

  /* y0 */
  const y0=parseFloat(inputY0.value.replaceAll(",","."));
  if (isNaN(y0)) {
    inputY0.classList.add("is-invalid");
  } else {
    inputY0.classList.remove("is-invalid");
  }

  /* Max */
  let maxX=parseFloat(inputXMax.value.replaceAll(",","."));
  if (isNaN(maxX) || (!isNaN(x0) && x0>=maxX)) {
    inputXMax.classList.add("is-invalid");
    maxX=NaN;
  } else {
    inputXMax.classList.remove("is-invalid");
  }

  /* Step wide */
  const stepWide=parseInt(rangeStepWide.value)/1000;
  let stepWideStr=stepWide.toLocaleString();
  while (stepWideStr.length<5) stepWideStr+="&nbsp";
  rangeStepWideLabel.innerHTML=language.GUI.stepWide+" h=<span style='font-family: monospace;'>"+stepWideStr+"</span>";

  /* Method */
  const method=parseInt(selectMethod.value);
  methodInfoArea.innerHTML=language.GUI.methodInfo[method];

  /* Function info */
  if (isExact) {
    infoFunction.innerHTML="&nbsp;y(x)="+demoFunctions[mode].displaySolution;
  } else {
    infoFunction.innerHTML="";
  }

  /* Input ok? */
  const ok=!isNaN(x0) && !isNaN(y0) && !isNaN(maxX) && (mode<demoFunctions.length || compiledFunction!=null);
  if (!ok) return null;

  /* Build results record */
  const plotSteps=500;
  const xValues=Array.from({length: plotSteps},(_,i)=>i).map(i=>x0+i/plotSteps*(maxX-x0));
  xValues.push(maxX);
  const result={
    isExact: isExact,
    x0: x0,
    y0: y0,
    maxX: maxX,
    method: method,
    h: stepWide,
    xValues: xValues
  }

  /* y'(x) function */
  if (isExact) {
    const parsed=math.parse(demoFunctions[mode].calcFunction);
    result.displayFunction=demoFunctions[mode].calcFunction;
    const compiled=parsed.compile();
    result.calcFunction=(x,y)=>compiled.evaluate({x: x, y: y});
  } else {
    result.displayFunction=inputFunction.value.replace(new RegExp('\\,|\\;','g'),match=>match===','?'.':',');
    result.calcFunction=(x,y)=>compiledFunction.evaluate({x: x, y: y});
  }

  /* Exact solution */
  if (isExact) {
    result.displayExact=language.GUI.exactSoluation+" y(x)="+demoFunctions[mode].calcSolution+", a="+x0.toLocaleString()+", b="+y0.toLocaleString();
    const parsed=math.parse(demoFunctions[mode].calcSolution);
    const compiled=parsed.compile();
    result.calcExact=x=>compiled.evaluate({x: x, a: x0, b: y0});
  }

  /* Numerical solution */
  result.displayNumerical=language.GUI.approxMethod[method]+", h="+stepWide.toLocaleString();
  switch (method) {
    case 0:
      result.xyValuesNumerical=getEuler(result);
      break;
    case 1:
      result.xyValuesNumerical=getHeun(result);
      break;
    case 2:
      result.xyValuesNumerical=getRK2(result);
      break;
    case 3:
      result.xyValuesNumerical=getRK3(result);
      break;
    case 4:
      result.xyValuesNumerical=getRK4(result);
      break;
  }

  return result;
}

/**
 * Numerical solution to an ODE using the explicit Euler method
 * @param {Object} data Input data
 * @returns Numerical approximation of the ODE
 */
function getEuler(data) {
  const h=data.h;
  const f=data.calcFunction;
  const maxX=data.maxX;

  let x=data.x0;
  let y=data.y0;
  const approx=[{x: x, y: y}];

  while (x<=maxX) {
    const dy=f(x,y);
    x+=h;
    y+=h*dy;
    approx.push({x: x, y: y});
  }

  return approx;
}

/**
 * Numerical solution to an ODE using the Heun method
 * @param {Object} data Input data
 * @returns Numerical approximation of the ODE
 */
function getHeun(data) {
  const h=data.h;
  const f=data.calcFunction;
  const maxX=data.maxX;

  let x=data.x0;
  let y=data.y0;
  const approx=[{x: x, y: y}];

  while (x<=maxX) {
    const k1=f(x,y);
    const k2=f(x+h,y+h*k1);
    x+=h;
    y+=h*(k1+k2)/2;
    approx.push({x: x, y: y});
  }

  return approx;
}

/**
 * Numerical solution to an ODE using the 2nd order Runge-Kutta method
 * @param {Object} data Input data
 * @returns Numerical approximation of the ODE
 */
function getRK2(data) {
  const h=data.h;
  const f=data.calcFunction;
  const maxX=data.maxX;

  let x=data.x0;
  let y=data.y0;
  const approx=[{x: x, y: y}];

  while (x<=maxX) {
    const k1=f(x,y);
    const k2=f(x+h/2,y+h/2*k1);
    x+=h;
    y+=h*k2;
    approx.push({x: x, y: y});
  }

  return approx;
}

/**
 * Numerical solution to an ODE using the 3rd order Runge-Kutta method
 * @param {Object} data Input data
 * @returns Numerical approximation of the ODE
 */
function getRK3(data) {
  const h=data.h;
  const f=data.calcFunction;
  const maxX=data.maxX;

  let x=data.x0;
  let y=data.y0;
  const approx=[{x: x, y: y}];

  while (x<=maxX) {
    const k1=f(x,y);
    const k2=f(x+h/2,y+h/2*k1);
    const k3=f(x+h,y-h*k1+2*h*k2);
    x+=h;
    y+=h*(1/6*k1+4/6*k2+1/6*k3);
    approx.push({x: x, y: y});
  }

  return approx;
}

/**
 * Numerical solution to an ODE using the 4th order Runge-Kutta method
 * @param {Object} data Input data
 * @returns Numerical approximation of the ODE
 */
function getRK4(data) {
  const h=data.h;
  const f=data.calcFunction;
  const maxX=data.maxX;

  let x=data.x0;
  let y=data.y0;
  const approx=[{x: x, y: y}];

  while (x<=maxX) {
    const k1=f(x,y);
    const k2=f(x+h/2,y+h/2*k1);
    const k3=f(x+h/2,y+h/2*k2);
    const k4=f(x+h,y+h*k3);
    x+=h;
    y+=h*(1/6*k1+1/3*k2+1/3*k3+1/6*k4);
    approx.push({x: x, y: y});
  }

  return approx;
}

/**
 * Update output after user input change
 */
function updateResults() {
  const data=getData();

  const datasets=[];
  const result=[];

  if (data!=null) {
    chartOptions.scales.x.min=data.x0;
    chartOptions.scales.x.max=data.maxX;

    /* Chart: Output exact solution */
    let xyValuesExact;
    if (data.isExact) {
      xyValuesExact=data.xValues.map(x=>{return {x: x, y: data.calcExact(x)};});
      datasets.push({
        type: 'line',
        label: data.displayExact,
        data: xyValuesExact,
        fill: false,
        borderColor: 'green',
        borderWidth: 3,
        pointStyle: false,
      });
    }

    /* Chart: Output numerical solution */
    datasets.push({
      type: 'line',
      label: data.displayNumerical,
      data: data.xyValuesNumerical,
      fill: false,
      borderColor: 'red',
      borderWidth: 3,
      pointStyle: false,
    });

    let minY=data.xyValuesNumerical.map(p=>p.y).reduce((a,b)=>Math.min(a,b));
    if (data.isExact) minY=Math.min(minY,xyValuesExact.map(p=>p.y).reduce((a,b)=>Math.min(a,b)));
    chartOptions.scales.y.min=Math.max(-100,minY);
    let maxY=data.xyValuesNumerical.map(p=>p.y).reduce((a,b)=>Math.max(a,b));
    if (data.isExact) maxY=Math.max(maxY,xyValuesExact.map(p=>p.y).reduce((a,b)=>Math.max(a,b)));
    chartOptions.scales.y.max=Math.min(100,maxY);

    /* Calculate extrapolation error */
    if (data.isExact) {
      let absError=0;
      let relError=0;
      const count=data.xyValuesNumerical.length;
      for (let p of data.xyValuesNumerical) {
        const py=data.calcExact(p.x);
        absError+=Math.abs(p.y-py);
        if (py!=0) relError+=Math.abs(p.y-py)/Math.abs(py);
      }
      absError/=count;
      relError/=count;
      result.push(language.GUI.resultAbsoluteError+"="+absError.toLocaleString());
      result.push(language.GUI.resultRelativeError+"="+(relError*100).toLocaleString()+"%");
      result.push(language.GUI.resultErrorInfo);
    }
  }

  /* Write results to GUI */
  chartData.datasets=datasets;
  chart.update();
  resultsArea.innerHTML=result.join("<br>");
}

/**
 * Prepares the layout switcher which will remove the "loading..." text
 * and replace it with the app content.
 */
function startApp() {
  document.addEventListener('readystatechange',event=>{if (event.target.readyState=="complete") {
    if (isDesktopApp) {
      infoLocalDataOnly1.style.display="none";
      infoLocalDataOnly2.style.display="none";
    }
    mainContent.style.display="";
    infoLoading.style.display="none";
  }});
}

/**
 * Initializes the complete web app.
 */
function initApp() {
  initGUILanguage();
  initGUI();
  startApp();
}
