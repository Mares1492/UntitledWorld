import Session from "../../classes/Game/Session.js";

const getToBelieveDecisionDefinedText = () => {
    const decision = Session.currentPlayer.isBelieveTheLetter;
    console.log(decision);
    if (decision) {
        return 8;
    } else {
        return 21;
    }
}
export default getToBelieveDecisionDefinedText
