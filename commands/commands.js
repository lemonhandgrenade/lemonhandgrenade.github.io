help = {
	"name": "help",
	"description": "Provides Help information for commands.",
	"helpTitle": "help <Command>",
	"helpDescription": "Command - displays help information on that command.",
	"run": runHelp
}

echo = {
	"name": "echo",
	"description": "Displays messages.",
	"helpTitle": "echo <Message>",
	"helpDescription": "Message - displays text entered.",
	"run": runEcho
}

title = {
	"name": "title",
	"description": "Sets the tab title for session.",
	"helpTitle": "title <string>",
	"helpDescription": "string - Specifies the title for the tab.",
	"run": runTitle
}



commandList = [
	echo,
	help,
	title
]

function runHelp(term, args) {
	if (args.length == 0){
		term.write("\n\rFor more information on a specific command, type HELP command-name\n\r")
		for (i = 0; i < commandList.length; i++){
			term.writeln('    ' + commandList[i].name + '    ' + commandList[i].description);
		}
	} else if (args[0] == '/?') {
		term.write("\n\r" + help.helpTitle)
		term.write("\n\r    " + help.helpDescription)
	} else {
		foundCommand = false;
		for (i = 0; i < commandList.length; i++){
			if (commandList[i].name == args[0]){
				foundCommand = true;
				term.write("\n\r" + commandList[i].helpTitle)
				term.write("\n\r    " + commandList[i].helpDescription)
			}
		}
		if (!foundCommand) {
			term.write("\n\rThis command is not supported by the help utility.  Try \"" + args[0] + " /?\".")
		}
	}
}

function runEcho(term, args) {
	if (args.length == 0){
		term.write("\n\rPlease supply an argument to echo.\n\r")
	} else if (args[0] == '/?') {
		term.write("\n\r" + echo.helpTitle)
		term.write("\n\r    " + echo.helpDescription)
	} else {
		var text = "";
		for (i = 0; i < args.length; i++)
			text += args[i] + " ";
		term.write("\n\r" + text)
	}
}

function runTitle(term, args, document) {
	if (args.length == 0){
		term.write("\n\rPlease supply an argument to set the title as.\n\r")
	} else if (args[0] == '/?') {
		term.write("\n\r" + title.helpTitle)
		term.write("\n\r    " + title.helpDescription)
	} else {
		var text = "";
		for (i = 0; i < args.length; i++)
			text += args[i] + " ";
		term.write("\n\rTitle set to: " + text);
		document.title = text;
	}
}