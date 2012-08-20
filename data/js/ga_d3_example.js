// ga_d3_example.js

// *** GLOBALS ***
// Constants
var CONTAINER_WIDTH = 300; var CONTAINER_HEIGHT = 300;

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
             "ga:visitors": "2"
        },
        "rows": [
             [
               "New Visitor",
          "1"
               ],
           [
                 "Returning Visitor",
             "1"
                  ]
                  ]
};
// Base JS Logic
function initialize() {
    setup_response_array();
    render_visualization();
}
// Format the initial response into a defined array
function setup_response_array() {
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
}
function render_visualization() {
    // Circle Pack Visitor Response
    var svg = d3.select("body")
        .append("svg")
        .attr("width", CONTAINER_WIDTH)
        .attr("height", CONTAINER_HEIGHT);

    var pack = d3.layout
        .pack()
        .size([CONTAINER_WIDTH, CONTAINER_HEIGHT]);

    svg.selectAll("circle")
        .data(pack.nodes(circle_visitor_response))
        .enter()
        .append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em")
        .text(function(d) { return d.value; });
    
}
