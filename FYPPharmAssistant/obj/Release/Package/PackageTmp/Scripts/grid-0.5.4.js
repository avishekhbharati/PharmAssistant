/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.5.4
 * http://gijgo.com/
 *
 * Copyright 2014, 2015 gijgo.com
 * Released under the MIT license
 */
/** 
  * @widget Grid 
  * @plugin Core
  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.grid) === 'undefined') {
    gj.grid = {};
}

gj.grid.configuration = {
    base: {
        /** The data source of the widget which is used table rows.<br />
          * @additionalinfo If set to string, then the grid is going to use this string as a url for ajax requests to the server.<br />
          * If set to object, then the grid is going to use this object as settings for the <a href="http://api.jquery.com/jquery.ajax/" target="_new">jquery ajax</a> function.<br />
          * If set to array, then the grid is going to use the array as data for rows.
          * @type (string|object|array)
          * @default undefined
          * @example <table id="grid"></table>
          * <script>
          *     var grid = $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         columns: [ { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          * @example <table id="grid" data-source="/Grid/GetPlayers">
          *     <thead>
          *         <tr>
          *             <th width="20">ID</th>
          *             <th>Name</th>
          *             <th>PlaceOfBirth</th>
          *         </tr>
          *     </thead>
          * </table>
          * <script>
          *     $("#grid").grid();
          * </script>
          * @example <table id="grid"></table>
          * <script>
          *     var grid, onSuccessFunc = function (response) { 
          *         alert("The result contains " + response.records.length + " records.");
          *         grid.render(response);
          *     };
          *     grid = $("#grid").grid({
          *         dataSource: { url: "/Grid/GetPlayers", data: {}, success: onSuccessFunc },
          *         columns: [ { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          * @example <table id="grid"></table>
          * <script>
          *     var data = [
          *         { "ID": 1, "Name": "Hristo Stoichkov", "PlaceOfBirth": "Plovdiv, Bulgaria" },
          *         { "ID": 2, "Name": "Ronaldo Luis Nazario de Lima", "PlaceOfBirth": "Rio de Janeiro, Brazil" },
          *         { "ID": 3, "Name": "David Platt", "PlaceOfBirth": "Chadderton, Lancashire, England" }
          *     ];
          *     $("#grid").grid({
          *         dataSource: data,
          *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          */
        dataSource: undefined,
        /** An array that holds the configurations of each column from the grid.
          * @type array
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         columns: [ { field: "ID", width: 30 }, { field: "Name" }, { field: "PlaceOfBirth", name: "Birth Place" } ]
          *     });
          * </script>
          */
        columns: [],
        /** Auto generate column for each field in the datasource when set to true.
          * @type array
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         autoGenerateColumns: true
          *     });
          * </script>
          */
        autoGenerateColumns: false,
        /** An object that holds the default configuration settings of each column from the grid.
          * @type object
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         defaultColumnSettings: { align: 'right' },
          *         columns: [ { field: "ID", width: 30 }, { field: "Name" }, { field: "PlaceOfBirth", name: "Birth Place" } ]
          *     });
          * </script>
          */
        defaultColumnSettings: {
            /** If set to true the column will not be displayed in the grid. By default all columns are displayed.
              * @alias column.hidden
              * @type boolean
              * @default false
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [ { field: "ID", width: 30 }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
              *     });
              * </script>
              */
            hidden: false,
            /** The width of the column. Numeric values are treated as pixels.
              * If the width is undefined the width of the column is not set and depends on the with of the table(grid).
              * @alias column.width
              * @type int|string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID", width: 20 },
              *             { field: "Name", width: 120 },
              *             { field: "PlaceOfBirth" }
              *         ]
              *     });
              * </script>
              */
            width: undefined,
            /** Indicates if the column is sortable.
                * If set to true the user can click the column header and sort the grid by the column source field.
                * @alias column.sortable
                * @type boolean
                * @default false
                * @example <table id="grid"></table>
                * <script>
                *     $("#grid").grid({
                *         dataSource: "/Grid/GetPlayers",
                *         columns: [
                *             { field: "ID" },
                *             { field: "Name", sortable: true },
                *             { field: "PlaceOfBirth", sortable: false },
                *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
                *         ]
                *     });
                * </script>
                */
            sortable: false,
            /** Indicates the type of the column.
              * @alias column.type
              * @type checkbox|icon|date
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID", width: 24 },
              *             { field: "Name", title: "Player" },
              *             { field: "PlaceOfBirth", title: "Place of Birth" },
              *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
              *         ]
              *     });
              * </script>
              */
            type: undefined,
            /** The caption that is going to be displayed in the header of the grid.
              * @alias column.title
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID" },
              *             { field: "Name", title: "Player" },
              *             { field: "PlaceOfBirth", title: "Place of Birth" },
              *             { field: "DateOfBirth", type: "date", title: "Birth Date" }
              *         ]
              *     });
              * </script>
              */
            title: undefined,
            /** The field name to which the column is bound.
              * If the column.title is not defined this value is used as column.title.
              * @alias column.field
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID" },
              *             { field: "Name" },
              *             { field: "PlaceOfBirth", title: "Place of Birth" },
              *             { field: "DateOfBirth", type: "date" }
              *         ]
              *     });
              * </script>
              */
            field: undefined,
            /** This setting control the alignment of the text in the cell.
              * @alias column.align
              * @type left|right|center|justify|initial|inherit
              * @default "left"
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID", align: "center" },
              *             { field: "Name", align: "right" },
              *             { field: "PlaceOfBirth", align: "left" }
              *         ]
              *     });
              * </script>
              */
            align: "left",
            /** The name(s) of css class(es) that are going to be applied to all cells inside that column, except the header cell.
              * @alias column.cssClass
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <style>
              * .nowrap { white-space: nowrap }
              * .bold { font-weight: bold }
              * </style>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID", width: 20 },
              *             { field: "Name", width: 100, cssClass: "nowrap bold" },
              *             { field: "PlaceOfBirth" }
              *         ]
              *     });
              * </script>
              */
            cssClass: undefined,
            /** The name(s) of css class(es) that are going to be applied to the header cell of that column.
              * @alias column.headerCssClass
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <style>
              * .italic { font-style: italic }
              * </style>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID", width: 20 },
              *             { field: "Name", width: 100, headerCssClass: "italic" },
              *             { field: "PlaceOfBirth" }
              *         ]
              *     });
              * </script>
              */
            headerCssClass: undefined,
            /** The text for the cell tooltip.
                * @alias column.tooltip
                * @type string
                * @default undefined
                * @example <table id="grid"></table>
                * <script>
                *     $("#grid").grid({
                *         dataSource: "/Grid/GetPlayers",
                *         columns: [
                *             { field: "ID", tooltip: "This is my tooltip 1." },
                *             { field: "Name", tooltip: "This is my tooltip 2." },
                *             { field: "PlaceOfBirth", tooltip: "This is my tooltip 3." }
                *         ]
                *     });
                * </script>
                */
            tooltip: undefined,
            /** Css class for icon that is going to be in use for the cell.
              * This setting can be in use only with combination of type icon.
              * @alias column.icon
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID" },
              *             { field: "Name" },
              *             { field: "PlaceOfBirth" },
              *             { title: "", field: "Edit", width: 20, type: "icon", icon: "ui-icon-pencil", events: { "click": function (e) { alert("name=" + e.data.record.Name); } } }
              *         ]
              *     });
              * </script>
              */
            icon: undefined,
            /** Configuration object with event names as keys and functions as values that are going to be bind to each cell from the column.
              * Each function is going to receive event information as a parameter with info in the "data" field for id, field name and record data.
              * @alias column.events
              * @type function
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [
              *             { field: "ID" },
              *             { 
              *               field: "Name", 
              *               events: {
              *                 "mouseenter": function (e) {
              *                     e.stopPropagation();
              *                     $(e.currentTarget).css("background-color", "red");
              *                 },
              *                 "mouseleave": function (e) {
              *                     e.stopPropagation();
              *                     $(e.currentTarget).css("background-color", ""); 
              *                 }
              *               }
              *             },
              *             { field: "PlaceOfBirth" },
              *             { 
              *               title: "", field: "Info", width: 20, type: "icon", icon: "ui-icon-info", 
              *               events: { 
              *                 "click": function (e) { 
              *                     alert("record with id=" + e.data.id + " is clicked."); } 
              *                 }
              *             }
              *         ]
              *     });
              * </script>
              * @example <table id="grid" data-source="/Grid/GetPlayers">
              *     <thead>
              *         <tr>
              *             <th data-field="ID" width="24">ID</th>
              *             <th data-events="mouseenter: onMouseEnter, mouseleave: onMouseLeave">Name</th>
              *             <th data-field="PlaceOfBirth">Place Of Birth</th>
              *             <th data-events="click: onClick" data-type="icon" data-icon="ui-icon-info" width="24"></th>
              *         </tr>
              *     </thead>
              * </table>
              * <script>
              *     function onMouseEnter (e) {
              *         e.stopPropagation();
              *         $(e.currentTarget).css("background-color", "red");
              *     }
              *     function onMouseLeave (e) {
              *         e.stopPropagation();
              *         $(e.currentTarget).css("background-color", ""); 
              *     }
              *     function onClick(e) {
              *         alert("record with id=" + e.data.id + " is clicked.");
              *     }
              *     $("#grid").grid();
              * </script>
              */
            events: undefined,
            /** Format the date when the type of the column is date. 
                * This configuration setting is going to work only if you have implementation of format method for the Date object.
                * You can use external libraries like http://blog.stevenlevithan.com/archives/date-time-format for that.
                * @alias column.format
                * @type string
                * @default undefined
                * @example <table id="grid"></table>
                * <script src="http://stevenlevithan.com/assets/misc/date.format.js"></script>
                * <script>
                *     $("#grid").grid({
                *         dataSource: "/Grid/GetPlayers",
                *         columns: [
                *             { field: "ID" },
                *             { field: "Name" },
                *             { field: "DateOfBirth", type: 'date', format: 'HH:MM:ss mm/dd/yyyy' }
                *         ]
                *     });
                * </script>
                */
            format: undefined,
            /** Number of decimal digits after the decimal point.
                * @alias column.decimalDigits
                * @type int
                * @default undefined
                */
            decimalDigits: undefined,
            /** Template for the content in the column.
                * Use curly brackets "{}" to wrap the names of data source columns from server response.
                * @alias column.tmpl
                * @type string
                * @default undefined
                * @example <table id="grid"></table>
                * <script>
                *     $("#grid").grid({
                *         dataSource: "/Grid/GetPlayers",
                *         columns: [
                *             { field: "ID" },
                *             { field: "Name" },
                *             { title: "Info", tmpl: "{Name} is born in {PlaceOfBirth}." }
                *         ]
                *     });
                * </script>
                */
            tmpl: undefined
        },
        mapping: {
            /** The name of the object in the server response, that contains array with records, that needs to be display in the grid.
                * @alias mapping.dataField
                * @type string
                * @default "records"
                */
            dataField: "records",
            /** The name of the object in the server response, that contains the number of all records on the server.
                * @alias mapping.totalRecordsField
                * @type string
                * @default "total"
                */
            totalRecordsField: "total"
        },
        params: {},
        defaultParams: {
            /** The name of the parameter that is going to send the name of the column for sorting.
                * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
                * @alias defaultParams.sortBy
                * @type string
                * @default "sortBy"
                */
            sortBy: "sortBy",
            /** The name of the parameter that is going to send the direction for sorting.
                * The "sortable" setting for at least one column should be enabled in order this parameter to be in use.
                * @alias defaultParams.direction
                * @type string
                * @default "direction"
                */
            direction: "direction",
            /** The name of the parameter that is going to send the number of the page.
                * The pager should be enabled in order this parameter to be in use.
                * @alias defaultParams.page
                * @type string
                * @default "page"
                */
            page: "page",
            /** The name of the parameter that is going to send the maximum number of records per page.
                * The pager should be enabled in order this parameter to be in use.
                * @alias defaultParams.limit
                * @type string
                * @default "limit"
                */
            limit: "limit"
        },
        /** The name of the UI library that is going to be in use. 
          * Currently we support only jQuery UI and bootstrap. jQuery UI or Bootstrap should be manually included to the page where the grid is in use.
          * @type (jqueryui|bootstrap)
          * @default "jqueryui"
          * @example <table id="grid"></table>
          * <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" rel="stylesheet">
          * <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         uiLibrary: "bootstrap",
          *         columns: [
          *             { field: "ID" },
          *             { field: "Name" },
          *             { field: "PlaceOfBirth" }
          *         ],
          *         pager: { enable: true, limit: 2, sizes: [2, 5, 10, 20] }
          *     });
          * </script>
          */
        uiLibrary: "jqueryui",
        style: {
            wrapper: "gj-grid-wrapper",
            table: "gj-grid-table ui-widget-content gj-grid-ui-table",
            loadingCover: "gj-grid-loading-cover",
            loadingText: "gj-grid-loading-text",
            header: {
                cell: "ui-widget-header ui-state-default gj-grid-ui-thead-th",
                sortable: "gj-grid-thead-sortable",
                sortAscIcon: "gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-s",
                sortDescIcon: "gj-grid-ui-thead-th-sort-icon ui-icon ui-icon-arrowthick-1-n"
            },
            content: {
                rowHover: "ui-state-hover",
                rowSelected: "ui-state-active"
            },
            pager: {
                cell: "ui-widget-header ui-state-default ui-grid-pager-cell",
                stateDisabled: "ui-state-disabled"
            },
            //TODO: move to expand/collapse plugin
            expandIcon: "ui-icon ui-icon-plus",
            collapseIcon: "ui-icon ui-icon-minus"
        },

        /** The type of the row selection.<br/>
          * If the type is set to multiple the user will be able to select more then one row from the grid.
          * @type (single|multiple)
          * @default "single"
          * @example $("table").grid({  });
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         selectionType: "multiple",
          *         selectionMethod: "checkbox",
          *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          */
        selectionType: 'single',

        /** The type of the row selection mechanism.<br/>
          * @additionalinfo If this setting is set to "basic" when the user select a row, then this row will be highlighted.<br/>
          * If this setting is set to "checkbox" a column with checkboxes will appear as first row of the grid and when the user select a row, then this row will be highlighted and the checkbox selected.
          * @type (basic|checkbox)
          * @default "basic"
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         selectionType: "single",
          *         selectionMethod: "checkbox",
          *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          */
        selectionMethod: 'basic',

        /** When this setting is enabled the content of the grid will be loaded automatically after the creation of the grid.
          * @type boolean
          * @default true
          * @example <table id="grid"></table>
          * <script>
          *     var grid = $("#grid").grid({ 
          *         dataSource: "/Grid/GetPlayers", 
          *         autoLoad: false,
          *         columns: [ { field: "ID" }, { field: "Name" } ]
          *     });
          *     grid.reload(); //call .reload() explicitly in order to load the data in the grid
          * </script>
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({ 
          *         dataSource: "/Grid/GetPlayers",
          *         autoLoad: true,
          *         columns: [ { field: "ID" }, { field: "Name" } ]
          *     });
          * </script>
          */
        autoLoad: true,

        /** The text that is going to be displayed if the grid is empty.
          * @type string
          * @default "No records found."
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: { url: "/Grid/GetPlayers", data: { searchString: "sadasd" } },
          *         notFoundText: "No records found custom message",
          *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          */
        notFoundText: "No records found.",

        /** Width of the grid.
          * @type int
          * @default undefined
          * @example <table id="grid"></table>
          * <script>
          *     $("#grid").grid({
          *         dataSource: "/Grid/GetPlayers",
          *         width: 400,
          *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
          *     });
          * </script>
          */
        width: undefined,

        /** Minimum width of the grid.
          * @type int
          * @default undefined
          */
        minWidth: undefined,

        /** The size of the font in the grid.
          * @type string
          * @default undefined
          * @example <table id="grid"></table>
          * <script>
          *     $('#grid').grid({
          *         dataSource: '/Grid/GetPlayers',
          *         fontSize: '14px',
          *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
          *     });
          * </script>
          */
        fontSize: undefined,

        dataKey: undefined
    },

    bootstrap: {
        style: {
            wrapper: "gj-grid-wrapper",
            table: "gj-grid-table table table-bordered table-hover",
            header: {
                cell: "gj-grid-bootstrap-thead-cell",
                sortable: "gj-grid-thead-sortable",
                sortAscIcon: "glyphicon glyphicon-sort-by-alphabet",
                sortDescIcon: "glyphicon glyphicon-sort-by-alphabet-alt"
            },
            content: {
                rowHover: "",
                rowSelected: "active"
            },
            pager: {
                cell: "gj-grid-bootstrap-tfoot-cell",
                stateDisabled: "ui-state-disabled"
            },
            expandIcon: "glyphicon glyphicon-plus",
            collapseIcon: "glyphicon glyphicon-minus"
        },
        pager: {
            leftControls: [
                $('<button type="button" data-role="page-first" title="First Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-backward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-previous" title="Previous Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-backward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<div>Page</div>'),
                $('<div>&nbsp;</div>'),
                $('<div></div>').append($('<input data-role="page-number" class="form-control input-sm" style="width: 40px; text-align: right;" type="text" value="0">')),
                $('<div>&nbsp;</div>'),
                $('<div>of&nbsp;</div>'),
                $('<div data-role="page-label-last">0</div>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-next" title="Next Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-forward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-last" title="Last Page" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-step-forward"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<button type="button" data-role="page-refresh" title="Reload" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-refresh"></span></button>'),
                $('<div>&nbsp;</div>'),
                $('<div></div>').append($('<select data-role="page-size" class="form-control input-sm"></select></div>'))
            ],
            rightControls: [
                $('<div>Displaying records&nbsp;</div>'),
                $('<div data-role="record-first">0</div>'),
                $('<div>&nbsp;-&nbsp;</div>'),
                $('<div data-role="record-last">0</div>'),
                $('<div>&nbsp;of&nbsp;</div>'),
                $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
            ]
        }
    }
};

