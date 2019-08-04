		function modifyaddress(beginaddress,beginfrom)
			{	
				
				console.log("AT 0000 : "+memory[0]);
				var addnet = document.getElementById("table1").rows[beginfrom].cells[0].innerHTML;
				var addfirst = HextoDec(addnet.substring(0,4));
				for(var i=beginfrom;i<26;i++)
				{
					var decbeginadd = HextoDec(beginaddress.substring(0,4));
					//console.log("decbeginadd : "+decbeginadd);
					addnet = document.getElementById("table1").rows[i].cells[0].innerHTML;
					add = HextoDec(addnet.substring(0,4));
					//console.log("add : "+add);
					add = (add + decbeginadd - addfirst)%65536;
					var hexaddress = DectoHex(add);
					for(var j=hexaddress.length;j<4;j++)
						hexaddress = "0"+hexaddress;
					document.getElementById(i+"c").innerHTML = hexaddress + "H" ;
					console.log(i+"c for address : "+hexaddress);
					if(loadvalue == 1)
					{
					var data = memory[add];
					var space_index = data.indexOf(' ');
					console.log("data at above address is : "+data+" space at : "+space_index);
					if(space_index != -1)
					{
						document.getElementById(i+"a").value = data.substring(0,space_index);
						document.getElementById(i+"b").value = data.substring(space_index+1,data.length);
					}
					else
					{
						document.getElementById(i+"a").value = "";
						document.getElementById(i+"b").value = "";
					}
					}

				}
			}

			function match(reg)											//to generate index for registers
		{
			//System.out.println("reg : "+reg);
			if(reg.localeCompare("A") == 0)
				return 0;
			else if (reg.localeCompare("B") == 0)               //localeCompare returns 0 if strings are equal
				return 1;
			else if (reg.localeCompare("C") == 0)
				return 2;
			else if (reg.localeCompare("D") == 0)
				return 3;
			else if (reg.localeCompare("E") == 0)
				return 4;
			else if (reg.localeCompare("H") == 0)
				return 5;
			else if (reg.localeCompare("L") == 0)
				return 6;
			else if (reg.localeCompare("SP") == 0)
				return 7;
			else if( reg.localeCompare("PC") == 0)
				return 8;
			else if(reg == "PSW")
				return 0;
			else return -1;
		}//match function closing

		function HextoDec(hex)
		{
			var len=hex.length;
			var power=len-1;
		    var dec=0;
			for(var i=0;i<len;i++)
			{
				//var c=hex.charAt(i);
				var ascii = hex.charCodeAt(i);
				var digit=0;
				if(ascii>=48 && ascii<=57)
					digit=ascii-48;
				else digit=ascii-55;
				dec+=digit*Math.pow(16,power--);	
			}
			//console.log("dec :"+dec);
			return dec;
		}

		function DectoHex(dec)
		{
			var hex="";
			while(dec>0)
			{
				var rem=dec%16;
				if(rem>9)
					rem=rem+55;
				else rem=rem+48;
				hex=String.fromCharCode(rem)+hex;
				//console.log(hex);
				dec=Math.floor(dec/16);
			}
			if(hex == "")
				hex="00";
			else if(hex.length == 1)
				hex = "0" + hex;
			return hex;

		}

		function HextoBinary(hex)
		{
			/*This function converts hexadecimal to binary of 8 bits
				argument type : String
				return type   : String
			*/

			dec = HextoDec(hex);
			console.log("Decimal equivalent : "+dec+" of received hex : "+hex);
			var binary = "";
			while(dec>0)
			{
				var bin = dec % 2;
				dec = Math.floor(dec / 2);
				//console.log("bin : "+bin+" DEC : "+dec);
				binary = bin + binary ;
				//console.log("binary : "+binary);
			}
			for(var i = binary.length ; i < 8 ; i++)
				binary = "0" + binary ;
			return binary;
		}//closing of HextoBinary

		function BinarytoHex(binary)
		{
			/*This function converts binary of 8 bits to decimal and finally to hexadecimal
				argument type : String
				return type   : String
			*/
			var dec = 0;
			var power = 0;
			for(var i = 7 ; i>=0 ;i--)
			{
				var digit = binary.charAt(i);
				if(digit == '1')
					dec = dec + Math.pow(2,power);
				power++;
			}
			return DectoHex(dec);
		}//closing of BinarytoHex


		function parityassign()										//to assign value to parity flag
		{
			var hex_data = registers[0];
			var data = HextoDec(hex_data);
			var pcount = 0;
			while(data > 0)
			{
				pcount = pcount + ( data % 2 );
				data = data / 2;

			}
			if(pcount % 2 == 0)									//even number of 1 bits implies parity flag = 0
				flags[5] = 0;
			else flags[5] = 1;

		}//closing parityassign function

		function generate_address()											//to generate address from H-L register
		{
			var address = registers[5]+registers[6];
			return HextoDec(address);
		}//generate_address function closing


		

