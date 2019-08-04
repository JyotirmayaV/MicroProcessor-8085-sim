function AOX(instruction)
	{
		/*A stands for And O for Or and X for Xor
		  41 : ANA R
		  42 : ORA R
		  43 : XRA R
		  44 : ANI 8 bit
		  45 : ORI 8 bit
		  46 : XRI 8 bit*/
		  console.log("Witin AOX with choice : "+choice);
		  var data = ""; //stores the data to work on

		  if(choice > 43 && choice < 47)
		  	data = instruction.substring(0,2); //storing 8 bit data directly
		  else
		  {
		  	var source_register = instruction.substring(0,1);
		  	if(source_register == "M" )
		  		data = memory[generate_address()];
		  	else data = registers[match(source_register)];
		  }

		  console.log("data received : "+data);
		  var cdata = HextoDec(data);  //decimal equivalent of data to convert

		  var accumulator_data = HextoDec(registers[0]); //data in  accumulator

		  if(choice == 41 || choice == 44 ) //for AND operations
		  	accumulator_data = accumulator_data & cdata ;

		  else if(choice == 42 || choice == 45 ) //for OR operations
		  	accumulator_data = accumulator_data | cdata ;

		  else accumulator_data = accumulator_data ^ cdata ; //for XOR operations

		  console.log("new accumulator data : "+accumulator_data);

		  registers[0] = DectoHex(accumulator_data);

		   /*all flags effected
		  	carry flag reset
		  	auxiliary carry flag set*/

		  	flags[7] = 0; //carry flag reset
		  	flags[3] = 1; //auxiliary carry flag set

		    //no change shall occur in sign flag though

		    parityassign(); //parity flag updated

		    if(accumulator_data == 0) //zero flag modified
		    	flags[1] = 1;
		    else flags[1] = 0;

	}//closing of AOX

	function CMP(instruction)
	{
		//47 for CMP and 48 for CPI
		 console.log("Witin CMP with choice : "+choice);
		  var data = ""; //stores the data to work on

		  if(choice == 48)
		  	data = instruction.substring(0,2); //storing 8 bit data directly
		  else
		  {
		  	var source_register = instruction.substring(0,1);
		  	if(source_register == "M" )
		  		data = memory[generate_address()];
		  	else data = registers[match(source_register)];
		  }

		  console.log("data received : "+data);
		  var cdata = HextoDec(data);  //decimal equivalent of data to convert


		  var accumulator_data = HextoDec(registers[0]); //data in  accumulator

		  accumulator_data = accumulator_data - cdata ;

		  //all flags affected but no change in accumulator value

		  if(accumulator_data > 0)
		  {
		  	flags[0] = 0;   //sign flag
		  	flags[1] = 0;	//zero flag
		  	flags[7] = 0;	//carry flag
		  }
		  else if(accumulator_data == 0)
		  {
		  	flags[0] = 0;   //sign flag
		  	flags[1] = 1;	//zero flag
		  	flags[7] = 0;	//carry flag
		  }
		  else if(accumulator_data < 0)
		  {
		  	flags[0] = 1;   //sign flag
		  	flags[1] = 0;	//zero flag
		  	flags[7] = 1;	//carry flag
		  }

		  //for auxiliary flag updation
		  /*storing real value of accumulator in temp as parity flagg will be affected,
		    but accumulator value should not change and our parity function works on
		    accumulator value directly*/
		    var temp = registers[0];

		    registers[0] = DectoHex(accumulator_data);
		    parityassign();  //parity flag updated
		    registers[0] = temp; //initial value of accumulator received again

		    accumulator_data = DectoHex(registers[0].substring(0,2));
		    console.log("accumulator_data : "+accumulator_data);
		    console.log("cdata : "+cdata);
		    accumulator_data = accumulator_data - cdata ;
		    console.log("new accumulator_data : "+accumulator_data);
		    //updating auxiliary carry flag
		    if(accumulator_data < 0)
		    	flags[3] = 1 ;
		    else flags[3] = 0;




	}//closing of CMP

	function implicitlogical()
	{
		//49 for RLC
		//50 for RRC
		//51 for RAL
		//52 for RAR
		//53 for CMA
		//54 for CMC
		//55 for STC
		//56 FOR NOP



		if(choice == 54)         //complementing the carry flag
		{
			if(flags[7] == 1)
				flags[7] = 0;
			else flags[7] =1 ;
		}

		else if(choice == 55)    //set carry flag
			flags[7] = 1;

		else if(choice == 56)
			console.log("No Operation executed");

		else
		{	
			var binary = HextoBinary(registers[0]);
			var newbinary = "";
			if(choice == 53)   //complement accumulator
			{
				for(var i = 0;i<8;i++)
				{
					if(binary.charAt(i)=='0')
						newbinary = "1"+newbinary;
					else newbinary = "0"+newbinary;
				}
				registers[0] = BinarytoHex(newbinary);  //new converted value to accumulator
			}//choice 53 CMA completed

			else if(choice == 49 || choice == 51)
			{
				var nbit = "";  //needed bit to be inserted at starting(last in string) after left shift
				if(choice == 49) //without carry case RLC
					nbit = nbit + binary.charAt(0);
				else nbit = nbit + flags[7];
				newbinary = binary.substring(1,8) + nbit;
				flags[7] = parseInt(""+binary.charAt(0));
				registers[0] = BinarytoHex(newbinary);
			}//rotate accumulator left completed
			else
			{
				var icarry = flags[7]; //hold caary value for RAR
				flags[7] = parseInt("" + binary.charAt(7));
				newbinary = binary.substring(0,7);
				if(choice == 50) //for RRC
					newbinary = flags[7] + newbinary;
				else newbinary = icarry + newbinary;
				registers[0] = BinarytoHex(newbinary);
			}//rotate accumulator write completed

		}//closing of else for remaining choices of implicit logical instructions

	}//CLOSING OF IMPLICIT LOGICAL