/** 
  * @widget Grid 
  * @plugin Core
  */
gj.grid.events = {
    beforeEmptyRowInsert: function ($grid, $row) {
        /**
         * Event fires before addition of an empty row to the grid.
         *
         * @event beforeEmptyRowInsert
         * @param {object} e - event data
         * @param {object} $row - The empty row as jquery object
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: { 
         *             url: "/Grid/GetPlayers",
         *             data: { searchString: "not existing data" } //search for not existing data in order to fire the event
         *         },
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("beforeEmptyRowInsert", function (e, $row) {
         *         alert("beforeEmptyRowInsert is fired.");
         *     });
         * </script>
         */
        $grid.trigger("beforeEmptyRowInsert", [$row]);
    },
    dataBinding: function ($grid, records) {
        /**
         * Event fired before data binding takes place.
         *
         * @event dataBinding
         * @param {object} e - event data
         * @param {array} records - the list of records received from the server
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("dataBinding", function (e, records) {
         *         alert("dataBinding is fired. " + records.length + " records will be loaded in the grid.");
         *     });
         * </script>
         */
        $grid.trigger("dataBinding", [records]);
    },
    dataBound: function ($grid, records, totalRecords) {
        /**
         * Event fires after the loading of the data in the grid.
         *
         * @event dataBound
         * @param {object} e - event data
         * @param {array} records - the list of records received from the server
         * @param {int} totalRecords - the number of the all records that can be presented in the grid
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("dataBound", function (e, records, totalRecords) {
         *         alert("dataBound is fired. " + records.length + " records are bound to the grid.");
         *     });
         * </script>
         */
        $grid.trigger("dataBound", [records, totalRecords]);
    },
    rowDataBound: function ($grid, $row, id, record) {
        /**
         * Event fires after insert of a row in the grid during the loading of the data
         *
         * @event rowDataBound
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object
         * @param {object} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("rowDataBound", function (e, $row, id, record) {
         *         alert("rowDataBound is fired for row with id=" + id + ".");
         *     });
         * </script>
         */
        $grid.trigger("rowDataBound", [$row, id, record]);
    },
    cellDataBound: function ($grid, $wrapper, id, column, record) {
        /**
         * Event fires after insert of a cell in the grid during the loading of the data
         *
         * @event cellDataBound
         * @param {object} e - event data
         * @param {object} $wrapper - the cell wrapper presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} column - the column configuration data
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" }, { field: "IsBulgarian", title: "Is Bulgarian" } ]
         *     });
         *     grid.on("cellDataBound", function (e, $wrapper, id, column, record) {
         *         if ("IsBulgarian" === column.field) {
         *             $wrapper.text(record.PlaceOfBirth.indexOf("Bulgaria") > -1 ? "Bulgarian" : "");
         *         }
         *     });
         * </script>
         */
        $grid.trigger("cellDataBound", [$wrapper, id, column, record]);
    },
    rowSelect: function ($grid, $row, id, record) {
        /**
         * Event fires on selection of row
         *
         * @event rowSelect
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
         *         selectionMethod: "checkbox"
         *     });
         *     grid.on("rowSelect", function (e, $row, id, record) {
         *         alert('Row with id=' + id + ' is selected.');
         *     });
         * </script>
         */
        $grid.trigger("rowSelect", [$row, id, record]);
    },
    rowUnselect: function ($grid, $row, id, record) {

        /**
         * Event fires on un selection of row
         *
         * @event rowUnselect
         * @param {object} e - event data
         * @param {object} $row - the row presented as jquery object 
         * @param {string} id - the id of the record
         * @param {object} record - the data of the row record
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
         *         selectionMethod: "checkbox"
         *     });
         *     grid.on("rowUnselect", function (e, $row, id, record) {
         *         alert('Row with id=' + id + ' is unselected.');
         *     });
         * </script>
         */
        $grid.trigger("rowUnselect", [$row, id, record]);

    },
    destroying: function ($grid) {
        /**
         * Event fires when the grid.destroy method is called.
         *
         * @event destroying
         * @param {object} e - event data
         * @example <button id="btnDestroy">Destroy</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("destroying", function (e) {
         *         alert('destroying is fired.');
         *     });
         *     $('#btnDestroy').on('click', function() {
         *         grid.destroy();
         *     });
         * </script>
         */
        $grid.trigger("destroying");
    },
    columnHide: function ($grid, column) {
        /**
         * Event fires when column is hidding
         *
         * @event columnHide
         * @param {object} e - event data
         * @param {object} column - The data about the column that is hidding
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
         *     });
         *     grid.on("columnHide", function (e, column) {
         *         alert('The ' + column.field + ' column is hidden.');
         *     });
         *     grid.hideColumn("PlaceOfBirth");
         * </script>
         */
        $grid.trigger("columnHide", [column]);
    },
    columnShow: function ($grid, column) {
        /**
         * Event fires when column is showing
         *
         * @event columnShow
         * @param {object} e - event data
         * @param {object} column - The data about the column that is showing
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
         *     });
         *     grid.on("columnShow", function (e, column) {
         *         alert('The ' + column.field + ' column is shown.');
         *     });
         *     grid.showColumn("PlaceOfBirth");
         * </script>
         */
        $grid.trigger("columnShow", [column]);
    },
    initialized: function ($grid) {
        /**
         * Event fires when grid is initialized
         *
         * @event initialized
         * @param {object} e - event data
         * @example <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataSource: "/Grid/GetPlayers",
         *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ],
         *         initialized: function (e) {
         *             alert('The grid is initialized.');
         *         }
         *     });
         * </script>
         */
        $grid.trigger("initialized");
    }
};

