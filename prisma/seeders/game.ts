import moment from "moment";

const gameData = () => ({
    dateCreated:  new Date(),
    dateStarted: null,
    dateEnded: moment(new Date()).utc().format('YYYY-MM-DD H:mm:ss'),
});

export default gameData;
