/*! 0.1.2 �������� �������� �������� ��� ������� �� �����������

cscript uninstall.js [<host>] <type> <author> <name> <version> [<command>]

<host>		- ��� ���������� ������� � \\ ��� ������ � �������� �����������
<type>		- ��� ����������� �������� x86, x64, native, computer, user ��� all
<author>	- ������������������� ����� ������ ��������� ��� ���������� ������
<name>		- ������������������� ����� �������� ��������� ��� ���������� ������
<version>	- ������������������� ����� ������ ��������� ��� ���������� ������
<command>	- �������� ������� ������������ � ������ �������� ��������� ��� ���������
			  ���� �� �������� ���� ��������, �� ����� ���������� ������ �����������
			  �������� ����� ���� �������� ��� �������� ���� ��������. ����� �����
			  ������ ������� ��������� �� ����� ��������� print ��� csv.

 */

(function(wsh, undefined){// �������� ��� �� �� ������ �������
	var method, param, item, items, key, keys, value, flag, count, unit, data,
		response, node, nodes, branch, branches, locator, service, registry,
		command, type = 'all', host = '', name = '', version = '',
		author = '', title = '', list = [], split = '\r\n',
		delim = ';', timeout = 1000, error = 0;
	
	// �������� ��������� �� ���������� ������
	if(!error){// ���� ���� ������
		for(var i = 0, iLen = wsh.arguments.length; i < iLen; i++){
			value = wsh.arguments(i);// �������� ��������� ��������
			switch(i){// �������������� ��������� ���������� ������
				case 0:// ��� ��������� ����������
					flag = !value.indexOf('\\\\');
					if(flag) host = value.substr(2);
					else type = value;
					break;
				case 1:// ��� ����������� ��������
					if(flag) type = value;
					else author = value;
					break;
				case 2:// �������� ���������
					if(flag) author = value;
					else name = value;
					break;
				case 3:// ������ ���������
					if(flag) name = value;
					else version = value;
					break;
				case 4:// ����� ���������
					if(flag) version = value;
					else command = value;
					break;
				case 5:// �������� ��������
					command = value;
					break;
			};
		};
	};
	// �������� ������ ��� ������� � ������� ����� wmi
	if(!error){// ���� ���� ������
		try{// ������� ������������ � ����������
			locator = new ActiveXObject('wbemScripting.Swbemlocator');
			locator.security_.impersonationLevel = 3;
			service = locator.connectServer(host, 'root\\CIMV2');
			execution = service.get('Win32_Process');// �������� ������ ���������
			registry = locator.connectServer(host, 'root\\default').get('stdRegProv');
		}catch(e){error = 1;};
	};
	// ���������� ��� ���������� � ����������� �������
	if(!error){// ���� ���� ������
		response = service.execQuery(
			"SELECT systemType, dnsHostName\
			 FROM Win32_ComputerSystem"
		);
		items = new Enumerator(response);
		for(count = 0; !items.atEnd(); items.moveNext()){// ����������� �� ���������
			item = items.item();// �������� ��������� ������� ���������
			if(item.dnsHostName) title = item.dnsHostName;
			flag = item.systemType && ~item.systemType.indexOf('64');
			count++;// ����������� ������� ���������
			// ��������������� �� ������ ��������
			break;
		};
		if(count){// ���� ���� ��������
		}else error = 2;
	};
	// ��������� ������ ����� ������� ��� ��������
	if(!error){// ���� ���� ������
		data = {// ����� �������
			nat: {// �������� � �������� �������
				root: 0x80000002,// HKEY_LOCAL_MACHINE
				path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
			},
			x86: {// �������� � x86 �������
				root: 0x80000002,// HKEY_LOCAL_MACHINE
				path: 'SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
			},
			usr: {// �������� � ������� ������������
				root: 0x80000001,// HKEY_CURRENT_USER
				path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall'
			}
		};
		switch(type){// �������������� ����
			case 'x64':// 64 ���������
				nodes = flag ? [data['nat']] : [];
				break;
			case 'x86':// 32 ���������
				nodes = !flag ? [data['nat']] : [data['x86']];
				break;
			case 'native':// ����������� �������
				nodes = [data['nat']];
				break;
			case 'computer':// ���������
				nodes = [data['nat'], data['x86']];
				break;
			case 'user':// ������������
				nodes = [data['usr']];
				break;
			case 'all':// ���
				nodes = [data['nat'], data['x86'], data['usr']];
				break;
			default:// ������ ��������
				error = 3;
		};
	};
	// ��������� ������ ��������
	if(!error){// ���� ���� ������
		for(var i = 0, iLen = nodes.length; i < iLen; i++){// ����������� �� ������
			node = nodes[i];// �������� ��������� �������
			// �������� ������ �������� �����
			method = registry.methods_.item('EnumKey');
			param = method.inParameters.spawnInstance_();
			param.hDefKey = node.root;
			param.sSubKeyName = node.path;
			try{// ������� �������� ������ ����� �������
				item = registry.execMethod_(method.name, param); 
			}catch(e){continue;};
			if(!item.returnValue){// ���� ������� �������� ������ ��������
				try{// ������� �������� ������ ��� ����� �������
					branches = item.sNames.toArray();
				}catch(e){continue;};
				for(var j = 0, jLen = branches.length; j < jLen; j++){// ����������� �� ������
					branch = branches[j];// �������� ��������� ������� �� ������
					// ��������� �������� ������ �� ����������������
					flag = true;// ������� ������������� ��������� ������
					unit = {title: title, author: author, name: name, version: version, uninstall: ''};
					data = {name: 'DisplayName', author: 'Publisher', version: 'DisplayVersion', uninstall: 'UninstallString'};
					for(var key in data){// ����������� �� ����������� ������
						if(flag){// ���� ���������� ��������� ��������
							value = unit[key].toLowerCase();// ��������������� ��������
							method = registry.methods_.item('GetStringValue');
							param = method.inParameters.spawnInstance_();
							param.hDefKey = node.root;
							param.sSubKeyName = node.path + '\\' + branch;
							param.sValueName = data[key];
							item = registry.execMethod_(method.name, param); 
							if(!item.returnValue && item.sValue){// ���� ������� �������� ��������
								if(value && !~item.sValue.toLowerCase().indexOf(value)) flag = false;
								unit[key] = item.sValue;// ��������� ��������
							}else if(value) flag = false;
						}else break;
					};
					// ������������ ������� �� ��������
					if(flag && unit.uninstall){// ���� ����� ���������
						// ��������� ������� �����
						value = unit.uninstall;
						value = value.replace(/\\/g, '\\\\');
						value = value.replace(/'/g, '"');
						response = service.execQuery(
							"SELECT name\
							 FROM CIM_DataFile\
							 WHERE name = '" + value + "'"
						);
						items = new Enumerator(response);
						for(count = 0; !items.atEnd(); items.moveNext()){// ����������� �� ���������
							item = items.item();// �������� ��������� ������� ���������
							unit.uninstall = '"' + unit.uninstall + '"'; 
							count++;// ����������� ������� ���������
							// ��������������� �� ������ ��������
							break;
						};
						// ���������� ������ ��������
						if(!count){// ���� ��� �������� �� ��������
							value = unit.uninstall;
							value = value.replace('/I{', '/X{');// �������� ��� msi
							unit.uninstall = value;
						};
					};
					// ��������� ��������� � ������
					if(flag) list.push(unit);
				};
			};
		};
	};
	// ��������� �������� ��� ������� ��������
	if(!error){// ���� ���� ������
		switch(command){// �������������� �������
			case 'print':// ������� ������� ������ ��������
				items = [];// ������ ������� ������
				for(var i = 0, iLen = list.length; i < iLen; i++){// ����������� �� ������
					unit = list[i];// �������� ��������� ������� �� ������
					if(unit.name){// ���� ���� �������� ���������
						value = unit.version ? unit.name + ' ' + unit.version : unit.name;
						items.push(value);
					};
				};
				value = items.join(split);
				if(value) wsh.echo(value);
				break;
			case 'csv':// ������� ��������������� ������ ��������
				items = [];// ������ ������� ������
				for(var i = 0, iLen = list.length; i < iLen; i++){// ����������� �� ������
					unit = list[i];// �������� ��������� ������� �� ������
					nodes = [];// ������ ��������� ������ ������
					for(var key in unit){// ����������� �� ������
						value = unit[key];// �������� ��������� ������� �� ������
						value = value.split(delim).join(' ');
						nodes.push(value);
					};
					value = nodes.join(delim);
					items.push(value);
				};
				value = items.join(split);
				if(value) wsh.echo(value);
				break;
			case undefined:// �� ��������� ��������
				break;
			default:// ��������� ��������
				for(var i = 0, iLen = list.length; i < iLen; i++){// ����������� �� ������
					unit = list[i];// �������� ��������� ������� �� ������
					value = command ? unit.uninstall + ' ' + command : unit.uninstall;
					method = execution.methods_.item('Create');
					param = method.inParameters.spawnInstance_();
					param.CommandLine = value;
					item = execution.execMethod_(method.name, param); 
					if(item.processId){// ���� ������� ��������� ����������
						value = item.processId;// ��������� �������������
						do{// ������� ���������� ����������� ��������
							response = service.execQuery(
								"SELECT handle\
								 FROM Win32_Process\
								 WHERE handle = '" + value + "'\
								 OR parentProcessId = '" + value + "'"
							);
							items = new Enumerator(response);
							for(count = 0; !items.atEnd(); items.moveNext()){// ����������� �� ���������
								item = items.item();// �������� ��������� ������� ���������
								if(item.handle && value != item.handle) value = item.handle;
								wsh.sleep(timeout);// ������� ����� ����� ����������
								count++;// ����������� ������� ���������
								// ��������������� �� ������ ��������
								break;
							};
						}while(count);
					};
				};
				break;
		};
	};
	// ��������� �������� �����
	wsh.quit(list.length);
})(WSH);