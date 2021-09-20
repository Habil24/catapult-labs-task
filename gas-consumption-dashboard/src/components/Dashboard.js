import { Bar } from 'react-chartjs-2';
import React from 'react';
import socket from "../utils/socket";
import { fetchMeterReadings } from '../utils/api';


export default class Dashboard extends React.PureComponent {

    constructor(){
        super()
        
        this.state = {
            labels: [],
            data: []
        }
        
    }

    componentDidMount = async () => {
        const initalMeterData = await fetchMeterReadings()
        this.setState({
            data: initalMeterData.data,
            labels: initalMeterData.labels
        })

        socket.on("newMeterData", (newMeterData) => {
            this.setState({
                data: newMeterData.data,
                labels: newMeterData.labels
            })
        })
    }

    componentWillUnmount(){
        socket.disconnect()
    }

    getChartData = () => {
        let chartData = {
            labels: this.state.labels,
            datasets: [
                {
                    label: 'Gas Consumption',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.state.data
                }
            ]
        }

        return chartData
    }


    render() {
        return (
            <div>
                <Bar
                    data={this.getChartData()}
                    width = {600}
                    height = {600}
                />
            </div>
        );
    }
}