function MVI(instruction)
		{
			//var space_index = instruction.indexOf(',');
			//if(space_index != 1)
				//System.out.println("----handle error-----");
			var dest_register = instruction.substring(0,1);     	    //storing the destination register
			//System.out.println("dest_register : "+dest_register+".");
			var data = instruction.substring(2,4);				    //storing the data to be stored
			//System.out.println("data : "+data+".");
			if(dest_register.localeCompare("M") == 0) 
			{
				var address = generate_address();						//generate address from H-L register by calling function
				memory[address] = data;
				//document.getElementById("M").innerHTML = memory[address]+" H";
				//console.log("memory data : "+memory[address]);

			}
			else
			{
				var dest_index = match(dest_register);					//find the corresponding index for destination register
				//System.out.println("index : "+dest_index);
				//if(dest_index == -1)
					//System.out.println("----handle error-----");
				//else r
				registers[dest_index] = data;
			}

			/*
				These codes were simply written to check the functionality of functions
				HextoBinary and BinarytoHex when these were newly made
				Not removed just in case to use later.


			console.log("accumulator value : "+registers[0]);
			var binary = HextoBinary(registers[0]);
			console.log("Binary equivalent : "+binary);
			console.log("Hexadecimal equivalent : "+BinarytoHex(binary));*/

		}//MVI closing

		function MOV(instruction)
		{
			//int space_index = instruction.indexOf(' ');
			//if(space_index != 1)
				//System.out.println("----handle error-----");			
			var dest_register = instruction.substring(0,1); 		    //storing the destination register
			var source_register = instruction.substring(2,3);		//storing the source register
			var dest_index = match(dest_register);						//calculating index of destination register
			var source_index = match(source_register);					//calculating index of source register
			if(source_register == "M"  || dest_register == "M" ) 
			{
				
				var address = generate_address();						//generate address from H-L register by calling function
				if(source_register == "M" )
					registers[dest_index] = memory[address];
				else memory[address] = registers[source_index];
				//document.getElementById("M").innerHTML = memory[generate_address]+" H";


			}//closing of memory checking for Memory
			else
			{
				registers[dest_index] = registers[source_index];
			}
		}//MOV closing

		function LDASTA(instruction)
		{	

			//23 for LDA
			//24 for STA
			//25 for LDAX
			//26 for STAX
			var address ;
			if(choice == 25 || choice == 26)
			{
				var regindex = match(instruction);
				address = HextoDec(registers[regindex] + registers[regindex + 1]);
			}
			else address = HextoDec(instruction.substring(0,4));  //converted the received address into decimal
			if(choice == 23 || choice == 25) 						  //a case for LDA (load value of Accumulator from address specified)
				registers[0] = memory[address];
			else memory[address] = " "+registers[0];	//a case for STA (store valuue of Accumulator at address specified)

			var startagain = document.getElementById("table1").rows[1].cells[0].innerHTML.substring(0,4);
			modifyaddress(startagain,1);
						  

		}//closingmof LDASTA function

		function LXI(instruction) //not supporting SP
		{						  
			//27 for LXI
			if(instruction.substring(0,2) == "SP" )
			{
				registers[7] = instruction.substring(3,7);
			}
			else
			{	
				var regindex = match(instruction.substring(0,1)); //store the first reg pair index
				registers[regindex] = instruction.substring(2,4);
				registers[regindex + 1] = instruction.substring(4,6);
			}

		}//LXI closing

		function LHLDSHLD(instruction)
		{
			var address = HextoDec(instruction.substring(0,4));
			var addressinc = address + 1;
			if(address == 65535)      //if instruction has FFFF H then H will have data from address 0000 H 
				addressinc = 0;
			if(choice == 28) //for LHLD
			{
				registers[6] = memory[address] ;
			    registers[5] = memory[addressinc] ;
			}
			else            //for SHLD
			{
				memory[address] = registers[6] ;
				memory[addressinc] = registers[5] ;
			}

		}//closing of LHLDSHLD

		function exchanges()
		{
			//30 for XCHG
			//31 for SPHL
			//32 for PCHL
			if(choice == 30)		//exchange value of DE and HL
			{
				var hldata = registers[5] + registers[6];	//HL initial data
				registers[5] = registers[3];                //h = d
				registers[6] = registers[4];				//l = e
				registers[3] = hldata.substring(0,2);
				registers[4] = hldata.substring(2,4);
			}//choice 10 completes
			else if(choice == 31)	//copy contents of HL in SP
			{
				registers[7] = registers[5] + registers[6] ;
			}//choice 11 completes
			else //copy contents of HL in PC
			{
				registers[8] = registers[5] + registers[6];
			}


		}//closing of exchanges
