// ga_d3_example.js

// *** GLOBALS ***
// Constants
var CONTAINER_WIDTH = 300; var CONTAINER_HEIGHT = 300;

// Base JS Logic
function initialize() {
    render_visitor_graphic();
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
        "totalResults": 2,
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
    var svg = d3.select("body")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");
    
    var group = d3.select("svg")
        .append("svg:g")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT)
        .style("padding", "40px");

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
