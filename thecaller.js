function myfunction()
	{
		if(specialcounter >= 0)
		{
			console.log("specialcounter : "+specialcounter);
			counter = specialcounter ;
			specialcounter = -1;
		}

		console.log("ENTERING myfunction counter : "+counter);

		idnumbera = counter + "a" ;
	 	idnumberb = counter + "b" ;
		 /*//while(counter < 10)
		 //{
		 	//idnumber = counter + "b";
		 	//end = counter + "a" ;
		 	//var endvalue = document.getElementById(end).value;
		 	//if(endvalue.localeCompare("HLT") == 0)
		 		//break;*/

		 	document.getElementById(idnumbera).style.border = "thick solid #0000FF" ;
		 	document.getElementById(idnumberb).style.border = "thick solid #0000FF" ;
		 	var address = HextoDec(document.getElementById("table1").rows[counter].cells[0].innerHTML.substring(0,4));

		 	memory[address] = document.getElementById(idnumbera).value+" "+document.getElementById(idnumberb).value;
		 	console.log("data in memory : "+memory[address]+" at address : "+address);
		 	//var zeroes = "0000";
		 	//document.getElementById("PC").value = zeroes.substring(0,(4-registers[8].length)) + registers[8] + "H";

		 	var opcode = document.getElementById(idnumbera).value ;
		 	switch (opcode)
		 	{
		 		case "MVI" : MVI(document.getElementById(idnumberb).value);
		 					 break;
		 		case "MOV" : MOV(document.getElementById(idnumberb).value);
		 					 break;
		 		case "HLT" : registers[8] = "0000" ;
		 					 counter = 0;
		 					 document.getElementById(idnumberb).style.border = null ;
		 					 document.getElementById("step").innerHTML = "GO to Top" ;
		 					 for(var i = 0;i < 8 ; i++)
							 {
								flags[i] = 0;
								registers[i] = "00";
							 }
		 					 //clearcontent();
		 					 break;
		 		case "ADD" : choice = 3;
		 					 ADD(document.getElementById(idnumberb).value);
						 	 break;
				case "ADI" : choice = 4;
						 	 ADD(document.getElementById(idnumberb).value);
						     break;
				case "ADC" : choice = 5;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "ACI" : choice = 6;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "SUB" : choice = 7;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "SBI" : choice = 8;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "SBB" : choice = 9;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "SBI" : choice = 10;
							 ADD(document.getElementById(idnumberb).value);
							 break;
				case "INR" : choice = 11;
						     ADD(document.getElementById(idnumberb).value);
						     break;
				case "INX" : choice = 12;
						     ADD(document.getElementById(idnumberb).value);
						     break;
				case "DCR" : choice = 13;
						     ADD(document.getElementById(idnumberb).value);
						     break;
				case "DCX" : choice = 14;
						     ADD(document.getElementById(idnumberb).value);
						     break;
				case "PUSH" : choice = 19;
							 PUSHPOP(document.getElementById(idnumberb).value);
							 break;
				case "POP" : choice = 20;
							 PUSHPOP(document.getElementById(idnumberb).value);
							 break;			 
				case "LDA" : choice = 23;
							 LDASTA(document.getElementById(idnumberb).value);
							 break;
				case "STA" : choice = 24;
						     LDASTA(document.getElementById(idnumberb).value);
						     break;
				case "LDAX" : choice = 25;
						      LDASTA(document.getElementById(idnumberb).value);
						       break;
				case "STAX" : choice = 26;
						      LDASTA(document.getElementById(idnumberb).value);
						      break;
				case "LXI"  : choice = 27;
						      LXI(document.getElementById(idnumberb).value);
						      break;
				case "LHLD" : choice = 28;
						      LHLDSHLD(document.getElementById(idnumberb).value);
						      break;
				case "SHLD" : choice = 29;
						      LHLDSHLD(document.getElementById(idnumberb).value);
						      break;
				case "XCHG" : document.getElementById(idnumberb).style.border = null ;
							  choice = 30;
						      exchanges();
						      break;
				case "SPHL" : document.getElementById(idnumberb).style.border = null ;
							  choice = 31;
						      exchanges();
						      break;
				case "PCHL" : document.getElementById(idnumberb).style.border = null ;
							  choice = 32;
						      exchanges();
						      break;
				case "JUMP" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JC"  : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JNC" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JZ"  : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JNZ" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JPE" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JPO" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JP" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;
				case "JM" : choice = 36;
							 JUMP(document.getElementById(idnumberb).value);
							 break;	
				case "CALL" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CY"  : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CNY" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CZ"  : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CNZ" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CPE" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CPO" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CP" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;
				case "CM" : choice = 37;
							 CALL(document.getElementById(idnumberb).value);
							 break;		 	
				case "RET" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RY"  : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RNY" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RZ"  : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RNZ" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RPE" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RPO" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RP" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;
				case "RM" : choice = 38;
							 RET(document.getElementById(idnumberb).value);
							 break;		 			 		 
				case "ANA" : choice = 41 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "ORA" : choice = 42 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "XRA" : choice = 43 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "ANI" : choice = 44 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "ORI" : choice = 45 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "XRI" : choice = 46 ;
							 AOX(document.getElementById(idnumberb).value);
							 break;
				case "CMP" : choice = 47 ;
							 CMP(document.getElementById(idnumberb).value);
							 break;
				case "CPI" : choice = 48 ;
							 CMP(document.getElementById(idnumberb).value);
							 break;
				case "RLC" : document.getElementById(idnumberb).style.border = null ;
							 choice = 49 ;
							 implicitlogical();
							 break;
				case "RRC" : document.getElementById(idnumberb).style.border = null ;
							 choice = 50 ;
						     implicitlogical();
						     break;
				case "RAL" : document.getElementById(idnumberb).style.border = null ;
							 choice = 51 ;
						     implicitlogical();
						     break;
				case "RAR" : document.getElementById(idnumberb).style.border = null ;
							 choice = 52 ;
						     implicitlogical();
						     break;
				case "CMA" : document.getElementById(idnumberb).style.border = null ;	
							 choice = 53 ;
						     implicitlogical();
						     break;
				case "CMC" : document.getElementById(idnumberb).style.border = null ;
							 choice = 54 ;
						     implicitlogical();
						     break;
				case "STC" : document.getElementById(idnumberb).style.border = null ;
							 choice = 55 ;
						     implicitlogical();
						     break;
				case "NOP" : document.getElementById(idnumberb).style.border = null ;
							 choice = 56 ;
						     implicitlogical();
					   		 break;

			}




		 	console.log("Function execution complete");
		 	
		 	display();
		 	//counter ++ ;
		 //}
		 //document.getElementById(idnumber).innerHTML = "BY" ;
		 console.log("counter in the deciding switching function with value : "+counter);

	}

	function display()
	{
		//document.getElementById("-------------Flags--------------");
		document.getElementById("S").innerHTML = flags[0];
		document.getElementById("Z").innerHTML = flags[1];
		document.getElementById("Ay").innerHTML = flags[3];
		document.getElementById("P").innerHTML = flags[5];
		document.getElementById("Cy").innerHTML = flags[7];
		//document.getElementById("----------Registers--------------");
		document.getElementById("A").innerHTML = registers[0]+" H";
		document.getElementById("B").innerHTML = registers[1]+" H";
		document.getElementById("C").innerHTML = registers[2]+" H";
		document.getElementById("D").innerHTML = registers[3]+" H";
		document.getElementById("E").innerHTML = registers[4]+" H";
		document.getElementById("H").innerHTML = registers[5]+" H";
		document.getElementById("L").innerHTML = registers[6]+" H";
		var zeroes ="0000";
		document.getElementById("SP").innerHTML =  zeroes.substring(0,(4-registers[7].length)) + registers[7] +" H";
		document.getElementById("PC").value = zeroes.substring(0,(4-registers[8].length)) + registers[8]+" H";
		var memdata = memory[generate_address()];
		if(memdata == " " || memdata == "   " || memdata.length > 2)
			memdata = "00";
		document.getElementById("M").innerHTML = memdata +" H";
	}