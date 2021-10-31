(function () {
    console.log("conected :)");

    //track who is current Player
    var curPlayer = "player1";

    //recognize which column got clicked
    $(".column").on("click", function (e) {

        var col = $(e.currentTarget);

        var slotsInColumn = col.children();

        dropChip(col, slotsInColumn);

        for (var i = slotsInColumn.length - 1; i >= 0; i--) {

            if (!slotsInColumn.eq(i).hasClass("player1") && !slotsInColumn.eq(i).hasClass("player2")) {


                if ($("body").hasClass("dark")) {
                    slotsInColumn.eq(i).addClass([curPlayer, curPlayer + "-dark"]);
                    // console.log(slotsInColumn.eq(i));
                    break;

                } else {
                    slotsInColumn.eq(i).addClass(curPlayer);
                    // console.log(slotsInColumn.eq(i));
                    break;
                }

            }
        }

        if (i === -1) {
            return;
        }

        //get row
        var slotsInRow = $(".row" + i);


        checkForFourEquals(slotsInRow);
        checkForFourEquals(slotsInColumn);
        checkForFourEqualsInDiagonals(5);
        checkForFourEqualsInDiagonals(7);

        switchPlayer();

    });





    $(".space button").on("click", function () {
        reset();
        $("body").addClass("dark");

        $(".playerIcon1").attr('src', './images/mars.png');
        $(".playerIcon2").attr('src', './images/yelplanet.png');
        $(".reset button").toggle();
        $(".space button").html("back to earth").on("click", function () {
            window.location.reload();
        });

    });

    $(".reset button").on("click", function () {
        window.location.reload();
    });
    $(".buildBoard button").on("click", function () {

        getNumbers();
    });

    function switchPlayer() {
        if (curPlayer === "player1") {
            curPlayer = "player2";
        } else {
            curPlayer = "player1";
        }

        var playerIcon = $(".playerIcon");
        var underlay = $(".underlay");

        for (var i = 0; i < playerIcon.length; i++) {

            if (playerIcon.eq(i).hasClass("on")) {
                playerIcon.eq(i).removeClass("on");
            } else {
                playerIcon.eq(i).addClass("on");
            }
            if (underlay.eq(i).hasClass("border")) {
                underlay.eq(i).removeClass("border");
            } else {
                underlay.eq(i).addClass("border");
            }
        }

    }

    function checkForFourEquals(arr) {
        var counter = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr.eq(i).hasClass(curPlayer)) {
                // console.log("hor/ver");
                counter++;
                if (counter === 4) {



                    startKonfettiRain(curPlayer);

                    return true;
                }
            } else {
                counter = 0;
            }
        }
        return false;
    }

    function checkForFourEqualsInDiagonals(k) {
        // console.log(k);

        var slots = $(".slot");

        for (var i = 0; i <= slots.length; i++) {

            var first = slots.eq(i);
            var second = slots.eq(i + k);
            var third = slots.eq(i + k * 2);
            var fourth = slots.eq(i + k * 3);

            if (first.hasClass(curPlayer) && (second.hasClass(curPlayer))) {

                if (second.hasClass(curPlayer) && (second.parent().prev().is(first.parent()) || second.parent().prev().is(third.parent()) || second.parent().prev().is(fourth.parent()))) {



                    if (third.hasClass(curPlayer) && (third.parent().prev().is(first.parent()) || third.parent().prev().is(second.parent()) || third.parent().prev().is(fourth.parent()))) {



                        if (fourth.hasClass(curPlayer) && (fourth.parent().prev().is(first.parent()) || fourth.parent().prev().is(second.parent()) || fourth.parent().prev().is(third.parent()))) {


                            startKonfettiRain(curPlayer);


                            return true;
                        }

                    }
                }

            }
        }
        return false;
    }



    function startKonfettiRain(curPlayer) {

        // var symb = [🥇,⭐️,✨,🎉,];
        // var pokal = 🏆;
        $(".column").addClass("off");
        $(".buildBoard").hide();
        if (curPlayer === "player1") {
            $(".playerIcon2").hide();
            $(".playerIcon2").parent().hide();
            $(".playerIcon1").addClass("winner");


        } else {
            $(".playerIcon1").hide();
            $(".playerIcon1").parent().hide();
            $(".playerIcon2").addClass("winner");


        }
        setTimeout(function () {
            $(".info-msg").html("<p class='win-msg'> Congrats you win !!!</p>");

            $(".overlay").show();
        }, 800);

    }

    function reset() {
        var underlay = $(".underlay");
        var playerIcon = $(".playerIcon");
        $("div").removeClass("player1");
        $("div").removeClass("player2");
        $("div").removeClass("on");
        $("div").removeClass("border");
        $("img").removeClass("winner");
        $(".win-msg").remove();

        $(".playerIcon1").show();
        $(".playerIcon1").parent().show();
        $(".playerIcon2").show();
        $(".playerIcon2").parent().show();
        $(playerIcon.eq(0)).addClass("on");
        $(underlay.eq(0)).addClass("border");
        $(".overlay").hide();
        $(".column").removeClass("off");
        $(".buildBoard").show();
        curPlayer = "player1";
    }

    function buildBoard(col, row) {

        var rowHtml = "";
        var colHtml = "";

        for (var j = 0; j < row; j++) {

            rowHtml += "<div class='slot row" + j + "'><div class='hole'></div></div>";
        }


        for (var i = 0; i < col; i++) {
            colHtml += "<div class='column'>" + rowHtml + "</div>";
        }


        $(".board").html(colHtml);

    }



    function getNumbers() {

        try {
            var cols = askForColumns();
            var rows = askForRows();

            buildBoard(cols, rows);

            $(".column").on("click", function (e) {

                var col = $(e.currentTarget);

                var slotsInColumn = col.children();

                for (var i = slotsInColumn.length - 1; i >= 0; i--) {

                    if (!slotsInColumn.eq(i).hasClass("player1") && !slotsInColumn.eq(i).hasClass("player2")) {


                        if ($("body").hasClass("dark")) {
                            slotsInColumn.eq(i).addClass([curPlayer, curPlayer + "-dark"]);
                            // console.log(slotsInColumn.eq(i));
                            break;

                        } else {
                            slotsInColumn.eq(i).addClass(curPlayer);
                            // console.log(slotsInColumn.eq(i));
                            break;
                        }

                    }
                }

                if (i === -1) {
                    return;
                }

                //get row
                var slotsInRow = $(".row" + i);


                checkForFourEquals(slotsInRow);
                checkForFourEquals(slotsInColumn);
                checkForFourEqualsInDiagonals(parseInt(rows) + 1);
                checkForFourEqualsInDiagonals(rows - 1);

                switchPlayer();
            });


        } catch (e) {
            // console.log(e.message);
        }
    }

    function askForColumns() {
        var num = prompt('Please enter a number between 2 and 9 for the vertical colums ⬇️ ');
        while (num < 2 || num > 9 || !num == parseInt(num)) {
            alert("Wrong Input");
            num = prompt('Please enter a number between 2 and 9 for the vertical colums ⬇️ ');
        }
        return num;
    }

    function askForRows() {
        var num = prompt('Please enter a number between 2 and 9 for the horizontal rows ⬅️');

        while (num < 2 || num > 8 || !num == parseInt(num)) {
            alert("Wrong Input");
            num = prompt('Please enter a number between 2 and 8 for the horizontal rows ⬅️ ');
        }
        return num;
    }


    function dropChip(col, slotsInColumn) {

        // offsetHeight: 600
        // offsetLeft: 133
        // offsetTop: -23
        // offsetWidth: 100




        // offsetHeight: 100
        // offsetLeft: 133
        // offsetParent: body
        // offsetTop: 477
        // offsetWidth: 100

        console.log(col);
        console.log(slotsInColumn);

        for (var i = slotsInColumn.length - 1; i >= 0; i--) {

            var isFreeSlot = !slotsInColumn.eq(i).hasClass("player1") && !slotsInColumn.eq(i).hasClass("player2");

            console.log(isFreeSlot);
        }
        $(".chip").css({
            left: col[0].offsetLeft,
            top: "500px"
        });

    }
})();

