angular.module('angularApp')
    .controller('TenantUserHomeController', [ '$scope','$state','tenantLoginService','app','NgTableParams', function ($scope,$state,tenantLoginService,app,NgTableParams) {
        $scope.description = {
            message1  : 'My first Angular app',
            message2 : 'developing for testing',
            message3 : tenantLoginService.getPrivate()
        };
        debugger;
        $scope.myChartObject = {
            "type": "ColumnChart",
            "displayed": false,
            "data": {
                "cols": [
                    {
                        "id": "month",
                        "label": "Month",
                        "type": "string",
                        "p": {}
                    },
                    {
                        "id": "laptop-id",
                        "label": "Laptop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "desktop-id",
                        "label": "Desktop",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "server-id",
                        "label": "Server",
                        "type": "number",
                        "p": {}
                    },
                    {
                        "id": "cost-id",
                        "label": "Shipping",
                        "type": "number"
                    }
                ],
                "rows": [
                    {
                        "c": [
                            {
                                "v": "January"
                            },
                            {
                                "v": 19,
                                "f": "42 items"
                            },
                            {
                                "v": 12,
                                "f": "Ony 12 items"
                            },
                            {
                                "v": 7,
                                "f": "7 servers"
                            },
                            {
                                "v": 4
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "February"
                            },
                            {
                                "v": 13
                            },
                            {
                                "v": 1,
                                "f": "1 unit (Out of stock this month)"
                            },
                            {
                                "v": 12
                            },
                            {
                                "v": 2
                            }
                        ]
                    },
                    {
                        "c": [
                            {
                                "v": "March"
                            },
                            {
                                "v": 24
                            },
                            {
                                "v": 5
                            },
                            {
                                "v": 11
                            },
                            {
                                "v": 6
                            }
                        ]
                    }
                ]
            },
            "options": {
                "title": "Sales per month",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Sales unit",
                    "gridlines": {
                        "count": 10
                    }
                },
                "hAxis": {
                    "title": "Date"
                }
            },
            "formatters": {}
        }

        $scope.myPieChartObject = {};

        $scope.myPieChartObject.type = "PieChart";

        $scope.onions = [
            {v: "Onions"},
            {v: 3},
        ];

        $scope.myPieChartObject.data = {"cols": [
            {id: "t", label: "Topping", type: "string"},
            {id: "s", label: "Slices", type: "number"}
        ], "rows": [
            {c: [
                {v: "Mushrooms"},
                {v: 3},
            ]},
            {c: $scope.onions},
            {c: [
                {v: "Olives"},
                {v: 31}
            ]},
            {c: [
                {v: "Zucchini"},
                {v: 1},
            ]},
            {c: [
                {v: "Pepperoni"},
                {v: 2},
            ]}
        ]};

        $scope.myPieChartObject.options = {
            'title': 'How Much Pizza I Ate Last Night'
        };



        $scope.buildGridModel = function (tileTmpl) {
            var it, results = [];

            for (var j = 0; j < 5; j++) {

                it = angular.extend({}, tileTmpl);
                //it.icon = it.icon + (j + 1);
                it.title = it.title + (j + 1);
                it.span = {row: 1, col: 1};

                switch (j + 1) {

                    case 1:
                        it.background = "darkBlue";
                        break;
                    case 2:
                        it.background = "deepBlue";
                        break;
                    case 3:
                        it.background = "darkBlue";
                        break;
                    case 4:
                        it.background = "deepBlue";
                        break;

                    case 5:
                        it.background = "transparent";
                        it.data = new Date().toString;
                        it.span.col = 2;
                        break;
                }

                results.push(it);
            }
            return results;
        }

        var response = {
            data : [
                {
                    username: "hello world",
                },
                {
                    username: "hello world",
                },
                {
                    username: "hello world",
                },
                {
                    username: "hello world",
                },
                {
                    username: "hello world",
                }
            ]
        };
        $scope.userTable = new NgTableParams({count: 2}, { dataset: response.data});

        debugger;
        $scope.tiles = $scope.buildGridModel({
            //icon : "avatar:svg-",
            title: "Svg-",
            background: ""
        });

    }]);