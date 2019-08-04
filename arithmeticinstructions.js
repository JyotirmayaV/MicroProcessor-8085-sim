
	function ADD(instruction)									//3->ADD R , 4->ADI 8 BIT ,5 -> ADC R , 6 ->ACI 8 BIT
	{
		var data="";
		var diff_key = 1;
		if( (choice > 6 && choice < 11) || (choice == 13 ) )
			diff_key = -1;
		if(choice == 3 || choice == 5 || choice ==7 || choice ==9 || choice == 11 || choice == 13)	//for ADD and ADC and SUB and SBB and INR and DCR
		{
			var source_register = instruction.substring(0,1);	//storing the source register
			if(source_register == "M" )
				data = memory[generate_address()];
			else data = registers[match(source_register)];
		}
		else 														//for ADI and ACI and SUI and SBI					
		{
			data = instruction.substring(0,2);

		}

		var sump1 = HextoDec(registers[0]);							//converting the value in Accumulator
		var sump2 = HextoDec(data);									//converting the value in sourece_register
		if(choice == 11 || choice == 13)							//special changes for INR and DCR
		{
			sump1 = sump2;
			sump2 = 1;
			console.log("I came here to update for increment and decrement");

		}
		var sump = sump1 + (diff_key * sump2);

		if(choice == 5 || choice == 6 || choice == 9 || choice == 10) //for adding with carry 
			sump = sump + (diff_key * flags[7]);

		if(sump < 0)
		{
			flags[0] = 1;											//updated sign flag
			sump = sump + 256 ;

		}

		else flags[0] = 0;

		var sum = DectoHex(sump);
		
		//Flags Assignment

		if(choice != 11 && choice != 13)							//since INR and DCR do not affect carry flag
		{
			if(sum.length == 3)										//checking for carry flag
			{
				flags[7] = 1;
				registers[0] = sum.substring(1,3);
			}
			else 
			{
				flags[7] = 0;
				registers[0] = sum;
			}
			if(flags[0] == 1)
				flags[7] =1 ;
		}
		else 
		{
			var store = "";
			if(sum.length == 3)
				store = sum.substring(1,3);
			else store = sum;
			console.log("store : "+store);
			MVI((instruction.substring(0,1) + "," + store + "H" ));
		}
		//auxiliary carry checking code
		console.log("acc : "+registers[0]+" H");
		console.log("data : "+data+" H");

		if(registers[0].length == 2)
			sump1 = HextoDec(registers[0].substring(1,2));
		else sump1 = HextoDec(registers[0]);
		if(data.length == 2)
			sump2 = HextoDec(data.substring(1,2));
		else sump2 = HextoDec(data);
		console.log("sump1 : "+sump1);
		console.log("sump2 : "+sump2)

		var auxiliary_check = sump1 + (diff_key * sump2);
		console.log("aux : "+auxiliary_check);

		if( auxiliary_check > 15 || auxiliary_check < 0 )					//checking for auxiliary carry flag
			flags[3] = 1;
		else flags[3] = 0;

		parityassign();												//updating the value of parity  flag

		if(registers[0] == "00" )								//updating zero flag
			flags[1] = 1;
		else flags[1] = 0;

														

	}//ADD closing
