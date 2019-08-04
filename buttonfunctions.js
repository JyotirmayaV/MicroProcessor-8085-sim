			var choice = 0;
			var counter = 0;
			var idnumbera = "";
			var idnumberb = "";
			var loadvalue=0;
			var specialcounter = -1;
			var registers = ["00","00","00","00","00","00","00","00","0000","0000"];
			/*register configuration
			* registers[0]=> Register A;
			* registers[1]=> Register B;
			* registers[2]=> Register C;
			* registers[3]=> Register D;
			* registers[4]=> Register E;
			* registers[5]=> Register H;
			* registers[6]=> Register L;
			  registers[7]=> SP
			  registers[8]=>PC
			*/
			var flags= [0,0,0,0,0,0,0,0] ;
			/*flag configuration
			* flag[0]= sign flag;
			* flag[1]= zero flag;
			* flag[3]= auxiliary carry flag;
			* flag[5]= parity flag;
			* flag[7]= carry flag;
			*/
			var memory = new Array(65536);
			//memory[0] = "00" ;
			for(var i = 0; i < 65536;i++)
				memory[i] = "" ;
			var instructions = ["MVI2","MOV1","HLT1","ADD1","ADI2","ADC1","ACI2","SUB1","SUI2","SBB1","SBI2","SBB1","INR1","DCR1","INX1","DCX1","ANA1","ANI2","ORA1","ORI2","XRA1","XRI2","RLC1","RRC1","RAL1","RAR1","CMA1","CMC1","STC1","CMP1","CPI2","JUMP3","JX3","PUSH1","POP1","CALL3","CX3","RET1","RX1","LXI3","LDA3","STA3","LDAX1","STAX1","IN2","OUT2","LHLD3","SHLD3","XCHG1","SPHL1","PCHL1"];

			function stepinto()
			{
				if(loadvalue == 1)
				{
					if(counter == 0 && document.getElementById("1a").value == "")
					{
						alert("Please enter data first.");
					}
					else
					{
						/*Incrementing PC as PC points to next available instruction.*/
							
							
						if(counter > 0) //for removing highlighted borders
						{
							document.getElementById(idnumbera).style.border = null ;
							document.getElementById(idnumberb).style.border = null ;
							
						}
						else if(idnumbera !== "")
						{
							//entry here implies you crossed HLT recently
							document.getElementById(idnumbera).style.border = null;
							document.getElementById("step").innerHTML = "STEP INTO" ;

						}
						counter = counter + 1;    //now as function called that line will be highlightd and executed
						console.log("stepinto counter : "+counter);
						registers[8] = document.getElementById("table1").rows[counter+1].cells[0].innerHTML.substring(0,4);
						myfunction();
					}
				}
				else alert("Load the Program firstly in memory.");
			}//step into closing


			function setpc()
			{
				if(specialcounter != -1)
				{
					specialcounter = -1;
					document.getElementById(idnumbera).style.border = null ;
					document.getElementById(idnumberb).style.border = null ;
					counter = 0;
				}
				var pcdata = document.getElementById("PC").value;
				registers[8] = pcdata.substring(0,4);
				console.log("PC : "+registers[8]);
				modifyaddress(registers[8],1);
			}

			function down()     	//to increase number of lines
			{
				var addnet = document.getElementById("table1").rows[1].cells[0].innerHTML;
				var addfirst = HextoDec(addnet.substring(0,4));
				addfirst += 5;   //increase 5 lines
				if(addfirst == 65536)
					addfirst = 0;
				modifyaddress(DectoHex(addfirst),1);
			}

			function up()     	//to increase number of lines
			{
				var addnet = document.getElementById("table1").rows[1].cells[0].innerHTML;
				var addfirst = HextoDec(addnet.substring(0,4));
				console.log("addfirst : "+addfirst);
				addfirst -= 5;   //increase 5 lines
				if(addfirst < 0)
					addfirst = 0; ;
				console.log("addfirst : "+addfirst);
				modifyaddress(DectoHex(addfirst),1);
			}

			function EDIT()
			{
				loadvalue = 0;
				for(var i = 1;i<=25;i++)
				{
					document.getElementById(i+"a").readOnly = false;
					document.getElementById(i+"b").readOnly = false;
				}

			}

			function LOAD(calledit) //LOAD data in memory
			{	
				
					loadvalue = 0;
					for(var i=1;i<=25;i++)
					{
						console.log("i : "+i);
						var address = HextoDec(document.getElementById("table1").rows[i].cells[0].innerHTML.substring(0,4));
						var mema = document.getElementById(i+"a").value;
						var memb = document.getElementById(i+"b").value;
						console.log("-----mema : "+mema);
						//console.log("memb : "+memb);
						for(var j=0;j<instructions.length;j++)
						{	
							var mdata =""
							var ins = instructions[j];
							var bytes = Number(ins.charAt(ins.length-1));
							if(mema.charAt(0) == 'R' && mema.length==2)
								mdata = "RX";
							else if(mema.charAt(0) == 'C' && mema.length==2)
								mdata = "CX";
							else if(mema.charAt(0) == 'J' && mema.length==2)
								mdata = "JX";
							else mdata = mema.substring(0,mema.length);
							//console.log("mdata : "+mdata);
							if(mdata == ins.substring(0,ins.length-1))
							{
								console.log("modify ready with :"+(address+bytes));
								console.log("mdata : "+mdata);
								modifyaddress(DectoHex(address+bytes),i+1);
							}

							
						}
						if(calledit == 0)
						{
							console.log("mema : "+mema);
							document.getElementById(i+"a").readOnly = true;
							document.getElementById(i+"b").readOnly = true;
							loadvalue=1;
					    }
					 	memory[address] = mema + " " + memb;
					 	//console.log("MEM : "+memory[address]);

					}//for closing
					
					console.log("LOAD suuceessful");

				
			}
