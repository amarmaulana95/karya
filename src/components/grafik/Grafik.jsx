import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import Header from '../header/Header'
import Axios from "axios";

export default class Grafik extends Component {
    state = {
        data_total: [],
        data_rows: [],
        labels_created_at: [],
        chartData: {

        }
    };

    getChart = () => {
        this.setState({
            chartData: {
                labels: this.state.labels_created_at,
                datasets: [
                    {
                        label: 'total laporan',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.state.data_total
                    },
                    {
                        label: 'wilayah',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(255, 127, 80,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(255, 127, 80,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(255, 127, 80,1)',
                        pointHoverBorderColor: 'rgba(255, 127, 80,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.state.data_rows
                    }
                ]
            }
        });
    };

    componentDidMount() {
        Axios.get(`https://projectapi-tes.000webhostapp.com/produksi`, {
        })
            .then(res => {
                this.setState({
                    data_total: res.data.produksi.map(val => val.total),
                    data_rows: res.data.produksi.map(val => val.wilayah),
                    labels_created_at: res.data.produksi.map(val => val.tgl)
                });
            })
            .then(() => {
                this.getChart();
            });
    }

    render() {
        return (
            <>
                <Header />
                <div className="container">
                    <div className="card mb-4 shadow p-4" style={{ marginTop: 40 }}>
                        <h4 className="font-weight-bold mb-4">Line Chart</h4>
                        <code>Grafik laporan</code>
                        <div>
                            <Line
                                data={this.state.chartData}
                                width={150}
                                height={250}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