/** 
  * @widget Grid 
  * @plugin Expand Collapse Rows
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.expandCollapseRows = {
    'configuration': {
        /** Template for the content in the detail section of the row.
          * Automatically add expand collapse column as a first column in the grid during initialization.
          * @type string
          * @default undefined
          * @example <table id="grid"></table>
          * <script>
          *     $('#grid').grid({
          *         dataSource: '/Grid/GetPlayers',
          *         detailTemplate: '<div><b>DateOfBirth:</b> {DateOfBirth}</div>',
          *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
          *     });
          * </script>
          */
        detailTemplate: undefined
    },

    'private': {
        detailExpand: function ($cell, $grid) {
            var $contentRow = $cell.closest("tr"),
                $detailsRow = $('<tr data-role="details"></tr>'),
                $detailsCell = $('<td colspan="' + gj.grid.private.countVisibleColumns($grid) + '"></td>'),
                data = $grid.data('grid'),
                rowData = $contentRow.data('row'),
                $detailWrapper = $(rowData.details);
            $detailsRow.append($detailsCell.append($detailWrapper));
            $detailsRow.insertAfter($contentRow);
            $cell.find('span').attr('class', data.style.collapseIcon); //TODO: move to the plugin
            $cell.off('click').on('click', function () {
                gj.grid.plugins.expandCollapseRows.private.detailCollapse($(this), $grid);
            });
            gj.grid.plugins.expandCollapseRows.events.detailExpand($grid, $detailWrapper, rowData.record);
        },

        detailCollapse: function ($cell, $grid) {
            var $contentRow = $cell.closest('tr'),
                $detailsRow = $contentRow.next('tr[data-role="details"]'),
                $detailWrapper = $detailsRow.find("td>div");
            $detailsRow.remove();
            $cell.find('span').attr('class', $grid.data('grid').style.expandIcon); //TODO: move to the plugin
            $cell.off('click').on('click', function () {
                gj.grid.plugins.expandCollapseRows.private.detailExpand($(this), $grid);
            });
            gj.grid.plugins.expandCollapseRows.events.detailCollapse($grid, $detailWrapper, $contentRow.data('row').record);
        },

        updateDetailsColSpan: function ($grid) {
            var $cells = $grid.find('tbody > tr[data-role="details"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.private.countVisibleColumns($grid));
            }
        }
    },

    'public': {
    },

    'events': {
        detailExpand: function ($grid, $detailWrapper, record) {
            /**
             * Event fires when detail row is showing
             *
             * @event detailExpand
             * @param {object} e - event data
             * @param {object} detailWrapper - the detail wrapper as jQuery object 
             * @param {object} record - the data of the row record 
             * @example <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Grid/GetPlayers',
             *         detailTemplate: '<div/>',
             *         columns: [ 
             *             { field: 'ID' }, 
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             *     grid.on('detailExpand', function (e, $detailWrapper, record) {
             *         $detailWrapper.empty().append('Place of Birth: ' + record.PlaceOfBirth);
             *     });
             * </script>
             */
            $grid.trigger('detailExpand', [$detailWrapper, record]);
        },
        detailCollapse: function ($grid, $detailWrapper, record) {
            /**
             * Event fires when detail row is hiding
             *
             * @event detailCollapse
             * @param {object} e - event data
             * @param {object} detailWrapper - the detail wrapper as jQuery object 
             * @param {object} record - the data of the row record 
             * @example <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Grid/GetPlayers',
             *         detailTemplate: '<div/>',
             *         columns: [ 
             *             { field: 'ID' }, 
             *             { field: 'Name' },
             *             { field: 'PlaceOfBirth' }
             *         ]
             *     });
             *     grid.on('detailExpand', function (e, $detailWrapper, record) {
             *         $detailWrapper.append('Place of Birth: ' + record.PlaceOfBirth);
             *     });
             *     grid.on('detailCollapse', function (e, $detailWrapper, record) {
             *         $detailWrapper.empty();
             *         alert('detailCollapse is fired.');
             *     });
             * </script>
             */
            $grid.trigger('detailCollapse', [$detailWrapper, record]);
        }
    },

    'init': function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.expandCollapseRows.public);
        var data = $grid.data('grid');
        if (typeof (data.detailTemplate) !== 'undefined') {
            data.columns = [{
                title: '',
                field: data.dataKey,
                width: (data.uiLibrary === 'jqueryui' ? 24 : 30),
                align: 'center',
                type: 'icon',
                icon: data.style.expandIcon,
                events: {
                    'click': function () {
                        gj.grid.plugins.expandCollapseRows.private.detailExpand($(this), $grid);
                    }
                }
            }].concat(data.columns);

            $grid.on('rowDataBound', function (e, $row, id, record) {
                $row.data('row').details = $(data.detailTemplate);
            });
            $grid.on('columnShow', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
            $grid.on('columnHide', function (e, column) {
                gj.grid.plugins.expandCollapseRows.private.updateDetailsColSpan($grid);
            });
        }
    }
};

$.extend(true, gj.grid.configuration.base, gj.grid.plugins.expandCollapseRows.configuration);
/** 
  * @widget Grid 
  * @plugin Inline Editing
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.inlineEditing = {
    'configuration': {
        defaultColumnSettings: {
            /** Provides a way to specify a custom editing UI for the column.
              * @alias column.editor
              * @type function|boolean
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     function edit($container, currentValue) {
              *         $container.append('<input type="text" value="' + currentValue + '"/>');
              *     }
              *     $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         columns: [
              *             { field: 'ID' },
              *             { field: 'Name', editor: edit },
              *             { field: 'PlaceOfBirth', editor: true }
              *         ]
              *     });
              * </script>
              */
            editor: undefined
        }
    },

    'private': {
        OnCellEdit: function ($grid, $cell, column, record) {
            var $editorContainer, $editorField;
            if ($cell.attr('data-mode') !== 'edit' && column.editor) {
                $cell.find('div[data-role="display"]').hide();
                $editorContainer = $cell.find('div[data-role="edit"]');
                if ($editorContainer && $editorContainer.length) {
                    $editorContainer.show();
                    $editorField = $editorContainer.find('input, select, textarea').first();
                } else {
                    $editorContainer = $('<div data-role="edit" />');
                    $cell.append($editorContainer);
                    if (typeof (column.editor) === 'function') {
                        column.editor($editorContainer, record[column.field]);
                    } else if (typeof (column.editor) === 'boolean') {
                        $editorContainer.append('<input type="text" value="' + record[column.field] + '"/>');
                    }
                    $editorField = $editorContainer.find('input, select, textarea').first();
                    $editorField.on('blur', function (e) {
                        gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                    });
                    $editorField.on('keypress', function (e) {
                        if (e.which === 13) {
                            gj.grid.plugins.inlineEditing.private.OnCellDisplay($grid, $cell, column);
                        }
                    });
                }
                $editorField.focus().select();
                $cell.attr('data-mode', 'edit');
            }
        },

        OnCellDisplay: function ($grid, $cell, column) {
            var newValue, oldValue, record, style = '';
            if ($cell.attr('data-mode') === 'edit') {
                $editorContainer = $cell.find('div[data-role="edit"]');
                newValue = $editorContainer.find('input, select, textarea').first().val();
                record = $cell.parent().data('row').record;
                oldValue = record[column.field];
                if (newValue !== oldValue) {
                    $displayContainer = $cell.find('div[data-role="display"]');
                    gj.grid.private.setCellText($displayContainer, column, newValue);
                    record[column.field] = newValue;
                    $editorContainer.hide();
                    $displayContainer.show();
                    if ($cell.find('span.gj-dirty').length === 0) {
                        if ($cell.css('padding-top') !== '0px') {
                            style += 'margin-top: -' + $cell.css('padding-top') + ';';
                        }
                        if ($cell.css('padding-left') !== '0px') {
                            style += 'margin-left: -' + $cell.css('padding-left') + ';';
                        }
                        style = style ? ' style="' + style + '"' : '';
                        $cell.prepend($('<span class="gj-dirty"' + style + '></span>'));
                    }
                    $cell.attr('data-mode', 'display');
                    gj.grid.plugins.inlineEditing.events.cellDataChanged($grid, $cell, column, record, oldValue, newValue);
                    gj.grid.plugins.inlineEditing.private.updateChanges($grid, column, record, newValue);
                }
            }
        },

        updateChanges: function ($grid, column, sourceRecord, newValue) {
            var targetRecords, filterResult, newRecord, data = $grid.data('grid');
            if (!data.guid) {
                data.guid = gj.grid.plugins.inlineEditing.private.generateGUID();
            }
            if (data.dataKey) {
                targetRecords = JSON.parse(sessionStorage.getItem('gj.grid.' + data.guid));
                if (targetRecords) {
                    filterResult = targetRecords.filter(function (record) {
                        return record[data.dataKey] === sourceRecord[data.dataKey];
                    });
                } else {
                    targetRecords = [];
                }
                if (filterResult && filterResult.length === 1) {
                    filterResult[0][column.field] = newValue;
                } else {
                    newRecord = {};
                    newRecord[data.dataKey] = sourceRecord[data.dataKey];
                    if (data.dataKey !== column.field) {
                        newRecord[column.field] = newValue;
                    }
                    targetRecords.push(newRecord);
                }
                sessionStorage.setItem('gj.grid.' + data.guid, JSON.stringify(targetRecords));
            }
        },

        generateGUID: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    },

    'public': {
        /**
         * Return array with all changes
         * @method
         * @return array
         * @example <button id="btnGetChanges">Get Changes</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $("#grid").grid({
         *         dataKey: 'ID',
         *         dataSource: '/Grid/GetPlayers',
         *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
         *     });
         *     $('#btnGetChanges').on('click', function () {
         *         alert(JSON.stringify(grid.getChanges()));
         *     });
         * </script>
         */
        getChanges: function () {
            return JSON.parse(sessionStorage.getItem('gj.grid.' + this.data('grid').guid));
        }
    },

    'events': {
        cellDataChanged: function ($grid, $cell, column, record, oldValue, newValue) {
            /**
             * Event fires after inline edit of a cell in the grid.
             *
             * @event cellDataChanged
             * @param {object} e - event data
             * @param {object} $cell - the cell presented as jquery object 
             * @param {object} column - the column configuration data
             * @param {object} record - the data of the row record
             * @param {object} oldValue - the old cell value
             * @param {object} newValue - the new cell value
             * @example <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Grid/GetPlayers',
             *         columns: [ { field: 'ID' }, { field: 'Name', editor: true }, { field: 'PlaceOfBirth', editor: true } ]
             *     });
             *     grid.on('cellDataChanged', function (e, $cell, column, record, oldValue, newValue) {
             *         alert('"' + oldValue + '" is changed to "' + newValue + '"');
             *     });
             * </script>
             */
            $grid.trigger('cellDataChanged', [$cell, column, record, oldValue, newValue]);
        }
    },

    'init': function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.inlineEditing.public);
        $grid.on('cellDataBound', function (e, $wrapper, id, column, record) {
            if (column.editor) {
                $wrapper.parent().on('click', function () {
                    gj.grid.plugins.inlineEditing.private.OnCellEdit($grid, $wrapper.parent(), column, record);
                });
            }
        });
    }
};

$.extend(true, gj.grid.configuration.base, gj.grid.plugins.inlineEditing.configuration);

