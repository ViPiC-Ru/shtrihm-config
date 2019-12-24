/*! 0.2.6 ���������� ���� � ��������� ��������

cscript update.min.js <install> <license> <variable> <logotype> <table> <silent>

<install>	- ������������� ���� � ����� ��������� �������� ��� false ��� ��������.
<license>	- ������������� ���� � ����� �������� ��� ���� ��� false ��� ��������.
<variable>	- ������������� ���� � ����� � ����������� ��� false ��� ��������.
<logotype>	- ������������� ���� � BMP ����� �������� ��� ������ ������ ����.
<table>		- ������������� ���� � ����� ������ ��� ������� � ������� �����-�.
<silent>	- ��������� ����� ��������� ��� ��������� ������ ������������

 */

(function (wsh, undefined) {// �������� ��� �� �� ������ �������
	var value, key, list, data, name, char, command, shell, fso, stream, network, driver, item,
		node, nodes, flag, image, install, license, variable, logotype, table, template,
		dec2hex, silent = false, dLine = '\r\n', dValue = '\t', dCell = ',', error = 0;

	/**
	 * ��������� ������ ������� �� �������.
	 * @param {string} pattern - ������� ��� ����������� ������.
	 * @param {string} data - ������ � ������� ��� �����������.
	 * @returns {string} ����������� ������ � �������.
	 */

	template = function (pattern, data) {
		var list, fragments = [], delim = '|', select = '%';

		if (pattern && data) {// ���� ������� ������������ ���������
			fragments = pattern.split(delim);
			for (var iLen = fragments.length, i = iLen - 1; -1 < i; i--) {
				if (fragments[i]) {// ���� �������� �� ������
					list = fragments[i].split(select);
					if (list.length % 2) {// ���� � ������� ����������
						for (var j = 1, jLen = list.length, flag = true; j < jLen; j += 2) {
							if (list[j] in data) {// ���� ������ ��������
								list[j] = data[list[j]];
							} else flag = false;
						};
						if (flag) fragments[i] = list.join('');
						else fragments.splice(i, 1);
					} else fragments.splice(i, 1);
				} else if (i && i < iLen - 1) fragments[i] = delim;
			};
		};
		return fragments.join('');
	};

	/**
	 * ��������� ����� �� ����������� � �����������������.
	 * @param {number} dec - ����� � ���������� ������.
	 * @param {number} [length] - ����� ������������� ��������.
	 * @returns {string} ����� � ����������������� ������.
	 */

	dec2hex = function (dec, length) {
		var value, hex = '', chars = '0123456789ABCDEF';

		value = Number(dec);
		// ��������� ����� � ������ �������
		do {// ���������� ����� ����� �� ���������
			hex = chars.charAt(value % chars.length) + hex;
			value = Math.floor(value / chars.length);
		} while (value);
		// ��������� ������� ����
		while (hex.length < length) hex = chars.charAt(0) + hex;
		//���������� ���������
		return hex;
	};

	shell = new ActiveXObject('WScript.Shell');
	fso = new ActiveXObject('Scripting.FileSystemObject');
	// �������� ���� � ����� ��������� ��������
	if (!error) {// ���� ���� ������
		if (0 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(0);
			if (value && 'false' != value.toLowerCase()) {// ���� ������
				install = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� ���� � ����� �������� ��� ����
	if (!error) {// ���� ���� ������
		if (1 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(1);
			if (value && 'false' != value.toLowerCase()) {// ���� ������
				license = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� ���� � ����� ����������
	if (!error) {// ���� ���� ������
		if (2 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(2);
			if (value && 'false' != value.toLowerCase()) {// ���� ������
				variable = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� ���� � ����� ��������
	if (!error) {// ���� ���� ������
		if (3 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(3);
			if (value && 'false' != value.toLowerCase()) {// ���� ������
				logotype = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� ���� � ����� ������ ��� �������
	if (!error) {// ���� ���� ������
		if (4 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(4);
			if (value && 'false' != value.toLowerCase()) {// ���� ������
				table = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� �������� ����� ���������
	if (!error) {// ���� ���� ������
		if (5 < wsh.arguments.length) {// ���� ������� ��������
			value = wsh.arguments(5);
			silent = 'true' == value.toLowerCase();
		};
	};
	// ��������� ������� ����� ��������� ��������
	if (!error && install) {// ���� ����� ���������
		if (fso.fileExists(install)) {// ���� ���� ����������
		} else error = 1;
	};
	// ��������� ������� ����� �������� ��� ����
	if (!error && license) {// ���� ����� ���������
		if (fso.fileExists(license)) {// ���� ���� ����������
		} else error = 2;
	};
	// ��������� ������� ����� � �����������
	if (!error && variable) {// ���� ����� ���������
		if (fso.fileExists(variable)) {// ���� ���� ����������
		} else error = 3;
	};
	// ��������� ������� ����� ��������
	if (!error && logotype) {// ���� ����� ���������
		if (fso.fileExists(logotype)) {// ���� ���� ����������
		} else error = 4;
	};
	// ��������� ������� ����� ������ ��� �������
	if (!error && table) {// ���� ����� ���������
		if (fso.fileExists(table)) {// ���� ���� ����������
		} else error = 5;
	};
	// ��������� ������ ������������
	if (!silent) {// ���� ����� �������� ������ ������������
		// ���������� ��������� ��������� ������������
		if (!error) {// ���� ���� ������
			value = // ��������� ��� ������������
				'����� 2 ������ �� ��������� ����� ����������� ���������� ��� ���. ' +
				'����� ����� ������� ����� ��������� ������. ��������� ����� ��� ���� �� �����. ' +
				'��������� ����� 3 ������. ����� ����� �� ������� ��������.';
			command = 'shutdown /r /t 60 /c "' + value + '"';
			shell.run(command, 0, false);
			wsh.sleep(30 * 1000);
			command = 'shutdown /a';
			shell.run(command, 0, true);
			wsh.sleep(90 * 1000);
		};
		// ������������� ��������� ������ �������� ��������
		if (!error) {// ���� ���� ������
			command = 'taskkill /F /IM ePlus.ARMCasherNew.exe /T';
			shell.run(command, 0, true);
			wsh.sleep(2 * 1000);
		};
	};
	// ��������� �������� � ��������� ��������
	if (install) {// ���� ����� �������� �������
		// ������� ��� ������������� ������ ��������
		if (!error) {// ���� ���� ������
			value = 'all "�����" "������� ��" "" "/verysilent"';
			command = 'cscript uninstall.js ' + value;
			shell.run(command, 0, true);
		};
		// ������� ��������� ������ ������
		if (!error) {// ���� ���� ������
			list = [// ������ �������� ����� ��� ������ ��������
				{ path: 'C:\\Program Files\\SHTRIH-M', filter: 'DrvFR' },
				{ path: 'C:\\Program Files (x86)\\SHTRIH-M', filter: 'DrvFR' },
				{ path: 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\�����-�', filter: '��' }
			];
			for (var i = 0, iLen = list.length; i < iLen; i++) {
				item = list[i];// �������� ��������� �������
				if (fso.folderExists(item.path)) {// ���� ����� ����������
					node = fso.getFolder(item.path);
					nodes = new Enumerator(node.subFolders);
					while (!nodes.atEnd()) {// ���� �� ��������� ����� ������
						node = nodes.item();// �������� ��������� �������
						if (~node.name.indexOf(item.filter)) {// �������� ������ �������
							try {// ������� ������� ���������� �������
								node.Delete(true);
							} catch (e) { };
						};
						nodes.moveNext();
					};
				};
			};
		};
		// ������������� ��������� ������ ��������
		if (!error) {// ���� ���� ������
			command = '"' + install + '" /verysilent';
			value = shell.run(command, 0, true);
			if (!value) {// ���� �������� ��������� �������
			} else error = 6;
		};
	};
	// ��������� � �������������� � ������
	if (logotype || table || license) {// ���� ����� ��������������� � ������
		// ������ ������ ��� �������������� � ������
		if (!error) {// ���� ���� ������
			try {// ������� ������������ � �����
				driver = new ActiveXObject('Addin.DrvFR');
			} catch (e) { error = 7; };
		};
		// ������������ � �����
		if (!error) {// ���� ���� ������
			driver.Password = 30;
			driver.GetECRStatus();
			switch (driver.ResultCode) {
				case 0: break;				// ��� ��������
				case -1: error = 8; break;	// ��� �� ����������
				case -3: error = 9; break;	// ��� ������
				default: error = 10;		// ������ ������
			};
		};
	};
	// ��������� ��������� ��������
	if (license) {// ���� ����� ������������ ��������
		// �������� ���������� �����
		if (!error) {// ���� ���� ������
			stream = fso.openTextFile(license, 1);
			if (!stream.atEndOfStream) {// ���� ���� �� ����
				data = stream.readAll();
			} else error = 11;
			stream.close();
		};
		// ��������������� ���������� � ������
		if (!error) {// ���� ���� ������
			list = data.split(dLine);
			for (var i = 0, iLen = list.length; i < iLen; i++) {
				list[i] = list[i].split(dValue);// ��������� �������� � ������
				if (3 == list[i].length) {// �������� ������� ���������
					item = {// ������� ������
						serial: list[i][0],		// �������� �����
						license: list[i][1],	// ��������
						signature: list[i][2]	// �������
					};
					list[i] = item;
				} else list[i] = null;
			};
		};
		// ���� � ���������� ��������
		if (!error) {// ���� ���� ������
			// �������� ������� ��������� �����
			driver.ReadSerialNumber();
			if (!driver.ResultCode) {// ���� ������ ��������
				flag = false;// ������������ �� ��������
				for (var i = 0, iLen = list.length; i < iLen && !error; i++) {
					item = list[i];// �������� ��������� ������
					if (item && driver.SerialNumber == item.serial) {// ���� ������� ��������
						driver.License = item.license;
						driver.DigitalSign = item.signature;
						// ���������� �������� �� �����
						driver.WriteFeatureLicenses();
						if (!driver.ResultCode) {// ���� �������� ������������
							flag = true;// �������� ������������
						} else error = 13;
					};
				};
			} else error = 12;
		};
		// ��������� ������������ �� ��������
		if (!error) {// ���� ���� ������
			if (flag) {// ���� �������� ������������
			} else error = 14;
		};
	};
	// �������� �������� ���������� �� �����
	if (variable) {// ���� ����� ��������� ����������
		// �������� ��� ��������� ��� ������ ����������
		if (!error) {// ���� ���� ������
			network = new ActiveXObject('WScript.Network');
			name = network.computerName.toLowerCase();
		};
		// �������� ���������� �����
		if (!error) {// ���� ���� ������
			stream = fso.openTextFile(variable, 1);
			if (!stream.atEndOfStream) {// ���� ���� �� ����
				data = stream.readAll();
			} else error = 15;
			stream.close();
			variable = null;
		};
		// ��������������� ���������� � ������
		if (!error) {// ���� ���� ������
			list = data.split(dLine);
			flag = false;// ������� �� ���������� ��� ����� ����������
			for (var i = 0, iLen = list.length; i < iLen && !flag; i++) {
				list[i] = list[i].split(dValue);// ��������� �������� � ������
				if (i) {// ���� ��� ������ � �������
					item = {};// ������� ������
					// ��������� ������� ������ �� ������ �� ������ ������
					for (var j = 0, jLen = list[0].length; j < jLen; j++) {
						key = list[0][j];// �������� ��������� ����
						value = list[i][j];// �������� ��������� ��������
						if (!j && value) value = value.toLowerCase();
						if (key && value) item[key] = value;
					};
					// ���������� ������� ������
					if (!name.indexOf(item.name)) {// ���� ������� ����������
						variable = item;// ��������� ����������
						flag = true;// ���������� �������
					};
				};
			};
		};
	};
	// ��������� ������� � �����
	if (logotype) {// ���� ����� ���������
		// �������� ������ ��������
		if (!error) {// ���� ���� ������
			image = new ActiveXObject('WIA.ImageFile');
			image.loadFile(logotype);// ������ ����
			list = [];// ������ �������� ��� ������
			for (var y = 0, yLen = 128; y < yLen; y++) {// ������
				for (var x = 0, xLen = 512; x < xLen; x++) {// ������
					// ��������� �������� �������
					if (x < image.width && y < image.height) {// ���� ���� ������
						value = image.ARGBData(x + y * image.width + 1);
						value = -16777216 == value ? 1 : 0;// ������ ����
					} else value = 0;
					// ��������� ������ 8 ��������
					char = x % 8 ? char : 0;
					char += value ? Math.pow(2, x % 8) : 0;
					if (7 == x % 8) list.push(dec2hex(char, 2));
				};
			};
		};
		// ��������� �����������
		if (!error) {// ���� ���� ������
			driver.LineNumber = 0;
			driver.LineDataHex = list.join(' ');
			driver.WideLoadLineData();
			if (!driver.ResultCode) {// ���� ����������� ���������
			} else error = 15;
		};
	};
	// ��������� ������ � �������
	if (table) {// ���� ����� ���������
		// �������� ���������� �����
		if (!error) {// ���� ���� ������
			stream = fso.openTextFile(table, 1, false, -1);
			if (!stream.atEndOfStream) {// ���� ���� �� ����
				data = stream.readAll();
			} else error = 16;
			stream.close();
		};
		// ��������������� ���������� � ������
		if (!error) {// ���� ���� ������
			list = data.split(dLine);
			for (var i = 0, iLen = list.length; i < iLen; i++) {
				value = list[i];// ��������� �������� ������
				list[i] = list[i].split(dCell);// ��������� �������� � ������
				if (list[i].length > 3 && value.indexOf('//')) {
					value = value.split("','")[1] || '';
					value = value.substr(0, value.length - 1);
					value = template(value, variable || {});
					item = {// ������� ������
						table: list[i][0],	// �������
						row: list[i][1],	// ���
						field: list[i][2],	// ����
						value: value		// ��������
					};
					list[i] = item;
				} else list[i] = null;
			};
		};
		// ��������� ������ �������� ������
		if (!error) {// ���� ���� ������
			for (var i = 0, iLen = list.length; i < iLen; i++) {
				item = list[i];// �������� ��������� ������
				// ������ ������� �������� � �������
				if (item) {// ���� �� ������ ������ �������
					driver.TableNumber = item.table;
					driver.RowNumber = item.row;
					driver.FieldNumber = item.field;
					driver.GetFieldStruct();
					if (!driver.ResultCode) {// ���� ������ ��������
						driver.ReadTable();// �������� ������
						if (!driver.ResultCode) {// ���� ������ ��������
							if (driver.FieldType) value = driver.ValueOfFieldString;
							else value = driver.ValueOfFieldInteger;
							if (value != item.value) {// ���� ����� �������� ������
								// �������� �������� � �������
								if (driver.FieldType) driver.ValueOfFieldString = item.value;
								else driver.ValueOfFieldInteger = item.value;
								driver.WriteTable();// �������� ������
							};
						};
					};
				};
			};
		};
	};
	// ������������ ������ ������������
	if (!silent) {// ���� ����� ����������� ������ ������������
		// ���������� �������� ��������� ������������
		value = '��������� ���������� ��� ��� ���������. ������ ���������� ������.';
		command = 'shutdown /r /t 60 /c "' + value + '"';
		shell.run(command, 0, false);
		wsh.sleep(30 * 1000);
		command = 'shutdown /a';
		shell.run(command, 0, true);
	};
	// ��������� �������� �����
	wsh.quit(error);
})(WSH);