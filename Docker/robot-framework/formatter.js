/*
 * An adapter that lets you use format() function with the format
 * that only defines formatCommand() function.
 *
 */

//Separator for splitting commands
var SEPARATOR = "  ";

//Mapping for Selenium Commands -> Selenium Robot Keywords
var KEYWORDS = {
  open: 'Go To',
  clickAndWait: 'Click Element',
  click: 'Click Element',
  type: "Input Text",
  selectAndWait: "Select From List",
  select: "Select From List",
  verifyValue: "Element Should Contain",
  verifyText: 'Element Should Contain',
  verifyElementPresent: 'Page Should Contain Element',
  verifyVisible: 'Page Should Contain Element',
  verifyTitle: 'Title Should Be',
  verifyTable: 'Element Should Contain',
  assertConfirmation: 'Alert Should Be Present',
  assertText: 'Element Should Contain',
  assertValue: 'Element Should Contain',
  assertElementPresent: 'Page Should Contain Element',
  assertVisible: 'Page Should Contain Element',
  assertTitle: 'Title Should Be',
  assertTable: 'Element Should Contain',
  waitForText: 'Element Should Contain',
  waitForValue: 'Element Should Contain',
  waitForElementPresent: 'Page Should Contain Element',
  waitForVisible: 'Page Should Contain Element',
  waitForTitle: 'Title Should Be',
  waitForTable: 'Element Should Contain',
  doubleClick: 'Double Click Element',
  doubleClickAndWait: 'Double Click Element',
  goBack: 'Go Back',
  goBackAndWait: 'Go Back',
  runScript: 'Execute Javascript',
  runScriptAndWait: 'Execute Javascript',
  setSpeed: 'Set Selenium Timeout',
  setSpeedAndWait: 'Set Selenium Timeout',
  verifyAlert: 'Alert Should Be Present',
  selectWindow: 'Select Window'
};


/**
 * Parse source and update TestCase. Throw an exception if any error occurs.
 *
 * @param testCase TestCase to update
 * @param source The source to parse
 */
function parse(testCase, source) {
	testCase.header = null;
	testCase.footer = null;
	var commands = [];

	var reader = new LineReader(source);
	var line;
	while ((line = reader.read()) != null) {
		commands.push(new Line(line));
	}
	testCase.commands = commands;
	testCase.formatLocal(this.name).header = "";
}

/**
 * Format TestCase and return the source.
 *
 * @param testCase TestCase to format
 * @param name The name of the test case, if any. It may be used to embed title into the source.
 */
function format(testCase, name) {
	this.log.info("formatting testCase: " + name);
	var result = "";
	var header = "";
	var footer = "";
	this.commandCharIndex = 0;
	if (this.formatHeader) {
		header = formatHeader(testCase, name);
	}
	result += header;
	this.commandCharIndex = header.length;
	testCase.formatLocal(this.name).header = header;
	result += formatCommands(testCase.commands);
	return result;
}

function filterForRemoteControl(originalCommands) {
	var commands = [];
	for (var i = 0; i<originalCommands.length;i++)
	{
		var c = originalCommands[i];
		c1 = String(c);
		if (c1.match("|"))
		{
			c1 = c1.replace("|","  ").replace("|","  ");	
		}

		if (c1.match("label="))
		{
			c1 = c1.replace(/label=/g,"");
		}

		//Xu ly xpath
		var temp = c1.indexOf("//");
		if (temp != -1 && c1.charAt(temp-1) == " ")
		{
			c1 = c1.replace("//","xpath=//");
		}
		var str = '/html';
		if (c1.indexOf(str) != -1)
		{
			c1 = c1.replace("/html","xpath=/html");
		}
		commands.push(c1);
	}
	return commands;
}

function formatCommands(commands) {
  var result = '';
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    if (command.type == 'command') {
      var keyword = KEYWORDS[command.command];
      if(keyword == null){
      	keyword = "Call Selenium Api  " + command.command;
      }
	  var target = command.target.replace(/id=/, '');		
      result += "\t" + keyword + SEPARATOR + target + SEPARATOR + command.value + "\n";
      keyword = null;
    }
  }
  return result;
}

function formatHeader(testCase, name) {
	var header = (options.getHeader ? options.getHeader() : options.header).
		replace(/\$\{baseURL\}/g, testCase.getBaseURL()).
		replace(/\$\{([a-zA-Z0-9_]+)\}/g, function(str, name) { return options[name]; })
    + name + "\n";
	return header;
}

function CallSelenium(message, args) {
	this.message = message;
	if (args) {
		this.args = args;
	} else {
		this.args = [];
	}
}

function formatCommand(command) {
	return command;
}

this.remoteControl = true;
this.playable = false;

//Ham xu li comment
function formatComment(comment) {
    return comment.comment.replace(/.+/mg, function(str) {
            return "// " + str;
        });
}

//cai dat cac thuoc tinh hien thi tren plugin
this.options = {
	version: "v1.86",
    receiver: "",
    environment: "firefox",
    indent: "2",
    initialIndents: '2'
};

this.configForm = 
    '<description>Variable for Selenium instance</description>' +
    '<textbox id="options_receiver" />' +
    '<description>Environment</description>' +
    '<textbox id="options_environment" />' +
    '<description>Indent</description>' +
    '<menulist id="options_indent"><menupopup>' +
    '<menuitem label="Tab" value="tab"/>' +
    '<menuitem label="1 space" value="1"/>' +
    '<menuitem label="2 spaces" value="2"/>' +
    '<menuitem label="3 spaces" value="3"/>' +
    '<menuitem label="4 spaces" value="4"/>' +
    '<menuitem label="5 spaces" value="5"/>' +
    '<menuitem label="6 spaces" value="6"/>' +
    '<menuitem label="7 spaces" value="7"/>' +
    '<menuitem label="8 spaces" value="8"/>' +
    '</menupopup></menulist>';




this.name = "robotframework-testing_selenium";

options.header =
    '*** Settings ***\n' +
    'Library     Selenium2Library\n' +
    'Suite Setup    Open Browser    ${baseURL}    ${environment}\n' +
    'Suite Teardown    Close Browser\n'+
    '*** Variables ***\n' +
    '${${homepage}}' + '    ${baseURL}\n\n'+
    '*** Test Cases ***\n';

options.footer = '';
