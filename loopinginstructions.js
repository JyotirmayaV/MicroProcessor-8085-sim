
	function JUMP(instruction)
	{
		//36 for JUMP
		var address = HextoDec(instruction.substring(0,4));
		var PCcounter = 0 ;
		for(var i = 1;i<26;i++)
		{
			console.log("i am in for looop of jump with i : "+i);
			var addnet = document.getElementById("table1").rows[i].cells[0].innerHTML;
			var addfirst = HextoDec(addnet.substring(0,4));
			console.log(addfirst);
			if(addfirst == address)
			{
				console.log("if success");
				console.log("address : "+address);
				console.log("PCcounter : "+addfirst);
				PCcounter = i;
				break;
			}
		}//found position of conter at address given
		var opcode = document.getElementById(idnumbera).value ;
		var f = 0;
		if(opcode == "JC")
		{
			if(flags[7] == 1)
				f = 1;
		}
		else if(opcode == "JNC")
		{
			if(flags[7] == 0)
				f = 1;
		}
		else if(opcode == "JZ")
		{
			if(flags[1] == 1)
				f = 1;
		}
		else if(opcode == "JNZ")
		{
			if(flags[1] == 0)
				f = 1;
		}
		else if(opcode == "JPE")
		{
			if(flags[5] == 0)
				f = 1;
		}
		else if(opcode == "JPO")
		{
			if(flags[5] == 1)
				f = 1;
		}
		else if(opcode == "JP")
		{
			if(flags[0] == 0)
				f = 1;
		}
		else if(opcode == "JM")
		{
			if(flags[0] == 1)
				f = 1;
		}
		else f = 1;  //the case for simple JUMP
		if(f == 1)
		{
			if(PCcounter == 0)
			{
				specialcounter = 0;
				setpc();
				alert("The function where the jump will take place was not available in the previous addresses.So shifted address accordingly.Press Step Into after 0K to continue execution.");
			}
			else
			{
				specialcounter = PCcounter ; //special variable for settimg flow
			}
			console.log("We are all ready to jump in next Step Into.value of new counter will be : "+specialcounter);
		}
		else console.log("JUMP unsuccessful");

	}//CLOSING OF jump instruction

	function PUSHPOP(registerpair)
	{
		//19 for PUSH
		//20 for POP
		var regindex = match(registerpair) ;
		var PSW = "";
		if(registerpair == "PSW");
		{
			for(var i = 0;i<8;i++)
				PSW = PSW + flags[i];
			PSW = BinarytoHex(PSW);
		}
		if(choice == 19)
		{
			console.log("PUSH ready");
			var SP = HextoDec(registers[7]) ;
			SP = SP -1;
			if(SP < 0)
				SP += 65536;
			memory[SP] = " "+registers[regindex] ;
			console.log("at SP "+DectoHex(SP)+" DATA is : "+registers[regindex]);
			SP = SP -1;
			if(SP < 0)
				SP += 65536;
			memory[SP] = " "+((regindex == 0) ? PSW : registers[regindex + 1] );
			console.log("at SP "+DectoHex(SP)+" DATA is : "+memory[SP]);
			registers[7] = DectoHex(SP);

		}//CLOSING PUSH
		if(choice == 20)
		{
			console.log("POP ready");
			var SP = HextoDec(registers[7]) ;
			if(regindex == 0 )
				PSW = memory[SP].substring(1,3);

		    else registers[regindex + 1] = memory[SP].substring(1,3) ;
		    memory[SP] = "";
		    PSW = HextoBinary(PSW);
		    for(var i = 0;i<8;i++)
		    	if(PSW.charAt(i) == '1')
		    		flags[i] = 1;

			SP = (SP+1)%65536;
			registers[regindex] = memory[SP].substring(1,3) ;
			memory[SP] = "";
			SP = (SP+1)%65536;
			registers[7] = DectoHex(SP);


		}//CLOSING POP

		var startagain = document.getElementById("table1").rows[1].cells[0].innerHTML.substring(0,4);
		modifyaddress(startagain,1);
	}//closing PUSHPOP

		function CALL(instruction)
	{
		//37 for CALL
		var address = HextoDec(instruction.substring(0,4));
		var PCcounter = 0 ;
		for(var i = 1;i<26;i++)
		{
			console.log("i am in for looop of CALL with i : "+i);
			var addnet = document.getElementById("table1").rows[i].cells[0].innerHTML;
			var addfirst = HextoDec(addnet.substring(0,4));
			console.log(addfirst);
			if(addfirst == address)
			{
				console.log("if success");
				console.log("address : "+address);
				console.log("PCcounter : "+addfirst);
				PCcounter = i;
				break;
			}
		}//found position of conter at address given
		var opcode = document.getElementById(idnumbera).value ;
		var f = 0;     //call eligible
		if(opcode == "CY")
		{
			if(flags[7] == 1)
				f = 1;
		}
		else if(opcode == "CNY")
		{
			if(flags[7] == 0)
				f = 1;
		}
		else if(opcode == "CZ")
		{
			if(flags[1] == 1)
				f = 1;
		}
		else if(opcode == "CNZ")
		{
			if(flags[1] == 0)
				f = 1;
		}
		else if(opcode == "CPE")
		{
			if(flags[5] == 0)
				f = 1;
		}
		else if(opcode == "CPO")
		{
			if(flags[5] == 1)
				f = 1;
		}
		else if(opcode == "CP")
		{
			if(flags[0] == 0)
				f = 1;
		}
		else if(opcode == "CM")
		{
			if(flags[0] == 1)
				f = 1;
		}
		else f = 1;  //the case for simple JUMP
		if(f == 1)
		{
			var PC = registers[8].substring(0,4);
			if(HextoDec(registers[7]) == 0)
				registers[7] = "1200";
			console.log("sp in call "+registers[7]);
			var bcp = registers[1] + registers[2];
			registers[1] = PC.substring(0,2);
			registers[2] = PC.substring(2,4);
			PUSHPOP("B"); //store address of PC in stack
			PC = bcp ;
			registers[1] = PC.substring(0,2);
			registers[2] = PC.substring(2,4);
			if(PCcounter == 0)
			{
				specialcounter = 0;
				setpc();
				alert("The function where the jump will take place was not available in the previous addresses.So shifted address accordingly.Press Step Into after 0K to continue execution.");
			}
			else
			{
				specialcounter = PCcounter ; //special variable for settimg flow
			}
			console.log("We are all ready to jump in next Step Into.value of new counter will be : "+specialcounter);
			var startagain = document.getElementById("table1").rows[1].cells[0].innerHTML.substring(0,4);
			modifyaddress(startagain,1);
		}
		else console.log("JUMP unsuccessful");

	}//CLOSING OF CALL instruction

	function RETURN()
	{
		//38 for return
		var opcode = document.getElementById(idnumbera).value ;
		var f = 0;     //call eligible
		if(opcode == "RY")
		{
			if(flags[7] == 1)
				f = 1;
		}
		else if(opcode == "RNY")
		{
			if(flags[7] == 0)
				f = 1;
		}
		else if(opcode == "RZ")
		{
			if(flags[1] == 1)
				f = 1;
		}
		else if(opcode == "RNZ")
		{
			if(flags[1] == 0)
				f = 1;
		}
		else if(opcode == "RPE")
		{
			if(flags[5] == 0)
				f = 1;
		}
		else if(opcode == "RPO")
		{
			if(flags[5] == 1)
				f = 1;
		}
		else if(opcode == "RP")
		{
			if(flags[0] == 0)
				f = 1;
		}
		else if(opcode == "RM")
		{
			if(flags[0] == 1)
				f = 1;
		}
		else f = 1;  //the case for simple return
		if(f == 1)
		{
			
			choice = 20;
			var bcp = registers[1] + registers[2];
			registers[1] = PC.substring(0,2);
			registers[2] = PC.substring(2,4);
			PUSHPOP("B"); //store address of PC in stack
			var  PC = registers[1] + registers[2];
			registers[8] = PC;
			registers[1] = bcp.substring(0,2);
			registers[2] = bcp.substring(2,4);



			var address = PC;
			var PCcounter = 0 ;
			for(var i = 1;i<26;i++)
			{
				console.log("i am in for looop of RETURN with i : "+i);
				var addnet = document.getElementById("table1").rows[i].cells[0].innerHTML;
				var addfirst = HextoDec(addnet.substring(0,4));
				console.log(addfirst);
				if(addfirst == address)
				{
					console.log("if success");
					console.log("address : "+address);
					console.log("PCcounter : "+addfirst);
					PCcounter = i;
					break;
				}
			}//found position of conter at address given



				if(PCcounter == 0)
				{
					specialcounter = 0;
					setpc();
					alert("The function where the jump will take place was not available in the previous addresses.So shifted address accordingly.Press Step Into after 0K to continue execution.");
				}
				else
				{
					specialcounter = PCcounter ; //special variable for settimg flow
				}
				console.log("We are all ready to jump in next Step Into.value of new counter will be : "+specialcounter);
		}
			else console.log("JUMP unsuccessful");

	}
