import Session from "../../classes/Game/Session.js";


const getJobDefinedNextBackstory = () =>{
    const job = Session.currentPlayer.backstory
    console.log(job)
    switch (job) {
        case "Private Military Contractor":
            return 13;
        case "Miner":
            return 14;
        case "Think Tank Assistant":
            return 15;
        default:
            return 8;
    }
}
export default getJobDefinedNextBackstory;
