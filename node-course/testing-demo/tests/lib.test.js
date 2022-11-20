const lib = require('../lib');
const db = require('../db');
const mail = require('../mail')

describe('Absolute',() => {
    it('should return positive if input is positive', () =>{
        const result = lib.absolute(1)
        expect(result).toBe(1);             //checks value
    })
    
    it('should return positive if input is negative', () =>{
        const result = lib.absolute(-1)
        expect(result).toBe(1);
    })
    
    it('should return positive if input is positive', () =>{
        const result = lib.absolute(0)
        expect(result).toBe(0);
    })
     
});

describe('greet', () => {
    it('should return greeting message', () =>{
        const result = lib.greet('Mosh');
        expect(result).toContain('Mosh');
    })
})

describe('getCurrencies', ()=>{
    it('should return supported currencies', () =>{
        const result = lib.getCurrencies();
        expect(result).toEqual(expect.arrayContaining(['EUR','AUD','USD']));
    })
})

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({id:1, price: 10});      //checks location must have only mentioned values
        expect(result).toMatchObject({id:1 , price: 10})//checks location. can have more values
    });
});

describe('registerUser', () =>{
    it('should throw if user is falsy', () => {
        expect(() =>{ lib.registerUser(null); }).toThrow()
    })

    it('should return user name if valid username', () => {
        const result = lib.registerUser('user');
        expect(result).toMatchObject({ username: 'user'})
        expect(result.id).toBeGreaterThan(0)
    })
})

describe('applyDiscount',() =>{
    it('should apply 10% discount', () =>{
        db.getCustomerSync = function(customerId){
            console.log('Fake reading from db');
            return({ customerId: 1, points: 20})
        }
        
        const order = {customerId:1, totalPrice: 10};
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
}) 

describe('notifyCustomer',() =>{
    it('should send mail to customer', () =>{
        db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1})

        expect(mail.send).toHaveBeenCalled();
    })
}) 
