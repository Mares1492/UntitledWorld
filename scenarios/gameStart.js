import Session from "../classes/Game/Session.js";
import startingPlanets from "../textData/startPlanets.js";
import Appearance from "../classes/Character/Appearance.js";
import jobs from "../textData/characterJobs.js";
import startGame from "../classes/Text/PassageLogic.js";
const error = document.getElementById("error");

const handleStartGame = () =>{
    console.log("Starting game");
    const name = document.getElementById('character-name-input').value;
    if (name === ""){
        error.innerHTML = "Please enter a name";
        return;
    }
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    if (!gender){
        error.innerHTML = "Please select a gender"
        return;
    }
    const job = document.querySelector('input[name="job"]:checked')?.value;
    if (!job){
        error.innerHTML = "Please select a job"
        return;
    }
    console.log("Chosen job: ",jobs[job]);
    document.getElementById('create-char-container').style.display = 'none';
    const pickedJob = jobs[job];
    const session = new Session(
        name,
        pickedJob,
        new Appearance(gender),
        startingPlanets[pickedJob.startingPlanet]);
    //TODO: add planet selection based on job or other factors
    startGame(); //TODO: mb rename it to showText or something
}
export default handleStartGame;

