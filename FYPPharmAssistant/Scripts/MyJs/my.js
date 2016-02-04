
//allows numbers only
$('.NumbersAndDecimal').keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

$('.NumbersOnly').keyup(function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});


$('.PositiveOnlyNoZero').keyup(function () {
    this.value = this.value.replace(/^-?[0-9]\d*(\.\d+)?$/, '');
});


$('.checkDateNoGraterThanToday').on('blur', function () {
    var inputDate = new Date($('.checkDateNoGraterThanToday').val());
    var todaysDate = new Date();

    if (inputDate.setHours(0, 0, 0, 0) > todaysDate.setHours(0, 0, 0, 0)) {
        alert('Date set is greater than current date !');
        $('.checkDateNoGraterThanToday').val('');
    };
});

$('.textOnly').keyup(function () {
    var val = this.value(/^-?[0-9]\d*(\.\d+)?$/, '');
});



function onlyAlphabets() {

    var regex = /^[a-zA-Z]*$/;
    if (regex.test(document.f.nm.value)) {

        //document.getElementById("notification").innerHTML = "Watching.. Everything is Alphabet now";
        return true;
    } else {
        document.getElementById("notification").innerHTML = "Alphabets Only";
        return false;
    }


}


$('.textOnly').keyup(function () {

    var regex = /^[a-zA-Z]*$/;
    if (regex.test(document.f.nm.value)) {

        //document.getElementById("notification").innerHTML = "Watching.. Everything is Alphabet now";
        return true;
    } else {
        alert();
        return false;
    }
});


$('.checkDateNoLessThanToday').on('blur', function () {
    var inputDate = new Date($('.checkDateNoLessThanToday').val());
    var todaysDate = new Date();

    if (inputDate.setHours(0, 0, 0, 0) <= todaysDate.setHours(0, 0, 0, 0)) {
        alert('Expiry Date should be greater than current date!');
        $('.checkDateNoLessThanToday').val('');
    };
});





$('.CheckFirstCharIsZero').on('blur', function () {
    var x = $('.CheckFirstCharIsZero').val();
    if (x.charAt(0)==0) {
        alert('Cannot start with Zero !!');
        $('.CheckFirstCharIsZero').val('');
    }
});




//spinner 
function openModal() {
    document.getElementById('modalSpinner').style.display = 'block';
    document.getElementById('fade').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalSpinner').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
}