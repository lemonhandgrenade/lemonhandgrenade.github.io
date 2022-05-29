input = document.getElementById('input')
dropdown = document.getElementById('lang-select')

switch (Math.floor(Math.random() * 8)) {
	case 0:
		dropdown.selectedIndex = 0;
		document.getElementById("codeout").className = `language-c`;
		input.innerHTML = '#include <stdio.h>\n\nint add(int a, int b) {\n\treturn a + b;\n}\n\nint main() {\n\tint a = 5;\n\tint b = 15;\n\n\tprintf("%d", add(a, b)); // 20\n\treturn 0;\n}';
		break;
	case 1:
		dropdown.selectedIndex = 1;
		document.getElementById("codeout").className = `language-cpp`;
		input.innerHTML = '#include <iostream>\n\nint add(int a, int b) {\n\treturn a + b;\n}\n\nint main() {\n\tint a = 5;\n\tint b = 15;\n\n\tstd::cout << add(a, b); // 20\n\treturn 0;\n}';
		break;
	case 2:
		dropdown.selectedIndex = 2;
		document.getElementById("codeout").className = `language-css`;
		input.innerHTML = '* {\n\tfont-family: "Consolas", Times, serif;\n\tfont-size: 12px;\n}\n\nbody {\n\tbackground-color: #505050;\n}\n\n#id {\n\ttext-align: center;\n}';
		break;
	case 3:
		dropdown.selectedIndex = 3;
		document.getElementById("codeout").className = `language-html`;
		input.innerHTML = '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<title>Test</title>\n</head>\n<body>\n\t<script>\n\t\tlet a = 5;\n\t\tlet b = 15;\n\n\t\tconsole.log(a + b); // 20\n\t</script>\n</body>\n</html>';
		break;
	case 4:
		dropdown.selectedIndex = 4;
		document.getElementById("codeout").className = `language-java`;
		input.innerHTML = 'class Main {\n\tpublic static int add(int a, int b) {\n\t\treturn a + b;\n\t}\n\tpublic static void main(String[] args) {\n\t\tint a = 5;\n\t\tint b = 15;\n\t\tSystem.out.println(add(a, b)); // 20\n\t}\n}';
		break;
	case 5:
		dropdown.selectedIndex = 5;
		document.getElementById("codeout").className = `language-js`;
		input.innerHTML = 'let a = 5;\nlet b = 15;\n\nfunction add(a, b) {\n\treturn a + b;\n}\n\nconsole.log(add(a, b)); // 20\n';
		break;
	case 6:
		dropdown.selectedIndex = 6;
		document.getElementById("codeout").className = `language-md`;
		input.innerHTML = '# Heading\n**This is bold text**\n__This is bold text__\n*This is italic text*\n_This is italic text_\n~~Strikethrough~~';
		break;
	case 7:
		dropdown.selectedIndex = 7;
		document.getElementById("codeout").className = `language-py`;
		input.innerHTML = 'def add(a, b):\n\treturn a + b\n\na = 5\nb = 15\n\nprint(add(a,b)) # 20';
		break;
	default:
		break
}

(function() {
	var refreshPreview;

	refreshPreview = function() {
		var preview;
		preview = $(".preview pre code");
		preview.text($("textarea").val());
		return hljs.highlightElement(preview[0]);
	};

	$(function() {
		var ta;
		ta = $("textarea");
		ta.on("input", function() {
			return refreshPreview();
		});
		return refreshPreview();
	});

	hljs.highlightAll();
}).call(this);

document.getElementById('input').addEventListener('keydown', function(e) {
	if (e.key == 'Tab') {
		e.preventDefault();
		var start = this.selectionStart;
		var end = this.selectionEnd;

		this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);  
		this.selectionStart = this.selectionEnd = start + 1;
	}
});

document.getElementById('lang-select').addEventListener('change', function(e) {
	document.getElementById("codeout").className = `language-${this.options[this.selectedIndex].value}`;
	hljs.highlightAll()
});