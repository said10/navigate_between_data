import React, { Component } from 'react';
import { connect } from 'react-redux';
import Request from '../../base/request';
import * as actions from "../../actions";
import ProcessData from '../../../plugins/processus_data';
import Chart from 'chart.js';

class Graph extends Request {
    
    constructor(props) {
        super(props);
        this.state = { "current" : "" };
    }
    
    componentDidUpdate(prevProps) {
        if (this.state.current !== this.props.drag.url) {
            this.getDataComponent();
        }
    }
    
    getDataComponent() {
        var url  = this.props.drag.url;
        var x_axis  = this.props.drag.x_attribute;
        var y_axis  = this.props.drag.y_attribute;
        var name  = this.props.drag.name;
        let self = this;
        var promise = this.get(url, (response) => {
            self.setState({ current : url });
            const processus_data = new ProcessData();
            var data_graph = processus_data.processus(response.data, x_axis, y_axis);
            var parent_canvas = dom.get("#graph");
            if (data_graph.status === "success") {
                parent_canvas.html("<canvas id='canvas'></canvas>");
                var canvas = dom.get("#canvas");
                var width = dom.get("#container-graph").width()-60;
                var ctx_graph = canvas.getContext('2d');
                var height_graph = 450;
                ctx_graph.canvas.height = height_graph;
                ctx_graph.canvas.width = width;
                var myChart = new Chart(ctx_graph, {
                    type: 'bar',
                    data: {
                        labels: data_graph.data.x,
                        datasets : [{
                            label: name,
                            data: data_graph.data.y,
                            backgroundColor: "#38baf6",
                        }]
                    },
                    options: {
                        responsive: false,
                         title: {
                            display: true,
                            text: name
                          },
                          legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                gridLines : {
                                    display: true,
                                    drawBorder: true,
                                    drawOnChartArea: false,
                                    drawTicks : true
                                },
                                stacked : false,
                                ticks: {
                                    fontSize: 10
                                }
                            }],
                            yAxes: [{
                                gridLines : {
                                    display: true,
                                    drawBorder: true,
                                    drawOnChartArea: true,
                                    drawTicks : true
                                },
                                stacked : false
                                /*ticks: {
                                    min: 0,
                                    max: 100,
                                    stepSize: 10
                                }*/
                            }]
                    }
                        
                    },
                
                });
            }
            else {
                parent_canvas.html("<div class='message-error-graph align-center error-background'>"+data_graph.message+"</div>")
            }
        }, function(error) {
            var parent_canvas = dom.get("#graph");
            var status_error = "<h3 class='top15'> Error Type : "+error.status + ", "+error.statusText+"</h3>";
            parent_canvas.html("<div class='message-error-graph align-center error-background h3-like'>Error to get Data From the URL, please check the URL and try again."+status_error+"</div>");
        });
        
    }
    
    render() {
        return (
            <div className="col-2 center-auto">
                <div className="box30 white border essentiel-shadow empty" id="container-graph">
                    <h2 className="align-center">{this.props.title}</h2>
                    <div className="relative top30">
                        <div id="empty-graph" className="gris-bg box">
                            <h3 className="align-center">Drag & Drop Source of Data here</h3>
                        </div>
                        <div id="graph" className="none">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
}



function mapStateToPropsGraph (state) {
  return  { drag : state.drag, component : state.component};
}
export default connect(mapStateToPropsGraph, actions)(Graph);