angular.module('sapperApp', ['ngMaterial', 'ngMessages'])
  .controller('sapperController', function($scope) {
    
    $scope.fields = [];
    $scope.score = 0;
    $scope.numbersOfFields  = 0;
    $scope.gameOver = false;
    $scope.num = 0;
    $scope.noClick = true;
    $scope.randomNumbersArray = [];


    $scope.getRandomIntInclusive = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.StartOrReset = function (){
      $scope.gameOver = false;
      $scope.fields = [];
      $scope.score = 0;
      $scope.numbersOfFields  = 100;
      $scope.num = 0;
      $scope.noClick = true;
      $scope.randomNumbersArray = [];


      for(var i = 0 ; i < 10 ;i++ ){
        for(var j = 0 ; j < 10 ; j++){ 
          $scope.fields.push({id: $scope.num, x: j , y: i, isBomb: false, showField: false, number: null, })
          $scope.num++
        }
      }
      $scope.addBombs();
      $scope.addNumber();
      setTimeout(function(){ $scope.$apply() }, 100);
    }

    $scope.addBombs = function (){
      for(var i = 0 ; i < 10 ;i++){
        if($scope.randomNumbersArray.length === 10){
          return;
        }
        var randomNumber = $scope.getRandomIntInclusive(0,99);
        var isNumber = false;
        for(var j = 0 ; j < $scope.randomNumbersArray.length ; j++){
          if(randomNumber === $scope.randomNumbersArray[j]){
            isNumber = true;
            break;
          }
        }
        if(!isNumber){
          $scope.randomNumbersArray.push(randomNumber)
        }
      }
      if($scope.randomNumbersArray.length !== 10){
        $scope.addBombs();
      }
      for(var i = 0 ; i < $scope.randomNumbersArray.length ; i++ ){
        $scope.fields[$scope.randomNumbersArray[i]].isBomb = true
    }
      
    }

    $scope.addNumber = function (){
      for(var i = 0 ; i < $scope.fields.length ; i++){
       var tmpNumber = null;

       //left field
       if($scope.fields[i-1] && $scope.fields[i-1].isBomb && $scope.fields[i].x !== 0 ){
        tmpNumber++;
       }
       // right field
       if($scope.fields[i+1] && $scope.fields[i+1].isBomb && $scope.fields[i].x !== 9){
        tmpNumber++;
      }
      
      var upperY = $scope.fields[i].y - 1;
      var bottomY = $scope.fields[i].y + 1;
      for(var j = 0 ; j < $scope.fields.length ; j++){
        // upper fields
        if($scope.fields[j].y === upperY && 
          $scope.fields[j].x === $scope.fields[i].x - 1 && 
          $scope.fields[j].isBomb &&
          $scope.fields[i].x !== 0
          ){
          tmpNumber++;
        }
        if($scope.fields[j].y === upperY && 
          $scope.fields[j].x === $scope.fields[i].x && 
          $scope.fields[j].isBomb 
          ){
          tmpNumber++;
        }
        if($scope.fields[j].y === upperY && 
          $scope.fields[j].x === $scope.fields[i].x + 1 && 
          $scope.fields[j].isBomb &&
          $scope.fields[i].x !== 9
          ){
          tmpNumber++;
        }
        // lower fields
        if($scope.fields[j].y === bottomY && 
          $scope.fields[j].x === $scope.fields[i].x - 1 && 
          $scope.fields[j].isBomb &&
          $scope.fields[i].x !== 0
          ){
          tmpNumber++;
        }
        if($scope.fields[j].y === bottomY && $scope.fields[j].x === $scope.fields[i].x && $scope.fields[j].isBomb ){
          tmpNumber++;
        }
        if($scope.fields[j].y === bottomY && 
          $scope.fields[j].x === $scope.fields[i].x + 1 && 
          $scope.fields[j].isBomb &&
          $scope.fields[i].x !== 9
          ){
          tmpNumber++;
        }
      }
      $scope.fields[i].number = tmpNumber;
      }
    }

    $scope.checkField = function (index){
      $scope.fields[index].showField = true;
      if($scope.fields[index].isBomb){
        $scope.boom(index)
        $scope.gameOver = true
      }else{
        $scope.score++;
        document.getElementById($scope.fields[index].id).style.backgroundColor = 'white';  
      }
    }

    $scope.boom = function (){
      for(var i = 0 ; i < $scope.fields.length ; i++){
        $scope.fields[i].showField = true;
        if($scope.fields[i].isBomb){
          document.getElementById($scope.fields[i].id).style.backgroundColor = 'red';
        }else{
          document.getElementById($scope.fields[i].id).style.backgroundColor = 'white';
        }
      }
    }

    $scope.StartOrReset();
    $scope.addBombs();
  })