/** 
  * @widget Grid 
  * @plugin Pagination
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.pagination = {
    'configuration': {
        pager: {
            /** This setting control the visualization of the pager. If this setting is enabled the pager would show.
              * @alias pager.enable
              * @type boolean
              * @default false
              */
            enable: false,

            /** The maximum number of records that can be show by page.
                * @alias pager.limit
                * @type int
                * @default 10
                */
            limit: 10,

            /** Array that contains the possible page sizes of the grid.
                * When this setting is set, then a drop down with the options for each page size is visualized in the pager.
                * @alias pager.sizes
                * @type array
                * @default undefined
                */
            sizes: undefined,

            /** Array that contains a list with jquery objects that are going to be used on the left side of the pager.
                * @alias pager.leftControls
                * @type array
                * @default array
                */
            leftControls: [
                $('<div title="First" data-role="page-first" class="ui-icon ui-icon-seek-first ui-grid-icon"></div>'),
                $('<div title="Previous" data-role="page-previous" class="ui-icon ui-icon-seek-prev ui-grid-icon"></div>'),
                $('<div>Page</div>'),
                $('<div></div>').append($('<input type="text" data-role="page-number" class="ui-grid-pager" value="0">')),
                $('<div>of&nbsp;</div>'),
                $('<div data-role="page-label-last">0</div>'),
                $('<div title="Next" data-role="page-next" class="ui-icon ui-icon-seek-next ui-grid-icon"></div>'),
                $('<div title="Last" data-role="page-last" class="ui-icon ui-icon-seek-end ui-grid-icon"></div>'),
                $('<div title="Reload" data-role="page-refresh" class="ui-icon ui-icon-refresh ui-grid-icon"></div>'),
                $('<div></div>').append($('<select data-role="page-size" class="ui-grid-page-sizer"></select>'))
            ],

            /** Array that contains a list with jquery objects that are going to be used on the right side of the pager.
                * @alias pager.rightControls
                * @type array
                * @default array
                */
            rightControls: [
                $('<div>Displaying records&nbsp;</div>'),
                $('<div data-role="record-first">0</div>'),
                $('<div>&nbsp;-&nbsp;</div>'),
                $('<div data-role="record-last">0</div>'),
                $('<div>&nbsp;of&nbsp;</div>'),
                $('<div data-role="record-total">0</div>').css({ "margin-right": "5px" })
            ]
        }
    },

    'private': {
        init: function ($grid) {
            var $row, $cell, data, controls, $leftPanel, $rightPanel, $tfoot, leftControls, rightControls, i;

            data = $grid.data('grid');

            if (data.pager && data.pager.enable) {
                //if ($.isArray(data.dataSource)) {
                //    data.dataSource = data.dataSource.slice(0, data.pager.limit);
                //}
                data.params[data.defaultParams.page] = 1;
                data.params[data.defaultParams.limit] = data.pager.limit;

                $row = $("<tr/>");
                $cell = $("<th/>").addClass(data.style.pager.cell);
                $row.append($cell);

                $leftPanel = $("<div />").css({ "float": "left" });
                $rightPanel = $("<div />").css({ "float": "right" });
                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    $rightPanel.css({ "padding-top": "3px" });
                }

                $cell.append($leftPanel).append($rightPanel);

                $tfoot = $("<tfoot />").append($row);
                $grid.append($tfoot);
                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);

                leftControls = gj.grid.private.clone(data.pager.leftControls); //clone array
                $.each(leftControls, function () {
                    $leftPanel.append(this);
                });

                rightControls = gj.grid.private.clone(data.pager.rightControls); //clone array
                $.each(rightControls, function () {
                    $rightPanel.append(this);
                });

                controls = $grid.find("TFOOT [data-role]");
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.initPagerControl($(controls[i]), $grid);
                }
            }
        },

        initPagerControl: function ($control, $grid) {
            var data = $grid.data('grid');
            switch ($control.data("role")) {
                case "page-number":
                    $control.bind("keypress", function (e) {
                        if (e.keyCode === 13) {
                            $(this).trigger("change");
                        }
                    });
                    break;
                case "page-size":
                    if (data.pager.sizes && 0 < data.pager.sizes.length) {
                        $control.show();
                        $.each(data.pager.sizes, function () {
                            $control.append($("<option/>").attr("value", this.toString()).text(this.toString()));
                        });
                        $control.change(function () {
                            var newSize = parseInt(this.value, 10);
                            data.params[data.defaultParams.page] = 1;
                            gj.grid.plugins.pagination.private.SetPageNumber($grid, 1);
                            data.params[data.defaultParams.limit] = newSize;
                            $grid.reload();
                            gj.grid.plugins.pagination.events.pageSizeChange($grid, newSize);
                        });
                        $control.val(data.params[data.defaultParams.limit]);
                    } else {
                        $control.hide();
                    }
                    break;
                case "page-refresh":
                    $control.bind("click", function () { $grid.reload(); });
                    break;
            }

        },

        reloadPager: function ($grid, totalRecords) {
            var page, limit, lastPage, firstRecord, lastRecord, data;

            data = $grid.data('grid');

            if (data.pager.enable) {
                page = (0 === totalRecords) ? 0 : data.params[data.defaultParams.page];
                limit = parseInt(data.params[data.defaultParams.limit], 10);
                lastPage = Math.ceil(totalRecords / limit);
                firstRecord = (0 === page) ? 0 : (limit * (page - 1)) + 1;
                lastRecord = (firstRecord + limit) > totalRecords ? totalRecords : (firstRecord + limit) - 1;

                controls = $grid.find("TFOOT [data-role]");
                for (i = 0; i < controls.length; i++) {
                    gj.grid.plugins.pagination.private.reloadPagerControl($(controls[i]), $grid, page, lastPage, firstRecord, lastRecord, totalRecords);
                }

                gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
            }
        },

        reloadPagerControl: function ($control, $grid, page, lastPage, firstRecord, lastRecord, totalRecords) {
            var data = $grid.data('grid');
            switch ($control.data("role")) {
                case "page-first":
                    if (page < 2) {
                        $control.addClass(data.style.pager.stateDisabled).unbind("click");
                    } else {
                        $control.removeClass(data.style.pager.stateDisabled).unbind("click").bind("click", gj.grid.plugins.pagination.private.CreateFirstPageHandler($grid));
                    }
                    break;
                case "page-previous":
                    if (page < 2) {
                        $control.addClass(data.style.pager.stateDisabled).unbind("click");
                    } else {
                        $control.removeClass(data.style.pager.stateDisabled).unbind("click").bind("click", gj.grid.plugins.pagination.private.CreatePrevPageHandler($grid));
                    }
                    break;
                case "page-number":
                    $control.val(page).unbind("change").bind("change", gj.grid.plugins.pagination.private.CreateChangePageHandler($grid, page, lastPage));
                    break;
                case "page-label-last":
                    $control.text(lastPage);
                    break;
                case "page-next":
                    if (lastPage === page) {
                        $control.addClass(data.style.pager.stateDisabled).unbind("click");
                    } else {
                        $control.removeClass(data.style.pager.stateDisabled).unbind("click").bind("click", gj.grid.plugins.pagination.private.CreateNextPageHandler($grid));
                    }
                    break;
                case "page-last":
                    if (lastPage === page) {
                        $control.addClass(data.style.pager.stateDisabled).unbind("click");
                    } else {
                        $control.removeClass(data.style.pager.stateDisabled).unbind("click").bind("click", gj.grid.plugins.pagination.private.CreateLastPageHandler($grid, lastPage));
                    }
                    break;
                case "record-first":
                    $control.text(firstRecord);
                    break;
                case "record-last":
                    $control.text(lastRecord);
                    break;
                case "record-total":
                    $control.text(totalRecords);
                    break;
            }
        },

        CreateFirstPageHandler: function ($grid) {
            return function () {
                var data = $grid.data('grid');
                data.params[data.defaultParams.page] = 1;
                gj.grid.plugins.pagination.private.SetPageNumber($grid, 1);
                $grid.reload();
            };
        },

        CreatePrevPageHandler: function ($grid) {
            return function () {
                var data, currentPage, newPage;
                data = $grid.data('grid');
                currentPage = data.params[data.defaultParams.page];
                newPage = (currentPage && currentPage > 1) ? currentPage - 1 : 1;
                data.params[data.defaultParams.page] = newPage;
                gj.grid.plugins.pagination.private.SetPageNumber($grid, newPage);
                $grid.reload();
            };
        },

        CreateNextPageHandler: function ($grid) {
            return function () {
                var data, currentPage;
                data = $grid.data('grid');
                currentPage = data.params[data.defaultParams.page];
                data.params[data.defaultParams.page] = currentPage + 1;
                gj.grid.plugins.pagination.private.SetPageNumber($grid, currentPage + 1);
                $grid.reload();
            };
        },

        CreateLastPageHandler: function ($grid, lastPage) {
            return function () {
                var data = $grid.data('grid');
                data.params[data.defaultParams.page] = lastPage;
                gj.grid.plugins.pagination.private.SetPageNumber($grid, lastPage);
                $grid.reload();
            };
        },

        CreateChangePageHandler: function ($grid, currentPage, lastPage) {
            return function (e) {
                var data = $grid.data('grid'),
                    newPage = parseInt(this.value, 10);
                if (newPage && !isNaN(newPage) && newPage <= lastPage) {
                    data.params[data.defaultParams.page] = newPage;
                    $grid.reload();
                } else {
                    this.value = currentPage;
                    alert("Enter a valid page.");
                }
            };
        },

        SetPageNumber: function ($grid, value) {
            $grid.find("TFOOT [data-role='page-number']").val(value);
        },

        updatePagerColSpan: function ($grid) {
            var $cell = $grid.find('tfoot > tr > th');
            if ($cell && $cell.length) {
                $cell.attr('colspan', gj.grid.private.countVisibleColumns($grid));
            }
        }
    },

    'public': {
    },

    'events': {
        pageSizeChange: function ($grid, newSize) {
            /**
              * Event fires on change of the page size
              *
              * @event pageSizeChange
              * @property {object} e - event data
              * @property {int} newSize - The new page size
              * @example <table id="grid"></table>
              * <script>
              *     var grid = $("#grid").grid({
              *         dataSource: "/Grid/GetPlayers",
              *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
              *         pager: { enable: true, limit: 2, sizes: [2, 5, 10, 20] }
              *     });
              *     grid.on("pageSizeChange", function (e, newSize) {
              *         alert('The new page size is ' + newSize + '.');
              *     });
              * </script>
              */
            $grid.trigger("pageSizeChange", [newSize]);
        }
    },

    'init': function ($grid) {
        gj.grid.plugins.pagination.private.init($grid);
        $grid.on('dataBound', function (e, records, totalRecords) {
            gj.grid.plugins.pagination.private.reloadPager($grid, totalRecords);
        });
        $grid.on('columnShow', function (e, column) {
            gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
        });
        $grid.on('columnHide', function (e, column) {
            gj.grid.plugins.pagination.private.updatePagerColSpan($grid);
        });
    }
};

$.extend(true, gj.grid.configuration.base, gj.grid.plugins.pagination.configuration);

