angular.module('sapperApp', ['ngMaterial', 'ngMessages'])
  .controller('sapperController', function($scope) {
    
    $scope.fields = [];
    $scope.numbersOfFields  = 0;
    $scope.gameOver = false;
    $scope.num = 0;
    $scope.noClick = true;
    $scope.randomNumbersArray = [];
    $scope.numbersClearFields = 0;
    $scope.winOrLoose = '';
    $scope.numBomb = 15;
    $scope.numFlags = 15;

    $scope.render = function(){
      
    }
    $scope.getRandomIntInclusive = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.StartOrReset = function (){
      $scope.gameOver = false;
      $scope.fields = [];
      $scope.numbersOfFields  = 100;
      $scope.num = 0;
      $scope.noClick = true;
      $scope.randomNumbersArray = [];
      $scope.numBomb = 15;
      $scope.numFlags = 15;

      for(var i = 0 ; i < 10 ;i++ ){
        for(var j = 0 ; j < 10 ; j++){ 
          $scope.fields.push({id: $scope.num, x: j , y: i, isBomb: false, showField: false, number: null, inWave: false, isFlag:false})
          $scope.num++
        }
      }
      $scope.addBombs();
      $scope.addNumber();
      setTimeout(function(){ $scope.$apply() }, 10);
    }

    $scope.addBombs = function (){
      for(var i = 0 ; i < 10 ;i++){
        if($scope.randomNumbersArray.length === $scope.numBomb){
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
      if($scope.randomNumbersArray.length !== $scope.numBomb){
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

    $scope.IfClearField = function (){
      var actualNumber = $scope.numbersClearFields;
      for(var i = 0 ; i < $scope.fields.length ; i++){
       if($scope.fields[i].inWave === true ){
        //left field
       if($scope.fields[i-1] && !$scope.fields[i-1].isBomb && $scope.fields[i].x !== 0 && $scope.fields[i-1].number === null && $scope.fields[i-1].inWave === false){
        $scope.numbersClearFields++;
        $scope.fields[i-1].inWave = true;
       }
        // right field
       if($scope.fields[i+1] && !$scope.fields[i+1].isBomb && $scope.fields[i].x !== 9 && $scope.fields[i+1].number === null && $scope.fields[i+1].inWave === false ){
        $scope.numbersClearFields++;
        $scope.fields[i+1].inWave = true;
      }
      var upperY = $scope.fields[i].y - 1;
      var bottomY = $scope.fields[i].y + 1;
      for(var j = 0 ; j < $scope.fields.length ; j++){
        // upper field
        if($scope.fields[j].y === upperY &&
           $scope.fields[j].x === $scope.fields[i].x &&
           !$scope.fields[j].isBomb &&
           $scope.fields[j].number === null &&
           $scope.fields[j].inWave === false
          ){
            $scope.numbersClearFields++
            $scope.fields[j].inWave = true; 
        }
        // lower field
        if($scope.fields[j].y === bottomY &&
          $scope.fields[j].x === $scope.fields[i].x &&
          !$scope.fields[j].isBomb &&
          $scope.fields[j].number === null &&
          $scope.fields[j].inWave === false
          ){
            $scope.numbersClearFields++
            $scope.fields[j].inWave = true; 
        }
      }

       }
      }
      for(var i = 0 ; i < $scope.fields.length ; i++){
        if($scope.fields[i].inWave === true ){
          document.getElementById($scope.fields[i].id).style.backgroundColor = 'white';  
          $scope.fields[i].showField = true;
        }
      }
      if(actualNumber !== $scope.numbersClearFields){
        return $scope.IfClearField();
      }else{
        for(var i = 0 ; i < $scope.fields.length ; i++){
          if($scope.fields[i].inWave === true ){
           //left field
          if($scope.fields[i-1] && !$scope.fields[i-1].isBomb && $scope.fields[i].x !== 0 && $scope.fields[i-1].number !== null ){
            document.getElementById($scope.fields[i-1].id).style.backgroundColor = 'white';  
            $scope.fields[i-1].showField = true;

          }
           // right field
          if($scope.fields[i+1] && !$scope.fields[i+1].isBomb && $scope.fields[i].x !== 9 && $scope.fields[i+1].number !== null ){
            document.getElementById($scope.fields[i+1].id).style.backgroundColor = 'white';  
            $scope.fields[i+1].showField = true;
          }
         var upperY = $scope.fields[i].y - 1;
         var bottomY = $scope.fields[i].y + 1;
         for(var j = 0 ; j < $scope.fields.length ; j++){
           // upper field
           if($scope.fields[j].y === upperY &&
              $scope.fields[j].x === $scope.fields[i].x &&
              !$scope.fields[j].isBomb &&
              $scope.fields[j].number !== null 
             ){
              document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
              $scope.fields[j].showField = true;
            }
            // upper-left field
           if($scope.fields[j].y === upperY &&
            $scope.fields[j].x === $scope.fields[i].x - 1 &&
            !$scope.fields[j].isBomb &&
            $scope.fields[j].number !== null 
           ){
            document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
            $scope.fields[j].showField = true;
          }
             // upper-right field
             if($scope.fields[j].y === upperY &&
              $scope.fields[j].x === $scope.fields[i].x + 1 &&
              !$scope.fields[j].isBomb &&
              $scope.fields[j].number !== null 
             ){
              document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
              $scope.fields[j].showField = true;
            }
           // lower field
           if($scope.fields[j].y === bottomY &&
             $scope.fields[j].x === $scope.fields[i].x &&
             !$scope.fields[j].isBomb &&
             $scope.fields[j].number !== null 
             ){
              document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
              $scope.fields[j].showField = true;
            }
            // lower-left field
           if($scope.fields[j].y === bottomY &&
            $scope.fields[j].x === $scope.fields[i].x - 1 &&
            !$scope.fields[j].isBomb &&
            $scope.fields[j].number !== null 
            ){
             document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
             $scope.fields[j].showField = true;
           }
           // lower-right field
           if($scope.fields[j].y === bottomY &&
            $scope.fields[j].x === $scope.fields[i].x + 1 &&
            !$scope.fields[j].isBomb &&
            $scope.fields[j].number !== null 
            ){
             document.getElementById($scope.fields[j].id).style.backgroundColor = 'white';  
             $scope.fields[j].showField = true;
           }
         }
   
          }
         }
      }
    }
    $scope.checkHiddenField = function () {
      var numHiddenFields = 0;
      for(var i = 0 ; i < $scope.fields.length ; i++){
        if($scope.fields[i].showField === false){
          numHiddenFields++;
        }
      }
      if(numHiddenFields === $scope.numBomb){
        $scope.boom();
        $scope.winOrLoose = "You won!";
        $scope.gameOver = true;
      }
    }

    $scope.checkField = function (index){
      $scope.fields[index].showField = true;
      if($scope.fields[index].isBomb){
        $scope.boom();
        $scope.winOrLoose = "Game Over!";
        $scope.gameOver = true;
      }else if($scope.fields[index].number === null){
        $scope.fields[index].inWave = true;
        document.getElementById($scope.fields[index].id).style.backgroundColor = 'white';  
        $scope.IfClearField();
        $scope.checkHiddenField();
      }else{
        document.getElementById($scope.fields[index].id).style.backgroundColor = 'white';  
        $scope.checkHiddenField();
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

    $scope.safeMine = function (index){
      if($scope.fields[index].showField === false){
        if($scope.fields[index].isFlag === false && $scope.numFlags !== 0){
          $scope.fields[index].isFlag = true;
          document.getElementById($scope.fields[index].id).style.backgroundColor = 'pink';
          $scope.numFlags--;
        }else{
          if($scope.fields[index].isFlag === true){
            $scope.fields[index].isFlag = false;
            document.getElementById($scope.fields[index].id).style.backgroundColor = 'gray';
            $scope.numFlags++
          }
        }
      }

    }

    $scope.StartOrReset();
    $scope.addBombs();
  })
  // Stackoverflow source
  .directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});

