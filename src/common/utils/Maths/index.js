
const Maths = {
    getNumber(str) {
        var num = str.match(/\d+$/)[0];
        return parseInt(num, 10);
    },



    // Javascript implementation to find
    // the number closest to n and
    // divisible by m

    // function to find the number
    // closest to n and divisible by m
    closestNumber(n, m) {

        // find the quotient
        let q = parseInt(n / m);

        // 1st possible closest number
        let n1 = m * q;

        // 2nd possible closest number
        let n2 = (n * m) > 0 ?
            (m * (q + 1)) : (m * (q - 1));

        // if true, then n1 is the
        // required closest number
        if (Math.abs(n - n1) < Math.abs(n - n2))
            return n1;

        // else n2 is the required
        // closest number
        return n2;
    },


    findClosestNumberInArray(array, target) {
        return array.reduce((prev, curr) => {
            return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
        });
    },

/* 
    getIdOfClosestNumberInArray(array, target) {
        let closestId = 0;
        let closestDiff = Infinity;
        array.forEach((item, index) => {
            const diff = Math.abs(item.value - target);
            if (diff < closestDiff) {
                closestDiff = diff;
                closestId = index;
            }
        });
        return closestId;
    } */
};

export default Maths;