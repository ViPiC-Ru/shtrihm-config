/*! 0.2.1 ���������� ���� � ����� �� ������ ���

cscript update.min.js [[[<install>] <config>] <license>]

<install>	- ������������� ���� � ����� ��������� �������� ��� false ��� ��������.
<config>	- true ���� ����� ������ ��������� � ��������� ����� ��� false ��� ��������.
<license>	- ������������� ���� � ����� �������� ��� ���� ��� false ��� ��������.

 */

(function(wsh, undefined){// �������� ��� �� �� ������ �������
	var list, value, command, shell, fso, ts, driver, item, node, nodes, flag,
		install, license, config = null, isConnect = null, isSilent = true,
		dLine = '\r\n', dValue = '\t', error = 0;
	
	shell = new ActiveXObject('WScript.Shell');
	fso = new ActiveXObject('Scripting.FileSystemObject'); 
	// �������� ���� � ����� ��������� ��������
	if(!error){// ���� ���� ������
		if(0 < wsh.arguments.length){// ���� ������� ��������
			value = wsh.arguments(0);
			if(value && 'false' != value.toLowerCase()){// ���� ������
				install = fso.getAbsolutePathName(value);
			};
		};
	};
	// �������� ���� ��� ��������� ��������� �����
	if(!error){// ���� ���� ������
		if(1 < wsh.arguments.length){// ���� ������� ��������
			value = wsh.arguments(1);
			config = 'true' == value.toLowerCase();
		};
	};
	// �������� ���� � ����� �������� ��� ����
	if(!error){// ���� ���� ������
		if(2 < wsh.arguments.length){// ���� ������� ��������
			value = wsh.arguments(2);
			if(value && 'false' != value.toLowerCase()){// ���� ������
				license = fso.getAbsolutePathName(value);
			};
		};
	};
	// ��������� ������� ����� ��������� ��������
	if(!error && install){// ���� ����� ���������
		if(fso.fileExists(install)){// ���� ���� ����������
		}else error = 1;
	};
	// ��������� ������� ����� �������� ��� ����
	if(!error && license){// ���� ����� ���������
		if(fso.fileExists(license)){// ���� ���� ����������
		}else error = 2;
	};
	// ��������� ��������������� ����������
	if(!error){// ���� ���� ������
		isSilent = !install && !config && !license;
	};
	// ���������� ��������� ��������� ������������
	if(!isSilent){// ���� ����� ���������
		value = // ��������� ��� ������������
			'����� ������ �� ��������� ����� ����������� ���������� ��� ���. ' +
			'����� ����� ������� ����� ��������� ������. ��������� ����� ��� ���� �� �����. ' +
			'��������� ����� ��� ������. ����� ����� �� ������� ��������.';
		command = 'shutdown /r /t 60 /c "' + value  + '"';
		shell.run(command, 0, false);
		wsh.sleep(30 * 1000);
		command = 'shutdown /a';
		shell.run(command, 0, true);
	};	
	// ������������� ��������� ������ �������� ��������
	if(!error && !isSilent){// ���� ����� ���������
		command = 'taskkill /F /IM ePlus.ARMCasherNew.exe /T';
		shell.run(command, 0, true);
		wsh.sleep(2 * 1000);
	};
	// ��������� �������� � ��������� ��������
	if(install){// ���� ����� �������� �������
		// ������� ��� ������������� ������ ��������
		if(!error){// ���� ���� ������
			value = 'all "�����" "������� ��" "" "/verysilent"';
			command = 'cscript uninstall.js ' + value;
			shell.run(command, 0, true);
		};
		// ������� ��������� ������ ������
		if(!error){// ���� ���� ������
			list = [// ������ �������� ����� ��� ������ ��������
				{path: 'C:\\Program Files\\SHTRIH-M', filter: 'DrvFR'},
				{path: 'C:\\Program Files (x86)\\SHTRIH-M', filter: 'DrvFR'},
				{path: 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\�����-�', filter: '��'}
			];
			for(var i = 0, iLen = list.length; i < iLen && !error; i++){
				item = list[i];// �������� ��������� �������
				if(fso.folderExists(item.path)){// ���� ����� ����������
					node = fso.getFolder(item.path);
					nodes = new Enumerator(node.subFolders);
					while(!nodes.atEnd()){// ���� �� ��������� ����� ������
						node = nodes.item();// �������� ��������� �������
						if(~node.name.indexOf(item.filter)){// �������� ������ �������
							try{// ������� ������� ���������� �������
								node.Delete(true);
							}catch(e){};
						};
						nodes.moveNext();
					};
				};
			};
		};
		// ������������� ��������� ������ ��������
		if(!error){// ���� ���� ������
			command = '"' + install + '" /verysilent';
			value = shell.run(command, 0, true);
			if(!value){// ���� �������� ��������� �������
			}else error = 3;
		};
	};
	// ��������� � �������������� � ������
	if(config || license){// ���� ����� ��������������� � ������
		// ������ ������ ��� �������������� � ������
		if(!error){// ���� ���� ������
			try{// ������� ������������ � �����
				driver = new ActiveXObject('Addin.DrvFR');
			}catch(e){error = 4;};
		};
		// ������������ � �����
		if(!error){// ���� ���� ������
			driver.Password = 30;
			driver.GetECRStatus();
			isConnect = false;
			switch(driver.ResultCode){
				case  0: isConnect = true; break;	// ��� ��������
				case -1: break;						// ��� �� ����������
				case -3: error = 5; break;			// ��� ������
				default: error = 6;					// ������ ������
			};
		};
	};
	// �������� ������ � ������� �����
	if(!error && config && isConnect){// ���� ����� ���������
		driver.Password = 30;
		list = [// ���������� ���� �������
			// ��� � ����� �����
			{table:  1, row: 1, field:  7, value: 2},// ������� ����
			// ������� �����
			{table: 16, row: 1, field:  1, value: 0},// static ip
			// ������������ ���������
			{table: 17, row: 1, field:  3, value: 2},// ����� ���������� ������
			{table: 17, row: 1, field: 10, value: 1},// ������ ���������� ��� � �����
			{table: 17, row: 1, field: 12, value: 7},// ������ ���������� ������������
			{table: 17, row: 1, field: 17, value: 2},// ������ ��
			// fiscal storage
			{table: 18, row: 1, field:  7, value: '��� �� "���������������"'},// user
			// ��������� ���������� � �����������������
			{table: 23, row: 1, field:  1, value: 1},// �������� � �������� ���
			{table: 23, row: 1, field:  5, value: 1},// ��������� ��������������
			{table: 23, row: 1, field:  6, value: 1} // ����������� ����������
		];
		for(var i = 0, iLen = list.length; i < iLen && !error; i++){
			item =  list[i];// �������� ��������� ������
			// ������ ������� �������� � �������
			driver.TableNumber = item.table;
			driver.RowNumber = item.row;
			driver.FieldNumber = item.field;
			driver.GetFieldStruct();
			if(!driver.ResultCode){// ���� ������ ��������
				driver.ReadTable();// �������� ������
				if(!driver.ResultCode){// ���� ������ ��������
					if(driver.FieldType) value = driver.ValueOfFieldString;
					else value = driver.ValueOfFieldInteger;
					if(value != item.value){// ���� ����� �������� ������
						// �������� �������� � �������
						if(driver.FieldType) driver.ValueOfFieldString = item.value;
						else driver.ValueOfFieldInteger = item.value;
						driver.WriteTable();// �������� ������
						if(!driver.ResultCode){// ���� ������ ��������
						}else error = 9;
					};
				}else error = 8;
			}else error = 7;
		};
	};
	// ��������� ������� �� ��������� ��������
	if(license){// ���� ����� ������������ ��������
		// �������� ���������� ����� ��������
		if(!error){// ���� ���� ������
			ts = fso.openTextFile(license, 1);
			if(!ts.atEndOfStream){// ���� ���� �� ����
				value = ts.readAll();
			}else error = 10;
			ts.close();
		};
		// ��������������� ���������� � ������ ��������
		if(!error){// ���� ���� ������
			list = value.split(dLine);
			for(var i = 0, iLen = list.length; i < iLen && !error; i++){
				list[i] = list[i].split(dValue);
				if(3 == list[i].length){// �������� ������� ���������
					item = {// ������� ������
						serial: list[i][0],		// �������� �����
						license: list[i][1],	// ��������
						signature: list[i][2]	// �������
					};
					list[i] = item;
				};				
			};
		};
		// ���� � ���������� ��������
		if(!error){// ���� ���� ������
			driver.Password = 30;
			// �������� ������� ��������� �����
			driver.ReadSerialNumber();
			if(!driver.ResultCode){// ���� ������ ��������
				flag = false;// ������������ �� ��������
				for(var i = 0, iLen = list.length; i < iLen && !error; i++){
					item =  list[i];// �������� ��������� ������
					if(driver.SerialNumber == item.serial){// ���� ������� ��������
						driver.License = item.license;
						driver.DigitalSign = item.signature;
						// ���������� �������� �� �����
						driver.WriteFeatureLicenses();
						if(!driver.ResultCode){// ���� �������� ������������
							flag = true;// �������� ������������
						}else error = 12;
					};
				};
			}else error = 11;
		};
		// ��������� ������������ �� ��������
		if(!error){// ���� ���� ������
			if(flag){// ���� �������� ������������
			}else error = 13;
		};
	};
	// ���������� �������� ��������� ������������
	if(!isSilent){// ���� ����� ���������
		value = // �������� ��������� ��� ������������
			'��������� ���������� ���������. ������ ���������� ������.';
		if(config) value += ' ' + // �������������� ��������� ��� ������������
			'������� ����� �������� �����, �������� ����� ��������� ������, ' +
			'�� �� ���������� ��� ���������� �������, �� ���� ����� ����������� ����������. ' + 
			'�� ��������� ������� ����, ����� �������� �����, ����� ������ ������� ' +
			'���������� ������� �������� � ����� ��������� ������, �.�. ����� ��������� ��������� ' +
			'��� �������� ���������. ��� ������������� ���������� �������� ������ � �� �����.';
		command = 'shutdown /r /t 60 /c "' + value  + '"';
		shell.run(command, 0, false);
		wsh.sleep(45 * 1000);
		command = 'shutdown /a';
		shell.run(command, 0, true);
	};	
	// ��������� �������� �����
	wsh.quit(error);
})(WSH);