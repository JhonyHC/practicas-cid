
export function sumatory(numbers) {
    return numbers.reduce((sum, number) => sum += number, 0)
}

export function arraySquare(numbers) {
    return numbers.map(number => number * number)
}

export function multiplyArrays(arr1, arr2) {
    if(arr1.length !== arr2.length) return null
    return arr1.map((item, index) => item * arr2[index])
}

export function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}