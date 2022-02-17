let chai =  require(`chai`);
let expect = chai.expect;
let addition = require(`../models/addition`);

describe(`addition`, () =>{
    it(`it should add 2 number`, (done) =>{
        addition.add(1,4).then(function(result){
            expect(result).to.equal(5);
            done();
        }).catch(function(error){
            done(error);
        })
    });
});