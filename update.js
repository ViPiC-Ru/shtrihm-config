/*! 0.1.1 ���������� ���� � ����� �� ������ ��� */

(function(wsh, undefined){// �������� ��� �� �� ������ �������
	var list, value, command, shell, driver, item, flag, error = 0;
	
	shell = new ActiveXObject('WScript.Shell');
	// ���������� ��������� ������������
	value = // ��������� ��� ������������
		'����� ������ �� ��������� ����� ����������� ���������� ��� ���. ' +
		'����� ����� ������� ����� ��������� ������. ��������� ����� ��� ���� �� �����. ' +
		'��������� ����� ��� ������. ����� ����� �� ������� ��������.';
	command = 'shutdown /r /t 60 /c "' + value  + '"';
	shell.run(command, 0, false);
	wsh.sleep(30 * 1000);
	command = 'shutdown /a';
	shell.run(command, 0, true);
	// ������������� ��������� ������ �������� ��������
	if(!error){// ���� ���� ������
		command = 'taskkill /F /IM ePlus.ARMCasherNew.exe /T';
		shell.run(command, 0, true);
	};
	// ������� ��� ������������� ������ ��������
	if(!error){// ���� ���� ������
		value = 'all "�����" "������� ��" "" "/verysilent"';
		command = 'cscript uninstall.js ' + value;
		shell.run(command, 0, true);
	};
	// ������������� ��������� ������ ��������
	if(!error){// ���� ���� ������
		command = 'driver.exe /verysilent';
		value = shell.run(command, 0, true);
		if(!value){// ���� �������� ��������� �������
		}else error = 1;
	};
	// ������ ������ ��� �������������� � ������
	if(!error){// ���� ���� ������
		try{// ������� ������������ � �����
			driver = new ActiveXObject('Addin.DrvFR');
		}catch(e){error = 2;};
	};
	// ������������ � �����
	if(!error){// ���� ���� ������
		driver.Password = 30;
		driver.GetECRStatus();
		switch(driver.ResultCode){
			case  0: flag = true; break;	// ��� ��������
			case -1: flag = false; break;	// ��� �� ����������
			case -3: error = 3; break;		// ��� ������
			default: error = 4;				// ������ ������
		};
	};
	// �������� ������ � ������� �����
	if(!error && flag){// ���� ����� ���������
		driver.Password = 30;
		list = [// ���������� ���� �������
			// ������������ ���������
			{table: 17, row: 1, field:  3, value: 2},// ����� ���������� ������
			{table: 17, row: 1, field: 10, value: 1},// ������ ���������� ��� � �����
			{table: 17, row: 1, field: 12, value: 7},// ������ ���������� ������������
			{table: 17, row: 1, field: 17, value: 2},// ������ ��
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
						}else error = 7;
					};
				}else error = 6;
			}else error = 5;
		};
	};
	// ���������� ��������� ������������
	value = // ��������� ��� ������������
		'��������� ���������� ���������. ������ ���������� ������. ������� ����� �������� �����, ' +
		'�������� ����� ��������� ������, �� �� ���������� ��� ���������� �������, �� ���� ����� ����������� ����������. ' +
		'�� ��������� ������� ���� �� �������� ����� ��������� � �� �����.';
	command = 'shutdown /r /t 60 /c "' + value  + '"';
	shell.run(command, 0, false);
	wsh.sleep(30 * 1000);
	command = 'shutdown /a';
	shell.run(command, 0, true);
	// ��������� �������� �����
	wsh.quit(error);
})(WSH);