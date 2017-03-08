$(document).ready(function(){
  // store input from user
  var inputs = [""];
  // store current input in screen
  var totalString;
  //operators array for validation
  var operators1 = ["+", "-", "/", "*"];
  var operators2 = ["."];
  // array of number for validation
  var nums = [1,2,3,4,5,6,7,8,9];
  
  // print value submitted by user to screen
  function getValue(input){
    // check for duplicate dot
    if(operators2.includes(inputs[inputs.length -1] === true && input === "#.")){
      console.log("Duplicate  '.'");
    }
    // check if 1st input is number
    else if(inputs.length === 1 && operators1.includes(input) === false){
      inputs.push(input);          
    }
    else if(inputs.length === 1 && operators1.includes(input) === true){
      console.log("Input number first !");          
    }
    //if last element is not operator, add operator
    else if(operators1.includes(inputs[inputs.length -1]) === false){
      inputs.push(input);
    }
    //
    else if(nums.includes(Number(input))){
      inputs.push(input);
    }
    update();
  }
  
  function update(){
    totalString = inputs.join("");
    $("#steps").html(totalString)
  }
  
  function getTotal(){
    totalString = inputs.join("");
    $("#steps").html(eval(totalString));
  }
  
  $("button").on("click", function(){
    if(this.id === "deleteAll"){
      inputs = [""];
      update();
    }
    else if(this.id === "deleteOne"){
      inputs.pop();
      update();
    }
    else if(this.id === "total"){
      getTotal();
    } else{
      if(inputs[inputs.length -1].indexOf("+", "-", "*", "/", ".") === -1){
        getValue(this.id);
      } else {
        getValue(this.id);
      }
    }
  });
});