
// Read the JAON file
function getJsonObject(path, success, error) { 
 var xhr = new XMLHttpRequest(); 
 xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
    if (success) success(JSON.parse(xhr.responseText)); 
   } else {
    if (error) error(xhr); 
   }
  } 
 };
 xhr.open("GET", path, true);
 xhr.send(); 
}



bookList = []; // book list container 
getJsonObject('data.json',
function(data) {
 bookList = data; // store the book list into bookList 
 //console.log(bookList); // print it into console (developer tools) 

 // print the first book object into console
 // here you can call methods to laod or refresh the page
 // loadBooks() or refreshPage() 
 // console.log(bookList.length);
 // console.log(bookList[0]);

 var booklisttitle = '<table id=\"tTable\">'; //create a table that contains all the books in the bookList
 booklisttitle += '<thead id=\"tThead\"><tr>'; //this the head of table
 booklisttitle += '<th> </th>';
 booklisttitle += '<th> </th>';
 booklisttitle += '<th>Title</th>';
 booklisttitle += '<th width=\"80px\"> </th>';
 booklisttitle += '<th>Authors</th>';
 booklisttitle += '<th>Year</th>';
 booklisttitle += '<th>Price</th>';
 booklisttitle += '<th>Publisher</th>';
 booklisttitle += '<th>Category</th>';
 booklisttitle += '</tr></thead>';

 var booklisttable = '<tbody>'; // from here, this the body of this tabel
 for(var i=0; i < bookList.length; i++){
  booklisttable += '<tr id=\"' + i + '\">'; // in this loop, all the data will be inserted in this table row by row
  booklisttable += '<td>' + '<input type=\"radio\" name = \"book\">'+ '</td>';
  booklisttable += '<td>' + '<img src=\"' + bookList[i].img + '\" height=\"80px\">' + '</td>';
  booklisttable += '<td class= \"titleName\">' + bookList[i].title + '</td>';
    var ratingStar = '';
    for(var rp=0; rp < bookList[i].rating; rp++){
     ratingStar += '<img src=\"' + 'images/star-16.ico' + '\" height=\"15px\">';
    }
    for(var rn=0; rn < (5-bookList[i].rating); rn++){
     ratingStar += '<img src=\"' + 'images/outline-star-16.ico' + '\" height=\"15px\">';
    }
  booklisttable += '<td>' + ratingStar + '</td>';
  booklisttable += '<td>' + bookList[i].authors + '</td>';
  booklisttable += '<td>' + bookList[i].year + '</td>';
  booklisttable += '<td>' + bookList[i].price + '</td>';
  booklisttable += '<td>' + bookList[i].publisher + '</td>';
  booklisttable += '<td>' + bookList[i].category + '</td>';
  booklisttable += '</tr>';

 }
 booklisttable += '</tbody></table>';
 document.getElementById('listBox').innerHTML = booklisttitle + booklisttable; // Put the table into HTML

 
//Function -- Search
 document.getElementById("searchBtn").addEventListener("click", function() {
        var searchText = document.getElementById("find").value; 
  
        for (var i=0; i < bookList.length; i++){
          if (bookList[i].title.toLowerCase().includes(searchText.toLowerCase())){
            document.getElementById(i).setAttribute("class", "backgroundBlue");
             
          }
          
        }
        
    }); 

 // Function -- Filter and Search&&Filter
 document.getElementById("filterBtn").addEventListener("click", function() {
        var filterText = document.getElementById("category").value;
        var searchText = document.getElementById("find").value; 
        var whoCanBeDispaly = new Array();
        

        if (searchText.length===0){
          for (var a = 0; a<bookList.length; a++){
             if (filterText != bookList[a].category){
              var row = document.getElementById(a);
                              
                              row.style.display = "none";
             }
          }
        }
        else{
          for(var i=0; i < bookList.length; i++){
            if (bookList[i].title.toLowerCase().includes(searchText.toLowerCase())){
            document.getElementById(i).setAttribute("class", "backgroundBlue"); 
              if(filterText === "Category"){
                 for (var p =0; p<bookList.length; p++){
                    whoCanBeDispaly.push(p);
                 }
                   
              }
              else{
                if (bookList[i].category === filterText){
                   
                   whoCanBeDispaly.push(i);               
              }
                   
            } 
              }
              
          
        } 
        if (whoCanBeDispaly.length===0){
          for(var y=0; y < bookList.length; y++){
            var row = document.getElementById(y);
                              
                row.style.display = "none";
          }
        }
        else{
          for(var y=0; y < bookList.length; y++){
                for(var x=0; x< whoCanBeDispaly.length; x++){
                  var a = whoCanBeDispaly.indexOf(y);
                  console.log("a is "+ a);  
                  if (a === -1){
                              var row = document.getElementById(y);
                              
                              row.style.display = "none";
                  }
                }                              
            }
        }
        }  
     }); 

//Function -- Return to the first page
  document.getElementById("ReturnBtn").addEventListener("click", function() {

       window.history.back();
       location.reload();
 }); 


//Function -- Add books to the cart
      var howManyBooks = new Array();
      document.getElementById("addToCartBtn").addEventListener("click", function() {
                  var number = prompt("Please enter the NUMBER of the book you want to buy !!", " "); 
                  var re = /^[0-9]+.?[0-9]*/;
　　　　                if (!re.test(number)) 
                      {
　　　　                  alert("PLEASE ENTER A NUMER!!!!!!!");
                      }
                      else if (number == 0){
                        alert("PLEASE ENTER A NUMER BIGGER THAN ZERO");
                      }
                      else
                      {

                          howManyBooks.push(Number(number));
                          var finalNumber = howManyBooks[0];
                          console.log(finalNumber);
                          document.getElementById("numberLabel").innerHTML="("+finalNumber+")";

                          for(var n=1; n<howManyBooks.length;n++){
                              finalNumber += howManyBooks[n];
                              document.getElementById("numberLabel").innerHTML="("+finalNumber+")";
                        
                          }
                          
                      }
      
       }); 

  //Function -- Reset the number of books in the cart
     document.getElementById("resetBtn").addEventListener("click", function() {
             
                      var resetOrNot=confirm("Do you want to reset the cart??");
                          if (resetOrNot == true) {
                    
                              howManyBooks.splice(0,howManyBooks.length);
                              document.getElementById("numberLabel").innerHTML="("+0+")";
                          }                      
                  }); 


// Function -- Dark Model 
     var checkAll = document.getElementById('dark');

      checkAll.addEventListener('click',function(){
      if (checkAll.checked==true){
          document.getElementById("searchBox").style.backgroundColor = "#596f80";
          document.getElementById( "searchBox" ).style.border = "1pt solid #68859c";
          document.getElementById("listBox").style.backgroundColor = "#596f80";
          var tThead =document.getElementById('tThead');
          tThead.style.backgroundColor="#596f80";
          document.getElementById("allBody").style.backgroundColor="#484a41";
          document.getElementById("allBody").style.color="#dde0d1";

          document.getElementById("searchBtn").addEventListener("click", function() {
            var searchText = document.getElementById("find").value; 
      
            for (var i=0; i < bookList.length; i++){
              if (bookList[i].title.toLowerCase().includes(searchText.toLowerCase())){
                document.getElementById(i).style.backgroundColor="#625480";
                 
              }
              
            }
            
        });
      }
      else{
        document.getElementById("searchBox").style.backgroundColor = "#EBF4FB";
          document.getElementById( "searchBox" ).style.border = "1pt solid #95BEF0";
          document.getElementById("listBox").style.backgroundColor = "#FAFCFF";
          var tThead =document.getElementById('tThead');
          tThead.style.backgroundColor="#FAFCFF";
          document.getElementById("allBody").style.backgroundColor="transparent";
          document.getElementById("allBody").style.color="#3f4231";

          
            var searchText = document.getElementById("find").value; 
               
            for (var i=0; i < bookList.length; i++){
              console.log(searchText);
              if(searchText != ""){
                  
                  if (bookList[i].title.toLowerCase().includes(searchText.toLowerCase())){
                
                   document.getElementById(i).style.backgroundColor="#6d8ba3";
                }   
                 
              }
              
            }
      }
    
    });

 },
 function(xhr) { console.error(xhr); 
});



  


























