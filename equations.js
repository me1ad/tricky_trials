const planckConst = 6.62607015e-34; // Joule * second
const rydbergEnergy = 2.17987236e-18 // Joule
const ls = 2.998e8 // meter / second

function getFreqFromLightEnergy(){
    var answer = parseFloat(prompt("Give energy (J)"))/planckConst;
    updateResultsWLargeNum(answer);
}

function getElectronEnergyChange(){
    var n1 = parseInt(prompt("Quantum 1: "));
    var n2 = parseInt(prompt("Quantum 2: "));
    var z = parseInt(prompt("Protons: "));
    var answer = Math.abs((z ** 2)*rydbergEnergy*( ( 1/(n1**2) ) - ( 1/(n2**2) ) ));
    updateResults(answer);
}

function updateResults(newInnerHTML){
    const resultP = document.getElementById("results");
    resultP.innerHTML += "<br>" + newInnerHTML;
}

function updateResultsWLargeNum(num){
    var powerOfTen = Math.floor(Math.log10(num));
    var newNum = num / (10 ** (powerOfTen));
    updateResults(newNum + `e${powerOfTen}`);
}

function getHydrogenQuantumEnergy(){
    updateResults(rydbergEnergy/(parseInt(prompt("quantum: "))**2));
}

function wavelengthLightEnergy(){
    updateResults(planckConst*ls/parseFloat(prompt("Energy/Wavelength: ")));
}