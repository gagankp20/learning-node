const buzz = require('../exercise1');

describe('BUZZ KILL', ()=>{
    it('should return NaN pass test', () => {
        expect(() =>{ buzz.fizzBuzz.registerUser(NaN); }).toThrow()
    
    })

    it('should return fizz buzz',() =>{
        const result = buzz.fizzBuzz(45);
        expect(result).toBe('FizzBuzz')
    })

    it('should return fizz ',() =>{
        const result = buzz.fizzBuzz(3);
        expect(result).toBe('Fizz')
    })

    it('should return buzz',() =>{
        const result = buzz.fizzBuzz(5);
        expect(result).toBe('Buzz')
    })

    it('should return input',() =>{
        const result = buzz.fizzBuzz(7);
        expect(result).toBe(7)
    })
})

  