/** 
  * @widget Grid 
  * @plugin Responsive Design
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.responsiveDesign = {
    'configuration': {
        base: {
            /** The interval in milliseconds for checking if the grid is resizing.
              * This setting is in use only if the resizeMonitoring setting is set to true.
              * @type int
              * @default 500
              * @example <table id="grid"></table>
              * <script>
              *     var grid = $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         responsive: true,
              *         resizeCheckInterval: 2000, //check if the grid is resized on each 2 second
              *         columns: [ { field: 'ID', width: 20 }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              *     grid.on('resize', function () {
              *         alert('resize is fired.');
              *     });
              * </script>
              */
            resizeCheckInterval: 500,
            /** This setting enables responsive behaviour of the grid where some column are invisible when there is not enough space on the screen for them.
              * The visibility of the columns in this mode is driven by the column minWidth and priority settings.
              * The columns without priority setting are always visible and can't hide in small screen resolutions.
              * @type boolean
              * @default false
              * @example <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         responsive: true,
              *         columns: [
              *             { field: 'Name' },
              *             { field: 'PlaceOfBirth', minWidth: 140, priority: 1 },
              *             { field: 'DateOfBirth', minWidth: 160, priority: 2, type: 'date' }
              *         ]
              *     });
              * </script>
              */
            responsive: false,
            /** Automatically adds hidden columns to the details section of the row.
              * This setting works only if the responsive setting is set to true and the detailTemplate is set.
              * @type boolean
              * @default false
              * @example <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         detailTemplate: '<div class="row"></div>',
              *         responsive: true,
              *         showHiddenColumnsAsDetails: true,
              *         columns: [
              *             { field: 'ID', width: 20 },
              *             { field: 'Name', minWidth: 220, priority: 1 },
              *             { field: 'PlaceOfBirth', minWidth: 220, priority: 2 }
              *         ]
              *     });
              * </script>
              */
            showHiddenColumnsAsDetails: false,
            defaultColumn: {
                /** The priority of the column compared to other columns in the grid.
                  * The columns are hiding based on the priorities.
                  * This setting is working only when the responsive setting is set to true.
                  * @alias column.priority
                  * @type int
                  * @default undefined
                  * @example <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Grid/GetPlayers',
                  *         responsive: true,
                  *         columns: [
                  *             { field: 'Name' },
                  *             { field: 'PlaceOfBirth', priority: 1 },
                  *             { field: 'DateOfBirth', priority: 2, type: 'date' }
                  *         ]
                  *     });
                  * </script>
                  */
                priority: undefined,
                /** The minimum width of the column.
                  * The column is getting invisible when there is not enough space in the grid for this minimum width.
                  * This setting is working only when the responsive setting is set to true and the column priority setting is set.
                  * @alias column.minWidth
                  * @type int
                  * @default 150
                  * @example <table id="grid"></table>
                  * <script>
                  *     $('#grid').grid({
                  *         dataSource: '/Grid/GetPlayers',
                  *         responsive: true,
                  *         columns: [
                  *             { field: 'Name' },
                  *             { field: 'PlaceOfBirth', minWidth: 140, priority: 1 },
                  *             { field: 'DateOfBirth', minWidth: 160, priority: 2, type: 'date' }
                  *         ]
                  *     });
                  * </script>
                  */
                minWidth: 150
            },
            style: {
                rowDetailItem: ''
            }
        },

        bootstrap: {
            style: {
                rowDetailItem: 'col-lg-4'
            }
        }
    },

    'private': {

        orderColumns: function (config) {
            var result = [];
            if (config.columns && config.columns.length) {
                for (i = 0; i < config.columns.length; i++) {
                    result.push({
                        position: i,
                        field: config.columns[i].field,
                        minWidth: config.columns[i].width || config.columns[i].minWidth || config.defaultColumn.minWidth,
                        priority: config.columns[i].priority || 0
                    });
                }
                result.sort(function (a, b) {
                    var result = 0;
                    if (a.priority < b.priority) {
                        result = -1;
                    } else if (a.priority > b.priority) {
                        result = 1;
                    }
                    return result;
                });
            }
            return result;
        },
        
        updateDetails: function ($grid) {      
            var $rows, data, i, j, $row, rowData, $placeholder, column, text;
            $rows = $grid.find('tbody > tr');
            data = $grid.data('grid');
            for (i = 0; i < $rows.length; i++) {
                $row = $($rows[i]);
                if (!$row.data('role')) {
                    rowData = $row.data('row');
                    for (j = 0; j < data.columns.length; j++) {
                        column = data.columns[j];
                        $placeholder = rowData.details && rowData.details.find('div[data-id="' + column.field + '"]');
                        if (data.columns[j].hidden) {
                            text = gj.grid.private.formatText(rowData.record[column.field], column);
                            if (!$placeholder || !$placeholder.length) {
                                $placeholder = $('<div data-id="' + column.field + '"><b>' + (column.title || column.field) + '</b>: ' + text + '</div>');
                                $placeholder.addClass(data.style.rowDetailItem);
                                if (!rowData.details || !rowData.details.length) {
                                    rowData.details = $('<div/>');
                                }
                                rowData.details.append($placeholder);
                            } else {
                                $placeholder.html('<b>' + column.title + '</b>: ' + text);
                            }
                        } else if ($placeholder && $placeholder.length) {
                            $placeholder.remove();
                        }
                    }
                }
            }
        }
    },

    'public': {

        oldWidth: undefined,

        resizeCheckIntervalId: undefined,

        /**
         * Make the grid responsive based on the available space.
         * Show column if the space for the grid is expanding and hide columns when the space for the grid is decreasing.
         * @method
         * @return void
         * @example <button onclick="grid.makeResponsive()">Make Responsive</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Grid/GetPlayers',
         *         responsive: false,
         *         columns: [
         *             { field: 'ID', width: 20 },
         *             { field: 'Name', minWidth: 320, priority: 1 },
         *             { field: 'PlaceOfBirth', minWidth: 320, priority: 2 }
         *         ]
         *     });
         * </script>
         */
        makeResponsive: function () {
            var i, $column,
                extraWidth = 0,
                config = this.data('grid'),
                columns = gj.grid.plugins.responsiveDesign.private.orderColumns(config);
            //calculate extra width
            for (i = 0; i < columns.length; i++) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].minWidth < $column.width()) {
                    extraWidth += $column.width() - columns[i].minWidth;
                }
            }
            //show columns
            if (extraWidth) {
                for (i = 0; i < columns.length; i++) {
                    $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                    if (!$column.is(':visible') && columns[i].minWidth <= extraWidth) {
                        this.showColumn(columns[i].field);
                        extraWidth -= $column.width();
                    }
                }
            }
            //hide columns
            for (i = (columns.length - 1); i >= 0; i--) {
                $column = this.find('thead>tr>th:eq(' + columns[i].position + ')');
                if ($column.is(':visible') && columns[i].priority && columns[i].minWidth > $column.outerWidth()) {
                    this.hideColumn(columns[i].field);
                }
            }
        },
    },

    'events': {
        resize: function ($grid, newWidth, oldWidth) {
            /**
             * Event fires when the grid width is changed. The "responsive" configuration setting should be set to true in order this event to fire.
             *
             * @event resize
             * @property {object} e - event data
             * @example <table id="grid"></table>
             * <script>
             *     var grid = $('#grid').grid({
             *         dataSource: '/Grid/GetPlayers',
             *         responsive: true,
             *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
             *     });
             *     grid.on('resize', function (e, newWidth, oldWidth) {
             *         alert('resize is fired.');
             *     });
             * </script>
             */
            $grid.trigger('resize', [newWidth, oldWidth]);
        }
    },

    'init': function ($grid) {
        $.extend(true, $grid, gj.grid.plugins.responsiveDesign.public);
        var data = $grid.data('grid');
        if (data.responsive) {
            $grid.on('initialized', function () {
                $grid.makeResponsive();
                $grid.oldWidth = $grid.width();
                $grid.resizeCheckIntervalId = setInterval(function () {
                    var newWidth = $grid.width();
                    if (newWidth !== $grid.oldWidth) {
                        gj.grid.plugins.responsiveDesign.events.resize($grid, newWidth, $grid.oldWidth);
                    }
                    $grid.oldWidth = newWidth;
                }, data.resizeCheckInterval);
            });
            $grid.on('destroy', function () {
                if ($grid.resizeCheckIntervalId) {
                    clearInterval($grid.resizeCheckIntervalId);
                }
            });
            $grid.on('resize', function () {
                $grid.makeResponsive();
            });
        }
        if (data.showHiddenColumnsAsDetails && gj.grid.plugins.expandCollapseRows) {
            $grid.on('dataBound', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
            $grid.on('columnHide', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
            $grid.on('columnShow', function () {
                gj.grid.plugins.responsiveDesign.private.updateDetails($grid);
            });
        }
    }
};

$.extend(true, gj.grid.configuration, gj.grid.plugins.responsiveDesign.configuration);

/** 
  * @widget Grid 
  * @plugin Toolbar
  */
if (typeof (gj.grid.plugins) === 'undefined') {
    gj.grid.plugins = {};
}

gj.grid.plugins.toolbar = {
    'configuration': {
        base: {
            /** Template for the content in the toolbar.
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     var grid = $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         toolbarTemplate: '<span data-role="title">Grid Title</span> <span onclick="grid.reload()" style="float:right; cursor: pointer">click here to refresh &nbsp;</span>',
              *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              */
            toolbarTemplate: undefined,

            /** The title of the grid. Appears in a separate row on top of the grid.
              * @type string
              * @default undefined
              * @example <table id="grid"></table>
              * <script>
              *     $('#grid').grid({
              *         dataSource: '/Grid/GetPlayers',
              *         title: 'Players',
              *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
              *     });
              * </script>
              */
            title: undefined,

            style: {
                toolbar: "ui-widget-header ui-state-default gj-grid-ui-toolbar"
            }
        },

        bootstrap: {
            style: {
                toolbar: "gj-grid-bootstrap-toolbar"
            }
        }
    },

    'private': {
    },

    'public': {        
        /**
         * Get or set grid title.
         * @additionalinfo When you pass value in the text parameter this value with be in use for the new title of the grid and the method will return grid object.<br/>
         * When you don't pass value in the text parameter, then the method will return the text of the current grid title.<br/>
         * You can use this method in a combination with toolbarTemplate only if the title is wrapped in element with data-role attribute that equals to "title".<br/>
         * @method
         * @param {object} text - The text of the new grid title.
         * @return string or grid object
         * @example <button onclick="grid.title('New Title')">Set New Title</button>
         * <button onclick="alert(grid.title())">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Grid/GetPlayers',
         *         title: 'Initial Grid Title',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         * @example <button onclick="grid.title('New Title')">Set New Title</button>
         * <button onclick="alert(grid.title())">Get Title</button>
         * <br/><br/>
         * <table id="grid"></table>
         * <script>
         *     var grid = $('#grid').grid({
         *         dataSource: '/Grid/GetPlayers',
         *         toolbarTemplate: '<div data-role="title">Initial Grid Title</div>',
         *         columns: [ { field: 'ID' }, { field: 'Name' }, { field: 'PlaceOfBirth' } ]
         *     });
         * </script>
         */
        title: function (text) {
            var $titleEl = this.parent().find('div[data-role="toolbar"] [data-role="title"]');
            if (typeof (text) !== 'undefined') {
                $titleEl.text(text);
                return this;
            } else {
                return $titleEl.text();
            }
        }
    },

    'init': function ($grid) {
        var data, $toolbar;
        $.extend(true, $grid, gj.grid.plugins.toolbar.public);
        data = $grid.data('grid');
        if (typeof (data.toolbarTemplate) !== 'undefined' || typeof (data.title) !== 'undefined') {
            $toolbar = $('<div data-role="toolbar"></div>').addClass(data.style.toolbar);
            if (data.toolbarTemplate) {
                $toolbar.append(data.toolbarTemplate);
            } else {
                $toolbar.append($('<div data-role="title"/>').text(data.title));
            }
            if (data.minWidth) {
                $toolbar.css("min-width", data.minWidth);
            }
            $grid.before($toolbar);
        }
    }
};

$.extend(true, gj.grid.configuration, gj.grid.plugins.toolbar.configuration);

gj.grid.private = {

    init: function (jsConfig) {
        var plugin, option, data = this.data('grid');
        if (!data) {
            gj.grid.private.SetOptions(this, jsConfig || {});
            gj.grid.private.InitGrid(this);
            //Initialize all plugins
            for (plugin in gj.grid.plugins) {
                if (gj.grid.plugins.hasOwnProperty(plugin)) {
                    gj.grid.plugins[plugin].init(this);
                }
            }
            data = this.data('grid');
            //Initialize events configured as options
            for (option in data) {
                if (gj.grid.events.hasOwnProperty(option)) {
                    this.on(option, data[option]);
                    delete data[option];
                }
            }
            gj.grid.private.HeaderRenderer(this);
            gj.grid.private.AppendEmptyRow(this, "&nbsp;");
            gj.grid.events.initialized(this);
            if (data.autoLoad) {
                this.reload();
            }
        }
        return this;
    },

    SetOptions: function ($grid, jsConfig) {
        var options = $.extend(true, {}, gj.grid.configuration.base),
            htmlConfig = gj.grid.private.getHTMLConfiguration($grid);
        if ((jsConfig.uiLibrary && jsConfig.uiLibrary === "bootstrap") || (htmlConfig.uiLibrary && htmlConfig.uiLibrary === "bootstrap")) {
            $.extend(true, options, gj.grid.configuration.bootstrap);
        }
        $.extend(true, options, htmlConfig);
        $.extend(true, options, jsConfig);
        gj.grid.private.setDefaultColumnConfig(options.columns, options.defaultColumnSettings);
        $grid.data('grid', options);
    },

    setDefaultColumnConfig: function (columns, defaultColumnSettings) {
        var column;
        if (columns && columns.length) {
            for (i = 0; i < columns.length; i++) {
                column = $.extend(true, {}, defaultColumnSettings);
                $.extend(true, column, columns[i]);
                columns[i] = column;
            }
        }
    },

    getHTMLConfiguration: function ($grid) {
        var result = gj.grid.private.getAttributes($grid);
        if (result && result.source) {
            result.dataSource = result.source;
            delete result.source;
        }
        result.columns = [];
        $grid.find('thead > tr > th').each(function () {
            var $el = $(this),
                title = $el.text(),
                config = gj.grid.private.getAttributes($el);
            config.title = title;
            if (!config.field) {
                config.field = title;
            }
            if (config.events) {
                config.events = gj.grid.private.eventsParser(config.events);
            }
            result.columns.push(config);
        });
        return result;
    },

    getAttributes: function ($el) {
        var result = $el.data(),
            width = $el.attr('width');
        if (width) {
            result.width = width;
        }
        return result;
    },

    eventsParser: function (events) {
        var result = {}, list, i, key, func, position;
        list = events.split(',');
        for (i = 0; i < list.length; i++) {
            position = list[i].indexOf(':');
            if (position > 0) {
                key = $.trim(list[i].substr(0, position));
                func = $.trim(list[i].substr(position + 1, list[i].length));
                result[key] = eval('window.' + func); //window[func]; //TODO: eveluate functions from string
            }
        }
        return result;
    },

    LoaderSuccessHandler: function ($grid) {
        return function (response) {
            $grid.render(response);
        };
    },

    InitGrid: function ($grid) {
        var data = $grid.data('grid');
        if ($grid.parent().data('role') !== 'wrapper') {
            $grid.wrapAll('<div data-role="wrapper" class="' + data.style.wrapper + '" />');
        }
        if (data.width) {
            $grid.parent().css("width", data.width);
        }
        if (data.minWidth) {
            $grid.css("min-width", data.minWidth);
        }
        if (data.fontSize) {
            $grid.css("font-size", data.fontSize);
        }
        $grid.addClass(data.style.table);
        if ("checkbox" === data.selectionMethod) {
            data.columns = [{ title: '', field: data.dataKey, width: (data.uiLibrary === 'jqueryui' ? 24 : 30), align: 'center', type: 'checkbox' }].concat(data.columns);
        }
        $grid.append($("<tbody/>"));
    },

    HeaderRenderer: function ($grid) {
        var data, columns, style, sortBy, direction, $thead, $row, $cell, i;

        data = $grid.data('grid');
        columns = data.columns;
        style = data.style.header;
        sortBy = data.params[data.defaultParams.sortBy];
        direction = data.params[data.defaultParams.direction];

        $thead = $grid.children('thead');
        if ($thead.length === 0) {
            $thead = $('<thead />');
            $grid.prepend($thead);
        }

        $row = $('<tr/>');
        for (i = 0; i < columns.length; i += 1) {
            $cell = $('<th/>');
            if (columns[i].width) {
                $cell.attr('width', columns[i].width);
            }
            $cell.addClass(style.cell);
            if (columns[i].headerCssClass) {
                $cell.addClass(columns[i].headerCssClass);
            }
            $cell.css('text-align', columns[i].align || 'left');
            if (columns[i].sortable) {
                $cell.addClass(style.sortable);
                $cell.bind('click', gj.grid.private.CreateSortHandler($grid, $cell));
            }
            if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType && 'checkbox' === columns[i].type) {
                $cell.append($('<input type="checkbox" id="checkAllBoxes" />').hide().click(function () {
                    if (this.checked) {
                        $grid.selectAll();
                    } else {
                        $grid.unSelectAll();
                    }
                }));
            } else {
                $cell.append($('<div style="float: left"/>').text(typeof (columns[i].title) === 'undefined' ? columns[i].field : columns[i].title));
            }
            if (columns[i].hidden) {
                $cell.hide();
            }

            $cell.data('cell', columns[i]);
            $row.append($cell);
        }

        $thead.empty().append($row);
    },

    CreateSortHandler: function ($grid, $cell) {
        return function () {
            var $sortIcon, data, cellData, style, params = {};
            if ($grid.count() > 1) {
                data = $grid.data('grid');
                cellData = $cell.data('cell');
                cellData.direction = (cellData.direction === 'asc' ? 'desc' : 'asc');
                params[data.defaultParams.sortBy] = cellData.field;
                params[data.defaultParams.direction] = cellData.direction;

                style = data.style.header;
                $sortIcon = $cell.children('span[data-role="sorticon"]');
                if ($sortIcon.length === 0) {
                    $sortIcon = $('<span data-role="sorticon" style="float: left; margin-left:5px;"/>');
                    $cell.append($sortIcon);
                } else {
                    $sortIcon.removeClass('asc' === cellData.direction ? style.sortDescIcon : style.sortAscIcon);
                }
                $sortIcon.addClass('asc' === cellData.direction ? style.sortAscIcon : style.sortDescIcon);
                
                $grid.reload(params);
            }
        };
    },

    StartLoading: function ($grid) {
        var $tbody, $cover, $loading, width, height, top, data;
        gj.grid.private.StopLoading($grid);
        data = $grid.data('grid');
        if (0 === $grid.outerHeight()) {
            return;
        }
        $tbody = $grid.children("tbody");
        width = $tbody.outerWidth(false);
        height = $tbody.outerHeight(false);
        top = $tbody.prev().outerHeight(false) + $grid.prevAll().outerHeight(false) + parseInt($grid.parent().css("padding-top").replace('px', ''), 10);
        $cover = $("<div data-role='loading-cover' />").addClass(data.style.loadingCover).css({
            width: width,
            height: height,
            top: top
        });
        $loading = $("<div data-role='loading-text'>Loading...</div>").addClass(data.style.loadingText);
        $loading.insertAfter($grid);
        $cover.insertAfter($grid);
        $loading.css({
            top: top + (height / 2) - ($loading.outerHeight(false) / 2),
            left: (width / 2) - ($loading.outerWidth(false) / 2)
        });
    },

    StopLoading: function ($grid) {
        $grid.parent().find("div[data-role='loading-cover']").remove();
        $grid.parent().find("div[data-role='loading-text']").remove();
    },

    CreateAddRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.addClass(cssClass);
        };
    },

    CreateRemoveRowHoverHandler: function ($row, cssClass) {
        return function () {
            $row.removeClass(cssClass);
        };
    },

    AppendEmptyRow: function ($grid, caption) {
        var data, $row, $cell, $wrapper;
        data = $grid.data('grid');
        $row = $('<tr data-role="empty"/>');
        $cell = $('<td/>').css({ 'width': '100%', 'text-align': 'center' });
        $cell.attr('colspan', gj.grid.private.countVisibleColumns($grid));
        $wrapper = $('<div />').html(caption);
        $cell.append($wrapper);
        $row.append($cell);

        gj.grid.events.beforeEmptyRowInsert($grid, $row);

        $grid.append($row);
    },

    autoGenerateColumns: function ($grid, records) {
        var names, value, type,
            data = $grid.data('grid');
        data.columns = [];
        if (records.length > 0) {
            names = Object.getOwnPropertyNames(records[0]);
            for (i = 0; i < names.length; i++) {
                value = records[0][names[i]];
                type = 'text';
                if (value) {
                    if (value.indexOf('/Date(') > -1) {
                        type = 'date';
                    } else if (typeof value === 'number') {
                        type = 'number';
                    }
                }
                data.columns.push({ field: names[i], type: type });
            }
            gj.grid.private.setDefaultColumnConfig(data.columns, data.defaultColumnSettings);
        }
        gj.grid.private.HeaderRenderer($grid);
    },

    loadData: function ($grid, records, totalRecords) {
        var data, records, i, j, recLen, rowCount,
            $tbody, $rows, $row, $checkAllBoxes;

        gj.grid.events.dataBinding($grid, records);
        data = $grid.data('grid');
        recLen = records.length;
        gj.grid.private.StopLoading($grid);

        if (data.autoGenerateColumns) {
            gj.grid.private.autoGenerateColumns($grid, records);
        }

        $tbody = $grid.find('tbody');
        if ('checkbox' === data.selectionMethod && 'multiple' === data.selectionType) {
            $checkAllBoxes = $grid.find('input#checkAllBoxes');
            $checkAllBoxes.prop('checked', false);
            if (0 === recLen) {
                $checkAllBoxes.hide();
            } else {
                $checkAllBoxes.show();
            }
        }
        $tbody.find('tr[data-role="empty"]').remove();
        if (0 === recLen) {
            $tbody.empty();
            gj.grid.private.AppendEmptyRow($grid, data.notFoundText);
        }

        $rows = $tbody.children('tr');
        rowCount = $rows.length;
        
        for (i = 0; i < rowCount; i++) {
            if (i < recLen) {
                $row = $rows.eq(i);
                gj.grid.private.RowRenderer($grid, $row, records[i], i);
            } else {
                $tbody.find('tr:gt(' + (i - 1) + ')').remove();
                break;
            }
        }

        for (i = rowCount; i < recLen; i++) {
            gj.grid.private.RowRenderer($grid, null, records[i], i);
        }
        gj.grid.events.dataBound($grid, records, totalRecords);
    },

    RowRenderer: function ($grid, $row, record, position) {
        var id, $cell, i, data, mode;
        data = $grid.data('grid');
        if (!$row || $row.length === 0) {
            mode = "create";
            $row = $($grid.find("tbody")[0].insertRow(position));
            $row.bind({
                "mouseenter.grid": gj.grid.private.CreateAddRowHoverHandler($row, data.style.content.rowHover),
                "mouseleave.grid": gj.grid.private.CreateRemoveRowHoverHandler($row, data.style.content.rowHover)
            });
        } else {
            mode = "update";
            $row.removeClass(data.style.content.rowSelected).off("click");
        }
        id = (data.dataKey && record[data.dataKey]) ? record[data.dataKey] : (position + 1);
        $row.data("row", { id: id, record: record });
        $row.on("click", gj.grid.private.CreateRowClickHandler($grid, id, record));
        for (i = 0; i < data.columns.length; i++) {
            if (mode === "update") {
                $cell = $row.find("td:eq(" + i + ")");
                gj.grid.private.CellRenderer($grid, $cell, data.columns[i], record, id);
            } else {
                $cell = gj.grid.private.CellRenderer($grid, null, data.columns[i], record, id);
                $row.append($cell);
            }
        }
        gj.grid.events.rowDataBound($grid, $row, id, record);
    },

    CellRenderer: function ($grid, $cell, column, record, id, mode) {
        var text, $wrapper, mode, $icon, data;

        data = $grid.data('grid');

        if (!$cell || $cell.length === 0) {
            $cell = $("<td/>").css("text-align", column.align || "left");
            $wrapper = $("<div data-role='display' />");
            if (column.cssClass) {
                $cell.addClass(column.cssClass);
            }
            $cell.append($wrapper);
            mode = "create";
        } else {
            $wrapper = $cell.find("div");
            mode = "update";
        }

        if ("checkbox" === column.type) {
            if ("create" === mode) {
                $wrapper.append($("<input />").attr("type", "checkbox").val(id));
            } else {
                $wrapper.find("input[type='checkbox']").val(id).prop("checked", false);
            }
        } else if ("icon" === column.type) {
            if ("create" === mode) {
                $wrapper.append($("<span/>")
                    .addClass(data.uiLibrary === "bootstrap" ? "glyphicon" : "ui-icon")
                    .addClass(column.icon).css({ "cursor": "pointer" }));
            }
        } else if (column.tmpl) {
            text = column.tmpl;
            column.tmpl.replace(/\{(.+?)\}/g, function ($0, $1) {
                text = text.replace($0, gj.grid.private.formatText(record[$1], column));
            });
            $wrapper.text(text);
        } else {
            gj.grid.private.setCellText($wrapper, column, record[column.field]);
        }
        if (column.tooltip && "create" === mode) {
            $wrapper.attr("title", column.tooltip);
        }
        //remove all event handlers
        if ("update" === mode) {
            $cell.off();
            $wrapper.off();
        }
        if (column.events) {
            for (var key in column.events) {
                if (column.events.hasOwnProperty(key)) {
                    $cell.on(key, { id: id, field: column.field, record: record }, column.events[key]);
                }
            }
        }
        if (column.hidden) {
            $cell.hide();
        }

        gj.grid.events.cellDataBound($grid, $wrapper, id, column, record);

        return $cell;
    },

    setCellText: function ($wrapper, column, value) {
        var text = gj.grid.private.formatText(value, column);
        if (!column.tooltip) {
            $wrapper.attr("title", text);
        }
        $wrapper.text(text);
    },

    formatText: function (text, column) {
        var dt, day, month;
        if (text && column.type) {
            switch (column.type) {
                case "date":
                    if (text.indexOf("/Date(") > -1) {
                        dt = new Date(parseInt(text.substr(6), 10));
                    } else {
                        var parts = text.match(/(\d+)/g);
                        // new Date(year, month, date, hours, minutes, seconds);
                        dt = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]); // months are 0-based
                    }

                    if (dt.format && column.format) {
                        text = dt.format(column.format); //using 3rd party plugin "Date Format 1.2.3 by (c) 2007-2009 Steven Levithan <stevenlevithan.com>"
                    } else {
                        day = dt.getDate().toString().length === 2 ? dt.getDate() : "0" + dt.getDate();
                        month = (dt.getMonth() + 1).toString();
                        month = month.length === 2 ? month : "0" + month;
                        text = month + "/" + day + "/" + dt.getFullYear();
                    }
                    break;
                case "money":
                    text = parseFloat(text).toFixed(2);
                    break;
            }
        } else {
            text = (typeof (text) === "undefined" || text === null) ? "" : text.toString();
        }
        if (column.decimalDigits && text) {
            text = parseFloat(text).toFixed(column.decimalDigits);
        }
        return text;
    },

    GetRecords: function (data, response) {
        var records = [];
        if ($.isArray(response)) {
            records = response;
        } else if (data && data.mapping && $.isArray(response[data.mapping.dataField])) {
            records = response[data.mapping.dataField];
        }
        return records;
    },

    CreateRowClickHandler: function ($grid, id, record) {
        return function (e) {
            gj.grid.private.setSelected($grid, $(this), id);
        };
    },

    SelectRow: function ($grid, data, $row) {
        $row.addClass(data.style.content.rowSelected);

        gj.grid.events.rowSelect($grid, $row, $row.data("row").id, $row.data("row").record);

        if ("checkbox" === data.selectionMethod) {
            $row.find("td:nth-child(1) input[type='checkbox']").prop("checked", true);
        }

        $row.siblings().find("td[data-mode='edit']").each(function () {
            var $cell = $(this),
                column = data.columns[$cell.parent().children().index(this)];
            gj.grid.private.OnCellDisplay($cell, column);
        });
    },

    UnselectRow: function ($grid, data, $row) {
        if ($row.hasClass(data.style.content.rowSelected)) {
            $row.removeClass(data.style.content.rowSelected);

            gj.grid.events.rowUnselect($grid, $row, $row.data("row").id, $row.data("row").record)

            if ("checkbox" === data.selectionMethod) {
                $row.find("td:nth-child(1) input[type='checkbox']").prop("checked", false);
            }
        }
    },

    setSelected: function ($grid, $row, id) {
        var data = $grid.data('grid');
        if ($row.hasClass(data.style.content.rowSelected)) {
            gj.grid.private.UnselectRow($grid, data, $row);
        } else {
            if ("single" === data.selectionType) {
                $row.siblings().each(function () {
                    gj.grid.private.UnselectRow($grid, data, $(this));
                });
            }
            gj.grid.private.SelectRow($grid, data, $row);
        }
    },

    _GetSelected: function ($grid) {
        var result, data, selections;
        data = $grid.data("grid");
        selections = $grid.find("tbody > tr." + data.style.content.rowSelected);
        if (selections.length > 0) {
            result = $(selections[0]).data("row").id;
        }
        return result;
    },

    GetSelectedRows: function ($grid) {
        var data = $grid.data("grid");
        return $grid.find("tbody > tr." + data.style.content.rowSelected);
    },

    _GetSelections: function ($grid) {
        var result = [],
            $selections = gj.grid.private.GetSelectedRows($grid);
        if (0 < $selections.length) {
            $selections.each(function () {
                result.push($(this).data("row").id);
            });
        }
        return result;
    },

    getRecordById: function ($grid, id) {
        var result = {}, rows, i, rowData;
        rows = $grid.find("tbody > tr");
        for (i = 0; i < rows.length; i++) {
            rowData = $(rows[i]).data("row");
            if (rowData.id === id) {
                result = rowData.record;
                break;
            }
        }
        return result;
    },

    getRowById: function ($grid, id) {
        var result = null, rows, i, rowData;
        rows = $grid.find("tbody > tr");
        for (i = 0; i < rows.length; i++) {
            rowData = $(rows[i]).data("row");
            if (rowData.id === id) {
                result = $(rows[i]);
                break;
            }
        }
        return result;
    },

    getByPosition: function ($grid, position) {
        var result = {}, $rows, data;
        $rows = $grid.find("tbody > tr");
        if ($rows.length >= position) {
            data = $rows.eq(position - 1).data("row");
            if (data && data.record) {
                result = data.record;
            }
        }
        return result;
    },

    GetColumnPosition: function (columns, field) {
        var position = -1, i;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].field === field) {
                position = i;
                break;
            }
        }
        return position;
    },

    GetColumnInfo: function ($grid, index) {
        var i, result = {}, data = $grid.data("grid");
        for (i = 0; i < data.columns.length; i += 1) {
            if (data.columns[i].field === index) {
                result = data.columns[i];
                break;
            }
        }
        return result;
    },

    GetCell: function ($grid, id, index) {
        var result = {}, rows, i, rowData, position;
        position = gj.grid.private.GetColumnPosition($grid, index);
        rows = $grid.find("tbody > tr");
        for (i = 0; i < rows.length; i += 1) {
            rowData = $(rows[i]).data("row");
            if (rowData.id === id) {
                result = $(rows[i].cells[position]).find("div");
                break;
            }
        }
        return result;
    },

    SetCellContent: function ($grid, id, index, value) {
        var column, $cellWrapper = gj.grid.private.GetCell($grid, id, index);
        $cellWrapper.empty();
        if (typeof (value) === "object") {
            $cellWrapper.append(value);
        } else {
            column = gj.grid.private.GetColumnInfo($grid, index);
            gj.grid.private.setCellText($cellWrapper, column, value);
        }
    },

    clone: function (source) {
        var target = [];
        $.each(source, function () {
            target.push(this.clone());
        });
        return target;
    },

    GetAll: function ($grid) {
        var result = [],
                rows = $grid.find("tbody > tr"),
                i, record;

        for (i = 0; i < rows.length; i++) {
            record = $(rows[i]).data("row");
            if (record) {
                result.push(record);
            }
        }
        return result;
    },
    
    countVisibleColumns: function ($grid) {
        var columns, count, i;
        columns = $grid.data('grid').columns;
        count = 0;
        for (i = 0; i < columns.length; i++) {
            if (columns[i].hidden !== true) {
                count++;
            }
        }
        return count;
    }
};

