const meterData = require ("../data/meter-data")
const _ = require("lodash")
const moment = require("moment")


const aggregatedDataByDate = (meterData) => {
    let groupedData = _(meterData)
        .sortBy(m => new Date(m.timestamp))
        .groupBy(m => moment(new Date(m.timestamp)).format('DD MMM YYYY'))
        .mapValues(m => _.map(m, 'value')).value()
    
    const labels = _.keys(groupedData)
    const data = _.values(groupedData).map(arr => _.sum(arr))

    return {labels: labels, data: data}
}

const fetchMeterData = () => {
    return meterData
}

// Note that, for simplicity it generates random data for last 10 days
const generateRandomMeterData = () => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 10)
    const meterVal = Math.floor(Math.random() * 101);
    const deviceId = Math.floor(Math.random() * 11);
    const timestamp = getRandomDate(startDate,endDate)

    return {"deviceId": deviceId,"timestamp": timestamp.getTime(),"value": meterVal}
}

const getRandomDate = (start, end) => {
    const startTime = start.getTime();
    const endTime = end.getTime();

    return new Date(startTime + Math.random() * (endTime - startTime));
}


module.exports = {
    generateRandomMeterData,
    fetchMeterData,
    aggregatedDataByDate
}