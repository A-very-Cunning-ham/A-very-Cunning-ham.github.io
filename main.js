var categs = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

function enable_categs(n) {
    var checkbox = document.getElementById("check"+n);
    
    if (checkbox.checked === true) {
        categs[n] = true;
        sessionStorage.categs = categs;
    } else {
        categs[n] = false
    }
}
var s = "psychological disorder\tdeviant, distressful, and dysfunctional patterns of thoughts, feelings, or behaviors.\r\nAttention-Deficit Hyperactivity Disorder (ADHD)\ta psychological disorder marked by the appearance by age 7 of one or more of three key symptoms extreme inattention, hyperactivity, and impulsivity.\r\nmedical model\tthe concept that diseases, in this case psychological disorders, have physical causes that can be diagnosed, treated, and, in most cases, cured, often through treatment in a hospital.\r\nDSM-V\tthe American Psychiatric Association\'s Diagnostic and Statistical Manual of Mental Disorders, a widely used system for classifying psychological disorders"

function stringTo2dArray(string, d1, d2) {
	return string.split(d1).map(function(x){return x.split(d2)});
}

var result = stringTo2dArray(s, "\r\n", "\t");

console.log(result);