/** 
  * @widget Grid 
  * @plugin Core
  */
gj.grid.public = {
    xhr: null,

    /**
     * Reload the data in the grid from a data source.
     * @method
     * @param {object} params - An object that contains a list with parameters that are going to be send to the server.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return void
     * @example <input type="text" id="txtSearch">
     * <button id="btnSearch">Search</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnSearch").on("click", function () {
     *         grid.reload({ searchString: $("#txtSearch").val() });
     *     });
     * </script>
     */
    reload: function (params) {
        var data, ajaxOptions, records;
        data = this.data('grid');
        $.extend(data.params, params);
        gj.grid.private.StartLoading(this);
        if ($.isArray(data.dataSource)) {
            records = gj.grid.private.GetRecords(data, data.dataSource);
            gj.grid.private.loadData(this, records, records.length);
        } else if (typeof (data.dataSource) === "string") {
            ajaxOptions = { url: data.dataSource, data: data.params, success: gj.grid.private.LoaderSuccessHandler(this) };
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = $.ajax(ajaxOptions);
        } else if (typeof(data.dataSource) === "object") {
            if (!data.dataSource.data) {
                data.dataSource.data = {};
            }
            $.extend(data.dataSource.data, data.params);
            ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
            if (ajaxOptions.dataType === "json" && typeof (ajaxOptions.data) === "object") {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
            if (!ajaxOptions.success) {
                ajaxOptions.success = gj.grid.private.LoaderSuccessHandler(this);
            }
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = $.ajax(ajaxOptions);
        }
        return this;
    },

    /**
     * Clear the content in the grid.
     * @method
     * @return void
     * @example <button id="btnClear">Clear</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnClear").on("click", function () {
     *         grid.clear();
     *     });
     * </script>
     */
    clear: function () {
        var data = this.data('grid');
        if ("checkbox" === data.selectionMethod) {
            this.find("input#checkAllBoxes").hide();
        }
        this.children("tbody").empty();
        gj.grid.private.StopLoading(this);
        gj.grid.private.AppendEmptyRow(this, "&nbsp;");
        gj.grid.events.dataBound(this, [], 0);
        return this;
    },

    /**
     * Return the number of records presented on the screen.
     * @method
     * @return int
     * @example <button id="btnShowCount">Show Count</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnShowCount").on("click", function () {
     *         alert(grid.count());
     *     });
     * </script>
     */
    count: function () {
        //exclude empty and details row
        return $(this).find('tbody tr').filter(function () {
            return !$(this).data('role');
        }).length;
    },

    /**
     * Render data in the grid
     * @method
     * @param {object} response - An object that contains the data that needs to be loaded in the grid.
     * @fires beforeEmptyRowInsert, dataBinding, dataBound, cellDataBound
     * @return void
     * @example <table id="grid"></table>
     * <script>
     *     var grid, onSuccessFunc; 
     *     onSuccessFunc = function (response) { 
     *         //you can modify the response here if needed
     *         grid.render(response);
     *     };
     *     grid = $("#grid").grid({
     *         dataSource: { url: "/Grid/GetPlayers", success: onSuccessFunc },
     *         columns: [ { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     * </script>
     */
    render: function (response) {
        var data, records, totalRecords;
        if (response) {
            data = this.data('grid');
            if (data) {
                records = gj.grid.private.GetRecords(data, response);
                totalRecords = response[data.mapping.totalRecordsField];
                if (!totalRecords || isNaN(totalRecords)) {
                    totalRecords = 0;
                }
                gj.grid.private.loadData(this, records, totalRecords);
            }
        }
    },

    /**
     * Destroy the grid from the HTML dom tree.
     * @method
     * @param {bool} keepTableTag - If this flag is set to true, then the table tag will be kept in the HTML dom tree.
     * @fires destroying
     * @return void
     * @example <button id="btnDestroy">Destroy</button>
     * <button id="btnCreate">Create</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid, createFunc;
     *     createFunc = function() {
     *         grid = $("#grid").grid({
     *             dataSource: "/version_0_4/Demos/GetPlayers",
     *             columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *         });
     *     };
     *     createFunc();
     *     $("#btnDestroy").on("click", function () {
     *         grid.destroy(true);
     *     });
     *     $("#btnCreate").on("click", function () {
     *         createFunc();
     *     });
     * </script>
     * @example <button id="btnRemove">Remove</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnRemove").on("click", function () {
     *         grid.destroy();
     *     });
     * </script>
     */
    destroy: function (keepTableTag) {
        var data = this.data('grid');
        if (data) {
            gj.grid.events.destroying(this);
            gj.grid.private.StopLoading(this);
            this.off();
            if (this.parent().hasClass(data.style.wrapper)) {
                this.unwrap();
            }
            this.removeData();
            if (keepTableTag) {
                this.removeClass().empty();
            } else {
                this.remove();
            }
        }
    },

    /**
     * Select a row from the grid based on id parameter.
     * @method
     * @param {string} id - The id of the row that needs to be selected
     * @return void
     * @example <input type="text" id="txtNumber" value="1" />
     * <button id="btnSelect">Select</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox"
     *     });
     *     $("#btnSelect").on("click", function () {
     *         grid.setSelected(parseInt($("#txtNumber").val(), 10));
     *     });
     * </script>
     */
    setSelected: function (id) {
        var $row = gj.grid.private.getRowById(this, id);
        if ($row) {
            gj.grid.private.setSelected(this, $row, id);
        }
    },

    /**
     * Return the id of the selected record.
     * If the multiple selection method is one this method is going to return only the id of the first selected record.
     * @method
     * @return string
     * @example <button id="btnShowSelection">Show Selection</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox"
     *     });
     *     $("#btnShowSelection").on("click", function () {
     *         alert(grid.getSelected());
     *     });
     * </script>
     */
    getSelected: function () {
        return gj.grid.private._GetSelected(this);
    },

    /**
     * Return an array with the ids of the selected record.
     * @method
     * @return array
     * @example <button id="btnShowSelection">Show Selections</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnShowSelection").on("click", function () {
     *         var selections = grid.getSelections();
     *         $.each(selections, function() {
     *             alert(this);
     *         });
     *     });
     * </script>
     */
    getSelections: function () {
        return gj.grid.private._GetSelections(this);
    },

    /**
     * Select all records from the grid.
     * @method
     * @return void
     * @example <button id="btnSelectAll">Select All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnSelectAll").on("click", function () {
     *         grid.selectAll();
     *     });
     * </script>
     */
    selectAll: function () {
        var $grid = this,
            data = this.data('grid');
        $grid.find("thead input#checkAllBoxes").prop("checked", true);
        $grid.find("tbody tr").each(function () {
            gj.grid.private.SelectRow($grid, data, $(this));
        });
    },

    /**
     * Unselect all records from the grid.
     * @method
     * @return void
     * @example <button id="btnSelectAll">Select All</button>
     * <button id="btnUnSelectAll">UnSelect All</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         selectionMethod: "checkbox",
     *         selectionType: "multiple"
     *     });
     *     $("#btnSelectAll").on("click", function () {
     *         grid.selectAll();
     *     });
     *     $("#btnUnSelectAll").on("click", function () {
     *         grid.unSelectAll();
     *     });
     * </script>
     */
    unSelectAll: function () {
        var $grid = $(this),
            data = this.data('grid');
        this.find("thead input#checkAllBoxes").prop("checked", false);
        this.find("tbody tr").each(function () {
            gj.grid.private.UnselectRow($grid, data, $(this));
        });
    },

    /**
     * Return record by id of the record.
     * @method
     * @param {string} id - The id of the row that needs to be returned.
     * @return object
     * @example <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ],
     *         dataKey: "ID" //define the name of the column that you want to use as ID here.
     *     });
     *     $("#btnGetData").on("click", function () {
     *         var data = grid.getById("2");
     *         alert(data.Name + " born in " + data.PlaceOfBirth);
     *     });
     * </script>
     */
    getById: function (id) {
        return gj.grid.private.getRecordById(this, id);
    },

    /**
     * Return record from the grid based on position.
     * @method
     * @param {int} position - The position of the row that needs to be return.
     * @return object
     * @example <button id="btnGetData">Get Data</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnGetData").on("click", function () {
     *         var data = grid.get(3);
     *         alert(data.Name + " born in " + data.PlaceOfBirth);
     *     });
     * </script>
     */
    get: function (position) {
        return gj.grid.private.getByPosition(this, position);
    },

    /**
     * Return an array with all records presented in the grid.
     * @method
     * @return array
     * @example <button id="btnGetAllName">Get All Names</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnGetAllName").on("click", function () {
     *         var records = grid.getAll(), names = "";
     *         $.each(records, function () { 
     *             names += this.record.Name + "(id=" + this.id + "),";
     *         });
     *         alert(names);
     *     });
     * </script>
     */
    getAll: function () {
        return gj.grid.private.GetAll(this);
    },

    /**
     * Show hidden column.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example <button id="btnShowColumn">Show Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth", hidden: true } ]
     *     });
     *     $("#btnShowColumn").on("click", function () {
     *         grid.showColumn("PlaceOfBirth");
     *     });
     * </script>
     */
    showColumn: function (field) {
        var data = this.data('grid'),
            position = gj.grid.private.GetColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            this.find("thead>tr>th:eq(" + position + ")").show();
            $.each(this.find("tbody>tr"), function () {
                $(this).find("td:eq(" + position + ")").show();
            });
            data.columns[position].hidden = false;

            $cells = this.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.private.countVisibleColumns(this));
            }

            gj.grid.events.columnShow(this, data.columns[position]);
        }

        return this;
    },

    /**
     * Hide column from the grid.
     * @method
     * @param {string} field - The name of the field bound to the column.
     * @return grid
     * @example <button id="btnHideColumn">Hide Column</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnHideColumn").on("click", function () {
     *         grid.hideColumn("PlaceOfBirth");
     *     });
     * </script>
     */
    hideColumn: function (field) {
        var data = this.data('grid'),
            position = gj.grid.private.GetColumnPosition(data.columns, field),
            $cells;

        if (position > -1) {
            this.find("thead>tr>th:eq(" + position + ")").hide();
            $.each(this.find("tbody>tr"), function () {
                $(this).find("td:eq(" + position + ")").hide();
            });
            data.columns[position].hidden = true;

            $cells = this.find('tbody > tr[data-role="empty"] > td');
            if ($cells && $cells.length) {
                $cells.attr('colspan', gj.grid.private.countVisibleColumns(this));
            }

            gj.grid.events.columnHide(this, data.columns[position]);
        }

        return this;
    },

    /**
     * Add new row to the grid.
     * @method
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example <button id="btnAdd">Add Row</button>
     * <br/><br/>
     * <table id="grid"></table>
     * <script>
     *     var grid = $("#grid").grid({
     *         dataSource: "/Grid/GetPlayers",
     *         columns: [ { field: "ID" }, { field: "Name" }, { field: "PlaceOfBirth" } ]
     *     });
     *     $("#btnAdd").on("click", function () {
     *         grid.addRow({ "ID": grid.count() + 1, "Name": "Test Player", "PlaceOfBirth": "Test City, Test Country" });
     *     });
     * </script>
     */
    addRow: function (record) {
        var position, $rows = this.find('tbody > tr');
        //clear empty row if exists
        if ($rows.length === 1 && $rows.data('role') === 'empty') {
            $rows.remove();
        }
        position = this.count();
        gj.grid.private.RowRenderer(this, null, record, position);
        return this;
    },

    /**
     * Update row data.
     * @method
     * @param {string} id - The id of the row that needs to be updated
     * @param {object} record - Object with data for the new record.
     * @return grid
     * @example <table id="grid"></table>
     * <script>
     *     var grid, data;
     *     function Edit(e) {
     *         grid.updateRow(e.data.id, { "ID": e.data.id, "Name": "Ronaldo", "PlaceOfBirth": "Rio, Brazil" });
     *     }
     *     grid = $("#grid").grid({
     *         dataSource: [
     *             { "ID": 1, "Name": "Hristo Stoichkov", "PlaceOfBirth": "Plovdiv, Bulgaria" },
     *             { "ID": 2, "Name": "Ronaldo Luis Nazario de Lima", "PlaceOfBirth": "Rio de Janeiro, Brazil" },
     *             { "ID": 3, "Name": "David Platt", "PlaceOfBirth": "Chadderton, Lancashire, England" }
     *         ],
     *         columns: [ 
     *             { field: "ID" },
     *             { field: "Name" },
     *             { field: "PlaceOfBirth" },
     *             { title: "", width: 20, type: "icon", icon: "ui-icon-pencil", events: { "click": Edit } }
     *         ]
     *     });
     * </script>
     */
    updateRow: function (id, record) {
        var $row = gj.grid.private.getRowById(this, id);
        gj.grid.private.RowRenderer(this, $row, record, $row.index());
        return this;        
    },
    
    //TODO: needs to be removed
    setCellContent: function (id, index, value) {
        gj.grid.private.SetCellContent(this, id, index, value);
    },

    /**
     * Remove row from the grid
     * @method
     * @param {string} id - Id of the record that needs to be removed.
     * @return grid
     * @example <table id="grid"></table>
     * <script>
     *     var grid;
     *     function Delete(e) {
     *         if (confirm("Are you sure?")) {
     *             grid.removeRow(e.data.id);
     *         }
     *     }
     *     grid = $("#grid").grid({
     *         dataSource: [
     *             { "ID": 1, "Name": "Hristo Stoichkov", "PlaceOfBirth": "Plovdiv, Bulgaria" },
     *             { "ID": 2, "Name": "Ronaldo Luís Nazário de Lima", "PlaceOfBirth": "Rio de Janeiro, Brazil" },
     *             { "ID": 3, "Name": "David Platt", "PlaceOfBirth": "Chadderton, Lancashire, England" }
     *         ],
     *         columns: [ 
     *             { field: "ID" },
     *             { field: "Name" },
     *             { field: "PlaceOfBirth" },
     *             { title: "", width: 20, type: "icon", icon: "ui-icon-close", events: { "click": Delete } }
     *         ]
     *     });
     * </script>
     */
    removeRow: function (id) {
        var $row = gj.grid.private.getRowById(this, id);
        if ($row) {
            $row.remove();
        }
        return this;
    }
};

(function ($) {
    $.fn.grid = function (method) {
        if (typeof method === 'object' || !method) {
            function Grid() {
                var self = this;
                $.extend(self, gj.grid.public);
            };
            var grid = new Grid();
            $.extend(this, grid);
            return gj.grid.private.init.apply(this, arguments);
        } else if (gj.grid.public[method]) {
            return gj.grid.public[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            throw "Method " + method + " does not exist.";
        }
    };
})(jQuery);

