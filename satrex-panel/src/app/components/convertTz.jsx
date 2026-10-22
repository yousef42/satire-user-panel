import moment from "moment";
import starkString from "starkstring";

export default (date, tzString) => {
    date = starkString(moment(date).format('YYYY/MM/DD HH:mm:ss +0000')).englishNumber().toString()
    return new Date((typeof date === "string" ? new Date(date) :date).toLocaleString("en-US", {timeZone: tzString}));
}

export const newDate = ()=>{
    return "jhiii";
}