// ga_d3_example.js

// *** GLOBALS ***
// Constants
var CONTAINER_WIDTH = 300; var CONTAINER_HEIGHT = 300;

var test_array;

// Base JS Logic
function initialize() {
    render_visitor_graphic();
    render_browser_graphic();
    render_resolution_graphic();
    render_language_graphic();
    render_load_graphic();
}
function render_visitor_graphic() {
    /**************************************************************************\
    | Variables                                                                |
    \**************************************************************************/
    var formatted_visitor_response = {
        "total_visitors": 0,
        "new_visitors": 0,
        "returning_visitors": 0
    };
    var circle_visitor_response;

    var visitor_response = {
        "kind": "analytics#gaData",
        "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:visitorType&metrics=ga:visitors&start-date=2012-08-01&end-date=2012-08-19&start-index=1&max-results=1000",
        "query": {
             "start-date": "2012-08-01",
              "end-date": "2012-08-19",
               "ids": "ga:63132366",
                "dimensions": "ga:visitorType",
                 "metrics": [
                       "ga:visitors"
                        ],
                  "start-index": 1,
                   "max-results": 1000
        },
        "itemsPerPage": 1000,
        "totalResults": 10,
        "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:visitorType&metrics=ga:visitors&start-date=2012-08-01&end-date=2012-08-19&start-index=1&max-results=1000",
        "profileInfo": {
             "profileId": "63132366",
              "accountId": "34182323",
               "webPropertyId": "UA-34182323-1",
                "internalWebPropertyId": "61644851",
                 "profileName": "CNabors",
                  "tableId": "ga:63132366"
        },
        "containsSampledData": false,
        "columnHeaders": [
             {
                   "name": "ga:visitorType",
                     "columnType": "DIMENSION",
                       "dataType": "STRING"
                            },
         {
               "name": "ga:visitors",
                 "columnType": "METRIC",
                   "dataType": "INTEGER"
                        }
        ],
            "totalsForAllResults": {
                 "ga:visitors": "10"
            },
            "rows": [
                 [
                   "New Visitor",
              "3"
                   ],
               [
                     "Returning Visitor",
                 "7"
                      ]
                      ]
    };

    /**************************************************************************\
    | Format Response                                                          |
    \**************************************************************************/
    // Visitor Response
    formatted_visitor_response['new_visitors'] = parseInt(visitor_response['rows'][0][1]);
    formatted_visitor_response['returning_visitors'] = parseInt(visitor_response['rows'][1][1]);
    formatted_visitor_response['total_visitors'] = (formatted_visitor_response['new_visitors'] + formatted_visitor_response['returning_visitors']);
    // Formatted Visitor Response for the Circle Packing
    circle_visitor_response = {
        children: [
            {value: formatted_visitor_response['new_visitors']},
            {value: formatted_visitor_response['returning_visitors']}
        ]
    };

    /**************************************************************************\
    | D3 Render                                                                |
    \**************************************************************************/
    // Circle Pack Visitor Response
    var svg = d3.select("#visitor_graphic")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");
    
    var group = svg.append("svg:g");

    // Total Text
    group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", ".5em")
        .attr("x", ((CONTAINER_WIDTH / 2) - 20))
        .attr("y", -15)
        .text(function(d) { return ("Total Visitors: " + formatted_visitor_response['total_visitors']); });
    
    // New Text
    group.append("svg:text")
        .attr("text-anchor", "left")
        .attr("dy", ".5em")
        .attr("x", -40)
        .attr("y", ((CONTAINER_HEIGHT / 2) - 20))
        .text("New");
    
    // Returning Text
    group.append("svg:text")
        .attr("text-anchor", "right")
        .attr("dy", ".45em")
        .attr("x", CONTAINER_WIDTH - 35)
        .attr("y", ((CONTAINER_HEIGHT / 2) - 20))
        .text("Returning");

    var pack = d3.layout
        .pack()
        .size([CONTAINER_WIDTH - 40, CONTAINER_HEIGHT - 40]);

    var circ = group.selectAll("circle")
        .data(pack.nodes(circle_visitor_response))
        .enter();
    
    circ.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .attr("y", function(d) { return d.y; })
        .attr("x", function(d) { return d.x; })
        .attr("r", function(d) { return d.r; })
        .text(function(d) {
            if(d.value === formatted_visitor_response['total_visitors']) {
                return ""; 
            } else {
                return d.value; 
            }
        });
    
    circ.append("svg:circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; });
}

function render_browser_graphic() {
    /**************************************************************************\
    | Variables                                                                |
    \**************************************************************************/
    var formatted_browser_response = {};
    var domain_max = 0;
    var browser_list = [];

    var browser_response = {
             "kind": "analytics#gaData",
              "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:browser,+ga:browserVersion&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-20&start-index=1&max-results=1000",
               "query": {
                     "start-date": "2012-08-01",
                       "end-date": "2012-08-20",
                         "ids": "ga:63132366",
                           "dimensions": "ga:browser, ga:browserVersion",
                             "metrics": [
                                    "ga:visits"
                                      ],
                               "start-index": 1,
                                 "max-results": 1000
                                      },
                "itemsPerPage": 1000,
                 "totalResults": 10,
                  "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:browser,+ga:browserVersion&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-20&start-index=1&max-results=1000",
                   "profileInfo": {
                         "profileId": "63132366",
                           "accountId": "34182323",
                             "webPropertyId": "UA-34182323-1",
                               "internalWebPropertyId": "61644851",
                                 "profileName": "CNabors",
                                   "tableId": "ga:63132366"
                                        },
                    "containsSampledData": false,
                     "columnHeaders": [
                           {
                                  "name": "ga:browser",
                                     "columnType": "DIMENSION",
                                        "dataType": "STRING"
                                              },
                       {
                              "name": "ga:browserVersion",
                                 "columnType": "DIMENSION",
                                    "dataType": "STRING"
                                          },
                         {
                                "name": "ga:visits",
                                   "columnType": "METRIC",
                                      "dataType": "INTEGER"
                                            }
              ],
                   "totalsForAllResults": {
                         "ga:visits": "4"
                              },
                    "rows": [
                          [
                             "Chrome",
                       "21.0.1180.57",
                          "2"
                                ],
                            [
                                   "Chrome",
                               "21.0.1180.79",
                                  "2"
                                        ],
                                    [
                                           "Chrome",
                                       "22.0.1229.8",
                                          "4"
                                                ],
                                            [
                                                   "Firefox",
                                               "14.0.1",
                                                  "2"
                                                        ]
                                                         ]
    };
    /**************************************************************************\
    | Format Response                                                          |
    \**************************************************************************/
    var number_of_results = browser_response['rows'].length;

    formatted_browser_response = browser_response['rows'];

    for(var i = 0; i < number_of_results; i += 1) {

        browser_list.push(formatted_browser_response[i][0]);

        if(domain_max < browser_response['rows'][i][2]) {
            domain_max = browser_response['rows'][i][2];
        }
    }
    
    formatted_browser_response['total_visits'] = parseInt(browser_response['totalResults']);
    /**************************************************************************\
    | D3 Render                                                                |
    \**************************************************************************/
    // Browser Response
    var svg = d3.select("#browser_graphic")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");
   
    var bar_width_max = (CONTAINER_WIDTH / number_of_results);

    var x = d3.scale
	.linear()
	.domain([0, 1])
	.range([0, bar_width_max]);

    var y = d3.scale
        .linear()
        .domain([0, domain_max])
        .rangeRound([0, CONTAINER_HEIGHT]);

    var color_scale = d3.scale
        .ordinal()
        .domain(browser_list)
        .range(['#E5F5F9', '#2CA25F']);

    var group = svg.append("svg:g");
    
    group.selectAll("rect")
        .data(formatted_browser_response)
        .enter()
        .append("svg:rect")
        .attr("x", function(d, i) { return x(i) - 0.5;  })
	.attr("y", function(d) { return (CONTAINER_HEIGHT - y(d[2]) - 0.5); })
        .attr("height", function(d) { return y(d[2]); })
        .attr("width", bar_width_max - 5)
        .style("fill", function(d) { return color_scale(d[0]); })
	.style("stroke", "black");
    
    group.selectAll("text")
        .data(formatted_browser_response)
        .enter()
        .append("svg:text")
	.attr("x", function(d) { return (CONTAINER_WIDTH * -.53); })
        .attr("y", function(d, i) { return (y(i) + (bar_width_max / 2));  })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("font-size", ".8em")
	.attr("transform", "rotate(270)")
        .text(function(d) { return ("(" + d[2] + ") " + d[0] + ": " + d[1]); });

    // Total Text
    group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", ".5em")
        .attr("x", ((CONTAINER_WIDTH / 2) - 20))
        .attr("y", -15)
        .text("Browsers");
}
function render_resolution_graphic() {
    /**************************************************************************\
    | Variables                                                                |
    \**************************************************************************/
    var formatted_resolution_response = {};
    var domain_max = 0;
    var is_mobile = ["No", "Yes"];

    var resolution_response = {
         "kind": "analytics#gaData",
          "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:isMobile,+ga:screenResolution&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-21&start-index=1&max-results=1000",
           "query": {
                 "start-date": "2012-08-01",
                   "end-date": "2012-08-21",
                     "ids": "ga:63132366",
                       "dimensions": "ga:isMobile, ga:screenResolution",
                         "metrics": [
                                "ga:visits"
                                  ],
                           "start-index": 1,
                             "max-results": 1000
                                  },
            "itemsPerPage": 1000,
             "totalResults": 3,
              "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:isMobile,+ga:screenResolution&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-21&start-index=1&max-results=1000",
               "profileInfo": {
                     "profileId": "63132366",
                       "accountId": "34182323",
                         "webPropertyId": "UA-34182323-1",
                           "internalWebPropertyId": "61644851",
                             "profileName": "CNabors",
                               "tableId": "ga:63132366"
                                    },
                "containsSampledData": false,
                 "columnHeaders": [
                       {
                              "name": "ga:isMobile",
                                 "columnType": "DIMENSION",
                                    "dataType": "STRING"
                                          },
                   {
                          "name": "ga:screenResolution",
                             "columnType": "DIMENSION",
                                "dataType": "STRING"
                                      },
                     {
                            "name": "ga:visits",
                               "columnType": "METRIC",
                                  "dataType": "INTEGER"
                                        }
          ],
               "totalsForAllResults": {
                     "ga:visits": "12"
                          },
                "rows": [
                      [
                         "No",
                   "1440x900",
                      "4"
                            ],
                        [
                               "No",
                           "1920x1080",
                              "5"
                                    ],
                                [
                                       "Yes",
                                   "320x480",
                                      "3"
                                            ]
                                             ]
    };

    /**************************************************************************\
    | Format Response                                                          |
    \**************************************************************************/
    var number_of_results = resolution_response['rows'].length;

    formatted_resolution_response = resolution_response['rows'];

    for(var i = 0; i < number_of_results; i += 1) {

        if(domain_max < resolution_response['rows'][i][2]) {
            domain_max = resolution_response['rows'][i][2];
        }
    }

    /**************************************************************************\
    | D3 Render                                                                |
    \**************************************************************************/
    // Resolution Response
    var svg = d3.select("#resolution_graphic")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");
    
    var x = d3.scale
        .linear()
        .domain([0, domain_max])
        .range([0, CONTAINER_WIDTH]);

    var color_scale = d3.scale
        .ordinal()
        .domain(is_mobile)
        .range(['#E5F5F9', '#2CA25F']);

    var group = svg.append("svg:g");
    
    group.selectAll("rect")
        .data(formatted_resolution_response)
        .enter()
        .append("svg:rect")
        .attr("y", function(d, i) { return i * 35;  })
        .attr("width", function(d) { return x(d[2]); })
        .style("fill", function(d) { return color_scale(d[0]); })
	.style("stroke", "black")
        .attr("height", 35);
    
    group.selectAll("text")
        .data(formatted_resolution_response)
        .enter()
        .append("svg:text")
        .attr("x", function(d) { return (x(d[2])); })
        .attr("y", function(d, i) { return ((i * 35) + 20); })
        .attr("dx", -3)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .style("font-size", ".8em")
        .text(function(d) {
            if(d[0] === "Yes") {
                return ("(" + d[2] + ")" + " Mobile: " + d[1]);
            } else {
                return ("(" + d[2] + ") " + d[1]); 
            }
        });

    // Total Text
    group.append("svg:text")
        .attr("text-anchor", "middle")
        .attr("dy", ".5em")
        .attr("x", ((CONTAINER_WIDTH / 2) - 20))
        .attr("y", -15)
        .text("Resolution");

}

function render_language_graphic() {
    /**************************************************************************\
    | Variables                                                                |
    \**************************************************************************/
    var origin_list = [];
    var radius = (CONTAINER_HEIGHT / 2);
    var formatted_data = [];

    var language_response = {
         "kind": "analytics#gaData",
          "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:language,+ga:country&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-22&start-index=1&max-results=1000",
           "query": {
                 "start-date": "2012-08-01",
                   "end-date": "2012-08-22",
                     "ids": "ga:63132366",
                       "dimensions": "ga:language, ga:country",
                         "metrics": [
                                "ga:visits"
                                  ],
                           "start-index": 1,
                             "max-results": 1000
                                  },
            "itemsPerPage": 1000,
             "totalResults": 3,
              "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&dimensions=ga:language,+ga:country&metrics=ga:visits&start-date=2012-08-01&end-date=2012-08-22&start-index=1&max-results=1000",
               "profileInfo": {
                     "profileId": "63132366",
                       "accountId": "34182323",
                         "webPropertyId": "UA-34182323-1",
                           "internalWebPropertyId": "61644851",
                             "profileName": "CNabors",
                               "tableId": "ga:63132366"
                                    },
                "containsSampledData": false,
                 "columnHeaders": [
                       {
                              "name": "ga:language",
                                 "columnType": "DIMENSION",
                                    "dataType": "STRING"
                                          },
                   {
                          "name": "ga:country",
                             "columnType": "DIMENSION",
                                "dataType": "STRING"
                                      },
                     {
                            "name": "ga:visits",
                               "columnType": "METRIC",
                                  "dataType": "INTEGER"
                                        }
          ],
               "totalsForAllResults": {
                     "ga:visits": "11"
                          },
                "rows": [
                      [
                         "en",
                   "United States",
                      "5"
                            ],
                        [
                               "en-us",
                           "United States",
                              "4"
                                    ],
                                [
                                       "it",
                                   "Italy",
                                      "3"
                                            ]
                                             ]
    };

    /**************************************************************************\
    | Format Response                                                          |
    \**************************************************************************/
    var number_of_results = language_response['rows'].length;
    for(var i = 0; i < number_of_results; i += 1) {
        var temp_label = (language_response['rows'][i][0] + ": " + language_response['rows'][i][1]);
        var temp_value = (language_response['rows'][i][2]);
	if(temp_label === "en-us: United States") {
	    length_of_formatted_data = formatted_data.length;
	    for(var y = 0; y < length_of_formatted_data; y += 1) {
	        if(formatted_data[y].label === "en: United States") {
		    var first_val = parseInt(formatted_data[y].value);
		    var second_val = parseInt(temp_value);
		    formatted_data[y].value = (first_val + second_val);
		}
	    }
	} else {
            origin_list.push(temp_label);
            formatted_data.push({"label": temp_label, "value":temp_value});
	}
    }
    
    test_array = formatted_data;
    console.log(test_array);
    /**************************************************************************\
    | D3 Render                                                                |
    \**************************************************************************/
    var svg = d3.select("#language_graphic")
        .append("svg:svg")
        .data([formatted_data])
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px")
        .append("svg:g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var color_scale = d3.scale
        .ordinal()
        .domain(origin_list)
        .range(['#E5F5F9', '#2CA25F']);
    
    var arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(radius);

    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });

    var arcs = svg.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d) { return color_scale(d.data.label); })
        .attr("stroke", "black")
        .attr("d", arc);
    
    arcs.append("svg:text")
        .attr("transform", function(d) {
            d.innerRadius = 0;
            d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .style("font-size", ".8em")
        // Ex - (2)en: United States
        .text(function(d) { return ("(" + d.data.value + ") " + d.data.label); });
}

function render_load_graphic() {
    /**************************************************************************\
    | Variables                                                                |
    \**************************************************************************/
    var formatted_load_response;

    var load_response = {
         "kind": "analytics#gaData",
          "id": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&metrics=ga:visits,ga:avgPageLoadTime&start-date=2012-08-01&end-date=2012-08-22&start-index=1&max-results=1000",
           "query": {
                 "start-date": "2012-08-01",
                   "end-date": "2012-08-22",
                     "ids": "ga:63132366",
                       "metrics": [
                              "ga:visits",
                          "ga:avgPageLoadTime"
                                ],
                            "start-index": 1,
                              "max-results": 1000
                                   },
            "itemsPerPage": 1000,
             "totalResults": 1,
              "selfLink": "https://www.googleapis.com/analytics/v3/data/ga?ids=ga:63132366&metrics=ga:visits,ga:avgPageLoadTime&start-date=2012-08-01&end-date=2012-08-22&start-index=1&max-results=1000",
               "profileInfo": {
                     "profileId": "63132366",
                       "accountId": "34182323",
                         "webPropertyId": "UA-34182323-1",
                           "internalWebPropertyId": "61644851",
                             "profileName": "CNabors",
                               "tableId": "ga:63132366"
                                    },
                "containsSampledData": false,
                 "columnHeaders": [
                       {
                              "name": "ga:visits",
                                 "columnType": "METRIC",
                                    "dataType": "INTEGER"
                                          },
                   {
                          "name": "ga:avgPageLoadTime",
                             "columnType": "METRIC",
                                "dataType": "FLOAT"
                                      }
          ],
               "totalsForAllResults": {
                     "ga:visits": "12",
                       "ga:avgPageLoadTime": "0.6"
                            },
                "rows": [
                      [
                         "12",
                   "0.6"
                         ]
                          ]
    };

    /**************************************************************************\
    | Format Response                                                          |
    \**************************************************************************/
    formatted_load_response = load_response['rows'];

    /**************************************************************************\
    | D3 Render                                                                |
    \**************************************************************************/
    var svg = d3.select("#load_graphic")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");
    
    var group = svg.append("svg:g");

    // Total Text
    group.append("svg:text")
        .data(formatted_load_response)
        .attr("text-anchor", "middle")
        .attr("dy", ".5em")
        .attr("x", ((CONTAINER_WIDTH / 2) - 20))
        .attr("y", -15)
        .text(function(d) { return ("Total Visitors: " + d[0] + ", Avg Load Time: " + d[1] + " seconds."); });
}
